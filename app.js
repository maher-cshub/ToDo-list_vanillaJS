const add_todo_btn = document.querySelector("#input_todo > div:nth-of-type(2) button")
const done_todos_section = document.querySelector("#done_list > div:nth-of-type(2)")

document.addEventListener("DOMContentLoaded",loadTodos)

add_todo_btn.addEventListener("click",addTodo);

var todos = []
var done_todos = []
var TODAY = new Date()
let today_date = TODAY.toISOString().split("T")[0]

function isBlank(str){
    return (str.trim() == "");
}

function sortTodos(todos_list){
    todos_list = todos_list.sort((a,b)=>{
        let a_time = (a["time"]).replace(":",'')
        let b_time = (b["time"]).replace(":",'')
        if (parseInt(a_time) < parseInt(b_time)){
            return -1
        }
        else{
            return 1
        }
    })
    return todos_list
}

function completeTodo(evt){

}

function addTodo_DOM(todos_list){
    let todo_list = document.querySelector("#todo_list")
    todo_list.innerHTML =""
    todos_list.forEach((todo)=>{
        const todo_item = document.createElement("div")
        todo_item.setAttribute("class","todo_item")
        todo_item.setAttribute("todo_id",`${todo["todo_id"]}`)
        todo_item.setAttribute("status",`${todo["status"]}`)
        todo_item.innerHTML = `
            <input type="text" disabled value="${todo['name']}"></input>
            <input type="text" disabled value="${todo['time']}")></input>
            <button onclick=updateTodo(this)>Update</button>
            <button onclick=deleteTodo(this)>Delete</button>
        `
        todo_list.appendChild(todo_item);
    })
    let todo_items = document.getElementsByClassName("todo_item")
    console.log(todo_items)
    todo_items.forEach((item)=>{
        item.addEventListener("click",completeTodo)
    })
}

function addDone_DOM(done_list){
    done_todos_section.innerHTML = ""
    done_list.forEach((item)=>{
        done_item = document.createElement("span")
        done_item.setAttribute("status",`${item["status"]}`)
        done_item.innerHTML =`${item["name"]}`
        done_todos_section.appendChild(done_item)
    })

}

function deleteTodo_DOM(item_id){
    todos = todos.filter(item => {

        return item["todo_id"] != item_id
    })
    addTodo_DOM(todos)
    localStorage.setItem("todos",JSON.stringify(todos))
}


function addTodo(evt){
    const task_name = document.querySelector("#user_input > input:nth-of-type(1)")
    const task_time = document.querySelector("#user_input > input:nth-of-type(2)")

    if (isBlank(task_name.value) || task_time.value == ""){
        return
    }

    let todo = {todo_id:Date.now(),name:task_name.value,time:task_time.value,status:"incomplete"};

    todos.push(todo)

    todos = sortTodos(todos);

    addTodo_DOM(todos)

    localStorage.setItem("todos",JSON.stringify(todos))

}


function updateTodo(evt){
    const todo_item_name = evt.parentElement.children[0]
    const todo_item_time = evt.parentElement.children[1]
    let task_name = document.querySelector("#user_input > input:nth-of-type(1)")
    let task_time = document.querySelector("#user_input > input:nth-of-type(2)")
    task_name.value = `${todo_item_name.value}`
    task_time.value = `${todo_item_time.value}`
    deleteTodo(evt)

}


function deleteTodo(evt){
    let item_id = evt.parentElement.getAttribute("todo_id")
    deleteTodo_DOM(item_id)
}

function loadTodos(evt){
    if (localStorage.getItem("todos") != null)
    {
        todos = localStorage.getItem("todos")
        todos = JSON.parse(todos)
        addTodo_DOM(todos)
    }
    else{
        todos = []
    }
    if (localStorage.getItem("done_todos") != null)
    {
        done_todos = localStorage.getItem("done_todos")
        done_todos = JSON.parse(done_todos)
        addDone_DOM(done_todos)
    }
    else{
        done_todos = []
    }
        
}


function checkTodos(){
    todos = localStorage.getItem("todos")
    todos = JSON.parse(todos)
    if (todos != []){
        done_todos = todos.filter((item)=>{
            let item_timestamp =new Date(`${today_date} ${item["time"]}`).getTime()
            let today_timestamp = TODAY.getTime()
            if (today_timestamp > item_timestamp){
                return true
            }
            else{
                return false
            }
        })
    }
    done_todos.forEach((done)=>{
        deleteTodo_DOM(done["todo_id"])
    })
    //addDone_DOM(done_todos)



}

setInterval(checkTodos,60000)

checkTodos()