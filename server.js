const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
  res.json({ message: "SYNDESIS endpoint is working!" });
});

app.post('/message', (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Missing input field' });
  }

  // Placeholder απάντηση — εδώ μπορείς να συνδέσεις GPT αργότερα
  const response = `Λάβαμε το μήνυμά σου: "${input}"`;

  res.json({ reply: response });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
