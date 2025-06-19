// const checkBox = document.getElementById("checkbox1");
// const label = document.querySelector('label[for="checkbox1"]');

// checkBox.addEventListener('change', () => {
//     label.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
// });

// console.log("Tanish");

// document.addEventListener('DOMContentLoaded', function() {
//     const taskInput = document.getElementById('task');
//     const addButton = document.getElementById('add-btn');
//     const taskList = document.getElementById('task-list');

//     function addTask() {
//         const taskText = taskInput.value.trim();
//         if (taskText === '') return;

//         const li = document.createElement('li');

//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         checkbox.addEventListener('change', function() {
//             label.classList.toggle('completed', this.checked);
//         });
        
//         const label = document.createElement('label');
//         label.textContent = taskText;
//         label.prepend(checkbox);
        
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.addEventListener('click', function() {
//             li.remove();
//         });
        
//         li.appendChild(label);
//         li.appendChild(deleteButton);
//         taskList.appendChild(li);
//         taskInput.value = '';
//     }

//     addButton.addEventListener('click', addTask);

//     taskInput.addEventListener('keypress', function(e) {
//         if (e.key === 'Enter') {
//             addTask();
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let nextId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

    function loadTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            updateTaskStatus(task.id, this.checked);
            label.classList.toggle('completed', this.checked);
        });
        
        const label = document.createElement('label');
        label.textContent = task.text;
        if (task.completed) {
            label.classList.add('completed');
        }
        label.prepend(checkbox);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteTask(task.id);
            li.remove();
        });
        
        li.appendChild(label);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const newTask = {
            id: nextId++,
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        createTaskElement(newTask);
        taskInput.value = '';
    }

    function updateTaskStatus(id, completed) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = completed;
            saveTasks();
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
    console.log(loadTasks());
});