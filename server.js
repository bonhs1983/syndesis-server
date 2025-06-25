// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Enable CORS only for syndesis.social
app.use(cors({
  origin: ['https://syndesis.social', 'http://localhost:3000']
}));

app.use(express.json());

app.post('/api/tunnel', async (req, res) => {
  // ...GPT logic here
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
