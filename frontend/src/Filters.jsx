import { useState } from "react";

/* -------------------------------------------------------
   CHIP — Basic pill button used everywhere
------------------------------------------------------- */
function Chip({ active, onClick, children, style = {} }) {
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
        ...style,
      }}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------
   SECTION — Collapsible filter section with Clear button
------------------------------------------------------- */
function Section({ title, onClear, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginBottom: "0px" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          padding: "0px 0",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ fontSize: "13px", fontWeight: 600 }}>{title}</div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          style={{
            fontSize: "11px",
            padding: "2px 6px",
            borderRadius: "4px",
            background: "transparent",
            border: "1px solid var(--line)",
            color: "var(--text)",
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>

      {open && <div style={{ marginTop: "10px" }}>{children}</div>}
    </div>
  );
}

/* -------------------------------------------------------
   RANGE INPUT — Min/Max numeric input with spinner
------------------------------------------------------- */
function RangeInput({ labelMin, labelMax, valueMin, valueMax, onMinChange, onMaxChange }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "11px", marginBottom: "4px" }}>{labelMin}</div>
        <input
          type="number"
          value={valueMin ?? ""}
          onChange={(e) => onMinChange(e.target.value === "" ? null : Number(e.target.value))}
          style={{
            width: "100%",
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid var(--line)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "11px", marginBottom: "4px" }}>{labelMax}</div>
        <input
          type="number"
          value={valueMax ?? ""}
          onChange={(e) => onMaxChange(e.target.value === "" ? null : Number(e.target.value))}
          style={{
            width: "100%",
            padding: "6px",
            borderRadius: "4px",
            border: "1px solid var(--line)",
            background: "var(--surface)",
            color: "var(--text)",
          }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   TOGGLE — For AND/OR or Exact/GTE/LTE modes
------------------------------------------------------- */
function Toggle({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
      {options.map((opt) => (
        <Chip
          key={opt.value}
          active={value === opt.value}
          onClick={() => onChange(opt.value)}
          style={{ marginBottom: 0 }}
        >
          {opt.label}
        </Chip>
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   SEARCH PILLS — Dynamic pills from search box
------------------------------------------------------- */
function SearchPills({
  search,
  onSearchChange,
  results,
  selected,
  onSelect,
  pinned = [],
}) {
  return (
    <div style={{ marginBottom: "12px" }}>
      {/* Search box */}
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
        style={{
          width: "90%",
          padding: "6px",
          borderRadius: "4px",
          border: "1px solid var(--line)",
          background: "var(--surface)",
          color: "var(--text)",
          marginBottom: "8px",
        }}
      />

      {/* Pinned favorites */}
      {pinned.length > 0 && (
        <div style={{ marginBottom: "6px" }}>
          {pinned.map((p) => (
            <Chip
              key={p}
              active={selected.includes(p)}
              onClick={() => onSelect(p)}
            >
              {p}
            </Chip>
          ))}
        </div>
      )}

      {/* Dynamic search results */}
      <div>
        {results.map((r) => (
          <Chip
            key={r}
            active={selected.includes(r)}
            onClick={() => onSelect(r)}
          >
            {r}
          </Chip>
        ))}
      </div>
    </div>
  );
}
/* -------------------------------------------------------
   RELEASE DATE FILTER
   - Min/Max year
   - Decade pills
   - Open-ended ranges
------------------------------------------------------- */
function ReleaseDateFilter({ value, onChange }) {
  const decades = [
    { label: "60s & earlier", years: [null, 1969] },
    { label: "70s", years: [1970, 1979] },
    { label: "80s", years: [1980, 1989] },
    { label: "90s", years: [1990, 1999] },
    { label: "2000s", years: [2000, 2009] },
    { label: "2010s", years: [2010, 2019] },
    { label: "2020s", years: [2020, 2029] },
  ];

  function setMin(v) {
    onChange({ ...value, min: v });
  }
  function setMax(v) {
    onChange({ ...value, max: v });
  }

  function applyDecade(min, max) {
    onChange({ ...value, min, max });
  }

  return (
    <Section
      title="Release Date"
      onClear={() => onChange({ min: null, max: null })}
    >
      <RangeInput
        labelMin="Min Year"
        labelMax="Max Year"
        valueMin={value.min}
        valueMax={value.max}
        onMinChange={setMin}
        onMaxChange={setMax}
      />

      <div style={{ marginBottom: "6px", fontSize: "12px" }}>Decades</div>
      {decades.map((d) => (
        <Chip
          key={d.label}
          active={false}
          onClick={() => applyDecade(d.years[0], d.years[1])}
        >
          {d.label}
        </Chip>
      ))}
    </Section>
  );
}

/* -------------------------------------------------------
   RUNTIME FILTER
   - Min/Max minutes
   - Preset pills (non-stateful)
------------------------------------------------------- */
function RuntimeFilter({ value, onChange }) {
  const presets = [
    { label: "Short (< 90)", min: 0, max: 90 },
    { label: "Standard (90–120)", min: 90, max: 120 },
    { label: "Long (120–150)", min: 120, max: 150 },
    { label: "Epic (150+)", min: 150, max: null },
  ];

  function setMin(v) {
    onChange({ ...value, min: v });
  }
  function setMax(v) {
    onChange({ ...value, max: v });
  }

  return (
    <Section
      title="Runtime"
      onClear={() => onChange({ min: null, max: null })}
    >
      <RangeInput
        labelMin="Min Minutes"
        labelMax="Max Minutes"
        valueMin={value.min}
        valueMax={value.max}
        onMinChange={setMin}
        onMaxChange={setMax}
      />

      <div style={{ marginBottom: "6px", fontSize: "12px" }}>Presets</div>
      {presets.map((p) => (
        <Chip
          key={p.label}
          active={false}
          onClick={() => onChange({ min: p.min, max: p.max })}
        >
          {p.label}
        </Chip>
      ))}
    </Section>
  );
}

/* -------------------------------------------------------
   VOTE AVERAGE FILTER
   - Min/Max (0–10)
   - Preset pills (7+, 8+, 9+)
------------------------------------------------------- */
function VoteAverageFilter({ value, onChange }) {
  const presets = [
    { label: "7+", min: 7, max: 10 },
    { label: "8+", min: 8, max: 10 },
    { label: "9+", min: 9, max: 10 },
  ];

  function setMin(v) {
    onChange({ ...value, min: v });
  }
  function setMax(v) {
    onChange({ ...value, max: v });
  }

  return (
    <Section
      title="Vote Average"
      onClear={() => onChange({ min: null, max: null })}
    >
      <RangeInput
        labelMin="Min Rating"
        labelMax="Max Rating"
        valueMin={value.min}
        valueMax={value.max}
        onMinChange={setMin}
        onMaxChange={setMax}
      />

      <div style={{ marginBottom: "6px", fontSize: "12px" }}>Presets</div>
      {presets.map((p) => (
        <Chip
          key={p.label}
          active={false}
          onClick={() => onChange({ min: p.min, max: p.max })}
        >
          {p.label}
        </Chip>
      ))}
    </Section>
  );
}

/* -------------------------------------------------------
   POPULARITY FILTER
   - Single-select preset pills
------------------------------------------------------- */
function PopularityFilter({ value, onChange }) {
  const presets = [
    { label: "Low (0–20)", min: 0, max: 20 },
    { label: "Medium (20–50)", min: 20, max: 50 },
    { label: "High (50–150)", min: 50, max: 150 },
    { label: "Trending (150–500)", min: 150, max: 500 },
    { label: "Viral (500+)", min: 500, max: null },
  ];

  return (
    <Section
      title="Popularity"
      onClear={() => onChange({ min: null, max: null })}
    >
      {presets.map((p) => (
        <Chip
          key={p.label}
          active={value.min === p.min && value.max === p.max}
          onClick={() => onChange({ min: p.min, max: p.max })}
        >
          {p.label}
        </Chip>
      ))}
    </Section>
  );
}
/* -------------------------------------------------------
   USER RATING FILTER
   - Pills 1–5 (single-select)
   - Mode toggle: Exact / Greater / Less
   - Default mode: Greater Than
------------------------------------------------------- */
function UserRatingFilter({ value, onChange }) {
  const ratingPills = [1, 2, 3, 4, 5];

  function setRating(r) {
    onChange({ ...value, value: r });
  }

  function setMode(mode) {
    onChange({ ...value, mode });
  }

  return (
    <Section
      title="User Rating"
      onClear={() => onChange({ value: null, mode: "gte" })}
    >
      <div style={{ marginBottom: "6px", fontSize: "12px" }}>Rating</div>
      {ratingPills.map((r) => (
        <Chip
          key={r}
          active={value.value === r}
          onClick={() => setRating(r)}
        >
          {r}
        </Chip>
      ))}

      <div style={{ marginTop: "12px", marginBottom: "6px", fontSize: "12px" }}>
        Comparison Mode
      </div>

      <Toggle
        value={value.mode}
        onChange={setMode}
        options={[
          { label: "Exact", value: "eq" },
          { label: "Greater", value: "gte" },
          { label: "Less", value: "lte" },
        ]}
      />
    </Section>
  );
}

/* -------------------------------------------------------
   WATCHED FILTER
   - Yes / No toggle
------------------------------------------------------- */
function WatchedFilter({ value, onChange }) {
  return (
    <Section
      title="Watched"
      onClear={() => onChange(null)}
    >
      <Toggle
        value={value}
        onChange={onChange}
        options={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />
    </Section>
  );
}

/* -------------------------------------------------------
   CERTIFICATION FILTER
   - Multi-select pills
   - US MPAA only
------------------------------------------------------- */
function CertificationFilter({ value, onChange }) {
  const certs = ["G", "PG", "PG-13", "R", "NC-17"];

  function toggleCert(c) {
    if (value.includes(c)) {
      onChange(value.filter((v) => v !== c));
    } else {
      onChange([...value, c]);
    }
  }

  return (
    <Section
      title="Certification"
      onClear={() => onChange([])}
    >
      {certs.map((c) => (
        <Chip
          key={c}
          active={value.includes(c)}
          onClick={() => toggleCert(c)}
        >
          {c}
        </Chip>
      ))}
    </Section>
  );
}

/* -------------------------------------------------------
   ORIGINAL LANGUAGE FILTER
   - English / Non-English
   - Single-select
------------------------------------------------------- */
function OriginalLanguageFilter({ value, onChange }) {
  return (
    <Section
      title="Original Language"
      onClear={() => onChange(null)}
    >
      <Toggle
        value={value}
        onChange={onChange}
        options={[
          { label: "English", value: "en" },
          { label: "Non-English", value: "non-en" },
        ]}
      />
    </Section>
  );
}

/* -------------------------------------------------------
   SPOKEN LANGUAGES FILTER
   - English / Non-English
   - Single-select
------------------------------------------------------- */
function SpokenLanguagesFilter({ value, onChange }) {
  return (
    <Section
      title="Spoken Languages"
      onClear={() => onChange(null)}
    >
      <Toggle
        value={value}
        onChange={onChange}
        options={[
          { label: "English", value: "en" },
          { label: "Non-English", value: "non-en" },
        ]}
      />
    </Section>
  );
}
/* -------------------------------------------------------
   BUDGET FILTER
   - Tiered single-select pills
------------------------------------------------------- */
function BudgetFilter({ value, onChange }) {
  const tiers = [
    { label: "Low (0–10M)", min: 0, max: 10_000_000 },
    { label: "Medium (10–50M)", min: 10_000_000, max: 50_000_000 },
    { label: "High (50–100M)", min: 50_000_000, max: 100_000_000 },
    { label: "Very High (100M+)", min: 100_000_000, max: null },
  ];

  return (
    <Section
      title="Budget"
      onClear={() => onChange(null)}
    >
      {tiers.map((t) => (
        <Chip
          key={t.label}
          active={value && value.min === t.min && value.max === t.max}
          onClick={() => onChange({ min: t.min, max: t.max })}
        >
          {t.label}
        </Chip>
      ))}
    </Section>
  );
}

/* -------------------------------------------------------
   REVENUE FILTER
   - Tiered single-select pills
------------------------------------------------------- */
function RevenueFilter({ value, onChange }) {
  const tiers = [
    { label: "Low (0–10M)", min: 0, max: 10_000_000 },
    { label: "Medium (10–100M)", min: 10_000_000, max: 100_000_000 },
    { label: "High (100–500M)", min: 100_000_000, max: 500_000_000 },
    { label: "Blockbuster (500M+)", min: 500_000_000, max: null },
  ];

  return (
    <Section
      title="Revenue"
      onClear={() => onChange(null)}
    >
      {tiers.map((t) => (
        <Chip
          key={t.label}
          active={value && value.min === t.min && value.max === t.max}
          onClick={() => onChange({ min: t.min, max: t.max })}
        >
          {t.label}
        </Chip>
      ))}
    </Section>
  );
}

/* -------------------------------------------------------
   PRODUCTION COUNTRIES FILTER
   - Search box + dynamic pills
   - Multi-select
   - Pinned favorites: US, UK
------------------------------------------------------- */
function ProductionCountriesFilter({ value, onChange }) {
  const pinned = ["US", "UK"];
  const [search, setSearch] = useState("");

  // For POC: static list (later you can populate from DB)
  const allCountries = ["US", "UK", "Canada", "Japan", "Korea", "France", "Germany"];

  const results = search
    ? allCountries.filter((c) =>
        c.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  function toggleCountry(c) {
    if (value.includes(c)) {
      onChange(value.filter((v) => v !== c));
    } else {
      onChange([...value, c]);
    }
  }

  return (
    <Section
      title="Production Countries"
      onClear={() => onChange([])}
    >
      <SearchPills
        search={search}
        onSearchChange={setSearch}
        results={results}
        selected={value}
        onSelect={toggleCountry}
        pinned={pinned}
      />
    </Section>
  );
}

/* -------------------------------------------------------
   KEYWORDS FILTER
   - Search box + dynamic pills
   - Multi-select
------------------------------------------------------- */
function KeywordsFilter({ value, onChange }) {
  const [search, setSearch] = useState("");

  // POC static list — replace with real keywords later
  const allKeywords = [
    "dystopia",
    "cyberpunk",
    "philosophy",
    "artificial intelligence",
    "crime",
    "romance",
    "thriller",
    "action",
    "future",
    "simulation",
  ];

  const results = search
    ? allKeywords.filter((k) =>
        k.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  function toggleKeyword(k) {
    if (value.includes(k)) {
      onChange(value.filter((v) => v !== k));
    } else {
      onChange([...value, k]);
    }
  }

  return (
    <Section
      title="Keywords"
      onClear={() => onChange([])}
    >
      <SearchPills
        search={search}
        onSearchChange={setSearch}
        results={results}
        selected={value}
        onSelect={toggleKeyword}
      />
    </Section>
  );
}

/* -------------------------------------------------------
   PRODUCTION COMPANIES FILTER
   - Search box + dynamic pills
   - Multi-select
   - Optional pinned favorites
------------------------------------------------------- */
function ProductionCompaniesFilter({ value, onChange }) {
  const [search, setSearch] = useState("");

  // POC static list — replace with real companies later
  const allCompanies = [
    "Warner Bros",
    "Paramount",
    "Universal",
    "Disney",
    "Sony",
    "Village Roadshow",
    "Silver Pictures",
    "A24",
  ];

  const pinned = ["Warner Bros", "A24"];

  const results = search
    ? allCompanies.filter((c) =>
        c.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  function toggleCompany(c) {
    if (value.includes(c)) {
      onChange(value.filter((v) => v !== c));
    } else {
      onChange([...value, c]);
    }
  }

  return (
    <Section
      title="Production Companies"
      onClear={() => onChange([])}
    >
      <SearchPills
        search={search}
        onSearchChange={setSearch}
        results={results}
        selected={value}
        onSelect={toggleCompany}
        pinned={pinned}
      />
    </Section>
  );
}
/* -------------------------------------------------------
   FULL FILTERS PANEL
   - Clear All
   - Sort By
   - All filters in correct order
------------------------------------------------------- */

export function FiltersPanel({
  filters,
  setFilters,
  sort,
  onSortChange,
  totalCount,
}) {
  function clearAll() {
    setFilters({
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
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      {/* Count */}
      <div style={{ fontSize: "13px", opacity: 0.8 }}>
        {totalCount} titles
      </div>

      {/* Clear All */}
      <button
        onClick={clearAll}
        style={{
          padding: "4px 10px",
          borderRadius: "999px",
          border: "1px solid var(--line)",
          background: "transparent",
          color: "var(--text)",
          fontSize: "12px",
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        Clear All
      </button>

      {/* Sort By */}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>
          Sort By
        </div>

        {[
          { label: "Title", value: "title" },
          { label: "Release Date", value: "release_date" },
          { label: "Runtime", value: "runtime" },
          { label: "Vote Average", value: "vote_average" },
          { label: "Vote Count", value: "vote_count" },
          { label: "Popularity", value: "popularity" },
          { label: "Budget", value: "budget" },
          { label: "Revenue", value: "revenue" },
          { label: "User Rating", value: "user_rating" },
          { label: "Watched", value: "user_watched" },
        ].map((opt) => (
          <Chip
            key={opt.value}
            active={sort === opt.value}
            onClick={() => onSortChange(opt.value)}
          >
            {opt.label}
          </Chip>
        ))}
      </div>

      {/* Filters in your exact required order */}

      <ReleaseDateFilter
        value={filters.release_date}
        onChange={(v) => setFilters({ ...filters, release_date: v })}
      />

      <RuntimeFilter
        value={filters.runtime}
        onChange={(v) => setFilters({ ...filters, runtime: v })}
      />

      <VoteAverageFilter
        value={filters.vote_average}
        onChange={(v) => setFilters({ ...filters, vote_average: v })}
      />

      <PopularityFilter
        value={filters.popularity}
        onChange={(v) => setFilters({ ...filters, popularity: v })}
      />

      <UserRatingFilter
        value={filters.user_rating}
        onChange={(v) => setFilters({ ...filters, user_rating: v })}
      />

      <WatchedFilter
        value={filters.user_watched}
        onChange={(v) => setFilters({ ...filters, user_watched: v })}
      />

      <CertificationFilter
        value={filters.certification}
        onChange={(v) => setFilters({ ...filters, certification: v })}
      />

      <OriginalLanguageFilter
        value={filters.original_language}
        onChange={(v) => setFilters({ ...filters, original_language: v })}
      />

      <SpokenLanguagesFilter
        value={filters.spoken_languages}
        onChange={(v) => setFilters({ ...filters, spoken_languages: v })}
      />

      <ProductionCountriesFilter
        value={filters.production_countries}
        onChange={(v) => setFilters({ ...filters, production_countries: v })}
      />

      <KeywordsFilter
        value={filters.keywords}
        onChange={(v) => setFilters({ ...filters, keywords: v })}
      />

      <ProductionCompaniesFilter
        value={filters.production_companies}
        onChange={(v) => setFilters({ ...filters, production_companies: v })}
      />

      <BudgetFilter
        value={filters.budget}
        onChange={(v) => setFilters({ ...filters, budget: v })}
      />

      <RevenueFilter
        value={filters.revenue}
        onChange={(v) => setFilters({ ...filters, revenue: v })}
      />
    </div>
  );
}
