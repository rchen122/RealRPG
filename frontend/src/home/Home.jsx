import React, { useState } from "react";
import { useUser } from "../UserContext";
import MainBody from "./MainBody";
import Sidebar from "./Sidebar";
import styles from "./home.module.css";

function Home() {
  const { userData } = useUser();

  if (!userData) {
    return <div className={styles.container}>There is no user</div>;
  }

  return (
    <div className={styles.container}>
      <MainBody user={userData} />
      <Sidebar />
    </div>
  );
}

export default Home;
