import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";

function App() {
  const userId = 1; // Test

  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/userdata?userId=${userId}`
        );
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar />
      <Home user={user} />
    </div>
  );
}

export default App;
