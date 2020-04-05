//Define all UI  variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const ClearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//loading all Event Listners
loadEventListener();

function createlist() {
  //create li Element
  const li = document.createElement("li");
  li.className = "collection-item";

  //create a textnode and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  //create link Element
  const link = document.createElement("a");
  //add a className
  link.className = "delete-item secondary-content";

  //Add icon to html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //apend link to li
  li.appendChild(link);
  taskList.appendChild(li);
}

//Defining loadEventListner function
function loadEventListener() {
  //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);

  //Remove Task lists
  taskList.addEventListener("click", removeTask);
  //Clear Task Events
  ClearBtn.addEventListener("click", clearTask);
  //filter Tasks
  filter.addEventListener("keyup", filterTask);
}
//defining the addTask function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Please enter a value");
  }
  createlist();

  //implementing local storage
  storeTaskinLocalStorage(taskInput.value);

  taskInput.value = "";
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure YOu want to delete this Task?")) {
      e.target.parentElement.parentElement.remove();

      //Remove from local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function clearTask(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //clear Local Storage

  clearTasksFromStorage();
}

function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeTaskinLocalStorage(taskvalue) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(taskvalue);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "collection-item";

    //create a textnode and append to the li
    li.appendChild(document.createTextNode(task));

    //create link Element
    const link = document.createElement("a");
    //add a className
    link.className = "delete-item secondary-content";

    //Add icon to html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //apend link to li
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (item, index) {
    if (taskItem.textContent === item) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasksFromStorage() {
  localStorage.clear();
}
