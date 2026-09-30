import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, AtSign, Bot, Copy, CornerDownLeft, Hash, Search } from 'lucide-react'
import { GitHubMark, LinkedInMark } from './Icons'
import { EMAIL, GITHUB_URL, LINKEDIN_URL, NAV_LINKS } from '../lib/site'
import { lockScroll, scrollToTarget, unlockScroll } from '../lib/scroll'

const MotionDiv = motion.div

// ⌘K / Ctrl+K launcher — navigation plus quick actions, fully keyboard driven.
function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const commands = useMemo(
    () => [
      { group: 'Navigate', label: 'Home', icon: Hash, run: () => scrollToTarget('#hero') },
      ...NAV_LINKS.map((link) => ({
        group: 'Navigate',
        label: link.label,
        icon: Hash,
        run: () => scrollToTarget(`#${link.id}`),
      })),
      {
        group: 'Actions',
        label: 'Ask my AI a question',
        icon: Bot,
        run: () => {
          scrollToTarget('#chat')
          window.setTimeout(() => document.querySelector('#chat .chat-input')?.focus(), 1300)
        },
      },
      {
        group: 'Actions',
        label: 'Copy email address',
        icon: Copy,
        run: () => navigator.clipboard?.writeText(EMAIL),
      },
      { group: 'Actions', label: 'Send an email', icon: AtSign, run: () => (window.location.href = `mailto:${EMAIL}`) },
      { group: 'Links', label: 'LinkedIn', icon: LinkedInMark, run: () => window.open(LINKEDIN_URL, '_blank', 'noopener') },
      { group: 'Links', label: 'GitHub', icon: GitHubMark, run: () => window.open(GITHUB_URL, '_blank', 'noopener') },
    ],
    [],
  )

  const filtered = commands.filter((command) =>
    command.label.toLowerCase().includes(query.trim().toLowerCase()),
  )

  const close = () => {
    setOpen(false)
    setQuery('')
    setActive(0)
  }

  useEffect(() => {
    const onKey = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('open-palette', onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined
    lockScroll()
    const id = window.setTimeout(() => inputRef.current?.focus(), 30)
    return () => {
      window.clearTimeout(id)
      unlockScroll()
    }
  }, [open])

  const runCommand = (command) => {
    close()
    window.setTimeout(command.run, 80)
  }

  const onInputKey = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => (index + 1) % Math.max(filtered.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => (index - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (event.key === 'Enter' && filtered[active]) {
      event.preventDefault()
      runCommand(filtered[active])
    } else if (event.key === 'Escape') {
      close()
    }
  }

  let lastGroup = null

  return (
    <AnimatePresence>
      {open ? (
        <MotionDiv
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <MotionDiv
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            data-lenis-prevent
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="palette-search">
              <Search size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setActive(0)
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                aria-label="Search commands"
              />
              <kbd>esc</kbd>
            </div>
            <ul className="palette-list" role="listbox">
              {filtered.length === 0 ? <li className="palette-empty">No results.</li> : null}
              {filtered.map((command, index) => {
                const Icon = command.icon
                const showGroup = command.group !== lastGroup
                lastGroup = command.group
                return (
                  <li key={command.label} role="none">
                    {showGroup ? <span className="palette-group mono">{command.group}</span> : null}
                    <button
                      type="button"
                      role="option"
                      aria-selected={index === active}
                      className={`palette-item ${index === active ? 'is-active' : ''}`}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => runCommand(command)}
                    >
                      <Icon size={16} />
                      <span>{command.label}</span>
                      {index === active ? <CornerDownLeft size={14} /> : <ArrowRight size={14} />}
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="palette-foot mono">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>⌘K toggle</span>
            </div>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  )
}

export default CommandPalette
