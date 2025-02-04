function addTodo() {
    const todoTitle = dom.todoInput.value;
    //change server state

    // change local state if server responded ok
    const newTodo = {
        'task': todoTitle,
        'completed': false
    }

    todoItems.push(newTodo);

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

async function getTasks(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        todoItems = [...data]
        const newResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`)
        const userData = await response.json()

        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
// initialize state
const todoItems;
getTasks();

renderTodos();

dom.addTodoButton.addEventListener('click', (e)=>{
    //change state
    addTodo();
    //change UI
    renderTodos();
    console.dir(todoItems);
})

dom.todoList.addEventListener('click', (e)=>{
    console.log(e.target)
    const idx = e.target.parentElement.dataset.id;

    if(e.target.classList.contains('complete-btn')) {
        todoItems[idx].completed = !todoItems[idx].completed;
        renderTodos();
    }else if(e.target.classList.contains('delete-btn')){
        todoItems.splice(idx,1);
        renderTodos();
    }
})