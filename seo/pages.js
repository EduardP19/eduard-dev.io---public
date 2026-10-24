// Static, JS-free HTML for the local landing pages, plus sitemap.xml and llms.txt.
// Rendered at build time (and on the fly in dev) by dev/viteSeoPagesPlugin.js.
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SERVICES, SERVICE_AREAS, SITE_URL, areaPath } from '../src/lib/site.js'
import { HUB_CONTENT, PROJECTS, SHARED_FAQS, STEPS, TOWN_CONTENT } from './towns.js'

const HUB = SERVICE_AREAS[0]
const TOWNS = SERVICE_AREAS.slice(1)
const OG_IMAGE = `${SITE_URL}/og-image.png`

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const areaName = (slug) => SERVICE_AREAS.find((area) => area.slug === slug)?.name ?? slug
const mailto = (place) => `mailto:${EMAIL}?subject=${encodeURIComponent(`Website enquiry — ${place}`)}`

const STYLES = `
:root{--bg:#07070a;--surface:rgba(255,255,255,.03);--line:rgba(255,255,255,.08);--line-strong:rgba(255,255,255,.16);--text:#ecebe6;--muted:#8b8b95;--accent:#c8ff2e;--ink:#07070a;--sans:'Geist',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;--serif:'Instrument Serif','Times New Roman',serif;--mono:'JetBrains Mono',ui-monospace,monospace;--gutter:clamp(16px,4vw,48px)}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{background:var(--bg);-webkit-text-size-adjust:100%}
body{background:var(--bg);color:var(--text);font-family:var(--sans);font-size:17px;line-height:1.65;-webkit-font-smoothing:antialiased;overflow-x:clip}
a{color:inherit}
img{display:block;max-width:100%;height:auto}
ul,ol{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}
.wrap{max-width:1200px;margin:0 auto;padding:0 var(--gutter)}
.mono{font-family:var(--mono);font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}
em{font-family:var(--serif);font-style:italic;font-weight:400}
.accent{color:var(--accent)}
.top{position:sticky;top:0;z-index:5;background:rgba(7,7,10,.82);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;height:64px}
.brand{font-weight:600;text-decoration:none;letter-spacing:-.02em;white-space:nowrap}
.top nav{display:flex;align-items:center;gap:20px}
.top nav a{text-decoration:none;color:var(--muted);font-size:15px}
.top nav a:hover{color:var(--text)}
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:12px 22px;font-weight:500;text-decoration:none;border:1px solid var(--line-strong);white-space:nowrap}
.btn-accent{background:var(--accent);color:var(--ink)!important;border-color:var(--accent)}
.btn-sm{padding:8px 16px;font-size:14px}
.crumbs{padding-top:32px}
.crumbs ol{display:flex;flex-wrap:wrap;gap:8px}
.crumbs li+li::before{content:'/';margin-right:8px;color:var(--line-strong)}
.crumbs a{text-decoration:none}
.hero{padding-top:48px;padding-bottom:72px}
h1{font-size:clamp(40px,7vw,92px);line-height:.98;letter-spacing:-.045em;font-weight:500;margin:20px 0 28px;max-width:16ch}
.lede{font-size:clamp(18px,1.8vw,22px);color:var(--muted);max-width:640px}
.ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
section{padding:56px 0;border-top:1px solid var(--line)}
h2{font-size:clamp(28px,4vw,48px);line-height:1.05;letter-spacing:-.035em;font-weight:500;margin-bottom:28px;max-width:22ch}
h3{font-size:20px;letter-spacing:-.02em;font-weight:500;margin-bottom:8px}
.grid{display:grid;gap:16px;grid-template-columns:1fr}
@media(min-width:760px){.grid-3{grid-template-columns:repeat(3,1fr)}.grid-2{grid-template-columns:repeat(2,1fr)}.split{display:grid;grid-template-columns:1.2fr 1fr;gap:48px}}
@media(min-width:960px){.grid-4{grid-template-columns:repeat(4,1fr)}}
@media(min-width:600px) and (max-width:959px){.grid-4{grid-template-columns:repeat(2,1fr)}}
.card{background:var(--surface);border:1px solid var(--line);border-radius:20px;padding:24px}
.card p,.split p,.muted{color:var(--muted)}
.pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.pills li{font-size:13px;border:1px solid var(--line-strong);border-radius:999px;padding:4px 12px}
.ticks li{position:relative;padding-left:28px;margin-bottom:14px;color:var(--muted)}
.ticks li::before{content:'';position:absolute;left:0;top:.6em;width:12px;height:12px;border-radius:50%;background:var(--accent);box-shadow:0 0 12px rgba(200,255,46,.4)}
.project{padding:0;overflow:hidden}
.project img{aspect-ratio:16/10;object-fit:cover;object-position:top;width:100%;border-bottom:1px solid var(--line)}
.project div{padding:20px}
.steps{counter-reset:s}
.steps li{counter-increment:s}
.steps li::before{content:'0' counter(s);display:block;font-family:var(--mono);font-size:12px;color:var(--accent);margin-bottom:12px}
details{border-bottom:1px solid var(--line);padding:20px 0}
summary{cursor:pointer;font-size:19px;font-weight:500;letter-spacing:-.01em;list-style:none;display:flex;justify-content:space-between;gap:16px}
summary::-webkit-details-marker{display:none}
summary::after{content:'+';color:var(--accent);font-family:var(--mono)}
details[open] summary::after{content:'–'}
details p{color:var(--muted);margin-top:12px;max-width:760px}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
.chips a{text-decoration:none;border:1px solid var(--line-strong);border-radius:999px;padding:8px 16px;font-size:15px}
.chips a:hover{border-color:var(--accent);color:var(--accent)}
.town{text-decoration:none;display:block}
.town:hover{border-color:var(--accent)}
.cta{text-align:left;padding:96px 0}
.cta h2{font-size:clamp(36px,6vw,80px);max-width:none}
footer{border-top:1px solid var(--line);padding:40px 0 56px}
footer .wrap{display:grid;gap:20px}
footer ul{display:flex;flex-wrap:wrap;gap:8px 18px}
footer a{color:var(--muted);text-decoration:none;font-size:14px}
footer a:hover{color:var(--text)}
@media(max-width:640px){.top nav .hide-sm{display:none}}
`

function head({ title, description, url, schema }) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#07070a">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Eduard Proca">
<meta property="og:locale" content="en_GB">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${OG_IMAGE}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<style>${STYLES}</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>`
}

function header(place) {
  return `<header class="top"><div class="wrap">
<a class="brand" href="/">Eduard Proca<span class="accent">.</span></a>
<nav aria-label="Primary">
<a class="hide-sm" href="/#work">Portfolio</a>
<a class="hide-sm" href="${areaPath(HUB.slug)}">Hertfordshire</a>
<a class="btn btn-accent btn-sm" href="${mailto(place)}">Get a quote</a>
</nav></div></header>`
}

function footer() {
  const links = SERVICE_AREAS.map(
    (area) =>
      `<li><a href="${areaPath(area.slug)}">Web design ${area.slug === HUB.slug ? 'Hertfordshire' : esc(area.name)}</a></li>`,
  ).join('')
  return `<footer><div class="wrap">
<ul>${links}</ul>
<ul><li><a href="/">Portfolio</a></li><li><a href="mailto:${EMAIL}">${EMAIL}</a></li><li><a href="${LINKEDIN_URL}" rel="me">LinkedIn</a></li><li><a href="${GITHUB_URL}" rel="me">GitHub</a></li></ul>
<p class="mono">© ${new Date().getFullYear()} Eduard Proca · Web developer based in Hemel Hempstead, Hertfordshire</p>
</div></footer>`
}

function servicesSection(place) {
  const cards = SERVICES.map(
    (service) => `<div class="card"><h3>${esc(service.title)}</h3><p>${esc(service.blurb)}</p>
<ul class="pills">${service.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></div>`,
  ).join('')
  return `<section><div class="wrap">
<p class="mono">Services</p><h2>What I build for ${esc(place)} businesses</h2>
<div class="grid grid-3">${cards}</div></div></section>`
}

function projectsSection({ compact = false } = {}) {
  const cards = PROJECTS.map(
    (project) => `<article class="card project">
<img src="${encodeURI(project.image)}" alt="${esc(project.title)} website" width="1600" height="1000" loading="lazy" decoding="async">
<div><p class="mono">${esc(project.tag)}</p><h3>${esc(project.title)}</h3>${compact ? '' : `<p>${esc(project.body)}</p>`}</div></article>`,
  ).join('')
  return `<section><div class="wrap">
<p class="mono">Selected work</p><h2>Real projects, <em>live</em> in production</h2>
<div class="grid grid-4">${cards}</div>
<div class="ctas"><a class="btn" href="/#work">See the full portfolio →</a></div></div></section>`
}

function stepsSection({ compact = false } = {}) {
  const items = STEPS.map(
    ([title, body]) => `<li class="card"><h3>${title}</h3>${compact ? '' : `<p>${body}</p>`}</li>`,
  ).join('')
  return `<section><div class="wrap">
<p class="mono">Process</p><h2>How it works</h2>
<ol class="grid grid-4 steps">${items}</ol></div></section>`
}

function faqSection(place, faqs) {
  const items = faqs
    .map((faq) => `<details><summary>${esc(faq.q)}</summary><p>${esc(faq.a)}</p></details>`)
    .join('')
  return `<section><div class="wrap">
<p class="mono">FAQ</p><h2>Questions from ${esc(place)} businesses</h2>${items}</div></section>`
}

function ctaSection(place) {
  return `<section class="cta"><div class="wrap">
<h2>Let's build <em>yours</em><span class="accent">.</span></h2>
<p class="lede">Tell me what your business does and what isn't working. I'll come back to you with ideas and next steps.</p>
<div class="ctas"><a class="btn btn-accent" href="${mailto(place)}">Email me about your project</a><a class="btn" href="${LINKEDIN_URL}">Connect on LinkedIn</a></div>
</div></section>`
}

function serviceSchema(areaServed) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#services`,
    name: 'Eduard Proca — Web Design & Automation',
    url: `${SITE_URL}/`,
    email: EMAIL,
    image: OG_IMAGE,
    founder: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Eduard Proca' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hemel Hempstead',
      addressRegion: 'Hertfordshire',
      addressCountry: 'GB',
    },
    areaServed,
    knowsAbout: ['Web design', 'Web development', 'Business automation', 'AI agents', 'SEO'],
    sameAs: [LINKEDIN_URL, GITHUB_URL],
  }
}

function breadcrumbSchema(url, trail) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: trail.map(([name, href], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `${SITE_URL}${href}`,
    })),
  }
}

const faqSchema = (faqs) => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
})

function crumbs(trail) {
  const items = trail
    .map(([name, href], index) =>
      index === trail.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${href}">${esc(name)}</a></li>`,
    )
    .join('')
  return `<nav class="crumbs wrap mono" aria-label="Breadcrumb"><ol>${items}</ol></nav>`
}

export function renderTownPage(slug) {
  const town = TOWN_CONTENT[slug]
  const name = areaName(slug)
  const path = areaPath(slug)
  const url = `${SITE_URL}${path}`
  const title = `Web Design & Automation in ${name} | Eduard Proca`
  const faqs = [...town.faqs, SHARED_FAQS[0]]
  const trail = [
    ['Home', '/'],
    ['Hertfordshire', areaPath(HUB.slug)],
    [name, path],
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description: town.description,
        inLanguage: 'en-GB',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#services` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      breadcrumbSchema(url, trail),
      serviceSchema([
        { '@type': 'City', name, containedInPlace: { '@type': 'AdministrativeArea', name: 'Hertfordshire' } },
        { '@type': 'AdministrativeArea', name: 'Hertfordshire' },
      ]),
      faqSchema(faqs),
    ],
  }
  const related = town.links.map((link) => `<a href="${areaPath(link)}">Web design ${esc(areaName(link))}</a>`).join('')

  return `${head({ title, description: town.description, url, schema })}
<body>
${header(name)}
<main>
${crumbs(trail)}
<div class="hero wrap">
<p class="mono"><span class="accent">●</span> Web design · Automation · AI — ${esc(name)}</p>
<h1>Web design &amp; automation in <em>${esc(name)}</em><span class="accent">.</span></h1>
<p class="lede">${esc(town.intro)}</p>
<div class="ctas"><a class="btn btn-accent" href="${mailto(name)}">Get a quote</a><a class="btn" href="/#work">See my work</a></div>
</div>
${servicesSection(name)}
<section><div class="wrap split">
<div><p class="mono">Local</p><h2>Working with businesses in ${esc(name)}</h2><p>${esc(town.context)}</p></div>
<div><h3>Projects that work well here</h3><ul class="ticks">${town.ideas.map((idea) => `<li>${esc(idea)}</li>`).join('')}</ul></div>
</div></section>
${projectsSection({ compact: true })}
${stepsSection({ compact: true })}
${faqSection(name, faqs)}
<section><div class="wrap">
<p class="mono">Areas</p><h2>Around ${esc(name)}</h2>
<p class="muted">I also work with businesses in ${esc(town.nearby.join(', '))} and across the rest of Hertfordshire.</p>
<div class="chips">${related}<a href="${areaPath(HUB.slug)}">All of Hertfordshire</a></div>
</div></section>
${ctaSection(name)}
</main>
${footer()}
</body>
</html>
`
}

export function renderHubPage() {
  const path = areaPath(HUB.slug)
  const url = `${SITE_URL}${path}`
  const title = 'Web Design & Automation in Hertfordshire | Eduard Proca'
  const faqs = [...HUB_CONTENT.faqs, ...SHARED_FAQS]
  const trail = [
    ['Home', '/'],
    ['Hertfordshire', path],
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description: HUB_CONTENT.description,
        inLanguage: 'en-GB',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#services` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      breadcrumbSchema(url, trail),
      serviceSchema([
        { '@type': 'AdministrativeArea', name: 'Hertfordshire' },
        ...TOWNS.map((town) => ({ '@type': 'City', name: town.name })),
      ]),
      faqSchema(faqs),
    ],
  }
  const towns = TOWNS.map(
    (town) => `<a class="card town" href="${areaPath(town.slug)}"><h3>${esc(town.name)} →</h3>
<p>${esc(TOWN_CONTENT[town.slug].context.split('. ')[0])}.</p></a>`,
  ).join('')

  return `${head({ title, description: HUB_CONTENT.description, url, schema })}
<body>
${header('Hertfordshire')}
<main>
${crumbs(trail)}
<div class="hero wrap">
<p class="mono"><span class="accent">●</span> Based in Hemel Hempstead · Covering all of Herts</p>
<h1>Web design &amp; automation in <em>Hertfordshire</em><span class="accent">.</span></h1>
<p class="lede">${esc(HUB_CONTENT.intro)}</p>
<div class="ctas"><a class="btn btn-accent" href="${mailto('Hertfordshire')}">Get a quote</a><a class="btn" href="/#work">See my work</a></div>
</div>
${servicesSection('Hertfordshire')}
<section><div class="wrap">
<p class="mono">Areas</p><h2>Towns I work in</h2>
<div class="grid grid-3">${towns}</div></div></section>
${projectsSection()}
${stepsSection()}
${faqSection('Hertfordshire', faqs)}
${ctaSection('Hertfordshire')}
</main>
${footer()}
</body>
</html>
`
}

// path (no extension) → html, for both the dev server and the build.
export function renderAreaPages() {
  return Object.fromEntries(
    SERVICE_AREAS.map((area) => [
      areaPath(area.slug),
      area.slug === HUB.slug ? renderHubPage() : renderTownPage(area.slug),
    ]),
  )
}

export function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = ['/', ...SERVICE_AREAS.map((area) => areaPath(area.slug))]
    .map((path) => `  <url>\n    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

// https://llmstxt.org — a plain summary AI assistants can read without running JS.
export function renderLlmsTxt() {
  const areas = SERVICE_AREAS.map(
    (area) =>
      `- [Web design ${area.name}](${SITE_URL}${areaPath(area.slug)}): ${
        area.slug === HUB.slug ? HUB_CONTENT.description : TOWN_CONTENT[area.slug].description
      }`,
  ).join('\n')
  const services = SERVICES.map((service) => `- ${service.title}: ${service.blurb}`).join('\n')
  return `# Eduard Proca

> UK AI software engineer and full-stack web developer based in Hemel Hempstead, Hertfordshire. Builds production web apps, AI agents and automation platforms (React, Next.js, TypeScript, Node.js, Supabase, Claude API, Twilio, Stripe). Open to developer roles, and takes on freelance web design and automation projects for small businesses across Hertfordshire and the UK.

## Key facts

- Full-Stack Developer at ProveIt (2024–present): lead-generation and automation platform serving 10k+ monthly users, 250+ API requests and 180+ automated workflows a day, plus a 27k-lead migration with zero data loss.
- Founder of Resevia: an AI reception agent for beauty salons that recovers missed calls over SMS, checks live availability and books appointments.
- Freelance (2024–present): 10+ client websites shipped end to end across hospitality, events, e-commerce and education, including booking with dynamic pricing and payments.
- BSc, University of Bedfordshire.
- Contact: ${EMAIL}

## Freelance services

${services}

## Pages

- [Portfolio](${SITE_URL}/): projects, stack, experience and an AI assistant that answers questions about Eduard's work.
${areas}

## Profiles

- [LinkedIn](${LINKEDIN_URL})
- [GitHub](${GITHUB_URL})
`
}
