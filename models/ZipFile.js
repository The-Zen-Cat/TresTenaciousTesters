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
  Students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

exports.Model = mongoose.model("ZipFolder", Schema);
