const mongoose = require("mongoose");

/** This file creates a Mongoose schema and model. MongoDB holds JSON files or documents with potentially different 
 * structures in collections. A schema imposes a structure on the JSON documents and the model is a constructor
 * that takes in the schema and creates an instance of the document according to the schema. So the last line of 
 * this file exports a model called "File", which is used in DAO.js line 42. More broadly, the model is an
 * interface the database can use to create, delete, update, and query documents. The same thing is being done in
 * all the files in the models folder, except ErrorTypes.js and PYErrorTypes.js
 */

const Schema = new mongoose.Schema({
	Name: String,
	ErrorCount: Number,
	FatalErrorCount: Number,
	WarningCount: Number,
	FixableErrorCount: Number,
	FixableWarningCount: Number,
	Source: String,
	SeverityScore: Number,
	ParentZipFileId: mongoose.Schema.Types.ObjectId,
	Errors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Error",
		},
	],
	PyErrors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "PYError",
		},
	],
	isPyFile: Boolean
});

exports.Model = mongoose.model("File", Schema);
