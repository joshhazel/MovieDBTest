import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite
const db = new Database(path.join(__dirname, 'media.db'));

// Create Movies table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS Movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    filePath TEXT NOT NULL
  );
`);

// Seed only if empty
const count = db.prepare("SELECT COUNT(*) AS c FROM Movies").get().c;

if (count === 0) {
  const insert = db.prepare("INSERT INTO Movies (title, year, filePath) VALUES (?, ?, ?)");

  insert.run("Toy Story", 1995, "M:/Movies/Toy Story (1995)/Toy Story (1995).mp4");
  insert.run("Inception", 2010, "M:/Movies/Inception (2010)/Inception (2010).mkv");

  console.log("Seeded initial movies into SQLite.");
}

export default db;
