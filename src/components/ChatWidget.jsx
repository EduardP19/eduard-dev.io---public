import { useState } from 'react'
import ChatInterface from './ChatInterface'

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="chat-widget-root">
      {isOpen ? (
        <aside
          id="chat-widget-panel"
          className="chat-widget-panel"
          aria-label="Eduard AI Assistant"
        >
          <div className="chat-widget-header">
            <div>
              <p className="chat-widget-title">Eduard AI Assistant</p>
              <p className="chat-widget-subtitle">Projects, skills, and availability.</p>
            </div>
            <button
              type="button"
              className="chat-widget-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          <ChatInterface variant="widget" />
        </aside>
      ) : null}

      <button
        type="button"
        className={`chat-toggle ${isOpen ? 'chat-toggle-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="chat-widget-panel"
      >
        {isOpen ? 'Hide AI Chat' : 'Ask AI'}
      </button>
    </div>
  )
}

export default ChatWidget
