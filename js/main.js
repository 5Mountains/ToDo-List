//Selectors
const todoInput = document.querySelector('.todo-input'),
    todoButton = document.querySelector('.todo-button'),
    todoList = document.querySelector('.todo-list'),
    filterOption = document.querySelector('.filter-todo'),
    todoTextEmpty = document.querySelector('.todo-text-empty');

//Event Listeners  
todoList.addEventListener('click', executeTodo);
todoButton.addEventListener('click', newTodo);
filterOption.addEventListener('click', filterTodo);

// load LocalStorage
fromLocal();

//checks if you have a task and switches the class for the element
checkEmptyList();

//deletes or allows editing or marking as completed your task
function executeTodo(e) {
    const item = e.target;
    let todo = item.parentElement;

    //Check mark btn
    if(item.classList[0] === 'complete-btn') {
        todo.firstChild.classList.add('completed');
        todoList.insertAdjacentElement('beforeend', todo);
        let edit = todo.childNodes[2];
        let complete = todo.childNodes[1];
        if(edit.classList.contains('edit-btn')) {
            edit.remove();
            complete.remove();
        }
        toLocal();
    }

    //Edit btn
    if(item.classList[0] === 'edit-btn') {
        if(!todo.classList.contains('edited')) {
            todo.classList.add('edited');
            todo.childNodes[2].classList.add('editActive');
            todo.firstChild.setAttribute('contenteditable', true);
            todo.firstChild.focus();
        }
        else {
            todo.classList.remove('edited');
            todo.childNodes[2].classList.remove('editActive');
            todo.firstChild.removeAttribute('contenteditable', true);
            todo.firstChild.blur();
            toLocal();
        }
    }

    //delete btn
    if(item.classList[0] === 'trash-btn') {
        //Animation
        todo.classList.add('delete');
        //when animation will be finished it start 
        setTimeout(() => {
            //remove element from DOM
            todo.remove();
            //reSet localStorage
            toLocal();
            //reCheck is your todoList is empty
            checkEmptyList();
        }, 550);
    }
}

//creates all elements for to-do tasks list
function newTodo(e) {
    //Prevent form from submitting
    e.preventDefault();

    //Check that string value is not empty or blank 
    if(todoInput.value.replace(/\s/g,"") !== '') {

        //Todo DIV
             //create element
        const todoDiv = document.createElement('div');
            //add class
        todoDiv.classList.add('todo');

        //Create LI
            //create element
        const newTodo = document.createElement('li');
            //create element with text (value of input)
        const todoText = document.createTextNode(todoInput.value);
            //add class
        newTodo.classList.add('todo-item');
            //append elements  
        newTodo.appendChild(todoText);
        todoDiv.appendChild(newTodo);
 
        //Clear toDo input value
        todoInput.value = "";

        //Add check mark button
            //create elements
        const completedButton = document.createElement('button');
        const completedIcon = document.createElement('i');
            //add classes
        completedButton.classList.add('complete-btn');
        completedIcon.classList.add('fas', 'fa-check');
            //set btn attribute for hint
        completedButton.setAttribute('title', 'mark your task as complete');

            //append elements  
        completedButton.appendChild(completedIcon);
        todoDiv.appendChild(completedButton);
        
        //Add edit pencil button
            //create elements
        const editButton = document.createElement('button');
        const editIcon = document.createElement('i');
            //add classes
        editButton.classList.add('edit-btn');
        editIcon.classList.add('fas', 'fa-edit');
            //set btn attribute for hint
        editButton.setAttribute('title', 'edit your task');
            //append elements  
        editButton.appendChild(editIcon);
        todoDiv.appendChild(editButton);
        
        //Add check trash button
            //create elements
        const trashButton = document.createElement('button');
        const trashIcon = document.createElement('i');
            //add classes
        trashButton.classList.add('trash-btn');
        trashIcon.classList.add('fas', 'fa-trash');
            //set btn attribute for hint
        trashButton.setAttribute('title', 'delete your task');

            //append elements  
        trashButton.appendChild(trashIcon);
        todoDiv.appendChild(trashButton);

        //Append fully formed element to list
        todoList.appendChild(todoDiv);

        //return focus on input
        todoInput.focus();

        //check if there is some tasks
        checkEmptyList();

        //Write to localStorage
        toLocal();

    } else {
        alert('You cannot add empty task! You should enter some text!');
    }
}

//allows switching among completed and uncompleted as well as all tasks
function filterTodo(e) {
    let todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.firstChild.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
            case "uncompleted":
                if(!todo.firstChild.classList.contains('completed')) todo.style.display = 'flex';
                else todo.style.display = 'none';
                break;
        }
    });
}

//Write data to localStorage
function toLocal() {
    localStorage.setItem('todoList', todoList.innerHTML);
}

//get data from localStorage
function fromLocal() {
    if (localStorage.getItem('todoList')) {
        todoList.insertAdjacentHTML('afterbegin', localStorage.getItem('todoList'));
    }
}

//checks if you have a task and switches the class for the element
function checkEmptyList() {
    (todoList.children.length > 0) ? todoTextEmpty.style.display = 'none' : todoTextEmpty.style.display = 'block';
}