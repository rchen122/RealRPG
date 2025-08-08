import { useUser } from "../UserContext";
import DailyQuest from "../dailyquest/DailyQuest";
import styles from "./home.module.css";

function MainBody(props) {
  const { userData } = useUser();

  if (!userData) {
    return <div className={styles.mainBody}>Loading data, please wait...</div>;
  }

  return (
    <div className={styles.mainBody}>
      <DailyQuest />
      <p>Future module functionality in progress...</p>
    </div>
  );
}

export default MainBody;
