import { useState } from "react";
import styles from "./quest.module.css";

function QuestItem(props) {
  const [inputText, setInputText] = useState("");
  function updateText(event) {
    const value = event.target.value;
    setInputText(value);
  }

  const name = props.param.Name;
  const unit = props.param.Unit;

  function addQuest(event) {
    props.addActiveQuest([inputText, props.id, unit]);
    event.preventDefault();
  }

  return (
    <div className={styles.questitem}>
      <div className={styles.row1}>
        <h1>{props.name}</h1>
        <span>{props.emoji}</span>
      </div>
      <div className={styles.row2}>
        <p>{props.desc}</p>
      </div>
      <div className={styles.row3}>
        <form>
          <input
            name="input parameter"
            onChange={updateText}
            placeholder={name + " in " + unit}
            value={inputText}
          ></input>
          <button onClick={addQuest}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default QuestItem;
