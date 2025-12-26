const ADMIN_PASSWORD = "1234"; // CHANGE THIS

function login() {
  const pass = document.getElementById("password").value;
  if (pass !== ADMIN_PASSWORD) {
    alert("Wrong password");
    return;
  }
  document.getElementById("adminPanel").style.display = "block";
  loadConfessions();
}

function loadConfessions() {
  let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
  const list = document.getElementById("confessionList");
  list.innerHTML = "";

  confessions.forEach((c, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <small>${c.time}</small><br>
      ${c.message}<br>
      <button onclick="deleteConfession(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteConfession(index) {
  let confessions = JSON.parse(localStorage.getItem("confessions")) || [];
  confessions.splice(index, 1);
  localStorage.setItem("confessions", JSON.stringify(confessions));
  loadConfessions();
}

function clearConfessions() {
  if (!confirm("Delete ALL confessions?")) return;
  localStorage.removeItem("confessions");
  loadConfessions();
}

function exportConfessions() {
  let data = localStorage.getItem("confessions");
  if (!data) {
    alert("No confessions to export.");
    return;
  }

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "confessions_backup.json";
  a.click();

  URL.revokeObjectURL(url);
}
