import styles from './Poster.module.css';
import RatingBulbsMin from './RatingBulbsMin';
import ClampSynopsis from './ClampSynopsis';

export default function Poster({ item }) {
  const { title, year, genre, rating } = item;

  return (
    <div className={styles.card}>
      <div className={styles.gradient} />

      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.meta}>
              <span>{year}</span>
              {genre && <span>· {genre}</span>}
            </div>
          </div>
          <div className={styles.ratingBadge}>
            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
            <RatingBulbsMin rating={rating} />
          </div>
        </div>

        <ClampSynopsis text="This is a short test synopsis to verify clamping behavior inside the card layout." />
      </div>
    </div>
  );
}
