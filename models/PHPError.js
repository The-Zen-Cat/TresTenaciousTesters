const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	ErrorType: Number,
	RuleID: Number,
	Severity: Number,
	Message: String,
	Line: Number,
	Column: Number,
	NodeType: String,
	MessageId: String,
	EndLine: Number,
	EndColumn: Number
});

exports.Model = mongoose.model("PHPError", Schema);
