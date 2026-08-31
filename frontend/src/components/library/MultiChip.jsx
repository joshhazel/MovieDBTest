import styles from './MultiChip.module.css';

export default function MultiChip({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={active ? styles.active : styles.base}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
