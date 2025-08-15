import { useState } from "react";
import styles from "./quest.module.css";
import { useUser } from "../../UserContext";
import axios from "axios";
import { fetchUserData } from "../../utils/Auth";

function QuestItem(props) {
  const [inputText, setInputText] = useState("");
  const { userData, setUserData, setAvailableQuests, setActiveQuests } =
    useUser();
  function updateText(event) {
    const value = event.target.value;
    setInputText(value);
  }
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
        parameter: { [unit]: param },
        mode: "add",
      };
      const res = await axios.post(
        "http://localhost:8000/updateUserQuest",
        userQuestData
      );
      fetchUserData(
        userData.id,
        setUserData,
        setAvailableQuests,
        setActiveQuests
      );
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
      <div className={styles.desc}>
        <p>{props.desc}</p>
      </div>
      <div>
        <form className={styles.formInputs}>
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
