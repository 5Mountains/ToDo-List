//Selectors
const todoInput = document.querySelector('.todo-input'),
    todoButton = document.querySelector('.todo-button'),
    todoList = document.querySelector('.todo-list'),
    filterOption = document.querySelector('.filter-todo');

//Event Listeners  
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(e) {
    //Prevent form from submitting
    e.preventDefault();
    //Check that string value is not empty or blank 
    if(todoInput.value.replace(/\s/g,"") !== '' ) {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create LI
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerHTML = todoInput.value;
        todoDiv.appendChild(newTodo);

        //Add toDo to localStorage
        saveLocalTodos(todoInput.value);

        //Add check mark button
        const completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);

        //Add check trash button
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);

        //Clear toDo input value
        todoInput.value = "";
    } else {
        alert('You cannot add empty task! You should enter some text!');
    }

}

function deleteCheck(e) {
    const item = e.target;
    let todo = item.parentElement;
    //Delete todo
    if(item.classList[0] === 'trash-btn') {
        //Animation
        todo.classList.add('delete');
        todo.addEventListener('transitionend', () => todo.remove());
        removeLocalTodos(todo);
    }
    //Check mark
    if(item.classList[0] === 'complete-btn') todo.classList.toggle('completed');
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos = checklocal();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos = checklocal();
    todos.forEach((todo) => {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerHTML = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //TRASH MARK BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);  
    });
}

function removeLocalTodos(todo) {
    let todos = checklocal();
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function checklocal(todos){
    (localStorage.getItem('todos') === null) ? (todos = []) : (todos = JSON.parse(localStorage.getItem('todos')));
    return todos;
}