import { createTodo } from '../services/apiService.js';
import { renderTodoList } from './TodoList.js';
// Handles form submission and adds a new todo
function setupAddTodoForm(todoItems) {
    const form = document.getElementById('todo-input-form');
    if (!form)
        return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = document.getElementById('todo-input');
        if (!input || !input.value.trim())
            return;
        const newTodo = { title: input.value.trim(), completed: false };
        await createNewTodo(newTodo, todoItems);
        input.value = ''; // Clear input field after adding
    });
}
// Calls the API to create a new todo and updates the list
async function createNewTodo(newTodo, todoItems) {
    const createdTodo = await createTodo(newTodo);
    todoItems.push(createdTodo);
    renderTodoList(todoItems);
}
export { setupAddTodoForm };
