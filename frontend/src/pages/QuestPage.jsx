import { useState } from "react";
import { useUser } from "../UserContext";
import ActiveQuests from "../components/dailyquest/ActiveQuests";
import QuestItem from "../components/dailyquest/QuestItem";
import styles from "../components/dailyquest/quest.module.css";

function QuestPage() {
  const [editMode, setEditMode] = useState(false);
  const { availableQuests } = useUser();
  const handleClick = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className={styles.questWindow}>
      <ActiveQuests editMode={editMode} />

      <button className={styles.loadButton} onClick={handleClick}>
        {editMode ? "Return" : "Edit Quests"}
      </button>

      {editMode && (
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
