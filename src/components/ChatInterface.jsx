import { useEffect, useId, useRef, useState } from 'react'
import { useChat } from '../context/useChat'
import { CHAT_SUGGESTIONS } from '../lib/chatFallback'

function ChatInterface({ variant = 'section' }) {
  const { messages, loading, error, sendMessage, maxMessageLength } = useChat()
  const [input, setInput] = useState('')
  const [suggestionsDismissed, setSuggestionsDismissed] = useState(false)
  const messagesRef = useRef(null)
  const inputRef = useRef(null)
  const inputId = useId()
  const isWidget = variant === 'widget'

  useEffect(() => {
    if (!messagesRef.current) {
      return
    }

    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [messages, loading])

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    const text = input.trim()

    if (!text || loading) {
      return
    }

    setSuggestionsDismissed(true)
    setInput('')
    await sendMessage(text)
    inputRef.current?.focus()
  }

  const handleInputKeyDown = (event) => {
    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()
    event.stopPropagation()
    handleSubmit()
  }

  const handleSuggestionClick = async (suggestion) => {
    if (loading) {
      return
    }

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
      >
        {messages.map((message, index) => (
          <article
            key={`${message.role}-${index}`}
            className={`chat-message ${
              message.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'
            }`}
          >
            <p>{message.content}</p>
          </article>
        ))}

        {loading && (
          <article className="chat-message chat-message-assistant">
            <p className="chat-typing">Typing...</p>
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
        <label htmlFor={inputId} className="chat-input-label">
          Ask a question
        </label>
        <div className="chat-input-row">
          <input
            ref={inputRef}
            id={inputId}
            className="chat-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            maxLength={maxMessageLength}
            placeholder="Ask about Eduard's projects, stack, or availability..."
          />
          <button type="submit" className="chat-submit" disabled={loading || !input.trim()}>
            Send
          </button>
        </div>
        <p className={`chat-counter ${remainingChars < 80 ? 'chat-counter-warning' : ''}`}>
          {remainingChars} chars left
        </p>
      </form>
    </div>
  )
}

export default ChatInterface
