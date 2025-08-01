import DailyQuest from "../dailyquest/DailyQuest";
import styles from "./home.module.css";

function MainBody(props){
    const user = props.user;
    console.log("MainBody props: ", user)
    if(!user) {
        return <div className={styles.mainBody}>Loading data, please wait...</div>
    }

    const userQuests = user.userQuests;
    return <div className={styles.mainBody}>    
        <DailyQuest quests={userQuests}/>
        <p>There should be a big ish overview of daily activities</p>
        <p>Then underneath that, there should be a row for recent modules</p>
    </div>
}

export default MainBody;