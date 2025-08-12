import { useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { checkUser, fetchUserData } from "./utils/Auth";
function StartupLogic() {
  // Next steps: Fetch user/session info, if not user = null and need login button instead of profile
  const { setUserData, setAvailableQuests, setActiveQuests } = useUser();

  useEffect(() => {
    const res = checkUser();
    if (res.success === true) {
      const userId = res.data;
      fetchUserData(userId, setUserData, setAvailableQuests, setActiveQuests);
    }
  }, []);

  return null;
}

export default StartupLogic;
