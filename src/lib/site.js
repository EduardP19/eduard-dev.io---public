// Single source of truth for contact links and headline content.
export const EMAIL = 'eduard.proca93@gmail.com'
export const GITHUB_URL = 'https://github.com/EduardP19'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/eduard-p-34a06b232'
export const CV_URL =
  'https://drive.google.com/file/d/1XUSJhjl18eZeAD0b0ci4I0BmOkL5394K/view?usp=sharing'
// Toggle back to true to bring the CV button back into the hero and contact.
export const SHOW_CV_BUTTON = false

export const NAV_LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Stack' },
  { id: 'chat', label: 'Ask AI' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

export const HERO_WORDS = [
  'AI agents',
  'automation',
  'booking engines',
  'lead pipelines',
  'web platforms',
]

export const STATS = [
  { value: 10, suffix: 'k+', label: 'Monthly users on platforms I maintain' },
  { value: 250, suffix: '+', label: 'API requests handled every day' },
  { value: 27, suffix: 'k', label: 'Leads migrated with zero data loss' },
  { value: 100, prefix: '£', suffix: 'k+', label: 'Monthly bookings processed' },
]

export const STACK_ROW_ONE = [
  'TypeScript', 'React', 'Next.js', 'Node.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Python',
]
export const STACK_ROW_TWO = [
  'Claude API', 'Gemini', 'MCP servers', 'RAG', 'Agentic workflows', 'Twilio', 'Stripe', 'Vercel',
]

export const SKILL_GROUPS = [
  {
    id: 'ai',
    title: 'AI & Agents',
    blurb: 'Agents that take real actions — booking, qualifying, replying — not demos.',
    items: ['Claude API', 'Gemini', 'Agentic workflows', 'RAG', 'MCP servers', 'Prompt engineering'],
    featured: true,
  },
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Fast, accessible interfaces with motion that earns its place.',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'languages',
    title: 'Languages',
    blurb: 'Typed where it matters.',
    items: ['TypeScript', 'JavaScript', 'Python'],
  },
  {
    id: 'backend',
    title: 'Backend & Data',
    blurb: 'APIs, webhooks and data pipelines that survive production.',
    items: ['Node.js', 'REST APIs', 'Webhooks', 'Supabase', 'PostgreSQL', 'MySQL'],
  },
  {
    id: 'platforms',
    title: 'Platforms',
    blurb: 'Payments, messaging, scheduling, automation.',
    items: ['Twilio', 'Stripe', 'Cal.com', 'Zapier', 'Vercel'],
  },
  {
    id: 'tooling',
    title: 'Tooling',
    blurb: 'AI-assisted, git-driven workflow.',
    items: ['Git / GitHub', 'Claude Code', 'Codex', 'VS Code', 'Postman'],
  },
]

export const EXPERIENCE = [
  {
    period: 'Mar 2024 — Now',
    role: 'Full-Stack Developer',
    org: 'ProveIt',
    body:
      'Lead-generation and automation platform serving 10k+ monthly users. Multi-source lead ingestion, 180+ automated workflows a day, CRM integrations, production deploys and debugging — plus a 27k-lead batch migration with retries and checkpoints.',
    tags: ['Automation', 'APIs', 'Production ops'],
  },
  {
    period: 'Dec 2024 — Now',
    role: 'Freelance Full-Stack Developer',
    org: 'EZWebOne',
    body:
      '10+ client builds shipped end to end across hospitality, events, e-commerce and education. Custom booking with dynamic pricing, a gift card platform with secure code generation, and handover docs for non-technical teams.',
    tags: ['Booking systems', 'Payments', 'Delivery ownership'],
  },
  {
    period: '2025 — Now',
    role: 'Founder & Builder',
    org: 'Resevia',
    body:
      'An AI reception agent for beauty salons. Recovers missed calls over SMS, checks live availability, books appointments and sends reminders with no human in the loop. Complete and in pre-launch testing.',
    tags: ['AI agent', 'Twilio', 'System design'],
  },
  {
    period: '2021',
    role: 'BSc, STEM',
    org: 'University of Bedfordshire',
    body: 'Graduated, then went straight into building things people pay for.',
    tags: ['Foundations'],
  },
]

export const ABOUT_TEXT =
  "I'm a developer who ships production systems, not tutorial projects. For 2+ years I've built automation-driven platforms, API integrations and AI agents — software that books appointments, qualifies leads and moves real money. I care about the boring parts too: retries, checkpoints, docs and handover. Now I want to do it inside a team that takes AI seriously."
