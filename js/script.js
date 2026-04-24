// =====================
// GREETING + TIME
// =====================
function updateGreeting() {
  const now = new Date();
  const hours = now.getHours();
  let greeting = "Hello";

  if (hours < 12) greeting = "Good Morning";
  else if (hours < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  document.getElementById("greetText").innerText = greeting;
  document.getElementById("dateTime").innerText = now.toLocaleString();
}

setInterval(updateGreeting, 1000);
updateGreeting();


// =====================
// TIMER (25 MINUTES)
// =====================
let time = 1500; // 25 minutes
let timerInterval = null;

function updateTimerDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  document.getElementById("timeDisplay").innerText =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimerDisplay();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  time = 1500;
  updateTimerDisplay();
}

updateTimerDisplay();


// =====================
// TODO LIST
// =====================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span onclick="toggleTask(${index})" class="${task.done ? 'done' : ''}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();

  if (!value) return;

  // ❗ Prevent duplicate
  if (tasks.some(t => t.text.toLowerCase() === value.toLowerCase())) {
    alert("Task already exists!");
    return;
  }

  tasks.push({ text: value, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// 🔤 SORT TASK
function sortTasks() {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  saveTasks();
  renderTasks();
}

renderTasks();


// =====================
// QUICK LINKS
// =====================
let links = JSON.parse(localStorage.getItem("links")) || [];

function saveLinks() {
  localStorage.setItem("links", JSON.stringify(links));
}

function renderLinks() {
  const container = document.getElementById("linkContainer");
  container.innerHTML = "";

  links.forEach((link, index) => {
    const wrapper = document.createElement("div");

    const btn = document.createElement("button");
    btn.innerText = link.name;
    btn.onclick = () => window.open(link.url, "_blank");

    const del = document.createElement("button");
    del.innerText = "X";
    del.onclick = () => {
      links.splice(index, 1);
      saveLinks();
      renderLinks();
    };

    wrapper.appendChild(btn);
    wrapper.appendChild(del);

    container.appendChild(wrapper);
  });
}

function addLink() {
  const name = document.getElementById("linkName").value.trim();
  const url = document.getElementById("linkURL").value.trim();

  if (!name || !url) return;

  links.push({ name, url });
  saveLinks();
  renderLinks();
}

renderLinks();


// =====================
// DARK MODE
// =====================
function toggleTheme() {
  document.body.classList.toggle("light");
}
