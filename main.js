class Task {
    constructor(title, completed = false) {
        this.title = title;
        this.completed = completed;
    }

    toggle() {
        this.completed = !this.completed;
    }
}


class TaskManager{
    constructor(){
        this.tasks = this.loadTasks();
    }

    add(taskTitle) {
        this.tasks.push(new Task(taskTitle));
        this.saveTasks();
    }

    delete(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
    }

    toggle(index) {
        this.tasks[index].toggle();
        this.saveTasks();
    }

    loadTasks(){
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
}


class UIManager{
    constructor() {
        this.dom = {
            taskInput: document.getElementById('task-input'),
            addTaskButton: document.getElementById('add-task'),
            taskList: document.getElementById('task-list')
        };
        this.taskManager = new TaskManager();

        this.addEventListeners();
        this.renderTasks();

        // focus input
        this.dom.taskInput.focus();
    }

    addEventListeners(){
        this.dom.addTaskButton.addEventListener('click', (e)=>{
            this.addTask()
        })
        this.dom.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        this.dom.taskList.addEventListener('click', (e)=>{
            this.deleteOrCompleteTask(e)
        })
    }

    addTask(){
        const taskTitle = this.dom.taskInput.value.trim();
        if (!taskTitle) {
            alert('Please enter a task title!');
            return;
        }

        this.taskManager.add(taskTitle);
        this.dom.taskInput.value = '';
        this.renderTasks();
    }

    deleteOrCompleteTask(e){
        let action = null;

        if(e.target.classList.contains('complete-btn')){
            action=this.taskManager.toggle.bind(this.taskManager);
        }else if(e.target.classList.contains('delete-btn')){
            action=this.taskManager.delete.bind(this.taskManager);
        }

        if(action){
            const idx = Number(e.target.parentElement.dataset.id);
            //change state
            action(idx)
            //change UI
            this.renderTasks();
        }
    }

    renderTasks() {
        this.dom.taskList.innerHTML = '';

        this.taskManager.tasks.forEach((task, idx)=>{
            this.dom.taskList.innerHTML += `
                <li class="task-item" data-id="${idx}">
                    <span class="${task.completed?'completed':''}">${task.title}</span>
                    <button class="complete-btn">${task.completed?'Undo':'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </li>
            `;
        })
    }
}


document.addEventListener('DOMContentLoaded', function(){
    new UIManager()
});