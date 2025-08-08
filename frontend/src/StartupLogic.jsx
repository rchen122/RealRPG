import { useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

function StartupLogic() {
  const userId = 1;
  const { setUserData, setAvailableQuests, setActiveQuests } = useUser();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/userdata?userId=${userId}`
        );
        const templates = await axios.get(
          `http://localhost:8000/get_templates?userId=1`
        );
        setUserData(res.data.userData[0]);
        setActiveQuests(res.data.userQuests);
        setAvailableQuests(templates.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchUserData();
  }, []);
  const { userData } = useUser();
  console.log(userData);
  return null;
}

export default StartupLogic;
