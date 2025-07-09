import React, { useState } from "react";
import LockScreen from "./components/LockScreen";
import AudioScreen from "./components/AudioScreen";
import "./App.css";

const App: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [showAudioScreen, setShowAudioScreen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleUnlock = () => {
    setFadeOut(true); // déclenche la sortie de LockScreen
    setTimeout(() => {
      setUnlocked(true);
      setShowAudioScreen(true);
    }, 500); // même durée que la transition CSS
  };

  return (
    <div className="app-container">
      {!unlocked && (
        <div
          className={`screen lockscreen-wrapper ${
            fadeOut ? "fade-out" : "fade-in"
          }`}
        >
          <LockScreen onUnlock={handleUnlock} />
        </div>
      )}
      {showAudioScreen && (
        <div className="screen fade-in">
          <AudioScreen />
        </div>
      )}
    </div>
  );
};

export default App;
