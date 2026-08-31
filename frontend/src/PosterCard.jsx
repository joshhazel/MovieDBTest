import { useState } from "react";

export default function PosterCard({ item, size }) {
  // Local mock state (no backend)
  const [watched, setWatched] = useState(item.status === "Released");
  const [rating, setRating] = useState(Math.round(item.rating / 2)); // convert 7.4 → 4 stars

  // ⭐ Hover-expand state MUST be inside the component
  const [expanded, setExpanded] = useState(false);

  function toggleWatched() {
    setWatched((prev) => !prev);
  }

  function handleStarClick(star) {
    if (star === rating) {
      setRating(0); // clicking same star resets rating
    } else {
      setRating(star);
    }
  }

  return (
    <div
      style={{
        width: `${190 * size}px`,
        borderRadius: "12px",
        border: "1px solid var(--line)",
        background: "var(--elevated)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 18px 40px rgba(0,0,0,0.6)",
      }}
    >
      {/* Poster image area */}
      <div
        style={{
          position: "relative",
          height: `${270 * size}px`,
          background: "#222",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text)",
          fontSize: "13px",
          opacity: 0.7,
        }}
      >
        {/* Clickable checkmark */}
        <div
          onClick={toggleWatched}
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            width: "26px",
            height: "26px",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.4)",
            background: watched ? "var(--accent)" : "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {watched ? "✓" : ""}
        </div>

        Cover art
      </div>

      {/* Text area */}
      <div
        style={{
          padding: "12px",
          background: "rgba(255,255,255,0.04)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          color: "var(--text)",
          textAlign: "left",
        }}
      >
        {/* Clickable stars */}
        <div style={{ fontSize: "18px", cursor: "pointer" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{
                marginRight: "4px",
                color: star <= rating ? "var(--accent)" : "rgba(255,255,255,0.3)",
              }}
            >
              ★
            </span>
          ))}

          {/* Reset option */}
          <span
            onClick={() => setRating(0)}
            style={{
              marginLeft: "6px",
              fontSize: "14px",
              opacity: 0.6,
              cursor: "pointer",
            }}
          >
            reset
          </span>
        </div>

        {/* Title + year on same line */}
        <div style={{ fontSize: "17px", fontWeight: 600 }}>
          {item.title}{" "}
          <span style={{ fontWeight: 400, opacity: 0.85 }}>({item.year})</span>
        </div>

        {/* Genres */}
        <div style={{ fontSize: "15px", opacity: 0.85 }}>
          {item.genre.includes("·") ? item.genre : item.genre.replace(",", " · ")}
        </div>

        {/* ⭐ Hover-expand synopsis */}
        <div
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
          style={{
            fontSize: "14px",
            opacity: 0.9,
            lineHeight: "1.45",
            overflow: "hidden",
            display: expanded ? "block" : "-webkit-box",
            WebkitLineClamp: expanded ? "unset" : 4,
            WebkitBoxOrient: "vertical",
            maxHeight: expanded ? "none" : "6.5em",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
        >
          {item.synopsis}
        </div>
      </div>
    </div>
  );
}
