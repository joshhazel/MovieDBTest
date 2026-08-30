import fs from 'fs';
import path from 'path';
import db from '../db/init.js';

const VIDEO_FORMATS = [
  ".avi", ".asf", ".mkv", ".mov", ".m4v", ".mp4",
  ".mpeg", ".mpg", ".rm", ".rmvb", ".wmv", ".ts"
];

const LIBRARIES = [
  { name: "Movies", root: "M:\\Movies" },
  { name: "Movies 3D", root: "M:\\Movies 3D" },
  { name: "Movies 4K", root: "M:\\Movies 4K" },
  { name: "Movies Live Concert", root: "M:\\Movies Live Concert" },
  { name: "Movies Standup", root: "M:\\Movies Standup" }
];

export function scanMovies() {
  console.log("=== Movie Scan Started ===");

  const results = [];

  for (const lib of LIBRARIES) {
    console.log(`\nScanning library: ${lib.name}`);
    console.log(`Root: ${lib.root}`);

    if (!fs.existsSync(lib.root)) {
      console.log(`⚠ Library root does not exist: ${lib.root}`);
      continue;
    }

    const movieFolders = fs.readdirSync(lib.root);

    for (const folder of movieFolders) {
      const folderPath = path.join(lib.root, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      console.log(`\n📁 Folder: ${folder}`);

      const identity = parseMovieIdentity(folder);
      if (!identity) {
        console.log(`  ❌ Skipped (no year found): ${folder}`);
        continue;
      }

      console.log(`  🎬 Movie: ${identity.title} (${identity.year})`);

      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!VIDEO_FORMATS.includes(ext)) continue;

        const fullPath = path.join(folderPath, file);
        const stats = fs.statSync(fullPath);

        console.log(`    📄 File: ${file}`);

        const row = {
          title: identity.title,
          year: identity.year,
          imdb_id: identity.imdb_id,
          tmdb_id: identity.tmdb_id,

          full_path: fullPath,
          folder_path: folderPath,
          root_path: lib.root,
          library: lib.name,
          filename: file,
          extension: ext,

          size: stats.size,
          modified_time: stats.mtimeMs
        };

        results.push(row);
      }
    }
  }

  const summary = syncDatabase(results);

  console.log("\n=== Movie Scan Complete ===");
  console.log(`Added:   ${summary.added}`);
  console.log(`Updated: ${summary.updated}`);
  console.log(`Deleted: ${summary.deleted}`);
  console.log(`Total scanned files: ${results.length}`);

  return results;
}

function parseMovieIdentity(folderName) {
  const yearMatch = folderName.match(/\((\d{4})\)/);
  if (!yearMatch) return null;

  const year = parseInt(yearMatch[1], 10);
  const title = folderName.split(`(${year})`)[0].trim();

  let imdb_id = null;
  let tmdb_id = null;

  const idMatch = folderName.match(/\{(imdb-[^\}]+|tmdb-[^\}]+)\}/);
  if (idMatch) {
    const id = idMatch[1];
    if (id.startsWith("imdb-")) imdb_id = id.replace("imdb-", "");
    if (id.startsWith("tmdb-")) tmdb_id = id.replace("tmdb-", "");
  }

  return { title, year, imdb_id, tmdb_id };
}

function syncDatabase(scanRows) {
  const existing = db.prepare("SELECT * FROM moviefile").all();

  const existingMap = new Map(existing.map(r => [r.full_path, r]));

  const insert = db.prepare(`
    INSERT INTO moviefile (
      title, year, imdb_id, tmdb_id,
      full_path, folder_path, root_path, library,
      filename, extension, size, modified_time
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const update = db.prepare(`
    UPDATE moviefile SET
      title=?, year=?, imdb_id=?, tmdb_id=?,
      folder_path=?, root_path=?, library=?,
      filename=?, extension=?, size=?, modified_time=?
    WHERE full_path=?
  `);

  const del = db.prepare("DELETE FROM moviefile WHERE full_path=?");

  const scanMap = new Map(scanRows.map(r => [r.full_path, r]));

  let added = 0;
  let updated = 0;
  let deleted = 0;

  // ADD + CHANGE
  for (const row of scanRows) {
    const existingRow = existingMap.get(row.full_path);

    if (!existingRow) {
      console.log(`➕ Added: ${row.filename}`);
      insert.run(
        row.title, row.year, row.imdb_id, row.tmdb_id,
        row.full_path, row.folder_path, row.root_path, row.library,
        row.filename, row.extension, row.size, row.modified_time
      );
      added++;
    } else if (
      existingRow.size !== row.size ||
      existingRow.modified_time !== row.modified_time
    ) {
      console.log(`🔄 Updated: ${row.filename}`);
      update.run(
        row.title, row.year, row.imdb_id, row.tmdb_id,
        row.folder_path, row.root_path, row.library,
        row.filename, row.extension, row.size, row.modified_time,
        row.full_path
      );
      updated++;
    }
  }

  // DELETE
  for (const existingRow of existing) {
    if (!scanMap.has(existingRow.full_path)) {
      console.log(`🗑 Deleted: ${existingRow.filename}`);
      del.run(existingRow.full_path);
      deleted++;
    }
  }

  return { added, updated, deleted };
}
