let tasks = [];

function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const taskName = newTaskInput.value.trim();

    if (taskName !== '') {
        tasks.push({ name: taskName, status: 'Pending' });
        newTaskInput.value = ''; 
        updateInterface();
    }
}

function updateInterface() {
    const pendingList = document.getElementById('pendingList');
    const inProgressList = document.getElementById('inProgressList');
    const completedList = document.getElementById('completedList');

    pendingList.innerHTML = '';
    inProgressList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.textContent = task.name;
        taskElement.classList.add('task');

        if (task.status === 'Pending') {
            const arrowRight = document.createElement('button');
            arrowRight.textContent = '→';
            arrowRight.onclick = function() {
                moveTaskToInProgress(index);
            };
            taskElement.appendChild(arrowRight);
            pendingList.appendChild(taskElement);
        } else if (task.status === 'InProgress') {
            const arrowLeft = document.createElement('button');
            arrowLeft.textContent = '←';
            arrowLeft.onclick = function() {
                moveTaskBackToPending(index);
            };

            const arrowRight = document.createElement('button');
            arrowRight.textContent = '→';
            arrowRight.onclick = function() {
                moveTaskToCompleted(index);
            };

            const arrowsContainer = document.createElement('div');
            arrowsContainer.classList.add('in-progress-arrows');
            arrowsContainer.appendChild(arrowLeft);
            arrowsContainer.appendChild(arrowRight);

            taskElement.appendChild(arrowsContainer);
            inProgressList.appendChild(taskElement);
        } else if (task.status === 'Completed') {
            completedList.appendChild(taskElement);
        }
    });
}

function moveTaskToInProgress(index) {
    tasks[index].status = 'InProgress';
    updateInterface();
}

function moveTaskBackToPending(index) {
    tasks[index].status = 'Pending';
    updateInterface();
}

function moveTaskToCompleted(index) {
    tasks[index].status = 'Completed';
    updateInterface();
}
