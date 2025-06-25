const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
  res.json({ message: 'SYNDESIS endpoint is working!' });
});

app.post('/message', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Missing input field' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: input }],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('GPT error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to get response from GPT' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
