import { useState } from "react";
import PosterGrid from "./PosterGrid.jsx";
import Toolbar from "./Toolbar.jsx";
import { FiltersPanel, useFilters } from "./Filters.jsx";
import data from "./data/mockLibrary.js";

export default function Library() {
  const { filters, setFilter } = useFilters();
  const [sort, setSort] = useState("date");
  const [viewMode, setViewMode] = useState("grid");
  const [size, setSize] = useState(1);

  const filtered = data.filter((item) => {
    if (filters.type && item.type !== filters.type) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.rating && item.rating < filters.rating) return false;
    if (filters.genre && item.genre !== filters.genre) return false;
    if (filters.country && item.country !== filters.country) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "date") return b.id - a.id;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "year") return b.year - a.year;
    if (sort === "title") return a.title.localeCompare(b.title);
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
  <div style={{width: "240px", flexShrink: 0 }}>
    <Toolbar.NavRow />
  </div>

  {/* RIGHT: Toolbar takes remaining space */}
  <div style={{flex: 1 }}>
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
        <div
          style={{
            width: "260px",
            flexShrink: 0,
            maxHeight: "calc(100vh - 160px)",
            overflowY: "auto",
          }}
        >
          <FiltersPanel
            filters={filters}
            setFilter={setFilter}
            sort={sort}
            onSortChange={setSort}
            totalCount={sorted.length}
          />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <PosterGrid items={sorted} viewMode={viewMode} size={size} />
        </div>
      </div>
    </div>
  );
}
