import ProgressBar from "./ProgressBar";
import styles from "./activeQuest.module.css";
import axios from "axios";
import { useUser } from "../../UserContext";

function ActiveQuestItem(props) {
  const questUnit = props.unit;
  console.log(questUnit);
  const questName = questUnit.template.quest_name;
  const [[key, value]] = Object.entries(questUnit.parameters);
  const { userData } = useUser();
  const [[progressUnit, progressValue]] = Object.entries(
    questUnit.progress_data
  );
  const updateProgress = async (new_value) => {
    try {
      const queryData = {
        user_id: userData.id,
        template_id: questUnit.template.id,
        active: true,
        parameter: { [key]: new_value },
        mode: "update",
      };
      console.log(queryData);
      const res = await axios.post(
        "http://localhost:8000/updateUserQuest",
        queryData
      );
    } catch (err) {
      console.error("There was an error updating a daily quest", err);
    }
  };

  const currProgress = progressValue;
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
