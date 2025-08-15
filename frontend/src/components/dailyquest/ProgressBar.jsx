import styles from "./activeQuest.module.css";
import { useState, useEffect } from "react";

function ProgressBar({ current, max, units, updateProgress, mode }) {
  //if its bool: percent is 0 or 100 based on if current = true or false

  const [percent, setPercent] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (mode === "value") {
      setPercent(Math.min(Math.max(current / max, 0), 1) * 100);
    } else {
      setPercent(current === false ? 0 : 100);
    }
  }, [current, max, mode]);
  function toggleDropDown() {
    setDropDown(!dropDown);
    console.log(dropDown);
  }
  function updateInput(event) {
    const val = event.target.value;
    setInputValue(val);
  }
  function submitChange(event) {
    if (mode === "value") {
      updateProgress(inputValue);
    } else {
      updateProgress(!current);
    }
    event.preventDefault();
  }
  return (
    <div>
      <div className={styles.barContainer}>
        <div onClick={toggleDropDown} className={styles.clickableArea}>
          <div className={styles.fill} style={{ width: `${percent}%` }} />
          {mode === "value" ? (
            <div className={styles.text}>
              {current} / {max} {units}
            </div>
          ) : (
            <div className={styles.text}>{max}</div>
          )}
        </div>
      </div>

      {dropDown && (
        <div>
          <form className={styles.questForm}>
            {mode === "value" ? (
              <input
                placeholder="Input Value"
                onChange={updateInput}
                value={inputValue}
              />
            ) : (
              <button onClick={submitChange}>
                Mark as {current === false ? "Complete" : "Incomplete"}
              </button>
            )}

            <button onClick={submitChange}>Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
