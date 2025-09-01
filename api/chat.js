import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  // Your preloaded portfolio info
  const portfolioContext = `
Umar Khattab is a Data Science student. Skills: HTML/CSS, Python, Java, Machine Learning Libraries.
Projects include Shopping AI Assistant, Model Context Protocol, RAG Project, WebScraping with LLM FineTuning, TV Show Analyzer AI/NLP, AI Agents for Patients, AI Agent Chatbots, Customer Churn Prediction, PowerBI Dashboard, Data Analyst, DiscordBot, Machine Learning Projects, NLP Projects, Neural Network, Data Pipeline, Google Gemini Resume Checker, Heart Disease Classification, Docker.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are Umar's personal AI assistant. Use the following info to answer questions accurately: ${portfolioContext} Question: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const reply = data.candidates[0]?.content?.parts[0]?.text || "Sorry, I didn't understand that.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Something went wrong." });
  }
}
