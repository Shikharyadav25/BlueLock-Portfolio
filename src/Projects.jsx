import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isagiGoalVideo from "./assets/isagi-first-goal.mov";
import "./Projects.css";

const PROJECTS = [
  {
    name: "Agent Commerce Middleman",
    role: "AGENT",
    badge: "AI COMMERCE",
    html_url: "https://github.com/Shikharyadav25/agent-commerce-middleman",
    stats: [
      { label: "STATUS", value: "BUILDATHON", tag: "⚡", box: "STATE" },
      { label: "FOCUS", value: "AUTONOMOUS AGENT COMMERCE", tag: "🤖", box: "TARGET" },
      { label: "STACK", value: "NODE.JS / GEMINI / RAZORPAY", tag: "⚙️", box: "TECH" },
    ],
  },
  {
    name: "ISRO Climate Visuals",
    role: "ISRO",
    badge: "SATELLITE",
    html_url: "https://github.com/Shikharyadav25/ISRO--Climate-Visuals",
    stats: [
      { label: "STATUS", value: "COMPLETED", tag: "🌍", box: "STATE" },
      { label: "FOCUS", value: "GEO-SPATIAL CLIMATE TELEMETRY", tag: "🛰️", box: "TARGET" },
      { label: "STACK", value: "PYTHON / STREAMLIT / SATELLITE", tag: "⚙️", box: "TECH" },
    ],
  },
  {
    name: "MatchSocket Live Engine",
    role: "SOCKET",
    badge: "REAL-TIME",
    html_url: "https://github.com/Shikharyadav25/Match-Socket",
    stats: [
      { label: "STATUS", value: "PRODUCTION", tag: "🏆", box: "STATE" },
      { label: "FOCUS", value: "LIVE COMMENTARY & APM WEBSOCKETS", tag: "⚡", box: "TARGET" },
      { label: "STACK", value: "EXPRESS / POSTGRES / WS", tag: "⚙️", box: "TECH" },
    ],
  },
  {
    name: "Medi Bud Health Companion",
    role: "HEALTH",
    badge: "MOBILE AI",
    html_url: "https://github.com/Shikharyadav25/medi-bud-app",
    stats: [
      { label: "STATUS", value: "MOBILE MVP", tag: "🩺", box: "STATE" },
      { label: "FOCUS", value: "MULTIMODAL RAG HEALTH COMPANION", tag: "🧬", box: "TARGET" },
      { label: "STACK", value: "REACT NATIVE / GEMINI / FIREBASE", tag: "⚙️", box: "TECH" },
    ],
  },
  {
    name: "DICOM Disease Triage Platform",
    role: "MED-AI",
    badge: "CLINICAL",
    html_url: "https://github.com/Shikharyadav25/DICOM-Imaging-for-Disease-Triage",
    stats: [
      { label: "STATUS", value: "ENTERPRISE", tag: "🔬", box: "STATE" },
      { label: "FOCUS", value: "CHEST X-RAY & GRAD-CAM AI", tag: "🏥", box: "TARGET" },
      { label: "STACK", value: "TYPESCRIPT / AWS SQS / DENSENET", tag: "⚙️", box: "TECH" },
    ],
  },
];

export default function Projects() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [activeInfoBar, setActiveInfoBar] = useState(0);

  useEffect(() => {
    const v = document.querySelector("video");
    if (v) v.play().catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(PROJECTS.length - 1, i + 1));
      if (e.key === "ArrowLeft" || e.key === "Escape" || e.key === "Backspace") navigate("/");
      if (e.key === "Enter" && PROJECTS[active]) {
        window.open(PROJECTS[active].html_url, "_blank", "noopener,noreferrer");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, active]);

  const activeProj = PROJECTS[active];

  return (
    <div id="menu-screen">
      <video
        src={isagiGoalVideo}
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

      <div className={`sp-container${mounted ? " mounted" : ""}`}>
        <h1 className="sp-title">PROJECTS</h1>
        <p className="sp-subtitle">
          Curated full-stack systems, agentic commerce middleman, medical AI, real-time WebSockets, and satellite telemetry labs.
        </p>

        <div className="sp-btn-list" role="navigation">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.name}
              className={`sp-bar-outer${active === idx ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: mounted ? `${idx * 60 + 80}ms` : "0ms" }}
              onMouseEnter={() => setActive(idx)}
            >
              <div className="sp-bar-red" />
              <div
                className="sp-bar"
                onClick={() => {
                  setActive(idx);
                  window.open(proj.html_url, "_blank", "noopener,noreferrer");
                }}
              >
                <div className="sp-bar-fill" />
                <div className="sp-bar-shade" />
                <div className="sp-bar-content">
                  <div className="sp-role">{proj.role}</div>
                  <div className="sp-main">
                    <div className="sp-label">{proj.name}</div>
                  </div>
                  <div
                    className="sp-badge"
                    style={{
                      color: active === idx ? "#041238" : "#8df6ff",
                      background: active === idx ? "#ffd28d" : "rgba(141, 246, 255, 0.16)",
                    }}
                  >
                    {proj.badge}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "24px", display: "flex", gap: "140px", marginLeft: "10px" }}>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="p3-row-clone"
              style={{ transitionDelay: "500ms" }}
            >
              <div className="p3-skew-wrap-clone" style={{ transform: "skewX(4deg) skewY(-2deg)" }}>
                <div
                  className="p3-shadow-tri-clone"
                  style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)", transformOrigin: "right center", left: "-5%", height: "40px" }}
                />
                <div
                  className="p3-highlight-clone"
                  style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%)", transformOrigin: "right center", left: "-5%", height: "40px" }}
                />
                <div className="p3-label-wrap-clone">
                  <span className="p3-label-base-clone p3-label-dark-clone" style={{ fontSize: 36 }}>
                    ← BACK
                  </span>
                  <span
                    className="p3-label-base-clone p3-label-bright-clone"
                    style={{ fontSize: 36, clipPath: "polygon(0 50%, 100% 0, 100% 100%)" }}
                  >
                    ← BACK
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://github.com/Shikharyadav25"
              target="_blank"
              rel="noopener noreferrer"
              className="p3-row-clone"
              style={{ transitionDelay: "600ms" }}
            >
              <div className="p3-skew-wrap-clone" style={{ transform: "skewX(-4deg) skewY(2deg)" }}>
                <div className="p3-shadow-tri-clone" style={{ height: "40px" }} />
                <div className="p3-highlight-clone" style={{ height: "40px" }} />
                <div className="p3-label-wrap-clone">
                  <span className="p3-label-base-clone p3-label-dark-clone" style={{ fontSize: 36 }}>
                    GITHUB →
                  </span>
                  <span className="p3-label-base-clone p3-label-bright-clone" style={{ fontSize: 36 }}>
                    GITHUB →
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {mounted &&
        activeProj &&
        activeProj.stats.map((s, i) => (
          <div
            className={`sp-info-bar-wrap${activeInfoBar === i ? " selected" : ""}`}
            key={`stat-${active}-${i}`}
            style={{ top: `${150 + i * 62}px`, animationDelay: `${i * 50}ms` }}
            onMouseEnter={() => setActiveInfoBar(i)}
            onClick={() => window.open(activeProj.html_url, "_blank", "noopener,noreferrer")}
          >
            <div className="sp-info-bar">
              <span style={{ fontSize: "24px", marginLeft: "14px", marginRight: "8px", filter: "drop-shadow(2px 2px 0px #000000)" }}>
                {s.tag}
              </span>
              <span className="sp-info-bar-text">{s.label}</span>
              <span className="sp-info-bar-box">{s.box}</span>
              <span className="sp-info-bar-count">{s.value}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
