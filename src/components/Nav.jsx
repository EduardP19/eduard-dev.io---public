import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { Command } from 'lucide-react'
import { NAV_LINKS } from '../lib/site'
import { lockScroll, scrollToTarget, unlockScroll } from '../lib/scroll'
import Magnetic from './Magnetic'

const MotionHeader = motion.header
const MotionDiv = motion.div
const MotionLi = motion.li

// Text that rolls up to a duplicate of itself on hover.
export function RollText({ children }) {
  return (
    <span className="roll" data-text={children}>
      <span>{children}</span>
    </span>
  )
}

function useLondonTime() {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London',
    }).format(new Date())
  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15000)
    return () => window.clearInterval(id)
  }, [])

  return time
}

function Nav({ activeSection }) {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const time = useLondonTime()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(latest > 40)
    setHidden(latest > previous && latest > 400 && !menuOpen)
  })

  useEffect(() => {
    if (!menuOpen) return undefined
    lockScroll()
    const onKey = (event) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const go = (id) => {
    setMenuOpen(false)
    // Let the overlay start closing before we scroll.
    window.setTimeout(() => scrollToTarget(`#${id}`), 60)
  }

  return (
    <>
      <MotionHeader
        className={`nav ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'is-menu-open' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="nav-inner" aria-label="Primary">
          <a href="#hero" className="nav-logo" aria-label="Back to top">
            <span className="nav-logo-mark">EP</span>
            <span className="nav-logo-text">
              eduard<span className="accent">.</span>dev<span className="caret" />
            </span>
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? 'is-active' : ''}
                >
                  <RollText>{link.label}</RollText>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <span className="nav-clock" title="Eduard's local time">
              <span className="pulse-dot" /> UK {time}
            </span>
            <button
              type="button"
              className="nav-kbd"
              onClick={() => window.dispatchEvent(new Event('open-palette'))}
              aria-label="Open command menu"
            >
              <Command size={13} /> K
            </button>
            <Magnetic>
              <a href="#contact" className="btn btn-accent btn-sm nav-cta">
                <RollText>Let&apos;s talk</RollText>
              </a>
            </Magnetic>
            <button
              type="button"
              className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>
      </MotionHeader>

      <AnimatePresence>
        {menuOpen ? (
          <MotionDiv
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {[{ id: 'hero', label: 'Home' }, ...NAV_LINKS].map((link, index) => (
                <MotionLi
                  key={link.id}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button type="button" onClick={() => go(link.id)}>
                    <span className="mobile-menu-index">0{index}</span>
                    {link.label}
                  </button>
                </MotionLi>
              ))}
            </ul>
            <p className="mobile-menu-foot">
              <span className="pulse-dot" /> Available for developer roles · UK {time}
            </p>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Nav
