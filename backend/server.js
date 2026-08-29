const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const db = require('./db/init');   // <-- NEW

const app = express();

app.use(cors());
app.use(express.json());

// GET /api/movies → read from SQLite
app.get('/api/movies', (req, res) => {
  const movies = db.prepare("SELECT * FROM Movies").all();
  res.json(movies);
});

// POST /api/play → unchanged
app.post('/api/play', (req, res) => {
  const { filePath } = req.body;
  console.log(`Received request to play: ${filePath}`);

  exec(`start "" "${filePath}"`, (error) => {
    if (error) {
      console.error("OS Execution Error:", error);
      return res.status(500).json({ error: "Could not open file" });
    }
    return res.json({ success: true });
  });
});

app.listen(5000, () => console.log('Backend listening on http://localhost:5000'));
