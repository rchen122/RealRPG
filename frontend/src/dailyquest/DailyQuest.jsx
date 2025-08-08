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

  return (
    <div className={styles.questWindow}>
      {activeQuests.length === 0 ? (
        <div>No Active Quests</div>
      ) : (
        <div className={styles.loadQuests}>
          {activeQuests.map((questUnit) => (
            <ActiveQuestItem
              key={questUnit.id}
              id={questUnit.id}
              param={questUnit.parameters}
              template={questUnit.template}
            />
          ))}
        </div>
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyQuest;
