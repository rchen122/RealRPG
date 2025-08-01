import { useState } from "react";
import axios from "axios";
import ActiveQuestItem from "./ActiveQuestItem";
import QuestItem from "./QuestItem";
import styles from "./quest.module.css";

function DailyQuest(props) {
  const quests = props.quests;
  console.log("DailyQuest props: ", quests);
  console.log(quests.length);

  const [showTemplate, setShowTemplate] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTemplate = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/get_templates`);
      setTemplates(res.data);
    } catch (err) {
      console.error("Failed to fetch templates: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (!showTemplate) {
      fetchTemplate();
    }
    setShowTemplate((prev) => !prev);
  };

  return (
    <div className={styles.questWindow}>
      {quests.length === 0 ? (
        <div>No Active Quests</div>
      ) : (
        quests.map((questUnit) => {
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
          {loading ? (
            <p>Loading...</p>
          ) : (
            templates.map((template) => (
              <QuestItem
                key={template.id}
                name={template.quest_name}
                desc={template.description}
                param={template.parameter_schema}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default DailyQuest;
