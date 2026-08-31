import styles from './PosterGrid.module.css';
import Poster from './Poster';

export default function PosterGrid({ items, viewMode, size }) {
  const scaleStyle = {
    '--card-scale': size
  };

  return (
    <div
      className={
        viewMode === 'list'
          ? styles.list
          : viewMode === 'wall'
          ? styles.wall
          : styles.grid
      }
      style={scaleStyle}
    >
      {items.map(item => (
        <Poster key={item.id} item={item} />
      ))}
    </div>
  );
}
