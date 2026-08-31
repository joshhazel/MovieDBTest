import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite
const db = new Database(path.join(__dirname, 'media.db'));

// Create Media table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS media (
    id INTEGER PRIMARY KEY,                 -- TMDB ID
    type TEXT,                              -- movie / tv
    title TEXT,
    alt_title_en TEXT,

    -- FILTERABLE FIELDS
    release_year INTEGER,
    runtime INTEGER,
    vote_average REAL,
    popularity REAL,
    budget INTEGER,
    revenue INTEGER,
    certification TEXT,
    original_language TEXT,
    spoken_languages TEXT,                  -- "English,French"
    production_countries TEXT,              -- "US,UK"

    -- NAME-BASED FILTER FIELDS
    genre_names TEXT,                       -- "Action,Comedy"
    cast_names TEXT,                        -- "Tom Hanks,Meg Ryan"
    director_names TEXT,                    -- "James Cameron"
    keyword_names TEXT,                     -- "time travel,dystopia"
    company_names TEXT,                     -- "Warner Bros,Village Roadshow"

    -- USER INTERACTION
    user_rating INTEGER,                    -- 1–5
    user_watched INTEGER,                   -- 0/1
    watched_date TEXT,                      -- ISO date

    -- RAW TMDB PAYLOAD
    raw_json TEXT                           -- entire TMDB movie details JSON
  );
`);


console.log("SQLite initialized with media schema.");

export default db;
