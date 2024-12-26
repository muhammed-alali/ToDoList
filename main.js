let addTasksInput = document.getElementById("addTasks");
let Send = document.getElementById("send");
let ShowElement = document.querySelector(".Tasks");
let deleteAll = document.querySelector("#deleteAll");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

getDatafromLocalStorage();

Send.onclick = function () {
  if (addTasksInput.value != "") {
    let tasksObject = {
      task: addTasksInput.value,
    };

    tasks.push(tasksObject);
    addTasksToLocalStoric(tasks);
    addTasksInput.value = ""; // Move this inside the if condition
    showTasks();
  } else {
    alert("Please fill out this fields");
  }
};

function showTasks() {
  let show = "";
  for (let i = 0; i < tasks.length; i++) {
    show += `
    <div class="containerTask">
      <div class="task">${tasks[i].task}</div>
      <div class="deletandTrue">
        <div class="trueOrFalse" onclick="Mode(${i})"><i class="fa-regular fa-pen-to-square"></i></div>
        <button class="delet" onclick="Delete(${i})">delet</button>
      </div>
    </div>
    `;
  }
  ShowElement.innerHTML = show;
}

showTasks();

function addTasksToLocalStoric(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getDatafromLocalStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data); // Update the outer tasks array
  }
}

function Delete(i) {
  tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function Mode(i) {
  let trueOrFalse = document.querySelectorAll(".trueOrFalse");
  trueOrFalse[i].classList.remove("trueOrFalse");
  trueOrFalse[i].classList.add("trueOrFalseActiv");
  trueOrFalse[i].innerHTML = "<i class='fa-solid fa-check'></i>";
  console.log(tasks[i].task);
}

deleteAll.onclick = function () {
  localStorage.clear();
  tasks = []; // Clear the tasks array
  showTasks();
  location.reload();
};
