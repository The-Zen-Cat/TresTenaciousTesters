const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  Name: String,
  Date: Date,
  Owner: String,
  ErrorCount: Number,
  SeverityScore: Number,
  FileCount: Number,
  FileCountJava: Number,
  FileCountPython: Number,
  Files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

exports.Model = mongoose.model("ZipFolder", Schema);
