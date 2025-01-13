function addTodo() {
    const todoTitle = dom.todoInput.value.trim();
    if (!todoTitle) {
        alert('Please enter a task title!');
        return;
    }

    const newTodo = {
        'task': todoTitle,
        'completed': false
    }

    todoItems.push(newTodo)
}

function toggleComplete(index) {
    const todo = todoItems[index];
    todo.completed =  !todo.completed;

}
function deleteTodo(index) {
    todoItems.splice(index, 1);
}

function renderTodos() {
    dom.todoList.innerHTML = '';
    for (let i = 0; i < todoItems.length; i++) {
        const todo = todoItems[i];

        dom.todoList.innerHTML += `
            <li class="todo-item" data-id="${i}">
                <span class="${todo.completed?'completed':''}">${todo.task}</span>
                <button class="complete-btn">${todo.completed?'Undo':'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </li>
        `;
    }
}

// Get DOM elements
const dom = {
    todoInput : document.getElementById('todo-input'),
    addTodoButton : document.getElementById('add-todo'),
    todoList : document.getElementById('todo-list')
};

const taskActions = {
    'complete': toggleComplete,
    'delete': deleteTodo
}

// initialize state
const todoItems = [
    {
        'task': 'Task 1',
        'completed': false
    },
    {
        'task': 'Task 2',
        'completed': true
    },
];

renderTodos();

dom.addTodoButton.addEventListener('click', (e)=>{
    //change state
    addTodo();
    //change UI
    renderTodos();
    console.dir(todoItems);
})

// delegate the delete and complete actions to todo-list:
dom.todoList.addEventListener('click', function(e) {
    let action = '';

    if(e.target.classList.contains('complete-btn')){
        action='complete';
    }else if(e.target.classList.contains('delete-btn')){
        action='delete';
    }

    if(action){
        const idx = e.target.parentElement.dataset.id;
        //change state
        taskActions[action](idx)
        //change UI
        renderTodos();
    }
})