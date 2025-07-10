/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useState } from "react";
import "./audioScreen.css";

const listen = "Écouter";
const pause = "Pause"

interface Track {
  id: string;
  supId: string;
  file: string;
}

const tracks: Track[] = [
  { id: "1",supId:" er", file: `${import.meta.env.BASE_URL}Premier.mp3` },
  { id: "2",supId:"ème", file: `${import.meta.env.BASE_URL}Deuxieme.mp3` },
  { id: "3",supId:"ème", file: `${import.meta.env.BASE_URL}Troisieme.mp3` },
  { id: "4",supId:"ème", file: `${import.meta.env.BASE_URL}Quatrieme.mp3` },
];
const AudioScreen: React.FC = () => {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const [labels, setLabels] = useState([listen,listen,listen,listen]);

  const handleTogglePlay = (index: number) => {
    const selectedAudio = audioRefs.current[index];

    if (!selectedAudio) return;

    // Si la piste est en cours de lecture, on l'arrête
    if (!selectedAudio.paused) {
      selectedAudio.pause();
      selectedAudio.currentTime = 0;
      
      setLabels(prev => prev.map((v,i)=>(i === index ? listen :  v)))
    } else {
      // Arrêter les autres pistes
      audioRefs.current.forEach((audio, i) => {
        if (i !== index && audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      setLabels(prev => prev.map((_,i)=>(i !== index ? listen : pause)))
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
          <span>{track.id}<sup>{track.supId}</sup></span>
          <button onClick={() => handleTogglePlay(index)}>{labels[index]}</button>
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
