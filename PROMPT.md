# CODEX PROMPT — Build eduard-dev.io

## Project Overview

Build a personal developer portfolio site for **Eduard** — a junior/mid developer who builds AI-powered web applications. The site serves as a job-hunting tool: it must impress hiring managers at AI-forward startups and mid-size tech companies in the UK.

The site has ONE job: get Eduard interviews.

**Live URL:** eduard-dev.io  
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Vercel  
**Repo:** `eduard-dev-portfolio` (personal GitHub)

---

## Brand Identity

### Name & Domain
- **Brand:** Eduard Dev
- **Domain:** eduard-dev.io
- **Tagline:** "I build AI-powered web apps."

### Tone
- Professional but approachable
- Builder, not theorist — show don't tell
- Confident without arrogance
- Modern, clean, slightly bold

### Visual Direction
- **Theme:** Dark mode primary (with light mode toggle)
- **Aesthetic:** Developer-meets-designer. Think: Linear, Vercel, Raycast — clean dark interfaces with sharp typography and subtle motion
- **Primary colour:** Electric blue (#3B82F6) or similar — techy, trustworthy
- **Accent:** Warm amber or green for CTAs and highlights
- **Typography:** 
  - Display/headings: A distinctive mono or geometric sans (e.g., JetBrains Mono, Geist, Satoshi, or similar — NOT Inter, NOT Arial)
  - Body: Clean readable sans-serif that pairs well
- **Effects:** Subtle grain texture on backgrounds, smooth scroll animations, gentle hover states on project cards. No over-the-top particle effects.

### Logo / Mark
- Simple wordmark: `<eduard.dev />` styled as a code tag
- Used in navbar and favicon
- No complex icon needed — the code-tag format IS the brand

---

## Site Structure

Single-page scrolling site with smooth anchor navigation. 6 sections:

### 1. Hero Section
- Full viewport height
- Name: **Eduard**
- Title: **Junior Developer**
- Subtitle: **"I build AI-powered web apps with Next.js, React, and Claude API."**
- Two CTAs: "View My Work" (scrolls to projects) | "Download CV" (PDF download)
- Subtle animated background (gradient mesh or grid pattern that moves slowly)
- The AI chatbot toggle button lives here (fixed position, bottom-right, persists across all sections)

### 2. About Section
- Short, punchy bio (3-4 sentences max):

```
I'm a developer based in the UK who builds real products, not tutorial projects. 
I've shipped an AI-powered reception agent for beauty salons, rebuilt client 
websites with Stripe and CMS integrations, and I'm comfortable working across 
the full stack — from frontend to API to deployment.

I'm looking for a junior/mid developer role at a company that's serious about AI.
```

- Tech stack visual grid showing tools/languages with icons:
  - **Languages:** HTML, CSS, JavaScript, TypeScript
  - **Frontend:** React, Next.js 14, Tailwind CSS
  - **Backend:** Node.js, Supabase, REST APIs
  - **AI & Automation:** Claude API, Prompt Engineering, AI Agent Architecture, Twilio, Zapier
  - **Tools:** Git/GitHub, Vercel, VS Code, Wix/Velo
  
- Each tech item should be a small card/pill with an icon and label. Group by category.

### 3. Projects Section
- Grid of project cards (2 columns on desktop, 1 on mobile)
- Each card has: screenshot/preview image, project name, short description, tech stack pills, links to GitHub repo + live demo (if available)

**Project 1 — Resevia (FEATURED, larger card)**
- Title: "Resevia — AI Reception Agent"
- Description: "An AI-powered receptionist for beauty salons. Handles missed calls via SMS, checks live calendar availability, and books appointments — all without human intervention."
- Tech: Next.js 14, Supabase, Claude API, Twilio, Google Calendar API, Vercel
- Links: GitHub repo, live demo (if available)
- Status badge: "In Development"

**Project 2 — The Bus Stop**
- Title: "The Bus Stop — Glamping Site"
- Description: "Full website rebuild for a Scottish glamping business. Wix CMS with Stripe integration for experience bookings, plus internal documentation for non-technical management."
- Tech: Wix/Velo, Stripe, CMS
- Links: Live site (thebusstop.scot)

**Project 3 — This Portfolio Site**
- Title: "eduard-dev.io"
- Description: "This site. Built with Next.js 14 and includes an AI chatbot powered by Claude API that can answer questions about my experience and projects."
- Tech: Next.js 14, TypeScript, Tailwind CSS, Claude API, Vercel
- Links: GitHub repo

**Project 4 — (Placeholder for future project)**
- Leave a placeholder card with "More coming soon" or similar. This motivates Eduard to keep shipping.

### 4. AI Chatbot Section
- Dedicated section that introduces the chatbot
- Heading: "Ask My AI About Me"
- Subheading: "I built an AI assistant that knows my CV, my projects, and my tech stack. Ask it anything."
- Large embedded chat interface (not just the floating widget — a full inline chat experience in this section)
- Pre-loaded suggested questions as clickable chips:
  - "What's Eduard's tech stack?"
  - "Tell me about the Resevia project"
  - "What kind of role is Eduard looking for?"
  - "What experience does Eduard have with AI?"
- The floating chat widget (bottom-right) and this inline section should share the same conversation/state

### 5. Experience Timeline
- Simple vertical timeline showing:
  - **2024-Present:** Freelance Developer — Building AI-powered products and client websites
  - **2021-2024:** Digital Consultant (EZWebOne) — Web development, CMS builds, client projects
  - **2021:** Graduated — STEM, University of Bedfordshire
- Keep it minimal. The projects section does the heavy lifting.

### 6. Contact Section
- Heading: "Let's Talk"
- Subheading: "I'm actively looking for a junior/mid developer role at an AI-forward company."
- Contact methods:
  - Email: (Eduard's email)
  - LinkedIn: (Eduard's LinkedIn profile link)
  - GitHub: (Eduard's personal GitHub link)
- CV download button (same PDF as hero section)
- No contact form needed — direct links are better for job hunting

### Navigation
- Fixed top navbar, transparent initially, becomes solid on scroll
- Logo left (`<eduard.dev />`)
- Nav links right: About | Projects | Chat | Experience | Contact
- Mobile: hamburger menu
- Smooth scroll to anchors on click

### Footer
- Minimal: "Built by Eduard with Next.js & Claude API | 2026"
- Social links: GitHub, LinkedIn

---

## AI Chatbot — Technical Spec

### Architecture
- **Frontend:** Custom chat component in React/Next.js
- **Backend:** Next.js API route (`/api/chat`) that proxies to Claude API
- **Model:** claude-sonnet-4-20250514 (fast, cheap, good enough for this)
- **Streaming:** Yes — use Anthropic SDK streaming for real-time response display

### Chat UI
- Floating widget: fixed bottom-right, circular button with chat icon, expands to chat panel
- Inline section: full-width chat embedded in the "Ask My AI" section
- Both share conversation state (use React context or state management)
- Message bubbles: user messages right-aligned, AI messages left-aligned
- Typing indicator while streaming
- Suggested question chips above the input field
- Input: text field + send button, submit on Enter
- Clear conversation button
- Mobile responsive — chat panel should be full-screen overlay on mobile

### API Route (`/api/chat`)
```typescript
// /app/api/chat/route.ts
// - Receives message history from frontend
// - Prepends the system prompt (from SKILL.md / chatbot-prompt.md)
// - Calls Claude API with streaming
// - Returns streamed response
// - Rate limiting: max 20 messages per session to prevent abuse
// - No API key exposed to frontend
```

### Environment Variables
```
ANTHROPIC_API_KEY=sk-ant-...
```

### System Prompt
See the separate file: `CHATBOT-SYSTEM-PROMPT.md`
The system prompt should be loaded from a markdown file at build time or kept as a constant in the API route. This makes it easy to update without changing code.

---

## File Structure

```
eduard-dev-portfolio/
├── app/
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Main single-page site
│   ├── api/
│   │   └── chat/
│   │       └── route.ts     # Claude API proxy endpoint
│   └── globals.css          # Tailwind + custom styles
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── TechStack.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── ChatSection.tsx      # Inline chat section
│   ├── ChatWidget.tsx       # Floating chat widget
│   ├── ChatInterface.tsx    # Shared chat UI component
│   ├── ChatProvider.tsx     # Context provider for shared chat state
│   ├── Timeline.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── chatbot-prompt.ts    # System prompt constant
│   └── types.ts             # TypeScript types
├── public/
│   ├── cv/
│   │   └── eduard-cv.pdf    # Downloadable CV
│   ├── projects/
│   │   ├── resevia-preview.png
│   │   ├── busstop-preview.png
│   │   └── portfolio-preview.png
│   └── favicon.ico
├── CHATBOT-SYSTEM-PROMPT.md # Chatbot personality & knowledge
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

---

## Technical Requirements

- **Next.js 14** with App Router (not Pages Router)
- **TypeScript** throughout
- **Tailwind CSS** for styling (no component libraries like shadcn — keep it custom)
- **Framer Motion** for scroll animations and micro-interactions
- **Anthropic SDK** (`@anthropic-ai/sdk`) for Claude API calls
- **Responsive:** mobile-first, works perfectly on phone/tablet/desktop
- **Performance:** Lighthouse score 90+ on all metrics
- **SEO:** proper meta tags, Open Graph image, structured data
- **Accessibility:** semantic HTML, keyboard navigation, ARIA labels, colour contrast
- **Dark/Light mode:** toggle in navbar, default to dark, respect system preference

---

## Deployment

- **Platform:** Vercel
- **Domain:** eduard-dev.io (configure in Vercel dashboard)
- **Environment variables:** Set `ANTHROPIC_API_KEY` in Vercel project settings
- **Build command:** `next build`
- **Output:** Static where possible, API route runs as serverless function

---

## What NOT to Build

- No blog (not now — adds complexity, no ROI for job hunting)
- No contact form (direct links are better)
- No CMS (content is hardcoded — it's a portfolio, not a publication)
- No authentication
- No database (chat is sessionless — no conversation persistence)
- No analytics (add later if needed — Vercel Analytics is one click)
