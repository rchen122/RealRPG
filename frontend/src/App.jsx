import { useEffect, useState } from "react";
import { UserProvider, useUser } from "./UserContext";
import StartupLogic from "./StartupLogic";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";

function App() {
  return (
    <UserProvider>
      <StartupLogic />;
      <Navbar />
      <Home />
    </UserProvider>
  );
}

export default App;
