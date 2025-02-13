// Function to render a single todo item
export function renderTodoItem(todo) {
    return `
    <li class="todo-item" data-id="${todo.id}">
      <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
      <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
      <button class="delete-btn">Delete</button>
    </li>
  `;
}
