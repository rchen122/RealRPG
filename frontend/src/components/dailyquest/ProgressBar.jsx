import styles from "./quest.module.css";

function ProgressBar({ current, max, units }) {
  const percent = Math.min(Math.max(current / max, 0), 1) * 100;
  return (
    <div className={styles.container}>
      <div className={styles.fill} style={{ width: `${percent}%` }} />
      <div className={styles.text}>
        {current} / {max} {units}
      </div>
    </div>
  );
}

export default ProgressBar;
