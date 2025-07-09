import React, { useState } from "react";
import LockScreen from "./components/LockScreen";
import AudioScreen from "./components/AudioScreen";
import { CSSTransition } from "react-transition-group";
import "./App.css";

const App = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="app-container">
      <div>{`UnLocked ${unlocked}`}</div>
      <LockScreen onUnlock={() => setUnlocked(true)} />

      <AudioScreen />
    </div>
  );
};

export default App;
