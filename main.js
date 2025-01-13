function addTask() {
    const taskTitle = dom.taskInput.value.trim();
    if (!taskTitle) {
        alert('Please enter a task title!');
        return;
    }

    const newTask = {
        'task': taskTitle,
        'completed': false
    }

    taskItems.push(newTask);

    dom.taskInput.value = '';
}

function toggleTaskStatus(index) {
    const task = taskItems[index];
    task.completed =  !task.completed;

}

function deleteTask(index) {
    taskItems.splice(index, 1);
}

function renderTasks() {
    dom.taskList.innerHTML = '';
    for (let i = 0; i < taskItems.length; i++) {
        const task = taskItems[i];

        dom.taskList.innerHTML += `
            <li class="task-item" data-id="${i}">
                <span class="${task.completed?'completed':''}">${task.task}</span>
                <button class="complete-btn">${task.completed?'Undo':'Complete'}</button>
                <button class="delete-btn">Delete</button>
            </li>
        `;
    }
}

const TASK_ACTIONS = {
    'complete': toggleTaskStatus,
    'delete': deleteTask
}

// initialize state
const taskItems = [
    {
        'task': 'Task 1',
        'completed': false
    },
    {
        'task': 'Task 2',
        'completed': true
    },
];

let dom;

document.addEventListener('DOMContentLoaded', function(){
    // Get DOM elements
    dom = {
        taskInput : document.getElementById('task-input'),
        addTaskButton : document.getElementById('add-task'),
        taskList : document.getElementById('task-list')
    };

    dom.addTaskButton.addEventListener('click', (e)=>{
        //change state
        addTask();
        //change UI
        renderTasks();
        console.dir(taskItems);
    })

    // delegate the delete and complete actions to task-list:
    dom.taskList.addEventListener('click', function(e) {
        let action = '';

        if(e.target.classList.contains('complete-btn')){
            action='complete';
        }else if(e.target.classList.contains('delete-btn')){
            action='delete';
        }

        if(action){
            const idx = e.target.parentElement.dataset.id;
            //change state
            TASK_ACTIONS[action](idx)
            //change UI
            renderTasks();
        }
    })

    renderTasks();
});