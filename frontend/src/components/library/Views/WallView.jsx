import Poster from '../Poster';
import styles from './WallView.module.css';

export default function WallView({ items }) {
  return (
    <div className={styles.wall}>
      {items.map(item => (
        <Poster
          key={item.id}
          title={item.title}
          year={item.year}
          rating={item.rating}
        />
      ))}
    </div>
  );
}
