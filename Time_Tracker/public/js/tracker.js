let fetchedData;
fetch('/user/getUserById')
    .then(res => res.json())
    .then(data => {
        fetchedData = data;
        console.log(fetchedData);
    });


const startBtn = document.querySelector('#startBtn');
const stopBtn = document.querySelector('#stopBtn');
const inputField = document.querySelector('#inputField');
const displayBox = document.querySelector('.displayBox');
const message = document.querySelector('#message');

const Urgent_ImportantBtn = document.querySelector('#Urgent_Important');
const Urgent_NotImportantBtn = document.querySelector('#Urgent_NotImportant');
const NotUrgent_ImportantBtn = document.querySelector('#NotUrgent_Important');
const NotUrgent_NotImportantBtn = document.querySelector('#NotUrgent_NotImportant');

let taskType = '';
let startClicked = '';
let stopClicked = 'default';
let timeTaken;
let currentTask;
let currentTaskId;
let currentDate = new Date();
currentDate = currentDate.getDate() + '_' + (currentDate.getMonth() + 1) + '_' + currentDate.getFullYear();
let dateTaskList = {
};
let taskList = {
};

function display(tasklist) {
    displayBox.innerHTML = '';
    for (const [key, innerkey] of Object.entries(taskList)) {
        let value = innerkey.time;
        let task = innerkey.taskName;
        // console.log(key, value);
        let hours = Math.floor(value / 3600000);
        let mins = Math.floor((value % 3600000) / 60000);
        let secs = Math.floor((value % 60000) / 1000);
        displayBox.innerHTML +=
            `
        <div class="task">
            <p class="task_name">${task}</p>
            <p class="task_time">
                <div class="space">
                    <p class="text" class="minText">${hours}</p>
                    <p class="text">:</p>
                    <p class="text" class="minText">${mins}</p>
                    <p class="text">:</p>
                    <p class="text" class="secText">${secs}</p>
                    <p class="minutes">hours</p>
                </div>
            </p>
        </div>
        `;
    }
}

setTimeout(() => {
    // console.log(`fetchedData: ${fetchedData.tasks}`);
    console.log(`currentDate: ${currentDate}`);
    if (fetchedData.tasks[currentDate] !== undefined) {
        taskList = fetchedData.tasks[currentDate];
        if (taskList[Object.keys(taskList).length - 1].endTime === 0) {
            console.log("Task is running");
            startClicked = taskList[Object.keys(taskList).length - 1].startTime;
            startClicked = new Date(startClicked);
            console.log(startClicked);
        }
        display(taskList);
        currentTaskId = Object.keys(taskList).length - 1;
    }
}, 100);


Urgent_ImportantBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskType = 'Urgent_Important';
});

Urgent_NotImportantBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskType = 'Urgent_NotImportant';
});

NotUrgent_ImportantBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskType = 'NotUrgent_Important';
});

NotUrgent_NotImportantBtn.addEventListener('click', (e) => {
    e.preventDefault();
    taskType = 'NotUrgent_NotImportant';
});

function start() {
    if (startClicked !== '') {
        message.textContent = 'Please stop the current task before starting a new one';
        return;
    }
    displayBox.innerHTML = '';
    console.log('start');
    if (inputField.value === '') {
        message.textContent = 'Please enter a task';
        display(taskList);
        return;
    }
    if (taskType === '') {
        message.textContent = 'Please select a task type';
        display(taskList);
        return;
    }
    message.textContent = '';
    startClicked = new Date();
    startClicked = startClicked;
    currentTask = inputField.value;
    inputField.value = '';
    currentTaskId = Object.keys(taskList).length;
    taskList[currentTaskId] = {
        "taskName": currentTask,
        "startTime": startClicked,
        "endTime": 0,
        "time": 0,
        "type": taskType
    };
    dateTaskList[currentDate] = taskList;
    display(taskList);
    sendData(dateTaskList);
}
function stop() {
    console.log('stop');
    if (startClicked === '') {
        message.textContent = 'Please start a task before stopping it';
        return;
    }
    stopClicked = new Date();
    stopClicked = stopClicked;
    message.textContent = '';
    timeTaken = Math.abs(startClicked - stopClicked);
    console.log(`timeTaken in stop method: ${timeTaken}`);
    console.log(`startClicked in stop method: ${startClicked} and of type ${typeof startClicked}`);
    console.log(`stopClicked in stop method: ${stopClicked} and of type ${typeof stopClicked}`);
    console.log(`currentTaskId in stop method: ${currentTaskId}`);
    taskList[currentTaskId].time = timeTaken;
    taskList[currentTaskId].endTime = stopClicked;
    taskType = '';
    startClicked = '';
    stopClicked = '';
    display(taskList);
    sendData(dateTaskList);
}

startBtn.addEventListener('click', () => {
    start();
});

stopBtn.addEventListener('click', () => {
    stop()
});

function sendData(taskList) {
    fetch('/user/updateUserTaskById', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasks: taskList }),
    })
        .catch((error) => {
            console.error('Error:', error);
        });
}
