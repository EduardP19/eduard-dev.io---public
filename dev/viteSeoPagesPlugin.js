import { renderAreaPages, renderLlmsTxt, renderSitemap } from '../seo/pages.js'

// Local landing pages + sitemap.xml + llms.txt: served on the fly in dev, emitted as
// static files at build. Vercel's cleanUrls maps /web-design-x to web-design-x.html.
export function viteSeoPagesPlugin() {
  const files = () => ({
    ...Object.fromEntries(
      Object.entries(renderAreaPages()).map(([path, html]) => [`${path.slice(1)}.html`, html]),
    ),
    'sitemap.xml': renderSitemap(),
    'llms.txt': renderLlmsTxt(),
  })

  const TYPES = { html: 'text/html', xml: 'application/xml', txt: 'text/plain' }

  return {
    name: 'seo-pages',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? '').split('?')[0].replace(/^\//, '')
        const all = files()
        const name = all[pathname] ? pathname : all[`${pathname}.html`] ? `${pathname}.html` : null
        if (!name) return next()
        res.setHeader('Content-Type', `${TYPES[name.split('.').pop()]}; charset=utf-8`)
        res.end(all[name])
      })
    },
    generateBundle() {
      Object.entries(files()).forEach(([fileName, source]) => {
        this.emitFile({ type: 'asset', fileName, source })
      })
    },
  }
}
