/* eslint-disable security-node/detect-crlf */
// ^ Because it catches console.log with variables passed in
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

const PHPErrorTypes = require("./models/PHPErrorTypes.js").PHPErrorList;
const PHPErrorTypeDetail = require("./models/PHPErrorTypes.js");

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
const Psalm = require("./psalm/psalmPyShell.js");

app.use(cors(corsOptions));
app.use(
  // eslint-disable-next-line security-node/detect-absence-of-name-option-in-exrpress-session
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
    // eslint-disable-next-line security/detect-non-literal-fs-filename
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
  console.log(
    "in delete zip in index.js: " +
      req.query.id +
      " that's req.query.id - this is req: " +
      req
  );
  //console.log(req);
  if (req.session.username) {
    if ((await DAO.getZipFile(req.query.id)).Owner === req.session.username) {
      console.log("actually deleting this zip file!");
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
  //checks to make sure user is logged in
  //if they are not, return status 403 (client forbidden from accessing url)
  if (!req.session.username) {
    console.log("NO USERNAME!");
    res.status(403).json(false);
    return;
  }
  const zipFile = req.files.file;
  const zipFileName = zipFile.name;
  const fileIDArray = new Array();
  // submitted file must be a zip or error is thrown
  // checks via substring with last 4 characters to match ".zip"
  if (zipFileName.substring(zipFileName.length - 4) !== ".zip") {
    console.log("ZIP FILE EXTENSION NOT PRESENT!");
    res.status(400).json("Error: Not a zip file");
    return;
  }

  const fileLocation = `${"testFiles/"}${zipFileName}`;

  //make a folder called extracted and testFiles if they don't exist
  if (!fs.existsSync("extracted")) {
    fs.mkdirSync("extracted");
  }
  if (!fs.existsSync("testFiles")) {
    fs.mkdirSync("testFiles");
  }
  fsExtra.emptyDirSync("./extracted"); // REMOVE??
  fsExtra.emptyDirSync("./testFiles"); // REMOVE??

  //console.log(zipFile);
  //extract files into this folder
  zipFile.mv(fileLocation, async (err) => {
    // extract all student submissions from main zip file

    //empties directory synchronously

    //extract all zip files to ./extracted directory (which was just cleared) -
    const zipExtractor = new AdmZip(fileLocation);
    zipExtractor.extractAllTo("./extracted", true);

    // extract from any nested zip files
    //fs.readdirSync reads all files in a folder and returns an array with all the file names in the folder
    var fileNamesInZipFolder = fs.readdirSync("./extracted");

    //create new set for studentNames --- TODO: may need to check against database going forward
    const studentNames = new Array(); // TODO: may need to add student ID set and database models to store (the most unique identifier)

    //we will first unzip an inner zip folders (supports ONE LEVEL of inner zips)
    //this will place all inner zip file contents in the root ./extracted folder for processing
    fileNamesInZipFolder.forEach((file) => {
      if (path.extname(file) == ".zip") {
        changed = 1;
        const innerZipFileExtractor = new AdmZip("./extracted/" + file);
        innerZipFileExtractor.extractAllTo("./extracted/", true);
      }
    });

    fileNamesInZipFolder.forEach((file) => {
      const currentStudentName = file;
      // Make sure its not empty before adding it to Hashset, The Set prevents repeats
      studentNames.push(currentStudentName);
    });

    //function definition used below to check for python files
    const hasPyFiles = (element) => {
      if (path.extname(element) == ".py") return true;
      else return false;
    };

    //function definition used below to check for js files
    const hasJSFiles = (element) => {
      if (path.extname(element) == ".js") return true;
      else return false;
    };


    //after inner zip extraction above, will reset all fileNameInZipFolder Array for processing below
    fileNamesInZipFolder = fs.readdirSync("./extracted");

    //setup new eslint instance
    const eslint = new ESLint();

    var javaResults = new Map();
    var pythonResults = new Map();
    var phpResults = new Map();
    var totalErrors = 0;

    //process each file in zip folder with bandit or eslint (depending on file type)
    var zipFoldersPresent = 0;
    var atLeastOneValidFile = 0;
    async function analyzeFiles() {
      var nonCompliantFiles = 0;
      console.log("inside analyze Files");
      console.log(fileNamesInZipFolder.length);
      console.log(fileNamesInZipFolder);
      for (let i = 0; i < fileNamesInZipFolder.length; i++) {
        // If two files in the zip folder have the same name, the second one will not be added
        // Each file in a canvas download has a unique name, so this case is not accounted for
        if (hasJSFiles(fileNamesInZipFolder.at(i))) {
          atLeastOneValidFile = 1;
          console.log("adding java files!");
          javaResults.set(
            fileNamesInZipFolder.at(i),
            await eslint.lintFiles([
              "./extracted/" + fileNamesInZipFolder.at(i),
            ])
          );
        } else if (hasPyFiles(fileNamesInZipFolder.at(i))) {
          atLeastOneValidFile = 1;
          pythonResults.set(
            fileNamesInZipFolder.at(i),
            await Bandit.runBandit(
              "./extracted/" + fileNamesInZipFolder.at(i),
              true
            )
          );
        } 
        // else if (hasPHPFiles(fileNamesInZipFolder.at(i))) {
        //   console.log("adding php files!");
        //   phpResults.set(
        //     fileNamesInZipFolder.at(i),
        //     await Psalm.runPsalm(
        //       "./extracted/" + fileNamesInZipFolder.at(i),
        //       true
        //     )
        //   );
        // } 
        else {
          if (
            fileNamesInZipFolder
              .at(i)
              .substring(fileNamesInZipFolder.at(i).length - 4) == ".zip"
          ) {
            zipFoldersPresent = 1;
            continue;
          } else {
            nonCompliantFiles = -1;
          }
          console.log("noncompliant files or zip present!");
        }
      }

      return nonCompliantFiles;
    }

    var validFiles = await analyzeFiles();
    if (atLeastOneValidFile == 0) {
      res
        .status(200)
        .send(
          "ERROR: Zip Files contains NO .js or .py files - please check that you are not using more than 1 level of nested zip folders.  No results were logged in the database."
        );
      return;
    }

    console.log(pythonResults);
    console.log(javaResults);
    //console.log(phpResults);
    console.log("javaResults size: ");
    console.log(javaResults.size);
    //console.log("phpResults size: ");
    //console.log(phpResults.size);

    //add a record of the parsed zip file which includes:
    //name, data, owner (currently logged in user), filecount
    const fileCount = javaResults.size + pythonResults.size;
    console.log(fileCount);
    const zipFileRecord = await DAO.addZipFile(
      zipFileName,
      new Date(),
      req.session.username,

      fileCount, // num files tested (java + python + php

      javaResults.size,
      pythonResults.size,
      //phpResults.size
    );

    //add a student record from each file parsed in the zip
    //includes name, zipfolderID (mongo ID of ZipFile), severity score, file
    const studentNameandMongoID = new Map();
    await Promise.all(
      [...studentNames].map(async (studentName) =>
        studentNameandMongoID.set(
          studentName,
          (
            await DAO.addStudent(studentName, zipFileRecord._id)
          )._id
        )
      )
    );

    //This map is used to keep the scores of each student in an array
    //array is initially empty
    const listOfSeverityScoreFilesOwnedByStudents = new Map();
    studentNameandMongoID.forEach((value, key) => {
      listOfSeverityScoreFilesOwnedByStudents.set(value, []);
    });

    const results = new Array();
    const metrics = new Array();

    //this function will separate python reults into results array and metrics arrays
    pythonResults.forEach((value, key) => {
      const tempObj = JSON.parse(value.at(0));
      results.push(tempObj.results);
      metrics.push(tempObj.metrics);
    });

    console.log("metrics");
    console.log(metrics);

    console.log("results");
    console.log(results);

    const fileErrorsMap = new Map();
    let fileErrors = [];
    const fileErrorsMap2 = await Promise.all(
      results.map(async (result) => {
        //get numerical PYError type
        console.log("results length: " + result.length);

        if (result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            console.log(result.at(i).test_id.substring(1));
            totalErrors++;
            const currentErrorType = parseInt(
              result.at(i).test_id.substring(1)
            );
            console.log(
              "pyerror number: " + PYErrorTypes[currentErrorType]["Severity"]
            );
            console.log(
              currentErrorType,
              PYErrorTypes[currentErrorType]["Severity"],
              result.at(i).filename.substring(12),
              zipFileName,
              result.at(i).issue_text,
              result.at(i).issue_confidence,
              result.at(i).issue_severity,
              result.at(i).issue_cwe.link,
              result.at(i).line_number,
              result.at(i).line_range,
              result.at(i).test_name,
              result.at(i).test_id
            );

            //add Errors to database
            const error = await DAO.addPYError(
              currentErrorType,
              PYErrorTypes[currentErrorType]["Severity"],
              result.at(i).filename.substring(12),
              zipFileName,
              result.at(i).issue_text,
              result.at(i).issue_confidence,
              result.at(i).issue_severity,
              result.at(i).issue_cwe.link,
              result.at(i).line_number,
              result.at(i).line_range,
              result.at(i).test_name,
              result.at(i).test_id
            );

            //case: no errors for file yet recorded, so add it to map
            if (!fileErrorsMap.has(result.at(i).filename)) {
              fileErrors = []; // clear?
              fileErrors.push({ err: error, id: currentErrorType });
              fileErrorsMap.set(result.at(i).filename, fileErrors); //THIS IS USING FILENAME and not unique identifier
            } else {
              // file already in map - get filename associated fileErrors array and add error to it
              fileErrorsMap
                .get(result.at(i).filename)
                .push({ err: error, id: currentErrorType });
            }
          }
        }
        return fileErrorsMap;
      })
    );
    // Tracks sum of all file severities in folder
    var zipSeverity = 0;
    console.log(fileErrorsMap.size);
    if (fileErrorsMap.size > 0) {
      //connect errors to fileRecord

      for (let [key, value] of fileErrorsMap.entries()) {
        const severityScores = [];
        const PYerrors = [];
        await value.forEach((element) => {
          console.log(element.id);
          console.log(element.err);
          severityScores.push(PYErrorTypes[element.id]["Severity"]);

          PYerrors.push(element.err);
        });

        console.log("Severity Scores Map:");
        console.log(severityScores);
        const fileSeverity = severityScores.reduce(function (x, y) {
          return x + y;
        }, 0);
        zipSeverity += fileSeverity;
        console.log("file severity:");
        console.log(fileSeverity);
        var path1 = require("path");
        const relativePath = path1.basename(key);

        //Stores file on the database ?? not actually storing the file just name and length
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
          true,
          false,
          zipFileRecord._id
        );
        fileIDArray.push(fileRecord);
      }
    }
    console.log("relative path:");

    // ##### RUNS ESLINT ##### //
    console.log("START OF JAVA FILE PROCESSING");
    /**
     * Setup ESLINT and run on all the files in this folder. Uses eslint Node.js API function lintFiles to
     * do linting and return all relevant info in results object. Will check for rules identified in the config
     * file .eslintrc.js and in ErrorTypes.js. See .eslintrc.js file for additional comment.
     */

    const javaResultArray = new Array();
    javaResults.forEach((value, key) => {
      javaResultArray.push(value);
      console.log(value);
    });

    //Go tThrough ESlint detected errors
    await Promise.all(
      javaResultArray.map(async (result) => {
        console.log("Current file path and messages: ");
        console.log(result.at(0).filePath);
        console.log(result.at(0).messages);
        const relativePath = getRelativePath(result.at(0).filePath, false);

        const severityScores = [];

        //add Errors to database
        const errors = await Promise.all(
          result.at(0).messages.map((message) => {
            const currentErrorType = convertErrorIDToType(message.ruleId);
            totalErrors++;
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

        // Sums severityScores array to get total severity of all errors in file and updates zip file sev total
        const fileSeverity = severityScores.reduce(function (x, y) {
          return x + y;
        }, 0);
        zipSeverity += fileSeverity;

        //Stores file on the database
        const fileRecord = await DAO.addFile(
          relativePath,
          result.at(0).errorCount,
          result.at(0).fatalErrorCount,
          result.at(0).warningCount,
          result.at(0).fixableErrorCount,
          result.at(0).fixableWarningCount,
          result.at(0).source,
          errors,
          null,
          fileSeverity,
          false,
          true,
          zipFileRecord._id
        );
        fileIDArray.push(fileRecord);
      })
    );


    //error count, severity score for metrics page - SEVERITY SCORE CHANGE FROM 0 HERE!
    await DAO.updateZipFile(
      zipFileRecord._id,
      parseInt(totalErrors),
      zipSeverity
    );
    await DAO.updateZipFilesArray(zipFileRecord._id, fileIDArray);
    fsExtra.emptyDirSync("./extracted");
    if (atLeastOneValidFile == 0) {
      res
        .status(200)
        .send(
          "WARNING: There were no .js or .py files detected in the uploaded .zip folder.  The application will check ONE (1) level deep for nested zip folders, but any beyond this will not be detected properly.  Please check your file to ensure compliance with this format."
        );
    } else if (validFiles == -1 && zipFoldersPresent == 1) {
      res
        .status(200)
        .send(
          "WARNING: There were some files present in the uploaded .zip file that are not .js or .py, but any valid files were processed.  WARNING: nested zip folder(s) detected!  This application will process ONE (1) layer of nested zip files, but NOT beyond that.  Please ensure your uploaded folder structure is compliant as any further nested files will be ignored."
        );
    } else if (validFiles == -1 && zipFoldersPresent == 0) {
      res
        .status(200)
        .send(
          "WARNING: There were some files present in the uploaded .zip file that are not .js or .py, but any valid files were processed"
        );
    } else if (validFiles == 0 && zipFoldersPresent == 1) {
      res
        .status(200)
        .send(
          "WARNING: nested zip folder(s) detected!  This application will process ONE (1) layer of nexted zip files, but NOT beyond that.  Please ensure your uploaded folder structure is compliant as any further nested files will be ignored."
        );
    } else {
      res
        .status(200)
        .send(
          "All files processed were of type .js or .py!  Upload was successful!"
        );
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
      for (let j = 0; j < file.Files.length; j++) {
        files.push(file.Files[j]);
      }
    }

    const map = new Map();
    const pyMap = new Map();
    //  const phpMap = new Map();
    var numJSErrors = 0;
    var numPYErrors = 0;
    //  var numPHPErrors = 0;
    var numJSFiles = 0;
    var numPYFiles = 0;
    //  var numPHPFiles = 0;
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
      // if (file.phpErrors) {
      //   numPHPFiles++;
      //   file.phpErrors.forEach((err) => {
      //     numPHPErrors++;
      //     if (phpMap.has(err.ErrorType.Name)) {
      //       var newObj = phpMap.get(err.ErrorType.Name);
      //       newObj.frequency++;
      //       phpMap.set(err.ErrorType.Name, newObj);
      //     } else {
      //       var newObj = {
      //         Name: err.ErrorType.Name,
      //         Description: '"' + err.ErrorType.Description + '"',
      //         Severity: err.ErrorType.Severity,
      //         frequency: 1,
      //       };
      //       phpMap.set(err.ErrorType.Name, newObj);
      //     }
      //   });
      // }
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
    if (numPYErrors == 0 && numJSErrors == 0) {
      response +=
        "There are no errors to report within the selected files!  This is most certainly the result of excellent teaching!\n";
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

app.get("/PHPErrorTypes", async (req, res) => {
  if (req.session.username) {
    res
      .status(200)
      .json(PHPErrorTypeDetail.ReturnPHPErrorTypeInformation(req.query.id));
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

app.get("/PHPErrorIDs", async (req, res) => {
  if (req.session.username) {
    res.status(200).json(PHPErrorTypeDetail.getPHPErrorIDs());
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
