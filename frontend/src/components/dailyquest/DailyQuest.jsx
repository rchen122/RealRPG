import { useState } from "react";
import { useUser } from "../../UserContext";
import QuestItem from "./QuestItem";
import styles from "./quest.module.css";
import ActiveQuests from "./ActiveQuests";

function DailyQuest() {
  const { userData, availableQuests } = useUser();

  const [showTemplate, setShowTemplate] = useState(false);

  const handleClick = () => {
    setShowTemplate((prev) => !prev);
  };

  return (
    <div className={styles.questWindow}>
      <ActiveQuests />

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
