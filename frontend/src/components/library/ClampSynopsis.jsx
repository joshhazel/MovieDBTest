import styles from './ClampSynopsis.module.css';

export default function ClampSynopsis({ text }) {
  return (
    <div className={styles.synopsis}>
      {text}
    </div>
  );
}
