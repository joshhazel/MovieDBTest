import styles from './LibraryToolbar.module.css';

export default function LibraryToolbar({
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  size,
  onSizeChange
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <div className={styles.tabs}>
          <button className={styles.tabActive}>Movies</button>
          <button className={styles.tab}>TV</button>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.controlGroup}>
          <label className={styles.label}>Sort by</label>
          <select
            className={styles.select}
            value={sort}
            onChange={e => onSortChange(e.target.value)}
          >
            <option value="date">Date added</option>
            <option value="rating">Your rating</option>
            <option value="year">Year</option>
            <option value="title">Title</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.label}>View</label>
          <div className={styles.viewButtons}>
            <button
              className={
                viewMode === 'grid' ? styles.viewActive : styles.viewButton
              }
              onClick={() => onViewModeChange('grid')}
            >
              Grid
            </button>
            <button
              className={
                viewMode === 'wall' ? styles.viewActive : styles.viewButton
              }
              onClick={() => onViewModeChange('wall')}
            >
              Wall
            </button>
            <button
              className={
                viewMode === 'list' ? styles.viewActive : styles.viewButton
              }
              onClick={() => onViewModeChange('list')}
            >
              List
            </button>
          </div>
        </div>

        <div className={styles.controlGroup}>
          <label className={styles.label}>Size</label>
          <input
            type="range"
            min="0.8"
            max="1.2"
            step="0.05"
            value={size}
            onChange={e => onSizeChange(parseFloat(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
