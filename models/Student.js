const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  StudentID: String,
  ZipFolderID: String,
  SeverityScore: Number,
  Files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
  ],
});

exports.Model = mongoose.model("Student", Schema);
