import React, {useState} from "react";
import styles from "./navbar.module.css";

function Navbar(){
    return <nav className={styles.navbar}>
        <header><h1>Gameify</h1></header>
        <button className={styles.navButton}>Daily Quest</button>
        <button className={styles.navButton}>Level Up</button>
        <button className={`${styles.navButton} ${styles.rightAligned}`}>Profile</button>
    </nav>

}

export default Navbar;