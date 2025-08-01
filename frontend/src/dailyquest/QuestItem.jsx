import styles from "./quest.module.css";

function QuestItem(props) {
  return (
    <div className={styles.questitem}>
      <h1>{props.name}</h1>
      <p>{props.desc}</p>
    </div>
  );
}

export default QuestItem;
