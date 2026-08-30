import levenshtein from "fast-levenshtein";

/**
 * Universal scoring engine for movies and TV.
 *
 * @param {Array} results - TMDB or TVDB search results
 * @param {string} title - Parsed title from filename
 * @param {number} year - Parsed year from filename
 * @param {string} mode - "best" or "list"
 * @param {string} type - "movie" or "tv"
 */
export function bestMatch(results, title, year, mode = "best", type = "movie") {
  if (!results || results.length === 0) {
    return mode === "list"
      ? { mode: "list", items: [] }
      : { ambiguous: false, confidence: 0, match: null };
  }

  const normalizedTitle = title.toLowerCase();

  const scored = results.map(item => {
    let score = 0;

    // --- 1. Extract year depending on type
    const itemYear =
      type === "movie"
        ? item.release_date?.slice(0, 4)
        : item.first_air_date?.slice(0, 4);

    // --- 2. Year scoring (movies = strict, TV = fuzzy)
    if (itemYear) {
      const diff = Math.abs(itemYear - year);

      if (type === "movie") {
        if (itemYear == year) score += 50;
        else if (diff === 1) score += 20;
      } else {
        // TV shows often have fuzzy year matches
        if (itemYear == year) score += 30;
        else if (diff <= 1) score += 20;
        else if (diff <= 2) score += 10;
      }
    }

    // --- 3. Title similarity (Levenshtein)
    const dist = levenshtein.get(
      item.name?.toLowerCase() || item.title?.toLowerCase(),
      normalizedTitle
    );

    const itemTitle = item.name || item.title || "";
    const maxLen = Math.max(itemTitle.length, title.length);
    const similarity = 1 - dist / maxLen; // 0–1

    score += similarity * 40;

    // --- 4. Popularity weighting
    const pop = item.popularity || 0;
    score += Math.min(pop / 10, 20);

    // --- 5. Release proximity (soft)
    if (itemYear) {
      const diff = Math.abs(itemYear - year);
      score += Math.max(0, 10 - diff);
    }

    // --- Normalize score → confidence (0–1)
    const confidence = score / 120;

    return { item, score, confidence };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // --- If user wants full ranked list
  if (mode === "list") {
    return {
      mode: "list",
      items: scored
    };
  }

  // --- Best-match logic
  const best = scored[0];
  const second = scored[1];

  // Auto-match threshold
  if (best.confidence >= 0.80) {
    // If second place is too close → ambiguous
    if (second && best.score - second.score < 10) {
      return {
        ambiguous: true,
        confidence: best.confidence,
        candidates: scored.map(s => s.item)
      };
    }

    return {
      ambiguous: false,
      confidence: best.confidence,
      match: best.item
    };
  }

  // Ambiguous threshold
  if (best.confidence >= 0.50) {
    return {
      ambiguous: true,
      confidence: best.confidence,
      candidates: scored.map(s => s.item)
    };
  }

  // No match
  return {
    ambiguous: false,
    confidence: best.confidence,
    match: null
  };
}
