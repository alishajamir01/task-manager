$(document).ready(function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    $("#taskList").empty();
    tasks.forEach((task, index) => {
      $("#taskList").append(`
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span class="task-text" data-index="${index}">${task}</span>
          <div>
            <button class="btn btn-sm btn-warning me-2 editBtn" data-index="${index}">Edit</button>
            <button class="btn btn-sm btn-danger deleteBtn" data-index="${index}">Delete</button>
          </div>
        </li>
      `);
    });
  }

  $("#addTaskBtn").click(function () {
    const newTask = $("#taskInput").val().trim();
    if (newTask !== "") {
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      $("#taskInput").val("");
    }
  });

  $(document).on("click", ".deleteBtn", function () {
    const index = $(this).data("index");
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  });

  $(document).on("click", ".editBtn", function () {
    const index = $(this).data("index");
    const newText = prompt("Edit your task:", tasks[index]);
    if (newText !== null && newText.trim() !== "") {
      tasks[index] = newText.trim();
      saveTasks();
      renderTasks();
    }
  });

  renderTasks();
});
