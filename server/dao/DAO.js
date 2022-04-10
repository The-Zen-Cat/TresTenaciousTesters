const Student = require("../models/Student.js").Model;
const ZipFile = require("../models/ZipFile.js").Model;
const File = require("../models/File.js").Model;
const Error = require("../models/Error.js").Model;
const ErrorList = require("../models/ErrorTypes.js").ErrorList;

exports.getStudent = async (id) => {
	return Student.find();
};
// exports.getZipFile = async (id) => {
// 	return ZipFile.find();
// };
exports.getFile = async (id) => {
	return File.find();
};
exports.addStudent = async (Name, ZipFolderID) => {
	return await Student.create({ Name, ZipFolderID, Files: [] });
};
exports.addZipFile = async (Name, Date, FileCount) => {
	return await ZipFile.create({ Name, Date, FileCount });
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

exports.addFile = async (
	Name,
	ErrorCount,
	FatalErrorCount,
	WarningCount,
	FixableErrorCount,
	FixableWarningCount,
	Source,
	Errors,
	SeverityScore
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
		SeverityScore,
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

exports.updateStudent = async (StudentID, SeverityScore) => {
	await Student.findById(StudentID).updateOne({ SeverityScore });
};

exports.getZipFile = async (id) => {
	const zipFile = await ZipFile.findById(id)
		.lean()
		.populate({
			path: "Students",
			populate: {
				path: "Files",
				model: "File",
				populate: { path: "Errors", model: "Error" },
			},
		});

	zipFile.Students.forEach((student, i) => {
		student.Files.forEach((file, j) => {
			file.Errors.forEach((error, k) => {
				console.log(error);
				const updatedError = {
					ErrorType: ErrorList[error["ErrorType"]],
					Line: error.Line,
					Column: error.Column,
					NodeType: error.NodeType,
					MessageId: error.MessageId,
					EndLine: error.EndLine,
					EndColumn: error.EndColumn,
				};
				// console.log(updatedError);

				zipFile.Students[i].Files[j].Errors[k] = updatedError;
			});
		});
	});
	return zipFile;
};

exports.getAllZipFiles = async () => {
	return await ZipFile.find({}).exec();
};
exports.getAllStudentFiles = async () => {
	return await Student.find({}).exec();
};
exports.deleteZipFolder= async (zipFolderID) => {
	console.log("database deleter here!")
	const zipFile = await ZipFile.findById(zipFolderID)
	.lean()
	.populate({
		path: "Students",
		populate: {
			path: "Files",
			model: "File",
			populate: { path: "Errors", model: "Error" },
		},
	});
	console.log("database deleter: I found the zipfile")
	zipFile.Students.forEach((student, i) => {
		student.Files.forEach((file, j) => {
			file.Errors.forEach((error, k) => {
                Error.deleteOne({id: error._id}).exec();
			});
			File.deleteOne({id: file._id}).exec();
		});
		Student.deleteOne({id: student._id}).exec();
	});
	ZipFile.deleteOne({id: zipFile._id}).exec();
	console.log("database deleter: I deleted everything I am out Peace")
};
exports.clearDatabase= async () => {
	ZipFile.deleteMany({}, callback)
	Student.deleteMany({}, callback)
	File.deleteMany({}, callback)
	Error.deleteMany({}, callback)
};