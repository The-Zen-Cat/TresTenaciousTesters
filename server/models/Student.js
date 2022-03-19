const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	Name: String,
	Files: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "File",
		},
	],
});

exports.Model = mongoose.model("Student", Schema);
