import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import nagiImg from "./assets/nagi.jpg";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import nagiVideo from "./assets/nagi-seishiro.3840x2160.mp4";
import "./AboutMe.css";

const CHARS = [nagiImg, nagiImg];
const MAIN_IMAGES = [nagiImg, nagiImg];

const REVEAL_CONTENT = [
  {
    upper: ["Shikhar Yadav", "Full Stack Developement and AI"],
    lower: "Building scalable systems and AI-powered solutions.",
  },
  {
    upper: [
      "Languages: Java, Python, Javascript, C",
      "Frameworks & AI: Spring Boot, PyTorch, NextJs, Express",
      "Infrastructure & Data: Docker, Redis, Postgres",
    ],
    lower: "Tech Stack : Java, Python, Javascript, C, Spring Boot, PyTorch, NextJs, Express, Docker, Redis, Postgres",
  },
];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "about",
    label: "ABOUT ME",
    handle: "Shikhar Yadav",
    icon: "👤",
    barIcon: icon1,
    stats: [
      { tag: "NAME", value: "Shikhar", color: "#4a8fff" },
      { tag: "ROLE", value: "Full Stack & AI", color: "#e8c100" },
    ],
  },
  {
    id: "tech",
    label: "TECH STACK",
    handle: "Skills",
    icon: "⚙️",
    barIcon: icon2,
    stats: [
      { tag: "LANGS", value: "4", color: "#e8c100" },
      { tag: "STACK", value: "11", color: "#4a8fff" },
    ],
  },
];

export default function AboutMe() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const v = document.querySelector("video");
    if (v) v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "Enter" || e.key === "ArrowRight") setRevealed(true);
      if (e.key === "ArrowLeft") {
        if (revealed) setRevealed(false);
        else navigate(-1);
      }
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, revealed]);

  return (
    <div id="menu-screen">
      <video
        src={nagiVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {revealed && <div className="sc-dim" />}

      {revealed && (
        <div className={`sc-reveal-panel${mounted ? " mounted" : ""}`}>
          <div className="sc-tab-navigation" role="tablist" aria-label="Tab navigation">
            {ITEMS.map((item, idx) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={idx === active}
                onClick={() => setActive(idx)}
                className={`sc-tab-button ${idx === active ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="sc-reveal-upper-bar">
            {REVEAL_CONTENT[active].upper.map((line) => (
              <div className="sc-reveal-upper-line" key={line}>{line}</div>
            ))}
          </div>
          <div className="sc-reveal-lower-bar">{REVEAL_CONTENT[active].lower}</div>
        </div>
      )}

      {revealed && (
        <div className={`sc-main-portrait-shell${mounted ? " mounted" : ""}`}>
          <img
            key={active}
            className="sc-main-portrait"
            src={MAIN_IMAGES[active]}
            alt=""
          />
        </div>
      )}

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
          >
            <div className="sc-bar-red" />
            <div
              className="sc-bar"
              onClick={() => {
                setActive(i);
                setRevealed(true);
              }}
              onMouseEnter={() => setActive(i)}
            >
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top">
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row"><span className="sc-footer-key">↑↓</span><span>SELECT</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">↵</span><span>REVEAL</span></div>
        <div className="sc-footer-row"><span className="sc-footer-key">ESC</span><span>BACK</span></div>
      </div>
    </div>
  );
}
