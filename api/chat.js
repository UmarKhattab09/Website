// import fetch from "node-fetch";

// export default async function handler(req, res) {
//   try {
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }

//     const { message } = req.body;

//     const portfolioContext = `
// Umar Khattab is a Data Science student. Skills: HTML/CSS, Python, Java, Machine Learning Libraries.
// Projects: Shopping AI Assistant, Model Context Protocol, RAG Project, WebScraping with LLM FineTuning, 
// TV Show Analyzer AI/NLP, AI Agents for Patients, AI Agent Chatbots, Customer Churn Prediction, 
// PowerBI Dashboard, Data Analyst, DiscordBot, Machine Learning Projects, NLP Projects, Neural Network, 
// Data Pipeline, Google Gemini Resume Checker, Heart Disease Classification, Docker.
// `;
//     console.log("ENV KEY?", process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌");
//     if (!process.env.GEMINI_API_KEY) {
//       return res.status(500).json({ error: "Server error: API key not set." });
//     }

    // const response = await fetch(
    //   `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       contents: [
    //         {
    //           role: "user",
    //           parts: [
    //             { text: `You are Umar's personal AI assistant. Use this info: ${portfolioContext} Question: ${message}` }
    //           ]
    //         }
    //       ]
    //     })
    //   }
    // );

//     const data = await response.json();

//     if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
//       return res.status(500).json({ error: "Something went wrong with Gemini API." });
//     }

//     return res.status(200).json({ reply: data.candidates[0].content.parts[0].text });
//   } catch (err) {
//     console.error("API Error:", err);
//     return res.status(500).json({ error: "Server error: " + err.message });
//   }
// }




export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { message } = req.body;
    const portfolioContext = `
      Umar Khattab is a Data Science student. Skills: HTML/CSS, Python, Java, Machine Learning Libraries.
      Projects: Shopping AI Assistant, Model Context Protocol, RAG Project, WebScraping with LLM FineTuning, 
      TV Show Analyzer AI/NLP, AI Agents for Patients, AI Agent Chatbots, Customer Churn Prediction, 
      PowerBI Dashboard, Data Analyst, DiscordBot, Machine Learning Projects, NLP Projects, Neural Network, 
      Data Pipeline, Google Gemini Resume Checker, Heart Disease Classification, Docker.
      Always answer in less then 100 words.
`;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "API key not set" });
    }else {
      console.log("API Key is set");
    }
      const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: `You are Umar's personal AI assistant. Use this info: ${portfolioContext} Question: ${message}` }
              ]
            }
          ]
        })
      }
    );
    const data = await response.json();
    const geminireply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log(geminireply)


    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Just echo back for now
    return res.status(200).json({ reply: `${geminireply}` });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
