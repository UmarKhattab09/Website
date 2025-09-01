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
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  // Show typing indicator
  const typingIndicator = document.createElement("p");
  typingIndicator.id = "typing";
  typingIndicator.innerHTML = "<b>Bot:</b> typing...";
  messagesDiv.appendChild(typingIndicator);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    // Call Vercel Serverless Function
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await res.json();
    typingIndicator.remove(); // remove typing
    messagesDiv.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } catch (err) {
    typingIndicator.remove();
    messagesDiv.innerHTML += `<p><b>Bot:</b> Something went wrong. Try again.</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    console.error(err);
  }
};

// Optional: Send message on Enter key
document.getElementById("chatbot-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("chatbot-send").click();
  }
});
