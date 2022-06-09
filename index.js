window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const listEl = document.querySelector("#tasks");
  const storage = window.localStorage;
  const saveAllTasks = document.querySelector("#all-tasks-save");
  const deleteTasksHistory = document.querySelector("#all-tasks-delete");

  let save = {};

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    if (!task) {
      alert("Please add a task!");
    }

    const taskEl = document.createElement("div");
    taskEl.classList.add("task");

    const taskContentEl = document.createElement("div");
    taskContentEl.classList.add("content");

    taskEl.appendChild(taskContentEl);

    const taskInputEl = document.createElement("input");
    taskInputEl.classList.add("text");
    taskInputEl.type = "text";
    taskInputEl.value = task;
    taskInputEl.setAttribute("readonly", "readonly");

    taskContentEl.appendChild(taskInputEl);

    const taskActionsEl = document.createElement("div");
    taskActionsEl.classList.add("actions");

    const taskEditEl = document.createElement("button");
    taskEditEl.classList.add("edit");
    taskEditEl.innerHTML = "Edit";

    const taskDeleteEl = document.createElement("button");
    taskDeleteEl.classList.add("delete");
    taskDeleteEl.innerHTML = "Delete";

    taskActionsEl.appendChild(taskEditEl);
    taskActionsEl.appendChild(taskDeleteEl);

    taskEl.appendChild(taskActionsEl);

    listEl.appendChild(taskEl);

    input.value = "";

    taskEditEl.addEventListener("click", () => {
      if (taskEditEl.innerText.toLowerCase() == "edit") {
        taskInputEl.removeAttribute("readonly");
        taskInputEl.focus();
        taskEditEl.innerText = "Save";
      } else {
        taskInputEl.setAttribute("readonly", "readonly");
        taskEditEl.innerText = "Edit";
      }
    });

    taskDeleteEl.addEventListener("click", () => {
      listEl.removeChild(taskEl);
    });
  });

  // Needs fixing cause it doesnt work at the moment
  function load() {
    if (storage.getItem(save)) {
      save = JSON.parse(storage.getItem("save"));
      console.log("Save found:", save);
      listEl.innerHTML = save.count;
    } else {
      save.count = 0;
      console.log("save not found");
      listEl.innerHTML = null;
    }
  }

  load();

  saveAllTasks.addEventListener("click", () => {
    storage.setItem("save", JSON.stringify(save));
  });

  deleteTasksHistory.addEventListener("click", () => {
    storage.removeItem("save");
  });
});
