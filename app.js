const add_todo_btn = document.querySelector("#input_todo > div:nth-of-type(2) button")

document.addEventListener("DOMContentLoaded",loadTodos)

add_todo_btn.addEventListener("click",addTodo);

var todos = []
var done_todos = []

function isBlank(str){
    return (str.trim() == "");
}

function sortTodos(){
    console.log(todos)
    return todos
}
function addTodo(evt){
    const task_name = document.querySelector("#user_input > input:nth-of-type(1)")
    const task_time = document.querySelector("#user_input > input:nth-of-type(2)")

    if (isBlank(task_name.value) || task_time.value == ""){
        return
    }

    let todo_list = document.querySelector("#todo_list")
    /*

*/
    let todo = {name:task_name.value,time:task_time.value};

    todos = sortTodos(todos);

    return 
    todos.forEach((todo)=>{
        const todo_item = document.createElement("div")
        todo_item.setAttribute("class","todo_item")
        todo_item.innerHTML = `
            <input type="text" disabled value="${todo['name']}"></input>
            <input type="text" disabled value="${todo['time']}")></input>
            <button onclick=updateTodo(this)>Update</button>
            <button onclick=deleteTodo(this)>Delete</button>
        `
        todo_list.appendChild(todo_item);
    })

    localStorage.setItem("todos",JSON.stringify(todos))

}


function updateTodo(evt){
    const todo_item_name = evt.parentElement.children[0]
    const todo_item_time = evt.parentElement.children[1]
    let task_name = document.querySelector("#user_input > input:nth-of-type(1)")
    let task_time = document.querySelector("#user_input > input:nth-of-type(2)")
    task_name.value = `${todo_item_name.value}`
    task_time.value = `${todo_item_time.value}` 
    todo_item_name.parentElement.remove()

}


function deleteTodo(evt){
    evt.parentNode.remove()
}

function loadTodos(evt){
    if (localStorage.getItem("todos") != null)
    {
        todos = localStorage.getItem("todos")
    }
    else{
        todos = []
    }
    console.log(todos)
        
}