// .env File
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';

//My functions
import { scanMovies } from './scanner/movieScanner.js';
import { searchMovie, getMovieDetails, matchMovie } from './provider/tmdb.js';
import db from './db/init.js';

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

// Add an API route to trigger the scan
app.post("/scan/movies", (req, res) => {
  try {
    const results = scanMovies();
    res.json({ success: true, count: results.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// TMDB Test Route
app.get('/api/tmdb/test', async (req, res) => {
  const movie = await searchMovie("Cinderella", 2000);
  if (!movie) return res.json({ error: "Not found" });

  const details = await getMovieDetails(movie.id);
  res.json(details);
});

// SEARCH endpoint
app.get('/api/tmdb/search', async (req, res) => {
  const { title, year } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Missing title parameter" });
  }

  const results = await searchMovie(title, year ? Number(year) : null);
  res.json(results || []);
});

// GET MOVIE DETAILS endpoint
app.get('/api/tmdb/movie/:id', async (req, res) => {
  const { id } = req.params;

  const details = await getMovieDetails(id);
  if (!details) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(details);
});

// MATCH MOVIE endpoint
app.get('/api/tmdb/match/movie', async (req, res) => {
  const { title, year, mode } = req.query;

  if (!title) {
    return res.status(400).json({ error: "Missing title parameter" });
  }

  try {
    const result = await matchMovie(title, Number(year), mode || "best");
    res.json(result);
  } catch (err) {
    console.error("TMDB matchMovie error:", err);
    res.status(500).json({ error: "Match failed" });
  }
});


app.listen(5000, () => console.log('Backend listening on http://localhost:5000'));
