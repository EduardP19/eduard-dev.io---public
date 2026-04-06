# SKILL.md — Portfolio Site Build Guide
# Instructions for Codex / Claude Code when building eduard-dev.io

---

## What You're Building

A personal developer portfolio for Eduard at eduard-dev.io. Single-page Next.js 14 site with an embedded AI chatbot. The site must get Eduard hired — every design and copy decision serves that goal.

## Current Repo Runtime Note

- This repository currently runs as a Vite app and uses a serverless route at `api/chat.js` for chat.
- Current model provider is Gemini via `GEMINI_API_KEY` / `GOOGLE_API_KEY`.
- Keep all model keys server-side; never expose them in frontend code.

## Build Order

Follow this sequence. Do not skip steps.

### Phase 1: Scaffold (30 mins)
1. `npx create-next-app@latest eduard-dev-portfolio --typescript --tailwind --app --src-dir=false --import-alias="@/*"` 
2. Install dependencies: `npm install @anthropic-ai/sdk framer-motion lucide-react`
3. Set up folder structure as defined in PROMPT.md
4. Configure fonts in `layout.tsx` — use Google Fonts. Pick a distinctive mono for headings (JetBrains Mono or similar) and a clean sans for body (Geist, Outfit, or similar). Do NOT use Inter or Arial.
5. Set up Tailwind config with custom colours matching the brand (electric blue primary, dark backgrounds, warm accent)
6. Create CSS variables for dark/light mode theming in `globals.css`

### Phase 2: Layout & Navigation (1 hour)
1. Build `Navbar.tsx` — fixed, transparent-to-solid on scroll, logo left, links right, mobile hamburger, dark/light toggle
2. Build `Footer.tsx` — minimal, with social links
3. Set up smooth scrolling between sections in `page.tsx`
4. Test mobile responsiveness at every step

### Phase 3: Content Sections (2-3 hours)
Build each section as a separate component. Import and stack them in `page.tsx`.

1. **Hero.tsx** — full viewport, animated background (CSS gradient mesh or subtle grid), name, title, tagline, two CTA buttons. Add Framer Motion entrance animations (fade up, stagger).
2. **About.tsx** — short bio text + TechStack grid component
3. **TechStack.tsx** — grid of tech pills/cards grouped by category. Use Lucide icons or simple SVG icons. Subtle hover animation.
4. **Projects.tsx** — grid of ProjectCard components. Featured card (Resevia) spans full width or is visually emphasised. Each card: image placeholder, title, description, tech pills, links.
5. **Timeline.tsx** — vertical timeline with 3 entries. Simple, clean, minimal animation.
6. **Contact.tsx** — heading, subheading, direct links (email, LinkedIn, GitHub), CV download button.

### Phase 4: AI Chatbot (2-3 hours)
This is the most important feature. Build it well.

1. **ChatProvider.tsx** — React context that holds conversation state (messages array), sendMessage function, loading state. This is shared between the floating widget and inline section.
2. **ChatInterface.tsx** — the reusable chat UI: message list, input field, send button, typing indicator, suggested question chips. Accepts messages and onSend from context.
3. **ChatWidget.tsx** — floating button (fixed bottom-right), expands to a chat panel. Uses ChatInterface. Animate open/close with Framer Motion.
4. **ChatSection.tsx** — the inline "Ask My AI" section. Uses ChatInterface. Larger, embedded layout.
5. **/api/chat/route.ts** — API route that:
   - Receives `{ messages: Array<{role, content}> }` from frontend
   - Validates input (max 20 messages per request, max 500 chars per message)
   - Prepends the system prompt from `lib/chatbot-prompt.ts`
   - Calls Claude API with streaming using `@anthropic-ai/sdk`
   - Returns a ReadableStream for real-time display
   - Handles errors gracefully (rate limits, API failures)

### Phase 5: Polish (1-2 hours)
1. Add scroll-triggered animations with Framer Motion (fade in on scroll for each section)
2. Add subtle background texture (CSS noise/grain) on dark sections
3. Test dark/light mode toggle — every section must look good in both
4. Test on mobile (iPhone SE width minimum), tablet, and desktop
5. Lighthouse audit — fix any performance, accessibility, or SEO issues
6. Add meta tags, Open Graph image, and favicon

### Phase 6: Deploy
1. Push to GitHub (personal account, public repo)
2. Connect repo to Vercel
3. Add `ANTHROPIC_API_KEY` environment variable in Vercel
4. Configure custom domain: eduard-dev.io
5. Test everything on the live URL

---

## Code Standards

- TypeScript strict mode — no `any` types
- All components are functional with hooks
- Use `"use client"` directive only where needed (components with state, effects, or browser APIs)
- Server components by default
- Tailwind for all styling — no inline styles, no CSS modules
- Framer Motion for animations — no CSS keyframe animations for complex motion
- All images use `next/image` with proper alt text
- Semantic HTML: `<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`
- Every interactive element must be keyboard accessible
- Comments only where logic is non-obvious — don't comment the obvious

## Chat API Security

- NEVER expose the API key to the frontend
- Rate limit: track messages per session (use a simple counter in the API route or middleware)
- Input validation: reject messages over 500 characters
- System prompt is server-side only — never sent to the frontend
- Sanitise user input before passing to Claude
- Return proper error responses (429 for rate limit, 500 for API errors) with user-friendly messages

## Design Rules

- NO generic AI aesthetics (no purple gradients, no Inter font, no card-heavy layouts with rounded corners everywhere)
- Dark mode should feel premium — think Linear or Vercel dashboard
- Light mode should be clean and bright, not washed out
- Animations should be smooth and purposeful — no bouncing, no flashy transitions
- Mobile experience is as important as desktop — test at 375px width
- Typography hierarchy must be clear: one glance and you know what's a heading, what's body, what's a label
- Project screenshots: use placeholder images initially, replace with real screenshots later. Use a consistent aspect ratio (16:9 or 4:3).

## Content Notes

- All copy is in PROMPT.md — use it as written unless something doesn't fit
- The chatbot system prompt is in CHATBOT-SYSTEM-PROMPT.md — load it into `lib/chatbot-prompt.ts` as a string constant
- Eduard will replace placeholder project images later
- Eduard will add his actual email, LinkedIn URL, and GitHub URL — use placeholder values like `your-email@example.com` and mark them with `// TODO: Replace with actual URL` comments

## Agent Project Knowledge (Required)

- Primary source of project truth: Supabase `projects` table
- Query only published projects and order by `sort_order` (ascending), then `created_at` (descending)
- Expected fields: `id`, `slug`, `title`, `category`, `industry`, `description`, `summary`, `highlights`, `live_url`, `case_study`, `featured`, `published`, `sort_order`, `created_at`
- If Supabase is unavailable or returns zero rows, use fallback project knowledge from `src/lib/projects.js`
- Keep project answers factual and concise: what was built, who it was for, stack/highlights, and business outcome
- Do not invent project metrics or claims not present in Supabase/fallback data
- When asked about "latest projects", prioritize sorted Supabase data (not hardcoded UI order)

## Professional Activity Context (Required)

- Use the updated CV context when answering professional background questions.
- Current timeline to preserve:
  - **Full-Stack Developer — ProveIt (March 2024–Present)**: lead-generation platform, automation workflows, API-heavy backend logic, production deployments.
  - **Freelance Web Developer — EZWebOne (December 2024–Present)**: client websites/systems across hospitality, events, e-commerce, education.
- Treat both tracks as active; do not present them as mutually exclusive.
- For ProveIt context, emphasize:
  - multi-source lead ingestion and workflow automation
  - production operations and debugging
  - batch-processing migration work for large lead datasets
- For EZWebOne context, emphasize:
  - delivery ownership (build to handover)
  - CMS + booking + payment integrations
  - documentation for non-technical teams
- Do not invent employer names, metrics, or dates beyond known CV/system-prompt facts.

## Agent Response Context Rules (Required)

- When asked about "current work", mention both ProveIt and freelance activity.
- When asked about "AI experience", distinguish clearly:
  - product/project work using Claude API and agent architecture
  - portfolio assistant runtime currently using Gemini API
- When asked "what has he built", prioritize:
  1. Resevia (AI receptionist product)
  2. ProveIt platform and migration/automation systems
  3. The Bus Stop and other client project delivery
- Resevia status specifics to preserve:
  - AI model: Gemini 2.5 Pro
  - Booking source: iCal.eu
  - Twilio infrastructure: built, but not yet live in production

### Current Fallback Project Knowledge

1. Say I Do Weddings
2. The Memory Corners
3. Txengo
4. ProveIt
5. Study and Succeed

### Model Environment

- Gemini key available via `GEMINI_API_KEY` (alias: `GOOGLE_API_KEY`) in local env files
- Keep model keys server-side only; never expose them in client code

## Common Pitfalls to Avoid

1. **Don't over-engineer the chat.** No WebSocket, no database, no conversation persistence. Simple POST to API route, stream the response, done.
2. **Don't build a blog.** There's no blog section. Don't add one.
3. **Don't use a component library.** No shadcn, no MUI, no Chakra. Custom Tailwind only.
4. **Don't add analytics or tracking.** Eduard can add Vercel Analytics later with one click.
5. **Don't make the chatbot too clever.** It answers questions about Eduard using the system prompt. It doesn't browse the web, it doesn't use tools, it doesn't do anything else.
6. **Don't forget the CV download.** Both hero and contact sections need a working download link pointing to `/cv/eduard-cv.pdf`.
