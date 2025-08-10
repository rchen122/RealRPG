import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
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
        <Link
          to="Profile"
          className={`${styles.navButton} ${styles.rightAligned}`}
        >
          Profile
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
