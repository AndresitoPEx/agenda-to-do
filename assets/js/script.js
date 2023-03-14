//info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');

//task container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () =>{
    const date = new Date();
    dateNumber.textContent  = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent    = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent   = date. toLocaleString('es', { month: 'short' });
    dateYear.textContent    = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event =>{
    event.preventDefault();
    const {value} = event.target.taskText;
    if(!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.dataset.id = new Date().getTime();
    task.addEventListener('click', changeTaskState);
    task.innerHTML = `
        <div class="taskContent">${value}</div>
        <div class="taskActions">
            <button class="editButton" title="Editar"><i class="far fa-edit"></i></button>
            <button class="deleteButton" title="Borrar"><i class="far fa-trash-alt"></i></button>
        </div>
    `;
    tasksContainer.prepend (task);
    event.target.reset();
};

const changeTaskState = event =>{
    if (event.target.classList.contains('editButton') || event.target.parentElement.classList.contains('editButton')) {
        editTask(event.target.closest('.task'));
    } else if (event.target.classList.contains('deleteButton') || event.target.parentElement.classList.contains('deleteButton')) {
        deleteTask(event.target.closest('.task'));
    } else {
        event.target.classList.toggle('done');
    }
};

const editTask = task =>{
    const taskContent = task.querySelector('.taskContent');
    const taskText = taskContent.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText;
    input.classList.add('taskInput');
    taskContent.replaceWith(input);
    input.focus();
    input.addEventListener('blur', () => {
        const newTaskText = input.value.trim();
        if (newTaskText) {
            const newTaskContent = document.createElement('div');
            newTaskContent.classList.add('taskContent');
            newTaskContent.textContent = newTaskText;
            input.replaceWith(newTaskContent);
            task.querySelector('.editButton').focus();
        } else {
            deleteTask(task);
        }
    });
    input.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            input.blur();
        }
    });
};

const deleteTask = task =>{
    task.remove();
};

const order = () => {

    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach( el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el);
    });
    
    return [...toDo, ...done];
};

const renderOrderedTasks = () => {
    tasksContainer.innerHTML = '';
    order().forEach(el =>tasksContainer.appendChild(el));
};

setDate();
