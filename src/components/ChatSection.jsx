import ChatInterface from './ChatInterface'

function ChatSection() {
  return (
    <section id="chat" className="section chat-section">
      <div className="container chat-section-container">
        <div className="chat-intro">
          <h2>Ask My AI</h2>
          <p>
            I built this assistant to answer questions about my projects, experience, and tech
            stack. Ask anything and it will guide you quickly.
          </p>
        </div>
        <ChatInterface />
      </div>
    </section>
  )
}

export default ChatSection
