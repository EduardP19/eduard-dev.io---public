import { useState } from 'react'
import { getPortfolioFallbackReply } from '../lib/chatFallback'
import { ChatContext } from './chatContext'

const MAX_MESSAGE_LENGTH = 500
const MAX_HISTORY = 20
const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      "Hi, I'm Eduard's portfolio assistant. Ask me about his projects, skills, or availability.",
  },
]

const normalizeMessage = (value) => value.replace(/\s+/g, ' ').trim()

function ChatProvider({ children }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = async (rawInput) => {
    const input = normalizeMessage(rawInput)

    if (!input || loading) {
      return
    }

    if (input.length > MAX_MESSAGE_LENGTH) {
      setError(`Please keep messages under ${MAX_MESSAGE_LENGTH} characters.`)
      return
    }

    const userMessage = { role: 'user', content: input }
    let nextHistory = []

    setMessages((prev) => {
      nextHistory = [...prev, userMessage].slice(-MAX_HISTORY)
      return nextHistory
    })

    setLoading(true)
    setError(null)

    let assistantReply = ''

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextHistory }),
      })

      if (!response.ok) {
        let errorMessage = `API response status ${response.status}`
        try {
          const errorData = await response.json()
          if (typeof errorData?.error === 'string' && errorData.error.trim()) {
            errorMessage = errorData.error.trim()
          }
        } catch {
          // Keep default message if JSON parsing fails
        }
        throw new Error(errorMessage)
      }

      const contentType = response.headers.get('content-type') ?? ''

      if (contentType.includes('application/json')) {
        const data = await response.json()
        assistantReply = typeof data.reply === 'string' ? data.reply.trim() : ''
      } else {
        assistantReply = (await response.text()).trim()
      }

      if (!assistantReply) {
        assistantReply = getPortfolioFallbackReply(input)
      }
    } catch (error) {
      assistantReply = getPortfolioFallbackReply(input)
      const reason =
        typeof error?.message === 'string' && error.message.trim()
          ? error.message.trim()
          : 'Live AI is unavailable right now.'
      setError(`${reason} Showing local portfolio answers.`)
    } finally {
      setLoading(false)
    }

    setMessages((prev) =>
      [...prev, { role: 'assistant', content: assistantReply }].slice(-MAX_HISTORY),
    )
  }

  const resetConversation = () => {
    setMessages(INITIAL_MESSAGES)
    setError(null)
    setLoading(false)
  }

  const value = {
    messages,
    loading,
    error,
    sendMessage,
    resetConversation,
    maxMessageLength: MAX_MESSAGE_LENGTH,
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatProvider
