import { useCallback, useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import VelocityMarquee from './components/VelocityMarquee'
import Stats from './components/Stats'
import ProjectsSection from './components/ProjectsSection'
import Skills from './components/Skills'
import ChatShowcase from './components/ChatShowcase'
import About from './components/About'
import Contact from './components/Contact'
import ChatWidget from './components/ChatWidget'
import CommandPalette from './components/CommandPalette'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { getPublishedProjects } from './lib/projects'
import { NAV_LINKS, STACK_ROW_ONE, STACK_ROW_TWO } from './lib/site'
import { trackClick } from './lib/track'

const MotionDiv = motion.div

const PARAM_KEYS = [
  'UTM_NAME',
  'UTM_COMPANY',
  'UTM_INDUSTRY',
  'UTM_SOURCE',
  'UTM_MEDIUM',
  'UTM_CAMPAIGN',
  'UTM_TERM',
  'UTM_CONTENT',
]

// Highlights the nav link for whichever section owns the middle of the screen.
function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    NAV_LINKS.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  return active
}

function App() {
  const [hrName] = useState(() =>
    typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('UTM_NAME'),
  )
  const [ready, setReady] = useState(false)
  const [projects, setProjects] = useState([])
  const [projectsError, setProjectsError] = useState(null)
  const activeSection = useActiveSection()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useSmoothScroll()

  const handlePreloaderDone = useCallback(() => setReady(true), [])

  // Persist recruiter UTM params so the logger can attribute later events.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    PARAM_KEYS.forEach((key) => {
      const value = params.get(key)
      if (value) {
        try {
          localStorage.setItem(key, value)
        } catch {
          // Storage can be blocked in private mode — attribution is best effort.
        }
      }
    })
  }, [])

  useEffect(() => {
    let isMounted = true

    getPublishedProjects()
      .then((published) => {
        if (!isMounted) return
        setProjects(published)
        setProjectsError(null)
      })
      .catch((error) => {
        if (isMounted) {
          setProjectsError('Could not load projects from Supabase. Showing fallback projects.')
        }
        console.error('Projects loading failed:', error)
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Keep the page pinned to the top while the intro curtain is down.
  useEffect(() => {
    if (ready) {
      window.__lenis?.start()
      document.documentElement.classList.remove('is-loading')
      return
    }
    window.__lenis?.stop()
    document.documentElement.classList.add('is-loading')
  }, [ready])

  return (
    <div className="app">
      <Preloader onDone={handlePreloaderDone} />
      <Cursor />
      <MotionDiv className="scroll-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Nav activeSection={activeSection} />

      <main>
        <Hero ready={ready} hrName={hrName} />
        <VelocityMarquee rows={[STACK_ROW_ONE, STACK_ROW_TWO]} />
        <Stats />
        <ProjectsSection projects={projects} projectsError={projectsError} trackClick={trackClick} />
        <Skills />
        <ChatShowcase />
        <About />
      </main>

      <Contact />
      <ChatWidget />
      <CommandPalette />
    </div>
  )
}

export default App
