// ===== GREETING + CLOCK =====
function updateTime() {
  const now = new Date();
  const hours = now.getHours();

  let greetingText = "Hello";
  if (hours < 12) greetingText = "Good Morning";
  else if (hours < 18) greetingText = "Good Afternoon";
  else greetingText = "Good Evening";

  document.getElementById("greeting").textContent = greetingText;
  document.getElementById("datetime").textContent = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

// ===== TIMER =====
let time = 1500; // 25 minutes
let timerInterval;

function updateTimerDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  document.getElementById("timer").textContent =
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

// ===== TODO LIST =====
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
      <span onclick="toggleTask(${index})" class="${task.done ? 'completed' : ''}">
        ${task.text}
      </span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  // Prevent duplicate
  if (tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
    alert("Task already exists!");
    return;
  }

  tasks.push({ text, done: false });
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

function sortTasks() {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  saveTasks();
  renderTasks();
}

renderTasks();

// ===== QUICK LINKS =====
let links = JSON.parse(localStorage.getItem("links")) || [];

function saveLinks() {
  localStorage.setItem("links", JSON.stringify(links));
}

function renderLinks() {
  const list = document.getElementById("linkList");
  list.innerHTML = "";

  links.forEach((link, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="${link.url}" target="_blank">${link.name}</a>
      <button onclick="deleteLink(${index})">X</button>
    `;

    list.appendChild(li);
  });
}

function addLink() {
  const name = document.getElementById("linkName").value.trim();
  const url = document.getElementById("linkURL").value.trim();

  if (!name || !url) return;

  links.push({ name, url });
  saveLinks();
  renderLinks();

  document.getElementById("linkName").value = "";
  document.getElementById("linkURL").value = "";
}

function deleteLink(index) {
  links.splice(index, 1);
  saveLinks();
  renderLinks();
}

renderLinks();

// ===== DARK MODE =====
const toggleBtn = document.getElementById("toggleMode");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
