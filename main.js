/**
 * Sample data
{ title: 'Design a website', completed: true },
{ title: 'Learn JavaScript', completed: false },
{ title: 'Build a Todo App', completed: true },
 */

const tasks = JSON.parse(localStorage.getItem('tasks')) ?? [];

const taskList = document.querySelector('#task-list');
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function handleTaskActions(e) {
    const taskItem = e.target.closest('.task-item');
    if (!taskItem) return;

    // const taskIndex = +taskItem.getAttribute('task-index');
    const taskIndex = +taskItem.dataset.index;
    const task = tasks[taskIndex];

    if (e.target.closest('.edit')) {
        let newTitle = prompt('Enter new task title:', task.title);
        newTitle = newTitle.trim();

        if (newTitle === null) return;
        if (!newTitle) return alert('Title can not be empty');
        if (isDuplicateTask(newTitle, taskIndex)) return alert('Title is duplicate');

        task.title = newTitle;
        renderTasks();
        saveTasks();
    }

    if (e.target.closest('.done')) {
        task.completed = !task.completed;
        renderTasks();
        saveTasks();
    }

    if (e.target.closest('.delete')) {
        if (confirm(`Are you sure you want to delete "${task.title}?"`)) {
            tasks.splice(taskIndex, 1);
            renderTasks();
            saveTasks();
        }
    }
}

function isDuplicateTask(newTitle, taskIndex = -1) {
    const isDuplicate = tasks.some(
        (task, index) => task.title.toLowerCase() === newTitle.toLowerCase() && taskIndex !== index
    );
    return isDuplicate;
}

function addNewTask(e) {
    e.preventDefault();

    const value = todoInput.value.trim();
    if (!value) return alert('Please write something!');

    if (isDuplicateTask(value)) return alert('Title is duplicate');

    const newTask = {
        title: value,
        completed: false,
    };

    tasks.push(newTask);
    renderTasks();
    saveTasks();
    todoInput.value = '';
}

function renderTasks() {
    if (!tasks.length) {
        const message = `<li class="empty-message">No tasks available</li>`;
        taskList.innerHTML = message;
        return;
    }

    const liItems = tasks
        .map(
            (task, index) =>
                `
    <li class="task-item ${task.completed ? 'completed' : ''}" data-index='${index}'>
    <span class="task-title">${task.title}</span>
    <div class="task-action">
        <button class="task-btn edit">Edit</button>
        <button class="task-btn done">${task.completed ? 'Mark as undone' : 'Done'}</button>
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
