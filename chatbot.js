// Toggle Chatbot Popup
document.getElementById("chatbot-button").onclick = () => {
  const popup = document.getElementById("chatbot-popup");
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
};

// Send Message
document.getElementById("chatbot-send").onclick = async () => {
  const input = document.getElementById("chatbot-input");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  const messagesDiv = document.getElementById("chatbot-messages");
  messagesDiv.innerHTML += `<p><b>You:</b> ${userMessage}</p>`;
  input.value = "";

  // Call backend
  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  });

  const data = await res.json();
  messagesDiv.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
};
