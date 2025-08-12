import { useState } from "react";
import axios from "axios";
import { fetchUserData } from "../utils/Auth";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
function Login() {
  const [userInput, setUserInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const { setUserData, setAvailableQuests, setActiveQuests } = useUser();
  const navigate = useNavigate();

  function updateInput(event) {
    const val = event.target.value;
    setUserInput(val);
  }
  function updatePw(event) {
    const val = event.target.value;
    setPwInput(val);
  }
  function handleLogIn(event) {
    event.preventDefault();
    logIn();
  }
  function handleSignUp(event) {
    event.preventDefault();
    signUp();
  }

  const logIn = async () => {
    try {
      const res = await axios.get("http://localhost:8000/login", {
        params: {
          username: userInput,
          password: pwInput,
        },
        withCredentials: true,
      });
      // If successful:
      const userId = res.data.userId;
      fetchUserData(userId, setUserData, setAvailableQuests, setActiveQuests);
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.error("Error Status: ", err.response.status);
        console.error("Error Data: ", err.response.data);
      }
    }
  };

  const signUp = async () => {
    try {
      const res = await axios.get("http://localhost:8000/signup", {
        params: {
          username: userInput,
          password: pwInput,
        },
        withCredentials: true,
      });
      // If successful:
      const userId = res;
      console.log(userId);
      //Then I need to fetch User Id
    } catch (err) {
      if (err.response) {
        console.error("Error Status: ", err.response.status);
        console.error("Error Data: ", err.response.data);
      }
    }
  };

  return (
    <div>
      <form>
        <input
          name="Username"
          placeholder="Username"
          value={userInput}
          onChange={updateInput}
        />
        <input
          name="Password"
          placeholder="Password"
          value={pwInput}
          onChange={updatePw}
        />
        <button onClick={handleLogIn}>Log In</button>
        <button onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}

export default Login;
