const form = document.getElementById('confessionForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = document.getElementById('confessionText').value.trim();
  if (text.length === 0) return;

  try {
    await db.collection('confessions').add({
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    message.innerText = "Confession submitted anonymously!";
    form.reset();
  } catch (err) {
    console.error(err);
    message.innerText = "Error submitting confession.";
  }
});
