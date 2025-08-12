import axios from "axios";

const updateLogs = (userId) => {
  fetch("http://localhost:8000/checklogs?user_id=" + userId)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const checkUser = async () => {
  try {
    const res = await axios("http://localhost:8000/me", {
      credentials: "include",
    });
    const userId = res.data.user_id;
    // console.log("UserId from checkUser(): ", userId);
    return { success: true, data: userId };
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
    }
    return { success: false, data: err.response };
  }
};

export const fetchUserData = async (
  userId,
  setUserData,
  setAvailableQuests,
  setActiveQuests
) => {
  try {
    updateLogs(userId);

    const res = await axios.get(
      `http://localhost:8000/userdata?userId=${userId}`
    );
    const templates = await axios.get(
      `http://localhost:8000/get_templates?userId=${userId}`
    );
    setUserData(res.data.userData[0]);
    setActiveQuests(res.data.userQuests);
    setAvailableQuests(templates.data);
  } catch (err) {
    console.error("Failed to fetch:", err);
  }
};
