import { useState } from "react";
import PosterGrid from "./PosterGrid.jsx";
import Toolbar from "./Toolbar.jsx";
import { FiltersPanel } from "./Filters.jsx";
import { mockLibrary } from "/src/data/mockLibrary.js";

export default function Library() {
  // Unified filter state (matches Filters.jsx)
  const [filters, setFilters] = useState({
    release_date: { min: null, max: null },
    runtime: { min: null, max: null },
    vote_average: { min: null, max: null },
    popularity: { min: null, max: null },
    user_rating: { value: null, mode: "gte" },
    user_watched: null,
    certification: [],
    cast: [],
    directors: [],
    budget: null,
    revenue: null,
    original_language: null,
    spoken_languages: null,
    production_countries: [],
    keywords: [],
    production_companies: [],
  });

  // Sorting (default: title)
  const [sort, setSort] = useState("title");

  // View mode + size
  const [viewMode, setViewMode] = useState("grid");
  const [size, setSize] = useState(1);

const filtered = mockLibrary.filter((item) => {
  // RELEASE DATE
  if (filters.release_date.min !== null && item.year !== undefined && item.year < filters.release_date.min)
    return false;
  if (filters.release_date.max !== null && item.year !== undefined && item.year > filters.release_date.max)
    return false;

  // RUNTIME
  if (filters.runtime.min !== null && item.runtime !== undefined && item.runtime < filters.runtime.min)
    return false;
  if (filters.runtime.max !== null && item.runtime !== undefined && item.runtime > filters.runtime.max)
    return false;

  // VOTE AVERAGE (fallback to item.rating if vote_average missing)
  const voteAvg = item.vote_average ?? item.rating ?? null;
  if (filters.vote_average.min !== null && voteAvg !== null && voteAvg < filters.vote_average.min)
    return false;
  if (filters.vote_average.max !== null && voteAvg !== null && voteAvg > filters.vote_average.max)
    return false;

  // POPULARITY
  if (filters.popularity.min !== null && item.popularity !== undefined && item.popularity < filters.popularity.min)
    return false;
  if (filters.popularity.max !== null && item.popularity !== undefined && item.popularity > filters.popularity.max)
    return false;

  // USER RATING (your own rating)
  if (filters.user_rating.value !== null && item.user_rating !== undefined) {
    if (filters.user_rating.mode === "eq" && item.user_rating !== filters.user_rating.value)
      return false;
    if (filters.user_rating.mode === "gte" && item.user_rating < filters.user_rating.value)
      return false;
    if (filters.user_rating.mode === "lte" && item.user_rating > filters.user_rating.value)
      return false;
  }

  // WATCHED
  if (filters.user_watched === "yes" && item.user_watched === false)
    return false;
  if (filters.user_watched === "no" && item.user_watched === true)
    return false;

  // CERTIFICATION
  if (filters.certification.length > 0 && item.certification !== undefined) {
    if (!filters.certification.includes(item.certification))
      return false;
  }

  // ORIGINAL LANGUAGE
  if (filters.original_language === "en" && item.original_language !== undefined && item.original_language !== "en")
    return false;
  if (filters.original_language === "non-en" && item.original_language !== undefined && item.original_language === "en")
    return false;

  // SPOKEN LANGUAGES
  if (filters.spoken_languages === "en" && Array.isArray(item.spoken_languages)) {
    if (!item.spoken_languages.includes("en"))
      return false;
  }
  if (filters.spoken_languages === "non-en" && Array.isArray(item.spoken_languages)) {
    if (item.spoken_languages.includes("en"))
      return false;
  }

  // PRODUCTION COUNTRIES
  if (filters.production_countries.length > 0 && Array.isArray(item.production_countries)) {
    if (!filters.production_countries.some((c) => item.production_countries.includes(c)))
      return false;
  }

  // KEYWORDS
  if (filters.keywords.length > 0 && Array.isArray(item.keywords)) {
    if (!filters.keywords.every((k) => item.keywords.includes(k)))
      return false;
  }

  // PRODUCTION COMPANIES
  if (filters.production_companies.length > 0 && Array.isArray(item.production_companies)) {
    if (!filters.production_companies.some((c) => item.production_companies.includes(c)))
      return false;
  }

  // BUDGET
  if (filters.budget && filters.budget.min !== null && item.budget !== undefined && item.budget < filters.budget.min)
    return false;
  if (filters.budget && filters.budget.max !== null && item.budget !== undefined && item.budget > filters.budget.max)
    return false;

  // REVENUE
  if (filters.revenue && filters.revenue.min !== null && item.revenue !== undefined && item.revenue < filters.revenue.min)
    return false;
  if (filters.revenue && filters.revenue.max !== null && item.revenue !== undefined && item.revenue > filters.revenue.max)
    return false;

  return true;
});

  // Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "release_date") return (b.year || 0) - (a.year || 0);
    if (sort === "runtime") return (b.runtime || 0) - (a.runtime || 0);
    if (sort === "vote_average") return (b.vote_average || 0) - (a.vote_average || 0);
    if (sort === "vote_count") return (b.vote_count || 0) - (a.vote_count || 0);
    if (sort === "popularity") return (b.popularity || 0) - (a.popularity || 0);
    if (sort === "budget") return (b.budget || 0) - (a.budget || 0);
    if (sort === "revenue") return (b.revenue || 0) - (a.revenue || 0);
    if (sort === "user_rating") return (b.user_rating || 0) - (a.user_rating || 0);
    if (sort === "user_watched") return (b.user_watched || 0) - (a.user_watched || 0);
    return 0;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "16px 24px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Combined Menu + Toolbar Row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "10px",
          borderBottom: "1px solid var(--line)",
          gap: "24px",
        }}
      >
        {/* LEFT: Menu with fixed width */}
        <div style={{ width: "240px", flexShrink: 0 }}>
          <Toolbar.NavRow />
        </div>

        {/* RIGHT: Toolbar takes remaining space */}
        <div style={{ flex: 1 }}>
          <Toolbar.MainRow
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            size={size}
            onSizeChange={setSize}
          />
        </div>
      </div>

      {/* Main content: scrollable filters pane + poster grid */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          marginTop: "12px",
          minHeight: "0",
        }}
      >
        {/* Filters Panel */}
<div
  style={{
    width: "260px",
    flexShrink: 0,
    position: "sticky",
    top: 0,
    alignSelf: "flex-start",
    height: "80vh",
    overflowY: "auto",
  }}
>

          <FiltersPanel
            filters={filters}
            setFilters={setFilters}
            sort={sort}
            onSortChange={setSort}
            totalCount={sorted.length}
          />
        </div>

        {/* Poster Grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <PosterGrid items={sorted} viewMode={viewMode} size={size} />
        </div>
      </div>
    </div>
  );
}
