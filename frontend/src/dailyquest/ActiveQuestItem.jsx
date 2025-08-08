import styles from "./quest.module.css";
import { useState } from "react";

function ActiveQuestItem(props) {
  const questName = props.template.quest_name;
  const [[key, value]] = Object.entries(props.param);
  const [inputText, updateText] = useState("");

  function updateProgress(event) {}

  return (
    <div className={styles.questitem}>
      <div className={styles.row1}>
        <h1>{questName}</h1>
        <form>
          <input
            onChange={updateText}
            placeholder="Add entry"
            value={inputText}
          ></input>
        </form>
      </div>
      <div className={styles.row2}>
        <p>{value}</p>
      </div>
      <div className={styles.row3}>
        <form>
          <input
            onChange={updateText}
            placeholder="Add entry"
            value={inputText}
          ></input>
          <button onClick={updateProgress}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ActiveQuestItem;
