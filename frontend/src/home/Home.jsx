import React, {useState} from "react";
import MainBody from "./MainBody";
import Sidebar from "./Sidebar";
import styles from "./home.module.css"

function Home(props){
    const user = props.user;
    console.log("Home Props: ", user)
    if(!user) {
        return <div className={styles.container}>
            There is not user
        </div>
    }
    return <div className={styles.container}>

        <MainBody user={user}/>   
        <Sidebar />
    </div> 

}

export default Home;