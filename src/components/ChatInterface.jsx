import { useEffect, useId, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useChat } from '../context/useChat'
import { CHAT_SUGGESTIONS } from '../lib/chatFallback'

const MotionArticle = motion.article

function ChatInterface({ variant = 'section' }) {
  const { messages, loading, error, sendMessage, maxMessageLength } = useChat()
  const [input, setInput] = useState('')
  const [suggestionsDismissed, setSuggestionsDismissed] = useState(false)
  const messagesRef = useRef(null)
  const inputRef = useRef(null)
  const inputId = useId()
  const isWidget = variant === 'widget'

  useEffect(() => {
    const list = messagesRef.current
    if (!list) return
    list.scrollTo({ top: list.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    const text = input.trim()
    if (!text || loading) return

    setSuggestionsDismissed(true)
    setInput('')
    await sendMessage(text)
    inputRef.current?.focus()
  }

  const handleSuggestionClick = async (suggestion) => {
    if (loading) return
    setSuggestionsDismissed(true)
    await sendMessage(suggestion)
    inputRef.current?.focus()
  }

  const remainingChars = maxMessageLength - input.length

  return (
    <div className={`chat-interface ${isWidget ? 'chat-interface-widget' : ''}`}>
      <div
        ref={messagesRef}
        className="chat-messages"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
        data-lenis-prevent
      >
        {messages.map((message, index) => (
          <MotionArticle
            key={`${message.role}-${index}`}
            className={`chat-message ${
              message.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'
            }`}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {message.role !== 'user' ? <span className="chat-avatar mono" aria-hidden="true">AI</span> : null}
            <p>{message.content}</p>
          </MotionArticle>
        ))}

        {loading && (
          <article className="chat-message chat-message-assistant">
            <span className="chat-avatar mono" aria-hidden="true">AI</span>
            <p className="chat-typing" aria-label="Assistant is typing">
              <span />
              <span />
              <span />
            </p>
          </article>
        )}
      </div>

      {!suggestionsDismissed && messages.length < 3 && (
        <div className="chat-suggestions">
          {CHAT_SUGGESTIONS.slice(0, isWidget ? 3 : 4).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="chat-chip"
              onClick={() => handleSuggestionClick(suggestion)}
              disabled={loading}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {error ? <p className="chat-error">{error}</p> : null}

      <form className="chat-form" onSubmit={handleSubmit}>
        <label htmlFor={inputId} className="sr-only">
          Ask a question
        </label>
        <div className="chat-input-row">
          <span className="chat-prompt mono" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={inputRef}
            id={inputId}
            className="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            maxLength={maxMessageLength}
            placeholder="Ask about projects, stack, availability…"
            autoComplete="off"
          />
          <button
            type="submit"
            className="chat-submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <ArrowUp size={18} />
          </button>
        </div>
        {remainingChars < 120 ? (
          <p className={`chat-counter mono ${remainingChars < 40 ? 'chat-counter-warning' : ''}`}>
            {remainingChars} chars left
          </p>
        ) : null}
      </form>
    </div>
  )
}

export default ChatInterface
