import { useState } from "react";

export function useFilters() {
  const [filters, setFilters] = useState({
    type: null,
    status: null,
    rating: null,
    genre: null,
    country: null,
  });

  function setFilter(key, value) {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  }

  return { filters, setFilter };
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "4px 10px",
        borderRadius: "999px",
        border: "1px solid var(--line)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#0b0b10" : "var(--text)",
        fontSize: "12px",
        cursor: "pointer",
        marginRight: "6px",
        marginBottom: "6px",
      }}
    >
      {children}
    </button>
  );
}

export function FiltersPanel({ filters, setFilter, sort, onSortChange, totalCount }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      <div style={{ fontSize: "13px", opacity: 0.8 }}>
        {totalCount} titles
      </div>

      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
          Sort by
        </div>
        {["date", "rating", "year", "title"].map((opt) => (
          <Chip key={opt} active={sort === opt} onClick={() => onSortChange(opt)}>
            {opt}
          </Chip>
        ))}
      </div>

      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
          Filters
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ marginBottom: "4px" }}>Type</div>
          {["Movie", "Show"].map((opt) => (
            <Chip
              key={opt}
              active={filters.type === opt}
              onClick={() => setFilter("type", opt)}
            >
              {opt}
            </Chip>
          ))}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ marginBottom: "4px" }}>Status</div>
          {["Released", "Upcoming"].map((opt) => (
            <Chip
              key={opt}
              active={filters.status === opt}
              onClick={() => setFilter("status", opt)}
            >
              {opt}
            </Chip>
          ))}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ marginBottom: "4px" }}>Rating</div>
          {[7, 8, 9, 10].map((opt) => (
            <Chip
              key={opt}
              active={filters.rating === opt}
              onClick={() => setFilter("rating", opt)}
            >
              {opt}+
            </Chip>
          ))}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ marginBottom: "4px" }}>Genre</div>
          {["Sci-Fi", "Drama", "Comedy", "Horror", "Crime", "Mystery", "Action"].map(
            (opt) => (
              <Chip
                key={opt}
                active={filters.genre === opt}
                onClick={() => setFilter("genre", opt)}
              >
                {opt}
              </Chip>
            )
          )}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ marginBottom: "4px" }}>Country</div>
          {["USA", "UK", "Canada", "Japan", "Korea"].map((opt) => (
            <Chip
              key={opt}
              active={filters.country === opt}
              onClick={() => setFilter("country", opt)}
            >
              {opt}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
