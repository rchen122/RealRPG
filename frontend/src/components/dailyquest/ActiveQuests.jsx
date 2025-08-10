import ActiveQuestItem from "./ActiveQuestItem";
import { useUser } from "../../UserContext";
import styles from "./quest.module.css";

function ActiveQuests() {
  const { activeQuests } = useUser();
  console.log(activeQuests);
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
    </div>
  );
}

export default ActiveQuests;
