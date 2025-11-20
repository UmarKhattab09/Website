// Toggle Chatbot Popup
document.getElementById("hero-chatbot").onclick =
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

  // Typing indicator
  const typingIndicator = document.createElement("p");
  typingIndicator.id = "typing";
  typingIndicator.innerHTML = "<b>Bot:</b> typing...";
  messagesDiv.appendChild(typingIndicator);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
    // const res = await fetch("http://localhost:3000/api/chat", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    const raw = await res.text();
    let data;

    // Ensure JSON
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("Non-JSON:", raw);
      throw new Error("Non-JSON response from server");
    }

    if (!res.ok) {
      throw new Error(data.error || "Server error");
    }

    typingIndicator.remove();
    messagesDiv.innerHTML += `<p><b>Bot:</b> ${data.reply}</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

  } catch (err) {
    typingIndicator.remove();
    messagesDiv.innerHTML += `<p><b>Bot:</b> Something went wrong. Try again.</p>`;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    console.error("Chatbot error:", err.message);
  }
};

// Send on Enter key
document.getElementById("chatbot-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("chatbot-send").click();
  }
});
