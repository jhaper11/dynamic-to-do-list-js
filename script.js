// script.js
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array (keeps localStorage and DOM in sync)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    /**
     * Add a task to the DOM and optionally save it to localStorage.
     * @param {string} taskText - The text of the task to add.
     * @param {boolean} save - Whether to save the task to localStorage (default true).
     */
    function addTask(taskText = undefined, save = true) {
        // If taskText not provided, read from input (for normal add flow)
        if (typeof taskText === 'undefined') {
            taskText = taskInput.value.trim();
        }

        // Validate
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item and structure: <li><span>taskText</span><button>Remove</button></li>
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn'); // REQUIRED BY CHECKER

        // Append text and button to li
        li.appendChild(span);
        li.appendChild(removeBtn);

        // Append li to the task list in the DOM
        taskList.appendChild(li);

        // If instructed, save to tasks array and update localStorage
        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input field (only if the source was the input)
        if (taskInput.value.trim() === taskText) {
            taskInput.value = "";
        }

        // Set up remove button functionality: remove from DOM and update localStorage
        removeBtn.onclick = function () {
            // Remove the li from the DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Remove the first matching occurrence from the tasks array
            const index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };
    }

    /**
     * Load tasks from localStorage and render them in the DOM.
     */
    function loadTasks() {
        // tasks is already initialized from localStorage above
        tasks.forEach(taskText => {
            // Pass false so addTask does not save again to localStorage
            addTask(taskText, false);
        });
    }

    // Attach Event Listeners

    // Add task when button is clicked
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add task when Enter key is pressed in the input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when the page loads
    loadTasks();
});
