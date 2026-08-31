import styles from './RatingBulbs.module.css';

export default function RatingBulbs({ rating }) {
  const bulbs = Array.from({ length: 10 }, (_, i) => i < rating);

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
