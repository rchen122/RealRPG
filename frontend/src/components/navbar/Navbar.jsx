import React, { useState } from "react";
import { useUser } from "../../UserContext";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  const { userData } = useUser();

  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.homeTitle}>
          <h1>Gameify</h1>
        </Link>
        <Link to="DailyQuests" className={styles.navButton}>
          Daily Quest
        </Link>
        <Link to="LevelUp" className={styles.navButton}>
          Level Up
        </Link>
        {userData ? (
          <Link
            to="Profile"
            className={`${styles.navButton} ${styles.rightAligned}`}
          >
            Profile
          </Link>
        ) : (
          <Link
            to="Login"
            className={`${styles.navButton} ${styles.rightAligned}`}
          >
            Log in
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
