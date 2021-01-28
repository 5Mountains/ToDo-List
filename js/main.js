const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const todoTextEmpty = document.querySelector('.todo-text-empty');

todoList.addEventListener('click', executeTodo);
todoButton.addEventListener('click', newTodo);
filterOption.addEventListener('click', filterTodo);

fromLocal();

checkEmptyList();

function executeTodo(e) {
    const item = e.target;
    let todo = item.parentElement;

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

    if(item.classList[0] === 'trash-btn') {
        todo.classList.add('delete');
        setTimeout(() => {
            todo.remove();
            toLocal();
            checkEmptyList();
        }, 550);
    }
}

function newTodo(e) {
    e.preventDefault();

    if(todoInput.value.replace(/\s/g,"") !== '') {

        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        const todoText = document.createTextNode(todoInput.value);
        newTodo.classList.add('todo-item');
        newTodo.appendChild(todoText);
        todoDiv.appendChild(newTodo);
 
        todoInput.value = "";

        const completedButton = document.createElement('button');
        const completedIcon = document.createElement('i');
        completedButton.classList.add('complete-btn');
        completedIcon.classList.add('fas', 'fa-check');
        completedButton.setAttribute('title', 'mark your task as complete');
        completedButton.appendChild(completedIcon);
        todoDiv.appendChild(completedButton);
        

        const editButton = document.createElement('button');
        const editIcon = document.createElement('i');
        editButton.classList.add('edit-btn');
        editIcon.classList.add('fas', 'fa-edit');
        editButton.setAttribute('title', 'edit your task');
        editButton.appendChild(editIcon);
        todoDiv.appendChild(editButton);
        

        const trashButton = document.createElement('button');
        const trashIcon = document.createElement('i');
        trashButton.classList.add('trash-btn');
        trashIcon.classList.add('fas', 'fa-trash');
        trashButton.setAttribute('title', 'delete your task');
        trashButton.appendChild(trashIcon);
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        todoInput.focus();

        checkEmptyList();

        toLocal();

    } else {
        alert('You cannot add empty task! You should enter some text!');
    }
}

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

function toLocal() {
    localStorage.setItem('todoList', todoList.innerHTML);
}

function fromLocal() {
    if (localStorage.getItem('todoList')) {
        todoList.insertAdjacentHTML('afterbegin', localStorage.getItem('todoList'));
    }
}

function checkEmptyList() {
    (todoList.children.length > 0) 
        ? todoTextEmpty.style.display = 'none' 
        : todoTextEmpty.style.display = 'block';
}