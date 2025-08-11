import styles from "./quest.module.css";
import { useState } from "react";

function ProgressBar({ current, max, units, updateProgress }) {
  const percent = Math.min(Math.max(current / max, 0), 1) * 100;
  const [dropDown, setDropDown] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function toggleDropDown() {
    setDropDown(!dropDown);
    console.log(dropDown);
  }
  function updateInput(event) {
    const val = event.target.value;
    setInputValue(val);
  }
  function submitChange(event) {
    updateProgress(inputValue);
    event.preventDefault();
  }
  return (
    <div>
      <div className={styles.barContainer}>
        <div onClick={toggleDropDown} className={styles.clickableArea}>
          <div className={styles.fill} style={{ width: `${percent}%` }} />
          <div className={styles.text}>
            {current} / {max} {units}
          </div>
        </div>
      </div>

      {dropDown && (
        <div>
          <form className={styles.questForm}>
            <input
              placeholder="Input Value"
              onChange={updateInput}
              value={inputValue}
            ></input>
            <button onClick={submitChange}>Update</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;
