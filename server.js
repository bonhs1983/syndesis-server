const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post("/message", async (req, res) => {
  const userInput = req.body.input;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Μιλάς ως SYNDESIS: ήρεμος, direct, καθοδηγητικός. Δεν φλυαρείς. Παρακολουθείς τον χρήστη σε βάθος, του δίνεις σαφή βήματα ή ερωτήσεις για εσωτερική καθοδήγηση. Δεν προσποιείσαι ότι είσαι άνθρωπος.",
          },
          {
            role: "user",
            content: userInput,
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Δεν έλαβα απάντηση.";

    res.json({ reply });
  } catch (error) {
    console.error("GPT error:", error);
    res.status(500).json({ reply: "Σφάλμα σύνδεσης με GPT." });
  }
});

app.get("/", (req, res) => {
  res.send("SYNDESIS endpoint is working!");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
