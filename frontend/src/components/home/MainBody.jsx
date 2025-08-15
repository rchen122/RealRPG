import { useUser } from "../../UserContext";
import ActiveQuests from "../dailyquest/ActiveQuests";
import styles from "./home.module.css";

function MainBody() {
  const { userData } = useUser();

  if (!userData) {
    return <div className={styles.mainBody}>Loading data, please wait...</div>;
  }

  return (
    <div className={styles.mainBody}>
      <ActiveQuests editMode={false} />
      <p>Future module functionality in progress...</p>
    </div>
  );
}

export default MainBody;
