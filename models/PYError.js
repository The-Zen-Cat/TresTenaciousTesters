const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  ErrorType: Number,
  Severity: Number,
  FileName: String,
  ZipFileName: String,
  Message: String,
  Confidence: String,
  SeverityText: String,
  CweLink: String,
  LineNumber: Number,
  LineRange: [Number],
  TestName: String,
  TestID: String,
});

exports.Model = mongoose.model("PYError", Schema);
