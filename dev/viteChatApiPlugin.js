import chatHandler from '../api/chat.js'

function getPathname(url) {
  try {
    return new URL(url, 'http://localhost').pathname
  } catch {
    return url
  }
}

function readRequestBody(req) {
  if (typeof req.body === 'string') {
    return Promise.resolve(req.body)
  }

  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', (chunk) => {
      body += chunk
    })

    req.on('end', () => resolve(body))
    req.on('error', reject)
  })
}

function createServerlessResponse(res) {
  let statusCode = 200

  return {
    setHeader(name, value) {
      res.setHeader(name, value)
      return this
    },
    status(code) {
      statusCode = code
      return this
    },
    json(payload) {
      res.statusCode = statusCode
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(payload))
      return this
    },
  }
}

function createChatMiddleware() {
  return async (req, res, next) => {
    const pathname = getPathname(req.url ?? '')

    if (pathname !== '/api/chat') {
      next()
      return
    }

    try {
      req.body = await readRequestBody(req)
      await chatHandler(req, createServerlessResponse(res))
    } catch (error) {
      next(error)
    }
  }
}

export function viteChatApiPlugin() {
  const middleware = createChatMiddleware()

  return {
    name: 'vite-chat-api-plugin',
    configureServer(server) {
      server.middlewares.use(middleware)
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware)
    },
  }
}
