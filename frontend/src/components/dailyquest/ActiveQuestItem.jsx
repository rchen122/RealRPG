import ProgressBar from "./ProgressBar";
import styles from "./activeQuest.module.css";
import axios from "axios";
import { useUser } from "../../UserContext";

function ActiveQuestItem(props) {
  const questUnit = props.unit;
  console.log(questUnit);
  const questName = questUnit.template.quest_name;
  const [[key, value]] = Object.entries(questUnit.parameters);

  const updateProgress = async (value) => {
    const { userData } = useUser();
    try {
      const queryData = {
        user_id: userData.id,
        template_id: questUnit.template.id,
        parameters: value,
      };
      const res = await axios.post(
        "http://localhost:8000/updateDailyQuest",
        queryData
      );
    } catch (err) {
      console.error("There was an error updating a daily quest", err);
    }
  };
  const currProgress = 4;

  return (
    <div className={styles.activeQuestItem}>
      <div className={styles.firstRow}>
        <h1>{questName}</h1>
      </div>
      <div>
        <ProgressBar
          current={currProgress}
          max={value}
          units={key}
          updateProgress={updateProgress}
        />
      </div>
    </div>
  );
}

export default ActiveQuestItem;
