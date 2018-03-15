const express = require("express"),
	  app = express(),
	  port = process.env.PORT || 3000,
	  mongoose = require("mongoose"),
	  Task = require("./api/models/todoListModel"),
	  bodyParser = require("body-parser")

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/Tododb")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static("client"))

app.get("/", function(req, res) {
	res.sendFile(__dirname + "/client/index.html")
})

const routes = require("./api/routes/todoListRoutes")
routes(app)

app.listen(port)

console.log("Todo List RESTful API server started on port " + port)
