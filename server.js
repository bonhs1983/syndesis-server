import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('SYNDESIS backend is working!');
});

app.listen(port, () => {
  console.log(`SYNDESIS Server running on port ${port}`);
});