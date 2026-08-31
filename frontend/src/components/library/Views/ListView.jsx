import RatingBulbsMin from '../RatingBulbsMin';
import styles from './ListView.module.css';

export default function ListView({ items }) {
  return (
    <div className={styles.list}>
      {items.map(item => (
        <div key={item.id} className={styles.row}>
          <div className={styles.title}>{item.title}</div>
          <div className={styles.year}>{item.year}</div>
          <RatingBulbsMin rating={item.rating} />
        </div>
      ))}
    </div>
  );
}
