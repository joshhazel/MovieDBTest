import styles from './LibraryLayout.module.css';

export default function LibraryLayout({ children }) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  );
}
