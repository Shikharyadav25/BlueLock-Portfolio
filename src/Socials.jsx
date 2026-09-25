import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import char1 from "./assets/char1.png";
import char2 from "./assets/char2.png";
import char3 from "./assets/char3.png";
import icon1 from "./assets/icon1.png";
import icon2 from "./assets/icon2.png";
import icon3 from "./assets/icon3.png";
import nagiVideo from "./assets/nagi-seishiro.3840x2160.mp4";
import "./Socials.css";

const CHARS = [char1, char2, char3];

const ROLES = [
  { text: "LEADER", color: "#e8c100", bg: "rgba(232,193,0,0.12)", border: "rgba(232,193,0,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
  { text: "PARTY", color: "#4a8fff", bg: "rgba(74,143,255,0.12)", border: "rgba(74,143,255,0.5)" },
];

const ITEMS = [
  {
    id: "github",
    label: "GITHUB",
    handle: "@Shikharyadav25",
    href: "https://github.com/Shikharyadav25",
    icon: "🐙",
    barIcon: icon1,
    details: [
      { label: "USER", value: "Shikharyadav25", icon: "👤" },
      { label: "ROLE", value: "Student", icon: "🎓" },
      { label: "FOCUS", value: "AI Systems & Web", icon: "⚡" },
      { label: "LOC", value: "India", icon: "📍" },
    ],
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    handle: "Shikhar Yadav",
    href: "https://www.linkedin.com/in/shikhar-yadav-16733330a/",
    icon: "💼",
    barIcon: icon2,
    details: [
      { label: "USER", value: "Shikhar Yadav", icon: "👤" },
      { label: "ROLE", value: "Student", icon: "🎓" },
      { label: "STAT", value: "Active", icon: "✨" },
      { label: "CONNECT", value: "Open to Network", icon: "🤝" },
    ],
  },
  {
    id: "leetcode",
    label: "LEETCODE",
    handle: "@Shikharyadav07",
    href: "https://leetcode.com/u/Shikharyadav07/",
    icon: "⚡",
    barIcon: icon3,
    details: [
      { label: "USER", value: "Shikharyadav07", icon: "👤" },
      { label: "ROLE", value: "Student", icon: "🎓" },
      { label: "PLATFORM", value: "LeetCode", icon: "🧩" },
      { label: "FOCUS", value: "Data Structures & Algos", icon: "🏆" },
    ],
  },
];

export default function Socials() {
  const [active, setActive] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeInfoBar, setActiveInfoBar] = useState(0);
  const [focus, setFocus] = useState("left");
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
      if (focus === "left") {
        if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
        if (e.key === "ArrowRight") {
          setFocus("right");
          setActiveInfoBar(0);
        }
        if (e.key === "Enter") window.open(ITEMS[active].href, "_blank", "noopener,noreferrer");
      } else {
        const barCount = ITEMS[active].details.length;
        if (e.key === "ArrowUp") setActiveInfoBar((i) => Math.max(0, i - 1));
        if (e.key === "ArrowDown") setActiveInfoBar((i) => Math.min(barCount - 1, i + 1));
        if (e.key === "ArrowLeft") setFocus("left");
        if (e.key === "Enter") window.open(ITEMS[active].href, "_blank", "noopener,noreferrer");
      }
      if ((e.key === "ArrowLeft" && focus === "left") || e.key === "Escape" || e.key === "Backspace") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, navigate, focus]);

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

      <div className="sc-root" role="navigation">
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className={`sc-bar-outer${active === i ? " active" : ""}${mounted ? " mounted" : ""}`}
            onClick={() => {
              if (active === i) window.open(item.href, "_blank", "noopener,noreferrer");
              else setActive(i);
            }}
            onMouseEnter={() => setActive(i)}
          >
            <div className="sc-bar-red" />
            <div className="sc-bar">
              <img className="sc-char" src={CHARS[i]} alt="" />
              <div className="sc-bar-fill" />
              <div className="sc-bar-shade" />
              <div className="sc-bar-content">
                <div className="sc-role">{ROLES[i].text}</div>
                <div className="sc-main">
                  <div className="sc-main-top" style={{ paddingRight: "120px" }}>
                    <div className="sc-icon">{item.icon}</div>
                    <div className="sc-label">{item.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mounted && (
        <div className="sc-right-nav" key={active}>
          <span
            className="sc-nav-arrow left"
            style={{ cursor: "pointer", pointerEvents: "all" }}
            onClick={() => setActive((i) => Math.max(0, i - 1))}
          >
            ◄
          </span>
          <span
            className="sc-nav-btn"
            style={{ cursor: "pointer", pointerEvents: "all" }}
            onClick={() => setActive((i) => Math.max(0, i - 1))}
          >
            LB
          </span>
          <span className="sc-nav-label">{ITEMS[active].label}</span>
          <span
            className="sc-nav-btn"
            style={{ cursor: "pointer", pointerEvents: "all" }}
            onClick={() => setActive((i) => Math.min(ITEMS.length - 1, i + 1))}
          >
            RB
          </span>
          <span
            className="sc-nav-arrow right"
            style={{ cursor: "pointer", pointerEvents: "all" }}
            onClick={() => setActive((i) => Math.min(ITEMS.length - 1, i + 1))}
          >
            ►
          </span>
        </div>
      )}

      {mounted &&
        ITEMS[active].details.map((detail, i) => (
          <div
            className={`sc-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
            key={`bar-${active}-${i}`}
            style={{ top: `${155 + i * 68}px`, animationDelay: `${i * 50}ms` }}
            onClick={() => {
              setActiveInfoBar(i);
              window.open(ITEMS[active].href, "_blank", "noopener,noreferrer");
            }}
            onMouseEnter={() => setActiveInfoBar(i)}
          >
            <div className="sc-info-bar">
              <span style={{ fontSize: "24px", marginLeft: "14px", marginRight: "8px" }}>
                {detail.icon}
              </span>
              <span className="sc-info-bar-text" style={{ flex: "0 0 80px" }}>
                {detail.label}
              </span>
              <span
                className="sc-info-bar-count"
                style={{
                  flex: 1,
                  textAlign: "right",
                  marginRight: "20px",
                  fontSize: detail.value.length > 18 ? "26px" : "34px",
                }}
              >
                {detail.value}
              </span>
            </div>
          </div>
        ))}

      <div className={`sc-footer${mounted ? " mounted" : ""}`}>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↑↓</span>
          <span>SELECT</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">↵</span>
          <span>OPEN</span>
        </div>
        <div className="sc-footer-row">
          <span className="sc-footer-key">ESC</span>
          <span>BACK</span>
        </div>
      </div>
    </div>
  );
}
