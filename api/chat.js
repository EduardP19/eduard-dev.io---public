import { readFile } from 'node:fs/promises'
import path from 'node:path'

const MAX_MESSAGES = 20
const MAX_MESSAGE_LENGTH = 500
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 40
const FALLBACK_MODEL = 'gemini-2.5-flash'

const requestLog = new Map()

const DEFAULT_SYSTEM_PROMPT = [
  "You are Eduard's portfolio assistant.",
  "Answer questions about Eduard's projects, skills, and availability.",
  'Be concise, factual, and friendly.',
  "If a question is outside Eduard's profile, say so and guide the user back to relevant topics.",
].join(' ')

let cachedSystemPrompt = null
const isProduction = process.env.NODE_ENV === 'production'

function getClientId(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim()
  }

  return req.socket?.remoteAddress ?? 'unknown'
}

function isRateLimited(clientId) {
  const now = Date.now()
  const existing = requestLog.get(clientId) ?? []
  const recent = existing.filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(clientId, recent)
    return true
  }

  recent.push(now)
  requestLog.set(clientId, recent)
  return false
}

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim()
}

function parseJsonBody(req) {
  if (!req.body) {
    return {}
  }

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }

  if (typeof req.body === 'object') {
    return req.body
  }

  return {}
}

function validateAndNormalizeMessages(rawMessages) {
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return { error: 'Missing messages array.' }
  }

  if (rawMessages.length > MAX_MESSAGES) {
    return { error: `Too many messages. Maximum is ${MAX_MESSAGES}.` }
  }

  const normalized = []

  for (const message of rawMessages) {
    const role = message?.role
    const content = message?.content

    if (!['user', 'assistant'].includes(role)) {
      return { error: "Invalid message role. Use 'user' or 'assistant'." }
    }

    if (typeof content !== 'string') {
      return { error: 'Each message content must be a string.' }
    }

    const cleaned = normalizeText(content)

    if (!cleaned) {
      return { error: 'Message content cannot be empty.' }
    }

    if (cleaned.length > MAX_MESSAGE_LENGTH) {
      return { error: `Message too long. Maximum is ${MAX_MESSAGE_LENGTH} characters.` }
    }

    normalized.push({ role, content: cleaned })
  }

  return { messages: normalized }
}

async function getSystemPrompt() {
  if (isProduction && cachedSystemPrompt) {
    return cachedSystemPrompt
  }

  try {
    const promptPath = path.join(process.cwd(), 'CHATBOT-SYSTEM-PROMPT.md')
    const promptFile = await readFile(promptPath, 'utf8')

    const normalizedPrompt = normalizeText(promptFile)
    if (isProduction) {
      cachedSystemPrompt = normalizedPrompt
    }
    return normalizedPrompt
  } catch {
    if (isProduction) {
      cachedSystemPrompt = DEFAULT_SYSTEM_PROMPT
    }
    return DEFAULT_SYSTEM_PROMPT
  }
}

function extractGeminiReply(data) {
  const parts = data?.candidates?.[0]?.content?.parts

  if (!Array.isArray(parts)) {
    return ''
  }

  return parts
    .map((part) => (typeof part?.text === 'string' ? part.text : ''))
    .join('\n')
    .trim()
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' })
  }

  const clientId = getClientId(req)
  if (isRateLimited(clientId)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' })
  }

  const body = parseJsonBody(req)
  const validated = validateAndNormalizeMessages(body.messages)

  if (validated.error) {
    return res.status(400).json({ error: validated.error })
  }

  const model = process.env.GEMINI_MODEL ?? FALLBACK_MODEL
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model,
  )}:generateContent`

  const systemPrompt = await getSystemPrompt()
  const contents = validated.messages.map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.content }],
  }))

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 700,
        },
      }),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      const providerMessage = data?.error?.message || 'Gemini request failed.'
      const status = response.status === 429 ? 429 : 502
      return res.status(status).json({ error: providerMessage })
    }

    const reply = extractGeminiReply(data)

    if (!reply) {
      return res.status(502).json({ error: 'Gemini returned an empty response.' })
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Gemini chat error:', error)
    return res.status(500).json({ error: 'Unexpected server error while generating response.' })
  }
}
