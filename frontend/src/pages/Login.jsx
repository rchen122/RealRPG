import { useState } from "react";
import axios from "axios";
import { fetchUserData } from "../utils/Auth";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [userInput, setUserInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

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
        setHasError(true);
        setError(err.response.data.detail);
      }
    }
  };

  const signUp = async () => {
    try {
      const res = await axios.post("http://localhost:8000/signup", {
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
        setHasError(true);
        setError(err.response.data.detail);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.LogIn}>
        <h1>Log in or Sign up</h1>

        <div className={styles.username}>
          <input
            name="Username"
            placeholder="Username"
            value={userInput}
            onChange={updateInput}
          />
        </div>
        <div className={styles.password}>
          <input
            name="Password"
            placeholder="Password"
            value={pwInput}
            onChange={updatePw}
          />
        </div>
        {hasError && <div className={styles.errorMsg}>{error}</div>}
        <div className={styles.formButtons}>
          <button onClick={handleLogIn}>Log In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
