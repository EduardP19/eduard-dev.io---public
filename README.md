# eduard-dev.io — Build Kit

## What's in this folder

| File | Purpose |
|------|---------|
| `PROMPT.md` | Full project spec — branding, site structure, technical requirements, file structure. This is the master brief. |
| `CHATBOT-SYSTEM-PROMPT.md` | The system prompt for the AI chatbot. Contains Eduard's full CV data, personality guidelines, and response rules. Load this into the API route. |
| `SKILL.md` | Step-by-step build guide for Codex / Claude Code. Phase-by-phase instructions, code standards, design rules, and common pitfalls. |

## How to use with Codex / Claude Code

1. Create a new repo: `eduard-dev-portfolio`
2. Copy all three files into the repo root
3. Open in Codex or Claude Code
4. Point the agent at `SKILL.md` first — it contains the build order
5. Reference `PROMPT.md` for all content, branding, and structural decisions
6. The chatbot system prompt in `CHATBOT-SYSTEM-PROMPT.md` gets loaded into `/lib/chatbot-prompt.ts`

## After building

- [x] Replace placeholder email, LinkedIn, and GitHub URLs (search for `TODO`)
- [x] Add project images to `/public/projects/`
- [x] Add your CV PDF to `/public/cv/eduard-cv.pdf`
- [ ] Set `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) in Vercel environment variables
- [ ] Purchase and configure domain: eduard-dev.io
- [ ] Test the chatbot on the live site
