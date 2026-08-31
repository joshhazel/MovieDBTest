import Poster from '../Poster';
import styles from './GridView.module.css';

export default function GridView({ items }) {
  return (
    <div className={styles.grid}>
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
