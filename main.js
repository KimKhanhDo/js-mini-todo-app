const tasks = [
    { title: 'Design a website', completed: true },
    { title: 'Learn JavaScript', completed: false },
    { title: 'Build a Todo App', completed: true },
];

const taskList = document.querySelector('#task-list');
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');

function handleTaskActions(e) {
    const taskItem = e.target.closest('.task-item');
    const taskIndex = +taskItem.getAttribute('task-index');
    const task = tasks[taskIndex];

    if (e.target.closest('.edit')) {
        const newTitle = prompt('Enter new task title:', task.title);
        task.title = newTitle;
        renderTasks();
    }
    if (e.target.closest('.done')) {
        console.log('Done');
    }
    if (e.target.closest('.delete')) {
        console.log('Delete');
    }
}

function addNewTask(e) {
    e.preventDefault();

    const value = todoInput.value.trim();
    if (!value) return alert('Please write something!');

    const newTask = {
        title: value,
        complete: false,
    };

    tasks.push(newTask);
    renderTasks();
    todoInput.value = '';
}

function renderTasks() {
    const liItems = tasks
        .map(
            (task, index) =>
                `
    <li class="task-item ${task.completed ? 'completed' : ''}" task-index='${index}'>
    <span class="task-title">${task.title}</span>
    <div class="task-action">
        <button class="task-btn edit">Edit</button>
        <button class="task-btn done">${task.complete ? 'Mark as undone' : 'Done'}</button>
        <button class="task-btn delete">Delete</button>
    </div>
</li>
    `
        )
        .join('');
    taskList.innerHTML = liItems;
}

renderTasks();
todoForm.addEventListener('submit', addNewTask);
taskList.addEventListener('click', handleTaskActions);
