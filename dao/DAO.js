/* eslint-disable security-node/detect-crlf */
const { PYErrorList } = require("../models/PYErrorTypes.js");

const User = require("../models/User.js").Model;
const Student = require("../models/Student.js").Model;
const ZipFile = require("../models/ZipFile.js").Model;
const File = require("../models/File.js").Model;
const Error = require("../models/JSError.js").Model;
const PYError = require("../models/PYError.js").Model;
const PHPError = require("../models/PHPError.js").Model;
const ErrorList = require("../models/ErrorTypes.js").ErrorList;
const PHPErrorList = require("../models/PHPErrorTypes.js").ErrorList;
// const PYErrorList = require("../models/PYErrorTypes.js").PYErrorList;

exports.getUser = async (username) => {
  return User.findOne({
    Username: username,
    googleId: null,
    facebookId: null,
  }).exec();
};

exports.getStudent = async (id) => {
  return Student.find();
};

//exports.findFacebookUser = async (id) => {
//	return User.findOne({facebookId: id});
//};

//exports.findGoogleUser = async (id) => {
//	return User.findOne({googleId: id});
//};

exports.getUserById = async (id) => {
  return User.findById(id);
};

//exports.addFacebookUser = async (id, name) => {
//	return await User.create({ Username: name, facebookId: id, Admin: false });
//};

//exports.addGoogleUser = async (id, name) => {
//	return await User.create({ Username: name, googleId: id, Admin: false });
//};

/*
 The .lean option tells Mongoose to skip instantiating a full document in response to the find call, and instead
 return a smaller "plain old JS object" (POJO) to speed things up. There are downsides to this, but most of them
 seem to be relevant if you're changing the record/document, which I don't think should happen in this case.
 
 As far as I can tell, they are using .populate to do cross database population, which you would need to do if the
 Files and the Errors were stored in different databases. The File schema has an Errors 
 propery tracking all the errors for that file, and I think this call to populate fills in the object with 
 all the errors found in it based on the Error model. At some point, the code in main.py under Bandit must run. This
 code looks like it's making command line calls to Bandit and passing in lists of files. The output is then picked
 up somewhere and put into a separate database and associated with the file name. If that's all working as I think
 it might be, this getFile command uses cross database population to grab the info.
 
 See File.js for where Errors is defined as a doc property.
 */

exports.getFile = async (id) => {
  return File.find().lean().populate({
    path: "Errors",
    model: "Error",
  });
};

exports.addUser = async (Username, Hash, Admin) => {
  if (Admin) {
    return await User.create({ Username: Username, Hash: Hash, Admin: true });
  } else {
    return await User.create({ Username: Username, Hash: Hash, Admin: false });
  }
};
exports.addStudent = async (StudentID, ZipFolderID, SeverityScore, Files) => {
  return await Student.create({ StudentID, ZipFolderID, SeverityScore, Files });
};
exports.addZipFile = async (
  Name,
  Date,
  Owner,
  FileCount,
  FileCountJava,
  FileCountPython,
  FileCountPhp
) => {
  return await ZipFile.create({
    Name,
    Date,
    Owner,
    FileCount,
    FileCountJava,
    FileCountPython,
    FileCountPhp,
  });
};

exports.addError = async (
  ErrorType,
  RuleID,
  Severity,
  Message,
  Line,
  Column,
  NodeType,
  MessageId,
  EndLine,
  EndColumn
) => {
  const error = await Error.create({
    ErrorType,
    Severity,
    Message,
    Line,
    Column,
    NodeType,
    MessageId,
    EndLine,
    EndColumn,
  });
  return error._id;
};

exports.addPYError = async (
  ErrorType,
  Severity,
  Filename,
  ZipFileName,
  Message,
  Confidence,
  SeverityText,
  CweLink,
  LineNumber,
  LineRange,
  TestName,
  TestID
) => {
  const PYerror = await PYError.create({
    ErrorType,
    Severity,
    Filename,
    ZipFileName,
    Message,
    Confidence,
    SeverityText,
    CweLink,
    LineNumber,
    LineRange,
    TestName,
    TestID,
  });
  return PYerror._id;
};

exports.addPHPError = async (
  ErrorType,
  RuleID,
  Severity,
  Message,
  Line,
  Column,
  NodeType,
  MessageId,
  EndLine,
  EndColumn
) => {
  const error = await PHPError.create({
    ErrorType,
    Severity,
    Message,
    Line,
    Column,
    NodeType,
    MessageId,
    EndLine,
    EndColumn,
  });
  return PHPerror._id;
};

exports.addFile = async (
  Name,
  ErrorCount,
  FatalErrorCount,
  WarningCount,
  FixableErrorCount,
  FixableWarningCount,
  Source,
  Errors,
  PyErrors,
  PhpErrors,
  SeverityScore,
  isPyFile,
  isJavaFile,
  isPhpFile,
  parentZipFileID
) => {
  return await File.create({
    Name,
    ErrorCount,
    FatalErrorCount,
    WarningCount,
    FixableErrorCount,
    FixableWarningCount,
    Source,
    Errors,
    PyErrors,
    PhpErrors,
    SeverityScore,
    isPyFile,
    isJavaFile,
    isPhpFile,
    parentZipFileID,
  });
};

exports.addFileToStudent = async (StudentId, FileID) => {
  // (await ZipFile.findById(StudentId)).Files.push(FileID).save();

  return await Student.updateOne(
    { _id: StudentId },
    {
      $push: {
        Files: FileID,
      },
    }
  );
};
exports.addStudentsToZipFile = async (ZipFileId, Students) => {
  //https://docs.mongodb.com/mongodb-shell/crud/update/
  return await ZipFile.updateOne(
    { _id: ZipFileId },
    {
      $set: {
        Students: Students,
      },
    }
  );
};

exports.updateZipFile = async (ZipFileID, ErrorCount, SeverityScore) => {
  await ZipFile.findById(ZipFileID).updateOne({ ErrorCount, SeverityScore });
};

exports.updateZipFilesArray = async (ZipFileID, Files) => {
  await ZipFile.findById(ZipFileID).updateOne({ Files });
};

exports.updateStudent = async (StudentID, SeverityScore) => {
  await Student.findById(StudentID).updateOne({ SeverityScore });
};

exports.getZipFile = async (id) => {
  const zipFile = await ZipFile.findById(id)
    .lean()
    .populate({
      path: "Files",
      model: "File",
      populate: [
        { path: "Errors", model: "Error" },
        { path: "PyErrors", model: "PYError" },
        { path: "PhpErrors", model: "PHPError" },
      ],
    });
  console.log("hello world");
  console.log(zipFile);
  if (zipFile != null) {
    zipFile.Files.forEach((file, i) => {
      if (file.Errors) {
        file.Errors.forEach((error, k) => {
          const updatedError = {
            ErrorType: ErrorList[error["ErrorType"]],
            Line: error.Line,
            Column: error.Column,
            NodeType: error.NodeType,
            MessageId: error.MessageId,
            EndLine: error.EndLine,
            EndColumn: error.EndColumn,
          };
          zipFile.Files[i].Errors[k] = updatedError;
        });
      }
      if (file.PyErrors) {
        file.PyErrors.forEach((error, k) => {
          const updatedError = {
            ErrorType: PYErrorList[error["ErrorType"]],
            Line: error.LineNumber,
            Message: error.Message,
          };
          zipFile.Files[i].PyErrors[k] = updatedError;
        });
      }
      if (file.PhpErrors) {
        file.PhpErrors.forEach((error, k) => {
          const updatedError = {
            ErrorType: PHPErrorList[error["ErrorType"]],
            Line: error.LineNumber,
            Message: error.Message,
          };
          zipFile.Files[i].PhpErrors[k] = updatedError;
        });
      }
    });
  }
  return zipFile;
};

exports.getZipFileRaw = async (id) => {
  return await ZipFile.findById(id)
    .lean()
    .populate({
      path: "Students",
      populate: {
        path: "Files",
        model: "File",
        populate: { path: "Errors", model: "Error" },
      },
    });
};

exports.getZipFiles = async (owner) => {
  if (owner) {
    return await ZipFile.find({ Owner: owner }).exec();
  } else {
    return await ZipFile.find({}).exec();
  }
};
exports.getAllStudentFiles = async () => {
  return await Student.find({}).exec();
};
exports.deleteZipFolder = async (zipFolderID) => {
  const zipFile = await ZipFile.findById(zipFolderID)
    .lean()
    .populate({
      path: "Files",
      model: "File",
      populate: { path: "Errors", model: "Error" },
    });
  console.log(zipFile);
  zipFile.Files.forEach(async (file, j) => {
    if (file.isJavaFile == true) {
      file.Errors.forEach(async (error, k) => {
        await Error.deleteOne({ id: error._id }).exec();
      });
    }
    if (file.isPyFile == true) {
      file.PyErrors.forEach(async (error, k) => {
        await Error.deleteOne({ id: error._id }).exec();
      });
    }
    await File.deleteOne({ id: file._id }).exec();
  });
  console.log("final delete stage: zip file id : " + zipFile._id);
  await ZipFile.deleteOne({ _id: zipFile._id }).exec();
};

exports.clearDatabase = async () => {
  await ZipFile.deleteMany();
  await Student.deleteMany();
  await File.deleteMany();
  await Error.deleteMany();
};
