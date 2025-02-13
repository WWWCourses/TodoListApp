// Base URL for the JSON server API
const API_URL = 'http://localhost:3000/todos';
// Fetch all todos from the API
async function getTodos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok)
            throw new Error('Failed to fetch todos');
        const todos = await response.json();
        return todos;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
// Create a new todo via the API
async function createTodo(newTodo) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTodo),
        });
        if (!response.ok)
            throw new Error('Failed to create todo');
        const createdTodo = await response.json();
        return createdTodo;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
// Update an existing todo via the API
async function updateTodo(updatedTodo) {
    try {
        const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTodo),
        });
        if (!response.ok)
            throw new Error('Failed to update todo');
        const updatedTodoFromAPI = await response.json();
        return updatedTodoFromAPI;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
// Delete a todo via the API
async function deleteTodo(todoId) {
    try {
        const response = await fetch(`${API_URL}/${todoId}`, {
            method: 'DELETE',
        });
        if (!response.ok)
            throw new Error('Failed to delete todo');
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}
export { getTodos, createTodo, updateTodo, deleteTodo };
