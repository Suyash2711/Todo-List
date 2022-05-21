const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    console.log(event)

    //Todo div
    const todoDiv = document.createElement("div");
    
    //add classlist todoDiv
    todoDiv.classList.add('todo');

    //create a new todo for li
    const newtodo = document.createElement('li');
    // add some inner text to it
    newtodo.innerText=todoInput.value;
    // add class to thee newtodo 
    newtodo.classList.add('todo-item');
    // append this to main todoDiv
    todoDiv.appendChild(newtodo);
    //save to local storage
    saveLocalTodo(todoInput.value);
    // check mark button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa-solid fa-square-check fa-2xl"></i>';
    checkButton.classList.add("complete-button");
    todoDiv.appendChild(checkButton);

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-2xl"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    //clear input value
    todoInput.value = ""; 
}

function deleteCheck(event){
    const item = event.target;
    if(item.classList[0] === "delete-button"){
        const delItem = item.parentElement;
        delItem.classList.add("fall");
        removeLocalTodos(delItem);
        delItem.addEventListener('transitionend', function(){
            delItem.remove();
        });
    }

    if(item.classList[0] === "complete-button"){
        const completedItem = item.parentElement;
        completedItem.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });     
}

//local storage
function saveLocalTodo(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));   //convert to string
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //Todo div
    const todoDiv = document.createElement("div");
    
    //add classlist todoDiv
    todoDiv.classList.add('todo');

    //create a new todo for li
    const newtodo = document.createElement('li');
    // add some inner text to it
    newtodo.innerText=todo;
    // add class to thee newtodo 
    newtodo.classList.add('todo-item');
    // append this to main todoDiv
    todoDiv.appendChild(newtodo);
    
    // check mark button
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fa-solid fa-square-check fa-2xl"></i>';
    checkButton.classList.add("complete-button");
    todoDiv.appendChild(checkButton);

    // delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-2xl"></i>';
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}