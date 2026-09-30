import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, Zap } from 'lucide-react'
import ChatInterface from './ChatInterface'
import { useChat } from '../context/useChat'

const MotionDiv = motion.div

const FEATURES = [
  { icon: Sparkles, title: 'Grounded', body: 'Knows my CV, projects and stack. Nothing else.' },
  { icon: ShieldCheck, title: 'Guardrailed', body: 'Tested against 10 jailbreak and injection styles.' },
  { icon: Zap, title: 'Always on', body: 'Local fallback answers if the model is unreachable.' },
]

function ChatShowcase() {
  const { resetConversation, messages } = useChat()

  return (
    <section id="chat" className="section chat-showcase">
      <div className="container chat-grid">
        <div className="chat-copy">
          <span className="eyebrow mono">(03) Ask my AI</span>
          <h2 className="display">
            Interview me,
            <br /> <em className="serif">without</em> the calendar<span className="accent">.</span>
          </h2>
          <p>
            I built an assistant that answers questions about my experience, projects and
            availability — server-side, rate-limited and scoped with a hardened system prompt.
          </p>
          <ul className="chat-features">
            {FEATURES.map((feature) => {
              const FeatureIcon = feature.icon
              const { title, body } = feature
              return (
              <li key={title}>
                <span className="chat-feature-icon">
                  <FeatureIcon size={16} />
                </span>
                <div>
                  <strong>{title}</strong>
                  <span>{body}</span>
                </div>
              </li>
              )
            })}
          </ul>
        </div>

        <MotionDiv
          className="terminal"
          style={{ transformPerspective: 1200 }}
          initial={{ opacity: 0, y: 60, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="terminal-bar">
            <span className="terminal-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="mono dim terminal-title">
              eduard.ai<span className="terminal-title-extra"> — live session</span>
            </span>
            <button
              type="button"
              className="terminal-reset mono"
              onClick={resetConversation}
              disabled={messages.length < 2}
            >
              Reset
            </button>
          </div>
          <ChatInterface />
        </MotionDiv>
      </div>
    </section>
  )
}

export default ChatShowcase
