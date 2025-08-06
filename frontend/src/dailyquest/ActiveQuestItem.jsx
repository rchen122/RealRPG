import styles from "./quest.module.css";

function ActiveQuestItem(props) {
  const questName = props.template.quest_name;
  const [[key, value]] = Object.entries(props.param);
  //   console.log(props);
  //   console.log(key, value);
  return (
    <div className={styles.questitem}>
      <h1>{questName}</h1>
      {/* <p>{props.description}</p> */}
      <p>{value}</p>
    </div>
  );
}

export default ActiveQuestItem;
