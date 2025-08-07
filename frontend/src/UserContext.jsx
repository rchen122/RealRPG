import { createContext, useContext, useState } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [availableQuests, setAvailableQuests] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        availableQuests,
        setAvailableQuests,
        activeQuests,
        setActiveQuests,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
