import styles from './Sidebar.module.css';
import FilterSection from './FilterSection';
import MultiChip from './MultiChip';

export default function Sidebar({
  filters,
  setType,
  setStatus,
  setRating,
  setGenre,
  setCountry,
  sort,
  onSortChange
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.block}>
        <div className={styles.blockTitle}>Sort by</div>
        <div className={styles.sortOptions}>
          <button
            className={
              sort === 'date' ? styles.sortActive : styles.sortButton
            }
            onClick={() => onSortChange('date')}
          >
            Date added
          </button>
          <button
            className={
              sort === 'rating' ? styles.sortActive : styles.sortButton
            }
            onClick={() => onSortChange('rating')}
          >
            Your rating
          </button>
          <button
            className={
              sort === 'year' ? styles.sortActive : styles.sortButton
            }
            onClick={() => onSortChange('year')}
          >
            Year
          </button>
          <button
            className={
              sort === 'title' ? styles.sortActive : styles.sortButton
            }
            onClick={() => onSortChange('title')}
          >
            Title
          </button>
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.blockTitle}>Filters</div>

        <FilterSection title="Type">
          {['Movie', 'Show'].map(opt => (
            <MultiChip
              key={opt}
              active={filters.type === opt}
              onClick={() =>
                setType(filters.type === opt ? null : opt)
              }
            >
              {opt}
            </MultiChip>
          ))}
        </FilterSection>

        <FilterSection title="Status">
          {['Released', 'Upcoming'].map(opt => (
            <MultiChip
              key={opt}
              active={filters.status === opt}
              onClick={() =>
                setStatus(filters.status === opt ? null : opt)
              }
            >
              {opt}
            </MultiChip>
          ))}
        </FilterSection>

        <FilterSection title="Rating">
          {[7, 8, 9, 10].map(opt => (
            <MultiChip
              key={opt}
              active={filters.rating === opt}
              onClick={() =>
                setRating(filters.rating === opt ? null : opt)
              }
            >
              {opt}+
            </MultiChip>
          ))}
        </FilterSection>

        <FilterSection title="Genre">
          {['Sci-Fi', 'Drama', 'Comedy', 'Horror'].map(opt => (
            <MultiChip
              key={opt}
              active={filters.genre === opt}
              onClick={() =>
                setGenre(filters.genre === opt ? null : opt)
              }
            >
              {opt}
            </MultiChip>
          ))}
        </FilterSection>

        <FilterSection title="Country">
          {['USA', 'UK', 'Canada', 'Japan', 'Korea'].map(opt => (
            <MultiChip
              key={opt}
              active={filters.country === opt}
              onClick={() =>
                setCountry(filters.country === opt ? null : opt)
              }
            >
              {opt}
            </MultiChip>
          ))}
        </FilterSection>
      </div>
    </aside>
  );
}
