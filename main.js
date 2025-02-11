function addTodo() {
    const todoTitle = dom.todoInput.value;
    const newTodo = {
        'task': todoTitle,
        'completed': false
    }

    //change server state
    fetch(`${baseURL}/todos`,{
        method:"POST",
        headers:{
            'Content-type':'Application/json'
        },
        body:JSON.stringify(newTodo)
    })
        .then(r=>{
            if(r.ok){
                return r.json()
            }else{
                throw new Error(`Server response status: ${r.status}`);
            }
        })
        .then(data=>{
            // change local state if server responded ok
            todoItems.push(newTodo);
        })
        .catch(err=>console.error(`ERROR: ${err}`))
}

function toggleComplete(index) {
    console.log(`index: ${index}`);
    const todo = todoItems.filter(todo=>todo.id===index)[0];

    fetch(`${baseURL}/todos/${index}`, {
        method:'PATCH',
        body:JSON.stringify({'completed':!todo.completed}),
        headers:{
            'Content-type':'Application/json'
        }
    })
        .then(r=>{
            if(r.ok){
                // change local state
                todoItems.forEach(todo=>todo.id===index && (todo.completed=!todo.completed));
            }else{
                throw new Error(`Server response status: ${r.status}`);
            }
        })

        .catch(err=>console.error(`ERROR: ${err}`))
}

function deleteTodo(index) {
    console.log(`index: ${index}`);
    fetch(`${baseURL}/todos/${index}`, {
        method:'DELETE',
    })
        .then(r=>{
            if(r.ok){
                // change local state
                todoItems.splice(index, 1);
            }else{
                throw new Error(`Server response status: ${r.status}`);
            }
        })

        .catch(err=>console.error(`ERROR: ${err}`))
    // change local state
    todoItems.splice(index, 1);
}

function renderTodos() {
    dom.todoList.innerHTML = '';
    todoItems.forEach(todo => {
        dom.todoList.innerHTML += `
            <li class="todo-item" data-id="${todo.id}">
                <span class="${todo.completed?'completed':''}">${todo.task}</span>
                <button class="complete-btn">${todo.completed?'Undo':'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </li>
        `;
    });
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
        // set local state
        todoItems = [...data];
        renderTodos();
    } catch (error) {
        console.error('Error:', error);
    }
}

const baseURL = 'http://localhost:3000'

// define local state
let todoItems;

getTasks(`${baseURL}/todos`);


dom.addTodoButton.addEventListener('click', (e)=>{
    e.preventDefault();
    //change state
    addTodo();
    //change UI
    renderTodos();
    console.dir(todoItems);
})

dom.todoList.addEventListener('click', (e)=>{
    console.log(e.target)
    e.preventDefault();
    const idx = e.target.parentElement.dataset.id;

    if(e.target.classList.contains('complete-btn')) {
        toggleComplete(idx)
        renderTodos();
    }else if(e.target.classList.contains('delete-btn')){
        deleteTodo(idx)
        renderTodos();
    }
})