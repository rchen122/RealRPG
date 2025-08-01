import styles from "./quest.module.css";

function ActiveQuestItem(props) {
    return <div className={styles.questitem}>
        <h1>{props.quest_name}</h1>
        <p>{props.description}</p>
        {/* <p>{props.param}</p> */}
    </div>
}


export default ActiveQuestItem;