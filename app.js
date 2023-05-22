const add_todo_btn = document.querySelector("#input_todo > div:nth-of-type(2) button")


add_todo_btn.addEventListener("click",addTodo);

function isBlank(str){
    return (str.trim() == "");
}

function sortTodos(){
    let todo_list = document.querySelector("#todo_list");
    //console.log([...todo_list.children].slice(1,));
    let sorted = todo_list;
    todo_list.removeChild([...todo_list.children.slice(1,)]);

    [...sorted.children].slice(1,)
      .sort((a,b)=>{
        console.log(a.children[0].value)
        console.log(b.children[0].value)
        a.children[0].value>=a.children[0].value?1:-1
    }).forEach(node=>todo_list.appendChild(node));
    //console.log(todo_list.children)
}
function addTodo(evt){
    const task_name = document.querySelector("#user_input > input:nth-of-type(1)")
    const task_time = document.querySelector("#user_input > input:nth-of-type(2)")

    if (isBlank(task_name.value) || task_time.value == ""){
        return
    }

    let todo_list = document.querySelector("#todo_list")
    const todo_item = document.createElement("div")
    todo_item.setAttribute("class","todo_item")
    todo_item.innerHTML = `
        <input type="text" disabled value="${task_name.value}"></input>
        <input type="text" disabled value="${task_time.value}")></input>
        <button onclick=updateTodo(this)>Update</button>
        <button onclick=deleteTodo(this)>Delete</button>
    `
    
    let todo = Object.assign({},todo_item)
    console.log(todo)
    todo_list.appendChild(todo_item);

    sortTodos();

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