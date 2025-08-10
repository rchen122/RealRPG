import { useState } from "react";
import styles from "./quest.module.css";
import { useUser } from "../../UserContext";
import axios from "axios";

function QuestItem(props) {
  const [inputText, setInputText] = useState("");
  function updateText(event) {
    const value = event.target.value;
    setInputText(value);
  }
  const { userData } = useUser();
  const name = props.param.Name;
  const unit = props.param.Unit;

  const addQuest = async (event) => {
    event.preventDefault();

    const param = inputText;
    const questId = props.id;

    try {
      const userQuestData = {
        user_id: userData.id,
        template_id: questId,
        active: true,
        parameter: { [unit]: param },
      };
      const res = await axios.post(
        "http://localhost:8000/addUserQuest",
        userQuestData
      );
      // console.log(userQuestData);
      // console.log(res.data);
    } catch (err) {
      console.error("There was an error posting user quests: ", err);
    }
  };

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
