'use strict'
const mongoose = require("mongoose"),
	  Schema = mongoose.Schema

const TaskSchema = new Schema({
	name: {
		type: String,
		required: "Please enter a task name."
	},
	created_date: {
		type: Date,
		default: Date.now
	},
	status: {
		type: [{
			type: String,
			enum: ["pending", "ongoing", "completed"]
		}],
		default: ["pending"]
	}
})

module.exports = mongoose.model("Tasks", TaskSchema)