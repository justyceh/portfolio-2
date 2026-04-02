import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: 1,
    title: 'Computer Science Club Website',
    subtitle: 'Completely revamped the ACM website for the 2026-2027 year',
    desc: 'Developed a new website for my club utilizing HTML, CSS, and JavaScript to add interactivity to the page with elements like image sliders, hover effects, and a responsive design.',
    image: 'acmlogo.png',
    link: 'https://awesome.cse.unr.edu/index.html'
  },
  {
    id: 2,
    title: 'Hibachi Food Truck Website',
    subtitle: 'Built a custom website to pitch to a local hibachi food truck owner',
    desc: 'Built a mobile-first website for a local hibachi food truck utilizing a video as the hero section, and a LA theme to match the food truck.',
    image: 'sonshibachilogo.png',
    link: 'https://sonshibachi.vercel.app/'
  },
  {
    id: 3,
    title: 'Acai Bowl & Juice Website',
    subtitle: 'Designed a themed website for a local juice and acai bowl business to pitch to owner',
    desc: 'Designed a mobile-first website for a local juice business, utilized react and tailwindcss, and implemented the full frontend and backend flow of a catering request form, dealing with cors errors along the way.',
    image: 'morning-glorylogo.png',
    link: 'https://morning-glory-xxxx.vercel.app/'
  },
  {
    id: 4,
    title: 'Embedded Water Cooler System State Machine',
    subtitle: 'Designed the code & circuit for a water cooler system',
    desc: 'Analyzed Arduino 2560 atmega sheet to understand architecture and pin layout, and built a fully functioning water cooling system using various components and direct register manipulation using bits and c++',
    image: 'watercooler.jpg',
    link: 'https://github.com/1103-islam-md/CPE301_Final_Project'
  },
  {
    id: 5,
    title: 'LockIn Pomodoro App',
    subtitle: 'Built a simple pomodoro app with customizable task and backgrounds',
    desc: 'Designed a simple easy to use interface with react and tailwindcss, utilized JavaScript for timer functions and local web storage to save settings',
    image: 'pomodoro.png',
    link: 'https://pomodoro-zeta-livid.vercel.app/'
  },
  {
    id: 6,
    title: 'Phaser.js Web App Game',
    subtitle: 'Built a 2D pixel like game for my 4 year anniversary with my girlfriend',
    desc: 'Learned and built with Phaser.js library to make a simply web browser game with top down movement and object interaction',
    image: '4years.png',
    link: '#'
  },
  {
    id: 7,
    title: 'C++ Password Manager',
    subtitle: 'Used my C++ knowledge and openssl library to build a command line password manager',
    desc: 'Utilized OOP principles to build a database class which utilizes openssl for hashing, decrypting and all other CRUD operations for managing your passwords',
    image: 'passwordm.png',
    link: 'https://github.com/justyceh/Password-Manager'
  },
]

export default function ProjectSection() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = ref.current.querySelector('.project-track')

      const getDistance = () => track.scrollWidth - ref.current.offsetWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          pin: true,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} id="projects" className="project-section">
      <div className="project-header">
        <h2 className="skill-title" style={{ marginBottom: '10px' }}>Projects</h2>
        <p className="skill-subtitle">A showcase of personal and school projects</p>
      </div>
      <div className="project-track">
        {PROJECTS.map((p) => (
          <div key={p.id} className="project-card">
            <a href={p.link} target="_blank" rel="noopener noreferrer" className="proj-image-link">
              <div className="proj-image-box">
                {p.image ? (
                  <img src={p.image} alt={p.title} />
                ) : (
                  <div className="proj-image-empty">Image / Preview</div>
                )}
              </div>
            </a>
            <div className="proj-info">
              <span className="proj-subtitle">{p.subtitle}</span>
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
