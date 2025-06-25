const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SYNDESIS backend is working!");
});

// ✅ ΝΕΟ ENDPOINT ΠΟΥ ΕΨΑΧΝΕΣ
app.get("/message", (req, res) => {
  res.json({ message: "SYNDESIS endpoint is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
