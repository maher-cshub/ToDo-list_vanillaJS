function saveTodo(task) {
  let stored_todos = JSON.parse(localStorage.getItem("todos"));
  if (stored_todos != null) {
    stored_todos.push(task);

    localStorage.setItem("todos", JSON.stringify(stored_todos));
    return stored_todos.length - 1;
  } else {
    localStorage.setItem("todos", JSON.stringify([task]));
    return 0;
  }
}

function setTodo(task, position) {
  const done_list = document.getElementById("done_list");
  const task_name = document.createElement("span");
  const task_item = document.createElement("li");
  const task_action = document.createElement("div");
  const task_delete_btn = document.createElement("button");
  const task_edit_btn = document.createElement("button");

  task_delete_btn.innerHTML = "DELETE";
  task_delete_btn.addEventListener("click", deleteTodo);
  task_edit_btn.innerHTML = "EDIT";
  task_edit_btn.addEventListener("click", editTodo);
  task_action.appendChild(task_delete_btn);
  task_action.appendChild(task_edit_btn);
  task_item.setAttribute("id", "todo_item");
  task_name.innerHTML = task;
  task_item.append(task_name, task_action);
  task_item.setAttribute("todo_id", position);
  done_list.appendChild(task_item);
}

function addTodo(task) {
  const done_list = document.getElementById("done_list");
  const task_name = document.createElement("span");
  const task_item = document.createElement("li");
  const task_action = document.createElement("div");
  const task_delete_btn = document.createElement("button");
  const task_edit_btn = document.createElement("button");

  task_delete_btn.innerHTML = "DELETE";
  task_delete_btn.addEventListener("click", deleteTodo);
  task_edit_btn.innerHTML = "EDIT";
  task_edit_btn.addEventListener("click", editTodo);
  task_action.appendChild(task_delete_btn);
  task_action.appendChild(task_edit_btn);
  task_item.setAttribute("id", "todo_item");
  task_name.innerHTML = task;
  task_item.append(task_name, task_action);

  //save to local storage
  const position = saveTodo(task);
  task_item.setAttribute("todo_id", position);
  done_list.appendChild(task_item);
  return;
}

function deleteTodo(e) {
  const task2delete = e.target.parentElement.parentElement;
  const task_id = task2delete.getAttribute("todo_id");
  task2delete.remove();
  let stored_todos = JSON.parse(localStorage.getItem("todos"));
  stored_todos.splice(task_id, 1);
  localStorage.setItem("todos", stored_todos);
  return;
}

function editTodo(task) {
  return;
}

function fetchTodos() {
  let stored_todos = JSON.parse(localStorage.getItem("todos"));
  const done_list = document.getElementById("done_list");
  done_list.innerHTML = "";
  if (stored_todos != null) {
    stored_todos.forEach((todo, pos) => {
      setTodo(todo, pos);
    });
  }
}

const add_todo_btn = document.getElementById("add_todo_btn");

add_todo_btn.addEventListener("click", (e) => {
  const new_todo = document.querySelector("#user_input input");
  addTodo(new_todo.value);
});

fetchTodos();
