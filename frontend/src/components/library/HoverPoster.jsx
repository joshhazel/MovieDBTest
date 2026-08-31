import styles from './HoverPoster.module.css';
import ClampSynopsis from './ClampSynopsis';

export default function HoverPoster() {
  return (
    <div className={styles.hover}>
      <div className={styles.inner}>
        <ClampSynopsis text="This is a short test synopsis to verify clamping behavior inside the hover overlay." />
      </div>
    </div>
  );
}
