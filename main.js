async function getTasks() {
    try {
        const response = await fetch(`${baseURL}/todos`);
        const data = await response.json();
        // Change local state
        todoItems = [...data];
        renderTodos();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addTodo() {
    const todoTitle = dom.todoInput.value.trim();
    if (!todoTitle) return;

    const newTodo = { task: todoTitle, completed: false };

    try {
        // Change server state
        const response = await fetch(`${baseURL}/todos`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo)
        });

        if (!response.ok) throw new Error(`Server response status: ${response.status}`);

        const data = await response.json();
        // Change local state if server responded ok
        todoItems.push(data);
        renderTodos();
        dom.todoInput.value = ''; // Clear input field
    } catch (err) {
        console.error(`ERROR: ${err}`);
    }
}

async function toggleComplete(index) {
    console.log(`index: ${index}`);
    const todo = todoItems.find(todo => todo.id == index);
    if (!todo) return;

    try {
        // Change server state
        const response = await fetch(`${baseURL}/todos/${index}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !todo.completed })
        });

        if (!response.ok) throw new Error(`Server response status: ${response.status}`);

        // Change local state if server responded ok
        todo.completed = !todo.completed;
        renderTodos();
    } catch (err) {
        console.error(`ERROR: ${err}`);
    }
}

async function deleteTodo(index) {
    console.log(`index: ${index}`);

    try {
        // Change server state
        const response = await fetch(`${baseURL}/todos/${index}`, { method: 'DELETE' });

        if (!response.ok) throw new Error(`Server response status: ${response.status}`);

        // Change local state if server responded ok
        todoItems = todoItems.filter(todo => todo.id != index);
        renderTodos();
    } catch (err) {
        console.error(`ERROR: ${err}`);
    }
}

function renderTodos() {
    dom.todoList.innerHTML = todoItems.map(todo => `
        <li class="todo-item" data-id="${todo.id}">
            <span class="${todo.completed ? 'completed' : ''}">${todo.task}</span>
            <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
            <button class="delete-btn">Delete</button>
        </li>
    `).join('');
}

// Get DOM elements
const dom = {
    todoForm: document.getElementById('todo-input-form'),
    todoInput: document.getElementById('todo-input'),
    todoList: document.getElementById('todo-list')
};

const baseURL = 'http://localhost:3000';

// Define local state
let todoItems = [];


// Handle form submission
dom.todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

// Handle click events on the todo list
dom.todoList.addEventListener('click', (e) => {
    console.log(e.target);
    e.preventDefault();

    const idx = e.target.closest('.todo-item').dataset.id;

    if (e.target.classList.contains('complete-btn')) {
        toggleComplete(idx);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTodo(idx);
    }
});


// Load tasks on page load
getTasks();
