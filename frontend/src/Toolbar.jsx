function NavRow() {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        paddingBottom: "8px",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <button
        style={{
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid var(--line)",
          background: "transparent",
          color: "var(--text)",
        }}
      >
        Home
      </button>

      <button
        style={{
          padding: "6px 12px",
          borderRadius: "999px",
          border: "1px solid var(--line)",
          background: "var(--accent)",
          color: "#0b0b10",
        }}
      >
        Library
      </button>

      <button
        style={{
          padding: "6px 10px",
          borderRadius: "999px",
          border: "1px solid var(--line)",
          background: "transparent",
          color: "var(--text)",
          fontSize: "18px",
          lineHeight: "1",
        }}
      >
        ⚙️
      </button>
    </div>
  );
}

function MainRow({ viewMode, onViewModeChange, size, onSizeChange }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "10px",
        paddingBottom: "10px",
        borderBottom: "1px solid var(--line)",
        gap: "16px",
      }}
    >
      {/* Search bar centered-ish above posters */}
<div
  style={{
    flex: 1,
    maxWidth: "420px",
    marginLeft: "0px",   // <-- aligns search bar with posters
  }}
>
  <input
    type="text"
    placeholder="Search titles..."
    style={{
      width: "100%",
      padding: "6px 12px",
      borderRadius: "8px",
      border: "1px solid var(--line)",
      background: "var(--surface)",
      color: "var(--text)",
    }}
  />
</div>


      {/* View modes + size slider */}
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "4px" }}>
          {["grid", "list", "poster"].map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              style={{
                padding: "4px 10px",
                borderRadius: "999px",
                border: "1px solid var(--line)",
                background: viewMode === mode ? "var(--accent)" : "transparent",
                color: viewMode === mode ? "#0b0b10" : "var(--text)",
                textTransform: "capitalize",
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        <input
          type="range"
          min="0.9"
          max="1.3"
          step="0.05"
          value={size}
          onChange={(e) => onSizeChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

export default {
  NavRow,
  MainRow,
};
