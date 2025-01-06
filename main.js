const tasks = [
    { title: 'Design a website', completed: true },
    { title: 'Learn JavaScript', completed: false },
    { title: 'Build a Todo App', completed: true },
];

const taskList = document.querySelector('#task-list');

function renderTasks() {
    const liItems = tasks
        .map(
            (task) =>
                `
    <li class="task-item ${task.completed ? 'completed' : ''}">
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
