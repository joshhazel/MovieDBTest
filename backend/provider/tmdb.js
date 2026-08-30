import { bestMatch } from "./matchHelper.js";

const BASE = 'https://api.themoviedb.org/3';

export async function searchMovie(title, year) {
  const API_KEY = process.env.TMDB_API_KEY;
  const url =
    `${BASE}/search/movie?api_key=${API_KEY}` +
    `&query=${encodeURIComponent(title)}` +
    `&include_adult=false` +
    (year ? `&year=${year}` : "") +
    `&language=en-US`;
  const res = await fetch(url);
  const data = await res.json();
  //return data.results?.[0] || null;
  return data.results || null;
}

export async function getMovieDetails(id) {
  const API_KEY = process.env.TMDB_API_KEY;
  const url = `${BASE}/movie/${id}?api_key=${API_KEY}&append_to_response=images,credits`;
  const res = await fetch(url);
  return await res.json();
}

export async function matchMovie(title, year, mode = "best") {
  const results = await searchMovie(title, year);
  return bestMatch(results, title, year, mode, "movie");
}
