import styles from './RatingBulbsMin.module.css';

export default function RatingBulbsMin({ rating }) {
  const bulbs = Array.from({ length: 5 }, (_, i) => i < Math.round(rating / 2));

  return (
    <div className={styles.bulbs}>
      {bulbs.map((filled, i) => (
        <div
          key={i}
          className={filled ? styles.filled : styles.empty}
        />
      ))}
    </div>
  );
}
