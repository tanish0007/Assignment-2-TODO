// const checkBox = document.getElementById("checkbox1");
// const label = document.querySelector('label[for="checkbox1"]');

// checkBox.addEventListener('change', () => {
//     label.style.textDecoration = checkBox.checked ? 'line-through' : 'none';
// });

// console.log("Tanish");

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            label.classList.toggle('completed', this.checked);
        });
        
        const label = document.createElement('label');
        label.textContent = taskText;
        label.prepend(checkbox);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            li.remove();
        });
        
        li.appendChild(label);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
        taskInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});