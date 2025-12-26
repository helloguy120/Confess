function submitConfession() {
  const text = document.getElementById("confession").value.trim();

  if (!text) {
    alert("Please write something.");
    return;
  }

  let confessions = JSON.parse(localStorage.getItem("confessions")) || [];

  confessions.push({
    message: text,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("confessions", JSON.stringify(confessions));
  document.getElementById("confession").value = "";
  alert("Confession submitted anonymously.");
}
