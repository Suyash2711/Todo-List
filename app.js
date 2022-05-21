const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


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
        delItem.addEventListener('transitionend', function(){
            delItem.remove();
        });
    }

    if(item.classList[0] === "complete-button"){
        const completedItem = item.parentElement;
        completedItem.classList.toggle("completed");
    }
}