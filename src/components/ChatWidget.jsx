import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import ChatInterface from './ChatInterface'
import { logEduardDevEvent } from '../lib/eduardLogs'

const MotionAside = motion.aside
const MotionButton = motion.button

// Floating assistant. Stays out of the way on the hero, inline chat and contact sections.
function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [inlineVisible, setInlineVisible] = useState(false)
  const [contactVisible, setContactVisible] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const chat = document.getElementById('chat')
    const hero = document.getElementById('hero')
    const contact = document.getElementById('contact')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === chat) setInlineVisible(entry.isIntersecting)
        if (entry.target === hero) setPastHero(!entry.isIntersecting)
        if (entry.target === contact) setContactVisible(entry.isIntersecting)
      })
    }, { threshold: 0.2 })
    if (chat) observer.observe(chat)
    if (hero) observer.observe(hero)
    if (contact) observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  const handleToggle = () => {
    const nextIsOpen = !isOpen
    setIsOpen(nextIsOpen)

    void logEduardDevEvent({
      eventName: nextIsOpen ? 'chat_widget_open' : 'chat_widget_close',
      eventType: 'chat',
      metadata: { surface: 'widget' },
    })
  }

  const showToggle = isOpen || (pastHero && !inlineVisible && !contactVisible)

  return (
    <div className="chat-widget-root">
      <AnimatePresence>
        {isOpen ? (
          <MotionAside
            id="chat-widget-panel"
            className="chat-widget-panel"
            aria-label="Eduard AI Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <div className="chat-widget-header">
              <div>
                <p className="chat-widget-title">
                  <span className="pulse-dot" /> Eduard&apos;s AI
                </p>
                <p className="chat-widget-subtitle mono">Projects · skills · availability</p>
              </div>
              <button type="button" className="chat-widget-close" onClick={handleToggle} aria-label="Close chat">
                <X size={16} />
              </button>
            </div>
            <ChatInterface variant="widget" />
          </MotionAside>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {showToggle ? (
          <MotionButton
            type="button"
            className={`chat-toggle ${isOpen ? 'is-open' : ''}`}
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls="chat-widget-panel"
            aria-label={isOpen ? 'Hide AI chat' : 'Ask my AI'}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
            {!isOpen ? <span className="chat-toggle-label">Ask my AI</span> : null}
          </MotionButton>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default ChatWidget
