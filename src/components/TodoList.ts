import { Todo } from '../models/Todo.js';
import { renderTodoItem } from './TodoItem.js';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/apiService.js';

// Function to render all todo items
function renderTodoList(todoItems: Todo[]): void {
    const todoList = document.getElementById('todo-list');
    if (!todoList) return;

    todoList.innerHTML = todoItems.map(todo => renderTodoItem(todo)).join('');
}

// Handling the completion toggle of a todo
async function toggleComplete(todo: Todo, todoItems: Todo[]): Promise<void> {
    todo.completed = !todo.completed;
    await updateTodo(todo);  // Update the todo on the API
    renderTodoList(todoItems);  // Re-render the entire list
}

// Handling the deletion of a todo
async function deleteTodoItem(todo: Todo, todoItems: Todo[]): Promise<void> {
    await deleteTodo(todo.id);  // Delete the todo from the API
    const index = todoItems.findIndex(item => item.id === todo.id);
    if (index !== -1) {
        todoItems.splice(index, 1);
    }
    renderTodoList(todoItems);  // Re-render the updated list
}

// Setting up the click event listeners for the todo list
function setupTodoListClick(todoItems: Todo[]): void {
    const todoList = document.getElementById('todo-list');
    if (!todoList) return;

    todoList.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        const todoItem = target.closest('.todo-item') as HTMLElement;
        if(!todoItem) return;

        const todoId = todoItem.dataset.id;
        if (!todoId) return;

        const todo = todoItems.find(item => item.id === todoId);
        if (!todo) return;

        if (target.classList.contains('complete-btn')) {
            toggleComplete(todo, todoItems);
        } else if (target.classList.contains('delete-btn')) {
            deleteTodoItem(todo, todoItems);
        }
    });
}


export { renderTodoList, setupTodoListClick };
