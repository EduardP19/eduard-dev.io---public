const FALLBACK_RESPONSES = [
  {
    patterns: ['skill', 'stack', 'technology', 'tech'],
    answer:
      "Eduard works with JavaScript, TypeScript, Python, React, Next.js, Node.js, Supabase (PostgreSQL), MySQL, REST APIs, webhooks, the Claude API, agentic workflows, MCP servers, Twilio, Stripe, Cal.com, Vercel, and automation tools like Zapier and Google Apps Script.",
  },
  {
    patterns: ['project', 'portfolio', 'work', 'built'],
    answer:
      'Recent work includes a lead-generation and automation platform serving 10k+ monthly users, Resevia (an AI reception agent that recovers missed calls over SMS), a hospitality booking system, a gift card platform, and production integrations connecting web apps with CRM and third-party APIs.',
  },
  {
    patterns: ['hire', 'available', 'role', 'job'],
    answer:
      "Eduard is open to developer roles and can contribute across frontend work, API integrations, AI agents, and automation-heavy features. You can reach him via the contact section on this page.",
  },
  {
    patterns: ['contact', 'email', 'linkedin', 'cv', 'resume'],
    answer:
      'Use the contact section to email Eduard directly or connect on LinkedIn, and he can send his CV across on request.',
  },
  {
    patterns: ['ai', 'chatbot', 'assistant', 'gemini', 'automation'],
    answer:
      'This chat assistant demonstrates Eduard’s AI integration work. It runs through a server-side endpoint using the portfolio system prompt and live project data. His product work also uses the Claude API for agent workflows.',
  },
]

export const CHAT_SUGGESTIONS = [
  'What kind of projects has Eduard built?',
  'Which technologies does he use the most?',
  'Is Eduard currently available for roles?',
  'How can I get in touch with him?',
]

export function getPortfolioFallbackReply(message) {
  const normalized = message.toLowerCase()

  const match = FALLBACK_RESPONSES.find((entry) =>
    entry.patterns.some((pattern) => normalized.includes(pattern)),
  )

  if (match) {
    return match.answer
  }

  return "I can help with Eduard's projects, skills, and availability. Try asking about his tech stack, recent client work, or how to contact him."
}
