let tickets = [];
let inProgress = [];
let resolved = [];

// Load tickets from JSON
fetch("tickets.json")
  .then(res => res.json())
  .then(data => {
    tickets = data;
    renderTickets();
  });



// Render tickets
function renderTickets() {
  const container = document.getElementById("ticketsList");
  container.innerHTML = "";
  tickets.forEach(ticket => {
    const card = document.createElement("div");
    card.className = "ticket-card";
    card.innerHTML = `
      <h4>${ticket.title}</h4>
      <p>${ticket.description}</p>
      <small>${ticket.customer}</small>
      <div class="ticket-footer">
        <span style="color: red;  ">${ticket.priority}</span>
        <button onclick="addToTask(${ticket.id})">${ticket.status}</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Add to Task Status
function addToTask(id) {
  const ticket = tickets.find(t => t.id === id);
  if (!ticket) return;

  inProgress.push(ticket);
  tickets = tickets.filter(t => t.id !== id);

  renderTickets();
  renderTasks();
  updateCounts();

  Toastify({
    text: "In Progress!",
    duration: 3000,
    style: {
      background: "#fff",
      color: "black",
    }
  }).showToast();  
}

// Render tasks
function renderTasks() {
  const container = document.getElementById("taskStatus");
  const msg = document.getElementById("noTaskMsg");
  msg.style.display = inProgress.length ? "none" : "block";

  container.querySelectorAll(".task-item").forEach(e => e.remove());

  inProgress.forEach(task => {
    const div = document.createElement("div");
    div.className = "task-item";
    div.innerHTML = `
      <span>${task.title}</span> <br>
      <button style="margin-bottom: 20px; margin-top:10px; padding: 10px 20px; border: none; cursor: pointer; border-radius: 4px; background: green; color: white; width: 100%" onclick="completeTask(${task.id})">Complete</button>
    `;
    container.appendChild(div);
  });
}

// Complete Task
function completeTask(id) {
  const task = inProgress.find(t => t.id === id);
  if (!task) return;

  resolved.push(task);
  inProgress = inProgress.filter(t => t.id !== id);

  renderTasks();
  updateCounts();

  Toastify({
    text: `Completed!`,
    duration: 3000,
    style:{
      background: "#fff",
      color: "black",   
    }
  }).showToast();
}

// Update Counts
function updateCounts() {
  document.getElementById("inProgressCount").innerText = inProgress.length;
  document.getElementById("resolvedCount").innerText = resolved.length;
}
