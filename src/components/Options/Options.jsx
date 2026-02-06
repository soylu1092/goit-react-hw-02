import styles from "./Options.module.css";

export default function Options({ options, onLeaveFeedback, total, onReset }) {
  return (
    <div className={styles.box}>
      <div className={styles.row}>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={styles.btn}
            onClick={() => onLeaveFeedback(opt)}
          >
            {opt}
          </button>
        ))}

        {total > 0 && (
          <button
            type="button"
            className={`${styles.btn} ${styles.reset}`}
            onClick={onReset}
          >
            reset
          </button>
        )}
      </div>
    </div>
  );
}
