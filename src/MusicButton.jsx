import { useState, useEffect, useRef } from "react";
import toileMusic from "./assets/toile_d_afrique.mp3";
import "./MusicButton.css";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(toileMusic);
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
          const handleFirstInteract = () => {
            audio
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
            window.removeEventListener("click", handleFirstInteract);
            window.removeEventListener("keydown", handleFirstInteract);
          };
          window.addEventListener("click", handleFirstInteract);
          window.addEventListener("keydown", handleFirstInteract);
        });
    };

    tryPlay();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio play blocked:", e));
    }
  };

  return (
    <button
      className={`p3-music-btn ${isPlaying ? "playing" : "muted"}`}
      onClick={toggleMusic}
      aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      title={isPlaying ? "Mute Background Music" : "Play Background Music"}
    >
      <div className="p3-music-red" />
      <div className="p3-music-inner">
        <span className="p3-music-icon">{isPlaying ? "🔊" : "🔇"}</span>
        <span className="p3-music-label">BGM</span>
        <span className="p3-music-status">{isPlaying ? "ON" : "OFF"}</span>
        <div className="p3-eq">
          <span className="p3-eq-bar" />
          <span className="p3-eq-bar" />
          <span className="p3-eq-bar" />
          <span className="p3-eq-bar" />
        </div>
      </div>
    </button>
  );
}
