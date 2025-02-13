import { renderTodoList, setupTodoListClick } from './components/TodoList.js';
import { setupAddTodoForm } from './components/AddTodoForm.js';
import { getTodos } from './services/apiService.js';
// Function to initialize the app
async function initApp() {
    const todoItems = await getTodos(); // Fetch todo items from the API
    renderTodoList(todoItems); // Render todo items to the DOM
    setupTodoListClick(todoItems); // Setup event listeners for click actions
    setupAddTodoForm(todoItems); // Setup form submission handling
}
export { initApp };
