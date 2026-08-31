import styles from './FilterSection.module.css';

export default function FilterSection({ title, children }) {
  return (
    <div className={styles.section}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
