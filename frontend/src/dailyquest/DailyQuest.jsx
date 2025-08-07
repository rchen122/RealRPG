import { useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import ActiveQuestItem from "./ActiveQuestItem";
import QuestItem from "./QuestItem";
import styles from "./quest.module.css";

function DailyQuest(props) {
  const { userData, availableQuests, activeQuests } = useUser();

  const [showTemplate, setShowTemplate] = useState(false);

  const handleClick = () => {
    setShowTemplate((prev) => !prev);
  };

  const addQuest = async (questInfo) => {
    const param = questInfo[0];
    const questId = questInfo[1];
    const unit = questInfo[2];
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
      console.log(res.data);
    } catch (err) {
      console.error("There was an error posting user quests: ", err);
    }
  };

  return (
    <div className={styles.questWindow}>
      {activeQuests.length === 0 ? (
        <div>No Active Quests</div>
      ) : (
        activeQuests.map((questUnit) => {
          return (
            <ActiveQuestItem
              key={questUnit.id}
              id={questUnit.id}
              param={questUnit.parameters}
              template={questUnit.template}
            />
          );
        })
      )}

      <button className={styles.loadButton} onClick={handleClick}>
        {showTemplate ? "Return" : "Edit Quests"}
      </button>

      {showTemplate && (
        <div className={styles.loadQuests}>
          {availableQuests.map((template) => (
            <QuestItem
              key={template.id}
              id={template.id}
              name={template.quest_name}
              desc={template.description}
              param={template.parameter_schema}
              addActiveQuest={addQuest}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyQuest;
