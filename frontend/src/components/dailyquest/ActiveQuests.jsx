import ActiveQuestItem from "./ActiveQuestItem";
import { useUser } from "../../UserContext";
import styles from "./quest.module.css";

function ActiveQuests() {
  const { activeQuests } = useUser();

  return (
    <div className={styles.questWindow}>
      {activeQuests.length === 0 ? (
        <div>No Active Quests</div>
      ) : (
        <div className={styles.loadQuests}>
          {activeQuests.map((questUnit) => (
            <ActiveQuestItem key={questUnit.id} unit={questUnit} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ActiveQuests;
