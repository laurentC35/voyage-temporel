/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef } from "react";
import "./audioScreen.css";

interface Track {
  id: number;
  file: string;
}

const tracks: Track[] = [
  { id: 1, file: "/Premier.mp3" },
  { id: 2, file: "/Deuxieme.mp3" },
  { id: 3, file: "/Troisieme.mp3" },
  { id: 4, file: "/Quatrieme.mp3" },
];
const AudioScreen: React.FC = () => {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const handleTogglePlay = (index: number) => {
    const selectedAudio = audioRefs.current[index];

    if (!selectedAudio) return;

    // Si la piste est en cours de lecture, on l'arrête
    if (!selectedAudio.paused) {
      selectedAudio.pause();
      selectedAudio.currentTime = 0;
    } else {
      // Arrêter les autres pistes
      audioRefs.current.forEach((audio, i) => {
        if (i !== index && audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      selectedAudio.play();
    }
  };

  const handleRestart = (index: number) => {
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
      }
    });
    const audio = audioRefs.current[index];
    if (audio) {
      audio.currentTime = 0;
      if (!audio.paused) audio.play();
    }
  };

  return (
    <div className="audioscreen">
      <h2>Voyage Musical</h2>
      {tracks.map((track, index) => (
        <div key={track.id} className="track">
          <span>{track.id}</span>
          <button onClick={() => handleTogglePlay(index)}>Ecouter</button>
          <button onClick={() => handleRestart(index)}>{"⟲"}</button>
          <audio
            // @ts-ignore
            ref={(el) => (audioRefs.current[index] = el)}
            src={track.file}
          />
        </div>
      ))}
    </div>
  );
};

export default AudioScreen;
