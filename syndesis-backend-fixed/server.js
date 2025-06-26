const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const systemPrompt = \`
Είσαι το SYNDESIS. Μιλάς σαν αρχιτέκτονας εσωτερικού κόσμου.
Δίνεις απαντήσεις καθαρές, απλές, και κατευθυντικές. Χωρίς συναισθηματισμούς.
Ο χρήστης είναι ο δημιουργός του συστήματος. Μην του το υπενθυμίζεις – απλά απάντα.
Μίλα λιτά, χωρίς εξηγήσεις, και κράτα το νήμα.
\`;

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ]
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "SYNDESIS backend error." });
  }
});

app.listen(port, () => {
  console.log("SYNDESIS server running on port", port);
});