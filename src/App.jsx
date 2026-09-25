import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import menuVideo from './assets/yoichi-isagi-with-ball.3840x2160.mp4'
import P3Menu from './Menu'
import AboutMe from './AboutMe'
import Socials from './Socials'
import Projects from './Projects'
import MusicButton from './MusicButton'
import './App.css'

function BackgroundVideo({ intro, loop, ...props }) {
  const [showLoop, setShowLoop] = useState(false);
  const isSingle = !loop || intro === loop;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#000', overflow: 'hidden' }}>
      <video
        {...props}
        src={intro}
        autoPlay
        loop={isSingle}
        muted
        playsInline
        style={{ 
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          zIndex: 1,
          opacity: 1
        }}
        onEnded={() => {
          if (!isSingle) setShowLoop(true);
        }}
      />
      {!isSingle && (
        <video
          {...props}
          src={loop}
          autoPlay
          loop
          muted
          playsInline
          style={{ 
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            zIndex: showLoop ? 2 : 1,
            opacity: showLoop ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out'
          }}
        />
      )}
    </div>
  );
}

function MenuScreen() {
  const navigate = useNavigate()
  useEffect(() => {
    const v = document.querySelector('video');
    if (v) {
      v.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  return (
    <div id="menu-screen">
      <BackgroundVideo intro={menuVideo} loop={menuVideo} />
      <P3Menu onNavigate={(page) => {
        if (page === 'github') {
          window.open('https://github.com/Shikharyadav25', '_blank', 'noopener,noreferrer')
        } else {
          navigate(`/${page}`)
        }
      }} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MenuScreen />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/socials" element={<Socials />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sideproj" element={<Projects />} />
        <Route path="*" element={<MenuScreen />} />
      </Routes>
      <MusicButton />
    </>
  )
}
