require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const AdmZip = require("adm-zip");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { ESLint } = require("eslint");
const database = require("./database/database.js");
const DAO = require("./dao/DAO.js");
const convertErrorIDToType =
  require("./models/ErrorTypes.js").convertRuleIDToErrorType;
const ErrorTypes = require("./models/ErrorTypes.js").ErrorList;
const ErrorTypeDetail = require("./models/ErrorTypes.js");

const PYErrorTypes = require("./models/PYErrorTypes.js").PYErrorList;
const PYErrorTypeDetail = require("./models/PYErrorTypes.js");

const app = express();
const port = process.env.PORT;
const reactPort = 3000;
const origin = new RegExp(
  "^https?://[0-9a-z+\\-*/=~_#@$&%()[\\]',;.?!]+:" + reactPort + "$",
  "i"
);
const saltRounds = 12;

const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200,
  credentials: true,
};

const Bandit = require("./bandit/pythonShell.js");

app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
      mongoUrl: database.uri,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      crypto: { secret: process.env.SESSION_STORE_SECRET },
      autoRemove: "native",
      ttl: 60 * 60 * 24 * 7,
    }),
  })
);
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));
database.connect();

(async () => {
  const user = await DAO.getUser(process.env.MASTER_USERNAME);
  if (!user) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(process.env.MASTER_PASSWORD, salt);
    await DAO.addUser(process.env.MASTER_USERNAME, hash, true);
    console.log("Registered master account.");
  }
  delete process.env.MASTER_USERNAME;
  delete process.env.MASTER_PASSWORD;
})();

//takes the string of the filepath from canvas and extracts the students name from it
//filepath must be in Canvas output format with student name in file title - See Submissions(5) folder
function getStudentIDFromRelPath(target, map) {
  var cut = target.indexOf("_");
  var cut2 = target.indexOf(path.sep);
  if (cut == -1) {
    cut = target.indexOf(path.sep);
  } else if (cut2 == -1) {
    cut = target.indexOf("_");
  } else {
    cut = Math.min(cut, cut2);
  }
  return map.get(target.substring(0, cut));
}

//@param if count is -1 then we will not factor in a dynamic quantity into the severity score
//This function calculates the severity score, we get the 3 largest severity score values average them out and give it a 75% weight, we further give a 25% weight to quantity of Errors/total elements
function getSeverityScore(severityScores, count) {
  severityScores = severityScores.filter((num) => num != 0);
  severityScores.sort();
  severityScores.reverse();
  a = 1;
  b = 1;
  c = 1;
  if (severityScores.length > 0) {
    a = Math.max(severityScores[0], a);
  }
  if (severityScores.length > 1) {
    b = Math.max(severityScores[1], b);
  }
  if (severityScores.length > 2) {
    c = Math.max(severityScores[2], c);
  }
  b = a;
  c = a;
  if (count != -1) {
    quantity = 20 * (severityScores.length / count);
    return Math.ceil(
      //may be length or size or both who knows until we test //TODO TEST THIS
      ((a + b + c) / 3) * 0.75 + severityScores.length * 0.25
    );
  }
  quantity = severityScores.length + 1;
  if (quantity > 10) {
    quantity = 10;
  }
  return Math.ceil(((a + b + c) / 3) * 0.75 + quantity * 0.25);
}

function getSeverityScoreStudent(severityScores, count) {
  severityScores = severityScores.filter((num) => num != 0);
  severityScores.sort();
  severityScores.reverse();
  a = 1;
  b = 1;
  c = 1;
  if (severityScores.length > 0) {
    a = Math.max(severityScores[0], a);
  }
  if (severityScores.length > 1) {
    b = Math.max(severityScores[1], b);
  }
  if (severityScores.length > 2) {
    c = Math.max(severityScores[2], c);
  }
  if (count != -1) {
    quantity = 20 * (severityScores.length / count);
    return Math.ceil(
      //may be length or size or both who knows until we test //TODO TEST THIS
      ((a + b + c) / 3) * 0.75 + severityScores.length * 0.25
    );
  }
  quantity = severityScores.length + 1;
  if (quantity > 10) {
    quantity = 10;
  }
  return Math.ceil(((a + b + c) / 3) * 0.75 + quantity * 0.25);
}

function throughDirectory(__dirname) {
  function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      if (file.isDirectory()) {
        yield* walkSync(path.join(dir, file.name));
      } else {
        yield path.join(dir, file.name);
      }
    }
  }

  const files = [];
  for (const filePath of walkSync(__dirname)) {
    files.push(filePath);
  }
  return files.filter((file) => path.extname(file) !== ".zip");
}

function median(values) {
  if (values.length === 0) throw new Error("No inputs");

  values.sort(function (a, b) {
    return a - b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}
app.delete("/deleteZipFolder", async (req, res) => {
  if (req.session.username) {
    if ((await DAO.getZipFile(req.query.id)).Owner === req.session.username) {
      await DAO.deleteZipFolder(req.query.id);
      res.status(200).json(true);
    } else {
      res.status(403).json(false);
    }
  } else {
    res.status(403).json(false);
  }
});

app.delete("/deleteAll", async (req, res) => {
  if (req.session.admin) {
    await DAO.clearDatabase();
    res.status(200).json(true);
  } else {
    res.status(403).json(false);
  }
});
//This function is performed when someone uploads a zipfolder to our backend
app.post("/upload", async (req, res) => {
  if (!req.session.username) {
    res.status(403).json(false);
    return;
  }
  const zipFile = req.files.file;
  const zipFileName = zipFile.name;

  // submitted file must be a zip or error is thrown
  if (zipFileName.substring(zipFileName.length - 4) !== ".zip") {
    return res.status(400).json("Error: Not a zip file");
  }

  const fileLocation = `${"testFiles/"}${zipFileName}`;

  //make a folder called extracted
  if (!fs.existsSync("extracted")) {
    fs.mkdirSync("extracted");
  }

  //extract files into this folder
  zipFile.mv(fileLocation, async (err) => {
    // extract all student submissions from main zip file

    fsExtra.emptyDirSync("./extracted"); // REMOVE??

    const zipExtractor = new AdmZip(fileLocation);
    zipExtractor.extractAllTo("./extracted", true);

    // extract from any nested zip files --
    const fileNamesInZipFolder = fs.readdirSync("./extracted");
    const studentNames = new Set();

    fileNamesInZipFolder.forEach((file) => {
      const currentStudentName = file.substring(0, file.indexOf("_"));
      // Make sure its not empty before adding it to Hashset, The Set prevents repeats
      //ZAK - I moved this double check to before following if... makes more logical sense to check if it's a .zip before adding it to studentlist
      if (path.extname(file) == ".zip") {
        const innerZipFileExtractor = new AdmZip("./extracted/" + file);
        innerZipFileExtractor.extractAllTo(
          "./extracted/" + file.substring(0, file.indexOf("_")),
          true
        );
        fsExtra.remove("./extracted/" + file);
      } else if (currentStudentName) {
        studentNames.add(currentStudentName);
      }

      // Zip folders within the zip folder
    });

    const hasPyFiles = (element) => {
      if (path.extname(element) == ".py") return true;
      else return false;
    };

    console.log("Through dir is: ");
    console.log(throughDirectory("./extracted"));

    if (fileNamesInZipFolder.some(hasPyFiles)) {
      // there is at least 1 py file in the zipfile uploaded
      console.log("inside .py only code section");

      const mytest = await Bandit.runBandit("./extracted/", true);
      ///console.log(mytest[metrics]);
      console.log("my childs output is: ");

      console.dir(mytest, { maxArrayLength: null });

      console.log("JSON FORMAT??");
      console.log(mytest.toString());

      const pyResultsJSON = JSON.parse(mytest.toString());
      const results = pyResultsJSON.results;
      const metrics = pyResultsJSON.metrics;
      console.log("metrics");
      console.log(metrics);

      console.log("results");
      console.log(results);

      console.log("Through dir is: ");
      console.log(throughDirectory("./extracted"));

      console.log("num files tested is:");
      console.log(Object.keys(pyResultsJSON.metrics).length - 1); // num files tested

      //console.log(results.map((result) => getRelativePath(result.filePath)));

      const zipFileRecord = await DAO.addZipFile(
        zipFileName,
        new Date(),
        req.session.username,
        Object.keys(pyResultsJSON.metrics).length - 1 // num files tested
      );

      // This map is used to link student IDs with student names??
      //seems to add student to a zipFolderID?
      const studentIDsByName = new Map();
      await Promise.all(
        [...studentNames].map(async (studentName) =>
          studentIDsByName.set(
            studentName,
            (
              await DAO.addStudent(studentName, zipFileRecord._id)
            )._id //this does not seem to correspond well with the schema... schema is for name, severityscore, files?
          )
        )
      );

      // This map is used to keep the scores of each student in an array
      const listOfSeverityScoreFilesOwnedByStudents = new Map();
      studentIDsByName.forEach((value, key) => {
        listOfSeverityScoreFilesOwnedByStudents.set(value, []);
      });

      const fileErrorsMap = new Map();
      let fileErrors = [];
      const fileErrorsMap2 = await Promise.all(
        results.map(async (result) => {
          const relativePath = result.filename;

          console.log(relativePath);

          //get numerical PYError type
          const currentErrorType = parseInt(result.test_id.substring(1));

          //add Errors to database
          const error = await DAO.addPYError(
            currentErrorType,
            PYErrorTypes[currentErrorType]["Severity"],
            result.filename.substring(12), //rework if make separate folders for extracted py and js files
            result.issue_text,
            result.issue_confidence,
            result.issue_severity,
            result.issue_cwe.link,
            result.line_number,
            result.line_range,
            result.test_name,
            result.test_id
          );

          //case: no errors for file yet recorded, so add it to map
          if (!fileErrorsMap.has(result.filename)) {
            fileErrors = []; // clear?
            fileErrors.push({ err: error, id: currentErrorType });
            fileErrorsMap.set(result.filename, fileErrors);
          } else {
            // file already in map
            fileErrors.push({ err: error, id: currentErrorType });
            fileErrorsMap.set(result.filename, fileErrors);
          }

          return fileErrorsMap;
        })
      );

      //connect errors to fileRecord
      for (let [key, value] of fileErrorsMap.entries()) {
        //key = filename ; val = array of mongoose schema errors and numerical pyErrorid for the coresponding file

        const severityScores = [];
        const PYerrors = [];
        await value.forEach((element) => {
          console.log(element.id);
          console.log(element.err);
          severityScores.push(PYErrorTypes[element.id]["Severity"]);

          PYerrors.push(element.err);
        });
        //
        console.log();
        const fileSeverity = getSeverityScore(severityScores, -1);
        var path1 = require("path");
        const relativePath = path1.basename(key);

        //Stores file on the database
        const fileRecord = await DAO.addFile(
          relativePath,
          value.length,
          null,
          null, //stuff that is not utilized
          null,
          null,
          null, // no result source for py errors, can add later
          null,
          PYerrors,
          fileSeverity,
          true
        );
        console.log("relative path:");
        console.log(relativePath);
        const currentStudentID = getStudentIDFromRelPath(
          relativePath,
          studentIDsByName
        );
        console.log(currentStudentID);
        console.log(listOfSeverityScoreFilesOwnedByStudents);

        listOfSeverityScoreFilesOwnedByStudents
          .get(currentStudentID)
          .push(fileSeverity);
        await DAO.addFileToStudent(currentStudentID, fileRecord._id);
      } // out of bandit loops

      //add the list of the students to the zip file on database
      await DAO.addStudentsToZipFile(
        zipFileRecord._id,
        Array.from(studentIDsByName.values())
      );

      //Where we store the results to then further calculate the classes severity score
      const ListOfStudentSeverityScores = [];
      //go through students and calculate and add their severity scores
      for (const [
        key,
        value,
      ] of listOfSeverityScoreFilesOwnedByStudents.entries(
        listOfSeverityScoreFilesOwnedByStudents
      )) {
        temp = getSeverityScore(value);
        //let average = value.reduce((a, b) => a + b) / value.length;
        ListOfStudentSeverityScores.push(temp);
        await DAO.updateStudent(key, temp);
      }

      ListOfStudentSeverityScores.sort();
      for (i = 0; i < Math.ceil(ListOfStudentSeverityScores.length / 8); i++) {
        ListOfStudentSeverityScores.push(
          ListOfStudentSeverityScores[
            Math.floor(ListOfStudentSeverityScores.length / 2)
          ]
        );
      }

      let average = Math.ceil(
        ListOfStudentSeverityScores.reduce((a, b) => a + b) /
          ListOfStudentSeverityScores.length
      );
      //adds the error count and severity score
      await DAO.updateZipFile(zipFileRecord._id, results.length, average);

      //clear out the dir
      fsExtra.emptyDirSync("./extracted");
      res.json({});

    // ##### RUNS ESLINT IF THERE ARE NO PYTHON FILES IN FOLDER ##### //  
    // if clause running Bandit starts on line 266
    } else {
      /**
       * Setup ESLINT and run on all the files in this folder. Uses eslint Node.js API function lintFiles to
       * do linting and return all relevant info in results object. Will check for rules identified in the config
       * file .eslintrc.js and in ErrorTypes.js. See .eslintrc.js file for additional comment.
       */
      
      const eslint = new ESLint();
      const results = await eslint.lintFiles(["./extracted/**/*.js"]);

      // fileNamesInZipFolder
      const zipFileRecord = await DAO.addZipFile(
        zipFileName,
        new Date(),
        req.session.username,
        results.length
      );

      // This map is used to link student IDs with student names
      const studentIDsByName = new Map();
      await Promise.all(
        [...studentNames].map(async (studentName) =>
          studentIDsByName.set(
            studentName,
            (
              await DAO.addStudent(studentName, zipFileRecord._id)
            )._id
          )
        )
      );

      // This map is used to keep the scores of each student in an array
      const listOfSeverityScoreFilesOwnedByStudents = new Map();
      studentIDsByName.forEach((value, key) => {
        listOfSeverityScoreFilesOwnedByStudents.set(value, []);
      });

      //Go tThrough ESlint detected errors
      await Promise.all(
        results.map(async (result) => {
          const relativePath = getRelativePath(result.filePath, false);

          const severityScores = [];

          //add Errors to database
          const errors = await Promise.all(
            result.messages.map((message) => {

              const currentErrorType = convertErrorIDToType(message.ruleId);
              console.log("Error Type after conversion: ")
              console.log(currentErrorType);

              severityScores.push(ErrorTypes[currentErrorType]["Severity"]);
              return DAO.addError(
                currentErrorType,
                message.ruleId,
                message.severity,
                message.message,
                message.line,
                message.column,
                message.nodeType,
                message.messageId,
                message.endLine,
                message.endColumn
              );
            })
          );

          //TODO TEST THIS FUNCTION
          //gets the severity score of current file
          const fileSeverity = getSeverityScore(severityScores, -1);
          console.log("file Severity is: ");
          console.log(fileSeverity);

          //Stores file on the database
          const fileRecord = await DAO.addFile(
            relativePath,
            result.errorCount,
            result.fatalErrorCount,
            result.warningCount,
            result.fixableErrorCount,
            result.fixableWarningCount,
            result.source,
            errors,
            null,
            fileSeverity,
            false
          );

          //Gets the current student DB id - RELATIVEPATH MUST BE IN CANVAS FORMAT
          const currentStudentID = getStudentIDFromRelPath(
            relativePath,
            studentIDsByName
          );

          //adding files severity scores to the student so we can calculate the students severity score
          listOfSeverityScoreFilesOwnedByStudents
            .get(currentStudentID)
            .push(fileSeverity);
          DAO.addFileToStudent(currentStudentID, fileRecord._id);
        })
      ); //Out of ESLINT Loop

      //add the list of the students to the zip file on database
      await DAO.addStudentsToZipFile(
        zipFileRecord._id,
        Array.from(studentIDsByName.values())
      );

      //Where we store the results to then further calculate the classes severity score
      const ListOfStudentSeverityScores = [];
      //go through students and calculate and add their severity scores
      for (const [
        key,
        value,
      ] of listOfSeverityScoreFilesOwnedByStudents.entries(
        listOfSeverityScoreFilesOwnedByStudents
      )) {
        temp = getSeverityScore(value);
        //let average = value.reduce((a, b) => a + b) / value.length;
        ListOfStudentSeverityScores.push(temp);
        await DAO.updateStudent(key, temp);
      }

      ListOfStudentSeverityScores.sort();
      for (i = 0; i < Math.ceil(ListOfStudentSeverityScores.length / 8); i++) {
        ListOfStudentSeverityScores.push(
          ListOfStudentSeverityScores[
            Math.floor(ListOfStudentSeverityScores.length / 2)
          ]
        );
      }

      let average = Math.ceil(
        ListOfStudentSeverityScores.reduce((a, b) => a + b) /
          ListOfStudentSeverityScores.length
      );
      //adds the error count and severity score
      await DAO.updateZipFile(zipFileRecord._id, results.length, average);

      // const responseData = results.map((result) => ({
      // 	filePath: result.filePath.substring(
      // 		result.filePath.lastIndexOf("/") + 1
      // 	),
      // 	errorCount: result.errorCount,
      // 	messages: result.messages,
      // }));

      fsExtra.emptyDirSync("./extracted");
      res.status(200).json(true);
    }
  });
});

app.get("/getUser", (req, res) => {
  res.json(req.session.username);
});

app.get("/ping", (req, res) => {
  res.status(200);
  if (req.session.username) {
    res.json(true);
  } else {
    res.json(false);
  }
});

// overview page- return all uploaded zip files
app.get("/overview/zipfiles", async (req, res) => {
  if (req.session.username) {
    res.status(200);
    if (req.session.admin) {
      res.json(await DAO.getZipFiles());
    } else {
      res.json(await DAO.getZipFiles(req.session.username));
    }
  } else {
    res.status(403).json(false);
  }
});

app.post("/generateReport", async (req, res) => {
  if (req.session.username) {
    if (!req.body.zipFiles || req.body.zipFiles.length === 0) {
      res.status(400).json(false);
      return;
    }
    let file = null;
    let files = [];
    for (let i = 0; i < req.body.zipFiles.length; i++) {
      file = await DAO.getZipFile(req.body.zipFiles[i]);
      if (
        !req.session.admin &&
        (!file || file.Owner !== req.session.username)
      ) {
        res.status(403).json(false); // 403 notwithstanding to prevent the existence of a file with the specified ID from being ascertained
        return;
      }
      for (let j = 0; j < file.Students.length; j++) {
        for (let k = 0; k < file.Students[j].Files.length; k++) {
          files.push(file.Students[j].Files[k]);
        }
      }
    }

    const map = new Map();
    const pyMap = new Map();
    var numJSErrors = 0;
    var numPYErrors = 0;
    var numJSFiles = 0;
    var numPYFiles = 0;
    files.forEach((file) => {
      if (file.Errors) {
        numJSFiles++;
        file.Errors.forEach((err) => {
          numJSErrors++;
          if (map.has(err.ErrorType.Name)) {
            var newObj = map.get(err.ErrorType.Name);
            newObj.frequency++;
            map.set(err.ErrorType.Name, newObj);
          } else {
            var newObj = {
              Name: err.ErrorType.Name,
              Description: '"' + err.ErrorType.Description + '"',
              Severity: err.ErrorType.Severity,
              frequency: 1,
            };
            map.set(err.ErrorType.Name, newObj);
          }
        });
      }
      if (file.PyErrors) {
        numPYFiles++;
        file.PyErrors.forEach((err) => {
          numPYErrors++;
          if (pyMap.has(err.ErrorType.Name)) {
            var newObj = pyMap.get(err.ErrorType.Name);
            newObj.frequency++;
            pyMap.set(err.ErrorType.Name, newObj);
          } else {
            var newObj = {
              Name: err.ErrorType.Name,
              Description: '"' + err.ErrorType.Description + '"',
              Severity: err.ErrorType.Severity,
              frequency: 1,
            };
            pyMap.set(err.ErrorType.Name, newObj);
          }
        });
      }
    });
    var response = "";
    if (numJSErrors > 0) {
      response +=
        "Most Common Vulnerabilities in JavaScript Files\n" +
        "Error Type, Message, Severity, Total Occurrencies, Frequency per file, Percentage of all vulnerabilities\n";
      var errors = [...map.values()];
      errors = errors.sort((a, b) =>
        a.frequency > b.frequency ? -1 : b.frequency > a.frequency ? 1 : 0
      );
      errors.forEach((error) => {
        response +=
          error.Name +
          "," +
          error.Description +
          "," +
          error.Severity +
          "," +
          error.frequency +
          "," +
          error.frequency / numJSFiles +
          "," +
          error.frequency / numJSErrors +
          "\n";
      });
      response += "\n";
    }
    if (numPYErrors > 0) {
      response +=
        "Most Common Vulnerabilities in Python Files\n" +
        "Error Type, Message, Severity, Total Occurrencies, Frequency per file, Percentage of all vulnerabilities\n";
      var errors = [...pyMap.values()];
      errors = errors.sort((a, b) =>
        a.frequency > b.frequency ? -1 : b.frequency > a.frequency ? 1 : 0
      );
      errors.forEach((error) => {
        response +=
          error.Name +
          "," +
          error.Description +
          "," +
          error.Severity +
          "," +
          error.frequency +
          "," +
          error.frequency / numPYFiles +
          "," +
          error.frequency / numPYErrors +
          "\n";
      });
    }
    res.json(response);
  } else {
    res.status(403).json(false);
  }
});

app.post("/login", async (req, res) => {
  if (!req.session.username && req.body.username && req.body.password) {
    const user = await DAO.getUser(req.body.username);
    if (user) {
      bcrypt.compare(req.body.password, user.Hash, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json(false);
        } else {
          res.status(200);
          if (result) {
            req.session.username = user._id;
            if (user.Admin) {
              req.session.admin = true;
            }
            res.json(true);
          } else {
            res.json(false);
          }
        }
      });
    } else {
      res.status(200).json(false);
    }
  } else {
    res.status(400).json(false);
  }
});

app.post("/signup", async (req, res) => {
  if (
    req.body.username &&
    req.body.password &&
    /^[a-zA-Z0-9]+$/.test(req.body.username) &&
    /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      req.body.password
    )
  ) {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(req.body.password, salt);
      var newUser = await DAO.addUser(req.body.username, hash, false);
      req.session.username = newUser._id;
      res.status(200).json(true);
    } catch (err) {
      res.status(409).json(false);
    }
  } else {
    console.log(req.body);
    res.status(400).json(false);
  }
});

app.post("/facebookLogin", async (req, res) => {
  if (req.body.facebookId && req.body.username) {
    console.log(req.body);
    var user = await DAO.findFacebookUser(req.body.facebookId);
    console.log(user);
    if (user) {
      res.status(200);
      req.session.username = user._id;

      res.json(true);
    } else {
      try {
        var response = await DAO.addFacebookUser(
          req.body.facebookId,
          req.body.username
        );
      } catch (err) {
        res.status(409).json(false);
      }
      if (response) {
        res.status(200);
        req.session.username = response._id;
        res.json(true);
      } else res.status(400).json(false);
    }
  }
});

app.post("/googleLogin", async (req, res) => {
  if (req.body.googleId && req.body.username) {
    var user = await DAO.findGoogleUser(req.body.googleId);
    if (user) {
      res.status(200);
      req.session.username = user._id;
      res.json(true);
    } else {
      try {
        var response = await DAO.addGoogleUser(
          req.body.googleId,
          req.body.username
        );
      } catch (err) {
        res.status(409).json(false);
      }
      if (response) {
        res.status(200);
        req.session.username = response._id;
        res.json(true);
      } else res.status(400).json(false);
    }
    console.log(req.session);
  }
});

app.post("/logout", (req, res) => {
  if (req.session.username) {
    req.session.destroy();
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});

// overview page- view more data fom invidual zip files
app.get("/studentfiles", async (req, res) => {
  if (req.session.username) {
    const file = await DAO.getZipFile(req.query.id);
    if (req.session.admin || file.Owner === req.session.username) {
      res.status(200).json(file);
    } else {
      res.status(403).json(false);
    }
  } else {
    res.status(403).json(false);
    return;
  }
});

app.get("/ErrorTypes", async (req, res) => {
  if (req.session.username) {
    res
      .status(200)
      .json(ErrorTypeDetail.ReturnErrorTypeInformation(req.query.id));
  } else {
    res.status(403).json(false);
  }
});

app.get("/PYErrorTypes", async (req, res) => {
  if (req.session.username) {
    res
      .status(200)
      .json(PYErrorTypeDetail.ReturnPYErrorTypeInformation(req.query.id));
  } else {
    res.status(403).json(false);
  }
});

app.get("/PYErrorIDs", async (req, res) => {
  if (req.session.username) {
    res.status(200).json(PYErrorTypeDetail.getPYErrorIDs());
  } else {
    res.status(403).json(false);
  }
});

app.get("/ErrorTypesNum", async (req, res) => {
  if (req.session.username) {
    res.status(200).json(ErrorTypeDetail.getErrorTypesNum());
  } else {
    res.status(403).json(false);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.all("*", (req, res) => {
  res.status(404).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const getRelativePath = (absolutePath, isPY) => {
  const extractedFolderName = "extracted" + path.sep;
  return absolutePath.substring(
    absolutePath.indexOf(extractedFolderName) + extractedFolderName.length
  );
};
