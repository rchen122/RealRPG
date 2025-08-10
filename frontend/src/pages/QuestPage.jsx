import { useState } from "react";
import { useUser } from "../UserContext";
import ActiveQuests from "../components/dailyquest/ActiveQuests";
import QuestItem from "../components/dailyquest/QuestItem";
import styles from "../components/dailyquest/quest.module.css";

function QuestPage() {
  const { userData, availableQuests, activeQuests } = useUser();

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

export default QuestPage;
