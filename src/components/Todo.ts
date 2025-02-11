import { Todo } from '../models/todo';

interface TodoProps {
  todo: Todo;
  onToggleCompletion: (id: number) => void;
  onDelete: (id: number) => void;
}

export function Todo({ todo, onToggleCompletion, onDelete }: TodoProps): string {
  return `
    <li class="todo-item" data-id="${todo.id}">
      <span class="${todo.completed ? 'completed' : ''}">${todo.task}</span>
      <button class="complete-btn" onclick="onToggleCompletion(${todo.id})">${todo.completed ? 'Undo' : 'Complete'}</button>
      <button class="delete-btn" onclick="onDelete(${todo.id})">Delete</button>
    </li>
  `;
}
