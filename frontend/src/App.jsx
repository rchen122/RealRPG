import { useEffect, useState } from "react";
import { UserProvider, useUser } from "./UserContext";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import StartupLogic from "./StartupLogic";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import QuestPage from "./pages/QuestPage";
import Login from "./pages/Login";

function App() {
  return (
    <UserProvider>
      <StartupLogic />;
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DailyQuests" element={<QuestPage />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
