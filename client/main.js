var statusOptions = ["pending", "ongoing", "completed"];

var list = document.getElementById("list");
var addBtn = document.getElementById("add_btn");

reload();

addBtn.addEventListener("click", addTask);

// reload page content
function reload() {
	get("/tasks", display);
}

// given an array of tasks, reset the list
function display(tasks) {
	list.innerHTML = "";

	for(var i = 0; i < tasks.length; i++) {
		list.appendChild(item(tasks[i]));
	}
}

// create div with task's information
function item(task) {
	var div = document.createElement("div");

	// name div
	var textDiv = document.createElement("div");
	var text = document.createElement("span");
	text.innerHTML = task.name;
	textDiv.appendChild(text);

	// status div
	var selectDiv = document.createElement("div");
	var select = document.createElement("select");
	for(var i = 0; i < statusOptions.length; i++) {
		var option = document.createElement("option");
		option.value = statusOptions[i];
		option.text = statusOptions[i];
		select.appendChild(option);
	}
	select.value = task.status;
	select.addEventListener("change", function() {
		updateStatus(task, select.value);
	});
	selectDiv.appendChild(select);

	// delete div
	var buttonDiv = document.createElement("div");
	var button = document.createElement("button");
	button.innerHTML = "Delete";
	buttonDiv.appendChild(button);

	div.appendChild(textDiv);
	div.appendChild(selectDiv);
	div.appendChild(buttonDiv);

	button.addEventListener("click", function() {
		deleteTask(task);
	});

	return div;
}

// prompt user for a task name, add it to the DB, and reload
function addTask() {
	var name = prompt("Enter a new task name");
	post("/tasks", {name: name}, function(task) {
		console.log("Added: " + JSON.stringify(task));
		reload();
	});
}

function updateStatus(task, status) {
	task.status = status;
	put("/tasks/" + task._id, task, function() {
		reload();
	});
}

function deleteTask(task) {
	del("/tasks/" + task._id, {}, function() {
		reload();
	});
}



// HTTP METHODS
function get(route, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", route);
	xhr.onload = function() {
		if(xhr.status == 200) {
			var result = JSON.parse(xhr.responseText);
			callback(result);
		}
		else {
			console.log("Error " + xhr.status);
		}
	}

	xhr.send();
}

function post(route, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", route, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.onload = function() {
		if(xhr.status == 200) {
			var result = JSON.parse(xhr.responseText);
			callback(result);
		}
		else {
			console.log("Error " + xhr.status);
		}
	}

	xhr.send(JSON.stringify(data));
}

function del(route, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", route, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.onload = function() {
		if(xhr.status == 200) {
			var result = JSON.parse(xhr.responseText);
			callback(result);
		}
		else {
			console.log("Error " + xhr.status);
		}
	}

	xhr.send(JSON.stringify(data));
}

function put(route, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("PUT", route, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.onload = function() {
		if(xhr.status == 200) {
			var result = JSON.parse(xhr.responseText);
			callback(result);
		}
		else {
			console.log("Error " + xhr.status);
		}
	}

	xhr.send(JSON.stringify(data));
}