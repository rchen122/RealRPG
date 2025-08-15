import ProgressBar from "./ProgressBar";
import styles from "./activeQuest.module.css";
import axios from "axios";
import { useUser } from "../../UserContext";
import { fetchUserData } from "../../utils/Auth";

function ActiveQuestItem(props) {
  const questUnit = props.unit;
  const editMode = props.editMode;

  const questName = questUnit.template.quest_name;
  const [[key, value]] = Object.entries(questUnit.parameters);
  const { userData, setUserData, setAvailableQuests, setActiveQuests } =
    useUser();
  const [[progressUnit, progressValue]] = Object.entries(
    questUnit.progress_data
  );
  const completed = progressValue >= value ? true : false;

  const removeQuest = async () => {
    try {
      const queryData = {
        user_id: userData.id,
        template_id: questUnit.template.id,
        parameter: {},
        mode: "delete",
      };
      const res = await axios.post(
        "http://localhost:8000/updateUserQuest",
        queryData
      );

      fetchUserData(
        userData.id,
        setUserData,
        setAvailableQuests,
        setActiveQuests
      );
    } catch (err) {
      console.error("There was an error deleting an active quest", err);
    }
  };
  const updateProgress = async (new_value) => {
    try {
      const queryData = {
        user_id: userData.id,
        template_id: questUnit.template.id,
        parameter: { [key]: new_value },
        mode: "update",
      };
      const res = await axios.post(
        "http://localhost:8000/updateUserQuest",
        queryData
      );
      fetchUserData(
        userData.id,
        setUserData,
        setAvailableQuests,
        setActiveQuests
      );
    } catch (err) {
      console.error("There was an error updating a daily quest", err);
    }
  };

  const currProgress = progressValue;
  return (
    <div
      className={styles.activeQuestItem}
      style={{ backgroundColor: completed ? "#359051ff" : "#1e1e2f" }}
    >
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
      {editMode && <button onClick={removeQuest}>Remove</button>}
    </div>
  );
}

export default ActiveQuestItem;
