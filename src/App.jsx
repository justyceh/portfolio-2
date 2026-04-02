import { useState } from 'react'
import './App.css'
import UnderwaterBackground from './components/UnderwaterBackground'
import HeroSection from './components/HeroSection'
import ParallaxScroll from './components/ParallaxScroll'
import SlideInLeftRight from './components/SlideInLeftRight'
import ZoomInOut from './components/ZoomInOut'
import SpinRotate from './components/SpinRotate'
import TextReveal from './components/TextReveal'
import FadeStagger from './components/FadeStagger'
import PinSection from './components/PinSection'
import CounterAnimation from './components/CounterAnimation'
import MagneticCursor from './components/MagneticCursor'
import TimelineChain from './components/TimelineChain'
import FloatBounce from './components/FloatBounce'
import HorizontalScroll from './components/HorizontalScroll'
import WaterCursor from './components/WaterCursor'
import WaterCursor2 from './components/WaterCursor2'
import SkillSection from './components/SkillSection'
import ProjectSection from './components/ProjectSection'
import ContactSection from './components/ContactSection'

const SECTIONS = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <UnderwaterBackground />
      <nav className="showcase-nav">
        <a href="#hero" className="nav-logo" style={{ textDecoration: 'none' }}>
          <span className="logo-full">
            <span style={{ color: '#fff' }}>Justyce</span>
            {' '}
            <span style={{ color: 'var(--accent)' }}>Hickman</span>
          </span>
          <span className="logo-short">
            <span style={{ color: '#fff' }}>J</span>
            <span style={{ color: 'var(--accent)' }}>H</span>
          </span>
        </a>
        
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span />
          <span />
          <span />
        </div>

        <ul className={isMenuOpen ? 'nav-links open' : 'nav-links'}>
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} onClick={() => setIsMenuOpen(false)}>{s.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <HeroSection />
        <SkillSection />
        <ProjectSection />
        <ContactSection />
      </main>
    </>
  )
}
