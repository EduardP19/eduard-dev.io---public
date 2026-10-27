// Static HTML for the local landing pages, plus sitemap.xml and llms.txt.
// Rendered at build time (and on the fly in dev) by dev/viteSeoPagesPlugin.js.
// All copy is in the HTML; the small inline script only adds reveals, spotlight and nav polish.
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  SERVICES,
  SERVICE_AREAS,
  SITE_URL,
  STATS,
  areaPath,
} from '../src/lib/site.js'
import { HUB_CONTENT, PROJECTS, SHARED_FAQS, STEPS, TOWN_CONTENT } from './towns.js'

const HUB = SERVICE_AREAS[0]
const TOWNS = SERVICE_AREAS.slice(1)
const BASE = 'hemel-hempstead'
const OG_IMAGE = `${SITE_URL}/og-image.png`
const MARQUEE_SERVICES = ['Web design', 'Automation', 'AI agents', 'Booking systems', 'Lead pipelines', 'SEO-ready builds']

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const areaName = (slug) => SERVICE_AREAS.find((area) => area.slug === slug)?.name ?? slug
const mailto = (place) => `mailto:${EMAIL}?subject=${encodeURIComponent(`Website enquiry — ${place}`)}`
const pad = (index) => String(index + 1).padStart(2, '0')

// Straight-line distance, used for the "km from base" label.
function kmBetween([lat1, lon1], [lat2, lon2]) {
  const rad = Math.PI / 180
  const a =
    Math.sin(((lat2 - lat1) * rad) / 2) ** 2 +
    Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lon2 - lon1) * rad) / 2) ** 2
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const coords = ([lat, lon]) => `${lat.toFixed(2)}° N · ${Math.abs(lon).toFixed(2)}° W`
const fromBase = (slug) =>
  slug === BASE ? 'Home base' : `≈ ${Math.round(kmBetween(TOWN_CONTENT[BASE].geo, TOWN_CONTENT[slug].geo))} km from base`

const ICONS = {
  web: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  automation:
    '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
  ai: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  arrow: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  down: '<path d="M7 7l10 10"/><path d="M17 7v10H7"/>',
}
const icon = (name, size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`

const STYLES = `
:root{--bg:#07070a;--bg-2:#0c0c11;--surface:rgba(255,255,255,.03);--surface-2:rgba(255,255,255,.06);--line:rgba(255,255,255,.08);--line-strong:rgba(255,255,255,.16);--text:#ecebe6;--muted:#8b8b95;--dim:#5d5d66;--accent:#c8ff2e;--ink:#07070a;--glow:rgba(200,255,46,.35);--teal:#22d3c5;--sans:'Geist',ui-sans-serif,system-ui,-apple-system,'Segoe UI',sans-serif;--serif:'Instrument Serif','Times New Roman',serif;--mono:'JetBrains Mono',ui-monospace,monospace;--ease:cubic-bezier(.22,1,.36,1);--gutter:clamp(16px,4vw,48px);--max:1440px;--radius:20px}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{background:var(--bg);-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--sans);font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:clip}
::selection{background:var(--accent);color:var(--ink)}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%;height:auto}
ul,ol{list-style:none}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:6px}
.container{width:100%;max-width:var(--max);margin:0 auto;padding:0 var(--gutter)}
.mono{font-family:var(--mono);font-size:12px;letter-spacing:.04em;text-transform:uppercase}
.dim{color:var(--muted)}
.accent{color:var(--accent)}
em,.serif{font-family:var(--serif);font-style:italic;font-weight:400;letter-spacing:-.01em}
.eyebrow{display:inline-block;color:var(--muted);margin-bottom:24px}
.section{position:relative;padding:clamp(88px,12vw,160px) 0}
.display{font-size:clamp(40px,6vw,96px);line-height:.95;letter-spacing:-.045em;font-weight:500}
.section-head{display:grid;gap:24px;margin-bottom:clamp(40px,6vw,80px)}
.section-head p{max-width:460px;color:var(--muted);font-size:18px}
@media(min-width:900px){.section-head{grid-template-columns:1.4fr 1fr;align-items:end}.section-head .eyebrow{grid-column:1/-1;margin-bottom:0}.section-head p{justify-self:end}}

.grain{position:fixed;inset:-50%;z-index:90;pointer-events:none;opacity:.06;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");animation:grain 1.2s steps(6) infinite}
@keyframes grain{0%,100%{transform:translate(0,0)}20%{transform:translate(-3%,2%)}40%{transform:translate(2%,-3%)}60%{transform:translate(-2%,-1%)}80%{transform:translate(3%,3%)}}

.btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:10px;height:48px;padding:0 22px;border-radius:999px;font-size:15px;font-weight:500;letter-spacing:-.01em;white-space:nowrap;transition:background .4s var(--ease),color .4s var(--ease),border-color .4s var(--ease),box-shadow .4s var(--ease)}
.btn-sm{height:38px;padding:0 16px;font-size:14px}
.btn-lg{height:58px;padding:0 28px;font-size:16px}
.btn-accent{background:var(--accent);color:var(--ink)}
.btn-accent:hover{box-shadow:0 0 0 6px rgba(200,255,46,.14),0 12px 40px var(--glow)}
.btn-ghost{border:1px solid var(--line-strong);background:rgba(7,7,10,.35);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
.btn-ghost:hover{background:var(--text);color:var(--bg);border-color:var(--text)}
.roll{position:relative;display:inline-block;overflow:hidden;vertical-align:top;line-height:1.25}
.roll>span{display:inline-block;transition:transform .55s var(--ease)}
.roll::after{content:attr(data-text);position:absolute;left:0;top:100%;transition:transform .55s var(--ease)}
a:hover .roll>span,a:hover .roll::after{transform:translateY(-100%)}
.pulse-dot{position:relative;display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--accent);flex-shrink:0}
.pulse-dot::after{content:'';position:absolute;inset:0;border-radius:50%;background:var(--accent);animation:pulse 2s var(--ease) infinite}
@keyframes pulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(3);opacity:0}}
.tag{display:inline-flex;align-items:center;gap:10px;height:34px;padding:0 14px;border:1px solid var(--line-strong);border-radius:999px;background:rgba(7,7,10,.4);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);font-size:13px}

.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px var(--gutter)}
.nav-inner{max-width:var(--max);margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;height:60px;padding:0 10px 0 16px;border:1px solid transparent;border-radius:999px;transition:background .4s var(--ease),border-color .4s var(--ease)}
.nav.is-scrolled .nav-inner,.no-js .nav-inner{background:rgba(10,10,14,.62);border-color:var(--line);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%)}
.nav-logo{display:inline-flex;align-items:center;gap:10px;font-weight:600;letter-spacing:-.02em}
.nav-logo-mark{display:grid;place-items:center;width:34px;height:34px;border-radius:10px;background:var(--accent);color:var(--ink);font-size:13px;font-weight:700;transition:transform .6s var(--ease)}
.nav-logo:hover .nav-logo-mark{transform:rotate(-12deg) scale(1.06)}
.nav-logo-text{display:inline-flex;align-items:center;font-family:var(--mono);font-size:14px;font-weight:500}
.caret{display:inline-block;width:7px;height:15px;margin-left:3px;background:var(--accent);animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:0}}
.nav-links{display:none;gap:4px}
.nav-links a{padding:8px 14px;border-radius:999px;font-size:14px;color:var(--muted);transition:color .3s,background .3s}
.nav-links a:hover{color:var(--text);background:var(--surface-2)}
@media(min-width:900px){.nav-links{display:flex}}
@media(max-width:420px){.nav-logo-text{display:none}}

.hero{position:relative;min-height:100svh;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;isolation:isolate}
.hero-bg{position:absolute;inset:0;z-index:-2;background:var(--bg)}
.blob{position:absolute;border-radius:50%;will-change:transform}
.blob-a{width:90vmax;height:90vmax;right:-35vmax;top:-45vmax;background:radial-gradient(closest-side,rgba(34,211,197,.26),transparent);animation:drift-a 22s ease-in-out infinite alternate}
.blob-b{width:70vmax;height:70vmax;left:-25vmax;bottom:-40vmax;background:radial-gradient(closest-side,rgba(200,255,46,.14),transparent);animation:drift-b 26s ease-in-out infinite alternate}
.blob-c{width:40vmax;height:40vmax;right:10vw;bottom:-10vmax;background:radial-gradient(closest-side,rgba(34,211,197,.12),transparent);animation:drift-a 30s ease-in-out infinite alternate-reverse}
@keyframes drift-a{to{transform:translate(-12vw,10vh) scale(1.1)}}
@keyframes drift-b{to{transform:translate(14vw,-8vh) scale(1.15)}}
.hero-grid-lines{position:absolute;inset:0;z-index:-1;background-image:linear-gradient(to right,rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.035) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 30%,transparent 100%);-webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 30%,transparent 100%)}
.hero-inner{width:100%;max-width:var(--max);margin:0 auto;padding:130px var(--gutter) clamp(48px,7vw,88px)}
.crumbs ol{display:flex;flex-wrap:wrap;gap:8px;color:var(--dim)}
.crumbs li+li::before{content:'/';margin-right:8px}
.crumbs a{color:var(--muted);transition:color .3s}
.crumbs a:hover{color:var(--accent)}
.crumbs [aria-current]{color:var(--text)}
.hero-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin:clamp(28px,5vw,56px) 0}
.hero-title{font-weight:500;line-height:.92;letter-spacing:-.055em;margin-bottom:clamp(32px,5vw,64px)}
.line{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
.line>span{display:inline-block;transform-origin:0 100%;animation:rise 1.1s var(--ease) both}
.line-sm{font-size:clamp(22px,3.4vw,56px);letter-spacing:-.035em;color:var(--muted);margin-bottom:.15em}
.line-sm>span{animation-delay:.1s}
.line-xl{font-size:clamp(56px,12.5vw,200px)}
.line-xl>span{animation-delay:.22s}
.is-mid .line-xl{font-size:clamp(48px,10vw,164px)}
.is-long .line-xl{font-size:clamp(44px,8.4vw,136px)}
@keyframes rise{from{transform:translateY(115%) rotate(4deg)}to{transform:none}}
.fade-up{animation:fade-up .9s var(--ease) both}
@keyframes fade-up{from{opacity:0;transform:translateY(24px)}}
.hero-bottom{display:grid;gap:32px;align-items:end}
.hero-lede{max-width:540px;font-size:clamp(16px,1.4vw,19px);color:var(--muted);animation-delay:.5s}
.hero-ctas{display:flex;flex-wrap:wrap;gap:12px;animation-delay:.62s}
@media(min-width:900px){.hero-bottom{grid-template-columns:1fr auto}}
.hero-scroll{position:absolute;right:var(--gutter);top:50%;display:none;flex-direction:column;align-items:center;gap:12px;color:var(--muted)}
.hero-scroll .mono{writing-mode:vertical-rl}
.hero-scroll-track{position:relative;width:1px;height:64px;overflow:hidden;background:var(--line)}
.hero-scroll-track span{position:absolute;inset:0;background:var(--accent);animation:scroll-line 2s cubic-bezier(.76,0,.24,1) infinite}
@keyframes scroll-line{0%{transform:translateY(-100%)}100%{transform:translateY(100%)}}
@media(min-width:1200px){.hero-scroll{display:flex}}

.marquee{padding:28px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);overflow:hidden}
.marquee-row{display:flex;width:max-content;animation:marquee 48s linear infinite}
.marquee-row+.marquee-row{margin-top:8px;animation-direction:reverse;animation-duration:56s}
.marquee-group{display:flex;flex-shrink:0}
.marquee-item{display:inline-flex;align-items:center;gap:28px;padding-right:28px;font-size:clamp(28px,4.4vw,64px);font-weight:500;letter-spacing:-.04em;line-height:1.1;white-space:nowrap}
.marquee-row+.marquee-row .marquee-item{font-family:var(--serif);font-style:italic;font-weight:400;color:transparent;-webkit-text-stroke:1px rgba(236,235,230,.45)}
.marquee-star{font-size:.4em;color:var(--accent);-webkit-text-stroke:0}
@keyframes marquee{to{transform:translateX(-50%)}}

.stats{padding:clamp(64px,9vw,120px) 0 0}
.stats-grid{display:grid;grid-template-columns:repeat(2,1fr);border-top:1px solid var(--line)}
.stat{display:flex;flex-direction:column;gap:10px;padding:28px 16px 28px 0;border-bottom:1px solid var(--line)}
.stat:nth-child(odd){border-right:1px solid var(--line)}
.stat:nth-child(even){padding-left:16px}
.stat-value{font-size:clamp(44px,6.4vw,96px);font-weight:500;letter-spacing:-.06em;line-height:1;font-variant-numeric:tabular-nums}
.stat-value .accent{font-size:.6em;letter-spacing:-.03em}
.stat-label{color:var(--muted);font-size:14px;max-width:220px}
@media(min-width:900px){.stats-grid{grid-template-columns:repeat(4,1fr)}.stat,.stat:nth-child(even){padding:36px 24px;border-right:1px solid var(--line)}.stat:first-child{padding-left:0}.stat:last-child{border-right:0}}

.bento{display:grid;gap:16px;grid-template-columns:1fr}
@media(min-width:900px){.bento{grid-template-columns:repeat(3,1fr)}}
.bento-card{position:relative;display:flex;flex-direction:column;gap:12px;padding:28px;border-radius:var(--radius);border:1px solid var(--line);background:var(--bg-2);overflow:hidden;isolation:isolate;transition:border-color .5s var(--ease)}
.bento-card::before{content:'';position:absolute;inset:0;z-index:-1;opacity:0;background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%),rgba(200,255,46,.09),transparent 45%);transition:opacity .5s}
.bento-card::after{content:'';position:absolute;inset:0;z-index:-1;border-radius:inherit;padding:1px;background:radial-gradient(300px circle at var(--mx,50%) var(--my,50%),rgba(200,255,46,.6),transparent 50%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .5s}
.bento-card:hover::before,.bento-card:hover::after{opacity:1}
.bento-head{display:flex;justify-content:space-between;align-items:center;padding-bottom:40px}
.bento-icon{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;background:var(--surface-2);color:var(--accent)}
.bento-card h3{font-size:26px;font-weight:500;letter-spacing:-.035em;line-height:1.1}
.bento-card p{color:var(--muted);font-size:15px}
.pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:16px}
.pills li{font-size:13px;border:1px solid var(--line-strong);border-radius:999px;padding:4px 12px;transition:border-color .3s,color .3s}
.pills li:hover{border-color:var(--accent);color:var(--accent)}

.local{display:grid;gap:clamp(40px,6vw,80px)}
@media(min-width:1000px){.local{grid-template-columns:1.15fr 1fr;align-items:start}.map-card{position:sticky;top:110px}}
.local-lede{font-size:clamp(20px,2vw,28px);line-height:1.4;letter-spacing:-.02em;margin:32px 0 48px}
.local-lede strong{color:var(--text);font-weight:500}
.local-lede{color:var(--muted)}
.ideas{border-top:1px solid var(--line)}
.ideas li{display:grid;grid-template-columns:48px 1fr;gap:12px;padding:22px 0;border-bottom:1px solid var(--line);font-size:clamp(17px,1.5vw,20px);letter-spacing:-.015em;transition:color .3s,padding .5s var(--ease)}
.ideas li .mono{color:var(--accent);padding-top:5px}
.ideas li:hover{padding-left:8px}
.nearby{margin-top:40px}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.chips a{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line-strong);border-radius:999px;padding:7px 14px;font-size:14px;color:var(--muted);transition:color .3s,border-color .3s}
.chips a:hover{color:var(--accent);border-color:var(--accent)}
.map-card{padding:24px}
.map-card .bento-head{padding-bottom:8px}
.map{width:100%;height:auto;overflow:visible}
.map-grid{stroke:rgba(255,255,255,.04)}
.map-line{stroke:var(--line-strong);stroke-dasharray:2 5}
.map-line.is-current{stroke:var(--accent);stroke-width:1.5;stroke-dasharray:6 6;animation:dash 1.4s linear infinite}
@keyframes dash{to{stroke-dashoffset:-24}}
.map-dot{fill:var(--muted);transition:fill .3s}
.map-town:hover .map-dot{fill:var(--accent)}
.map-label{fill:var(--muted);font-family:var(--mono);font-size:10.5px;letter-spacing:.04em;text-transform:uppercase;transition:fill .3s}
.map-town:hover .map-label,.map-town.is-current .map-label{fill:var(--text)}
.map-town.is-current .map-dot{fill:var(--accent)}
.map-ping{fill:var(--accent);transform-box:fill-box;transform-origin:center;animation:ping 2.2s var(--ease) infinite}
@keyframes ping{0%{transform:scale(1);opacity:.6}100%{transform:scale(4.5);opacity:0}}
.map-base{fill:none;stroke:var(--accent);stroke-width:1.2;stroke-dasharray:3 3;transform-box:fill-box;transform-origin:center;animation:spin 14s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.map-legend{display:flex;flex-wrap:wrap;gap:16px;margin-top:12px;color:var(--muted)}
.map-legend span{display:inline-flex;align-items:center;gap:8px}
.key{width:10px;height:10px;border-radius:50%;background:var(--accent)}
.key-base{background:none;border:1.5px dashed var(--accent)}

.work{display:grid;gap:16px;grid-template-columns:1fr}
@media(min-width:640px){.work{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1100px){.work{grid-template-columns:repeat(4,1fr)}}
.project{display:flex;flex-direction:column;border-radius:var(--radius);border:1px solid var(--line);background:var(--bg-2);overflow:hidden;transition:border-color .5s var(--ease),transform .6s var(--ease)}
.project:hover{border-color:var(--brand);transform:translateY(-4px)}
.project-media{overflow:hidden;border-bottom:1px solid var(--line);background:var(--surface)}
.project img{aspect-ratio:16/11;object-fit:cover;object-position:top;width:100%;transition:transform 1.1s var(--ease)}
.project:hover img{transform:scale(1.05)}
.project-body{display:flex;flex-direction:column;gap:10px;padding:20px 22px 24px}
.chip{align-self:flex-start;display:inline-flex;align-items:center;height:26px;padding:0 11px;border-radius:999px;font-size:11px;font-weight:500;color:var(--brand);border:1px solid color-mix(in srgb,var(--brand) 45%,transparent);background:color-mix(in srgb,var(--brand) 10%,transparent)}
.project h3{font-size:22px;font-weight:500;letter-spacing:-.03em;line-height:1.15}
.project p{color:var(--muted);font-size:14px}
.work-more{display:flex;justify-content:flex-end;margin-top:28px}

.steps{display:grid;gap:0;grid-template-columns:1fr;border-top:1px solid var(--line)}
.step{position:relative;padding:28px 0 32px;border-bottom:1px solid var(--line)}
.step::before{content:'';position:absolute;left:0;top:-1px;height:1px;width:0;background:var(--accent);transition:width 1.2s var(--ease)}
.step:hover::before,.is-in .step::before{width:100%}
.step-num{display:block;font-size:clamp(48px,5vw,72px);font-weight:500;letter-spacing:-.06em;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(236,235,230,.35);margin-bottom:20px}
.step h3{font-size:22px;font-weight:500;letter-spacing:-.03em}
.step p{color:var(--muted);font-size:15px;margin-top:8px;max-width:300px}
@media(min-width:900px){.steps{grid-template-columns:repeat(4,1fr)}.step{padding:32px 24px 36px;border-bottom:0;border-right:1px solid var(--line)}.step:first-child{padding-left:0}.step:last-child{border-right:0}.step:nth-child(2)::before{transition-delay:.15s}.step:nth-child(3)::before{transition-delay:.3s}.step:nth-child(4)::before{transition-delay:.45s}}

.faq{border-top:1px solid var(--line)}
.faq details{border-bottom:1px solid var(--line)}
.faq summary{display:grid;grid-template-columns:48px 1fr 32px;gap:12px;align-items:center;padding:26px 0;cursor:pointer;list-style:none;font-size:clamp(19px,2vw,28px);font-weight:500;letter-spacing:-.025em;line-height:1.2;transition:color .3s}
.faq summary::-webkit-details-marker{display:none}
.faq summary:hover{color:var(--accent)}
.faq summary .mono{color:var(--dim)}
.plus{position:relative;width:32px;height:32px;border:1px solid var(--line-strong);border-radius:50%;transition:transform .5s var(--ease),background .3s,border-color .3s}
.plus::before,.plus::after{content:'';position:absolute;left:50%;top:50%;width:12px;height:1.5px;background:currentColor;transform:translate(-50%,-50%)}
.plus::after{transform:translate(-50%,-50%) rotate(90deg)}
details[open] .plus{transform:rotate(45deg);background:var(--accent);border-color:var(--accent);color:var(--ink)}
.faq-answer{padding:0 0 28px 60px;max-width:860px;color:var(--muted);font-size:17px}
@media(max-width:640px){.faq summary{grid-template-columns:32px 1fr 32px}.faq-answer{padding-left:44px}}

.towns{display:grid;gap:16px;grid-template-columns:1fr}
@media(min-width:720px){.towns{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1100px){.towns{grid-template-columns:repeat(3,1fr)}}
.town h3{font-size:30px}
.town .bento-head{padding-bottom:28px}
.town-go{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;border:1px solid var(--line-strong);transition:background .4s var(--ease),color .4s,transform .6s var(--ease),border-color .4s}
.town:hover .town-go{background:var(--accent);border-color:var(--accent);color:var(--ink);transform:rotate(45deg)}

.contact{position:relative;padding-top:clamp(96px,14vw,180px);border-top:1px solid var(--line);background:radial-gradient(70% 60% at 50% 110%,rgba(200,255,46,.12),transparent 70%),var(--bg);overflow:hidden}
.contact-title{font-size:clamp(56px,12vw,200px);font-weight:500;letter-spacing:-.06em;line-height:.9;margin-bottom:56px}
.contact-row{display:grid;gap:40px;align-items:center;padding-bottom:56px;border-bottom:1px solid var(--line)}
@media(min-width:900px){.contact-row{grid-template-columns:1fr auto}}
.contact-lede{color:var(--muted);font-size:clamp(17px,1.6vw,22px);max-width:560px}
.contact-orb{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;width:clamp(150px,16vw,200px);aspect-ratio:1;border-radius:50%;background:var(--accent);color:var(--ink);font-size:18px;font-weight:500;transition:box-shadow .5s var(--ease),transform .6s var(--ease)}
.contact-orb:hover{box-shadow:0 0 0 12px rgba(200,255,46,.12),0 20px 80px var(--glow);transform:scale(1.04)}
.contact-orb svg{transition:transform .6s var(--ease)}
.contact-orb:hover svg{transform:rotate(45deg)}
.contact-links{display:grid;grid-template-columns:1fr}
@media(min-width:900px){.contact-links{grid-template-columns:repeat(3,1fr)}}
.contact-link{display:flex;flex-direction:column;gap:8px;padding:28px 0;border-bottom:1px solid var(--line)}
@media(min-width:900px){.contact-link{padding:32px 24px;border-bottom:0;border-right:1px solid var(--line)}.contact-link:first-child{padding-left:0}.contact-link:last-child{border-right:0}}
.contact-link-main{display:inline-flex;align-items:center;gap:10px;font-size:clamp(18px,1.6vw,22px);font-weight:500;letter-spacing:-.02em;word-break:break-all;transition:color .3s}
.contact-link:hover .contact-link-main{color:var(--accent)}
.footer{margin-top:clamp(64px,8vw,120px)}
.footer-areas{display:flex;flex-wrap:wrap;gap:6px 18px;padding-bottom:28px}
.footer-areas a{color:var(--muted);font-size:14px;transition:color .3s}
.footer-areas a:hover{color:var(--accent)}
.footer-row{display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:center;padding:24px 0;border-top:1px solid var(--line)}
.footer-top{display:inline-flex;align-items:center;gap:8px;transition:color .3s}
.footer-top:hover{color:var(--accent)}
.footer-wordmark{font-size:min(17vw,340px);font-weight:600;letter-spacing:-.07em;line-height:.78;text-align:center;white-space:nowrap;color:transparent;-webkit-text-stroke:1px rgba(236,235,230,.14);background:linear-gradient(to bottom,rgba(236,235,230,.12),transparent 85%);-webkit-background-clip:text;background-clip:text;user-select:none;margin-bottom:-.05em}
.footer-wordmark .accent{-webkit-text-stroke:0;color:var(--accent)}

.js .reveal{opacity:0;transform:translateY(40px);transition:opacity 1s var(--ease),transform 1s var(--ease)}
.js .reveal.is-in{opacity:1;transform:none}
@media(max-width:640px){.grain{display:none}.hero{min-height:92svh}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.js .reveal{opacity:1;transform:none}html{scroll-behavior:auto}}
`

const SCRIPT = `(()=>{const d=document,h=d.documentElement;h.classList.replace('no-js','js');if(!('IntersectionObserver'in window)){h.classList.remove('js');return}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});d.querySelectorAll('.reveal').forEach(el=>io.observe(el));d.querySelectorAll('.bento-card').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));const n=d.querySelector('.nav'),s=()=>n.classList.toggle('is-scrolled',scrollY>40);s();addEventListener('scroll',s,{passive:true})})()`

function head({ title, description, url, schema }) {
  return `<!doctype html>
<html lang="en-GB" class="no-js">
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
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>${STYLES}</style>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>`
}

const roll = (text) => `<span class="roll" data-text="${esc(text)}"><span>${esc(text)}</span></span>`

function nav(place) {
  return `<header class="nav"><div class="nav-inner">
<a class="nav-logo" href="/" aria-label="Eduard Proca — portfolio home"><span class="nav-logo-mark">EP</span><span class="nav-logo-text">eduard.dev<span class="caret"></span></span></a>
<nav class="nav-links" aria-label="Primary">
<a href="/#work">Portfolio</a><a href="#services">Services</a><a href="#faq">FAQ</a><a href="${areaPath(HUB.slug)}">Hertfordshire</a>
</nav>
<a class="btn btn-accent btn-sm" href="${mailto(place)}">${roll('Get a quote')}</a>
</div></header>`
}

function crumbs(trail) {
  const items = trail
    .map(([name, href], index) =>
      index === trail.length - 1 ? `<li aria-current="page">${esc(name)}</li>` : `<li><a href="${href}">${esc(name)}</a></li>`,
    )
    .join('')
  return `<nav class="crumbs mono fade-up" aria-label="Breadcrumb"><ol>${items}</ol></nav>`
}

function hero({ place, title, tag, meta, intro, trail }) {
  const size = place.length > 15 ? 'is-long' : place.length > 10 ? 'is-mid' : ''
  return `<section class="hero ${size}" id="top">
<div class="hero-bg" aria-hidden="true"><span class="blob blob-a"></span><span class="blob blob-b"></span><span class="blob blob-c"></span></div>
<div class="hero-grid-lines" aria-hidden="true"></div>
<div class="hero-inner">
${crumbs(trail)}
<div class="hero-top fade-up" style="animation-delay:.1s"><span class="tag"><span class="pulse-dot"></span> ${esc(tag)}</span><span class="mono dim">${esc(meta)}</span></div>
<h1 class="hero-title">${title}</h1>
<div class="hero-bottom">
<p class="hero-lede fade-up">${esc(intro)}</p>
<div class="hero-ctas fade-up">
<a class="btn btn-accent btn-lg" href="${mailto(place)}">${roll('Get a quote')} ${icon('arrow')}</a>
<a class="btn btn-ghost btn-lg" href="/#work">${roll('See my work')} ${icon('down')}</a>
</div>
</div>
</div>
<div class="hero-scroll" aria-hidden="true"><span class="mono">Scroll</span><span class="hero-scroll-track"><span></span></span></div>
</section>`
}

const heroTitle = (place) =>
  `<span class="line line-sm"><span>Web design &amp; automation in</span></span><span class="line line-xl"><span><em>${esc(place)}</em><span class="accent">.</span></span></span>`

function marquee(places) {
  const row = (items) => {
    const group = (hidden) =>
      `<div class="marquee-group"${hidden ? ' aria-hidden="true"' : ''}>${items
        .map((item) => `<span class="marquee-item">${esc(item)}<span class="marquee-star">✦</span></span>`)
        .join('')}</div>`
    return `<div class="marquee-row">${group(false)}${group(true)}</div>`
  }
  return `<div class="marquee" aria-hidden="true">${row(MARQUEE_SERVICES)}${row(places)}</div>`
}

function stats() {
  const items = STATS.map(
    (stat, index) => `<div class="stat"><span class="mono" style="color:var(--dim)">(${pad(index)})</span>
<span class="stat-value">${stat.prefix ? `<span class="accent">${esc(stat.prefix)}</span>` : ''}${stat.value}<span class="accent">${esc(stat.suffix)}</span></span>
<span class="stat-label">${esc(stat.label)}</span></div>`,
  ).join('')
  return `<section class="stats" aria-label="Track record"><div class="container"><div class="stats-grid reveal">${items}</div></div></section>`
}

function servicesSection(place, index) {
  const cards = SERVICES.map(
    (service, i) => `<article class="bento-card reveal" style="transition-delay:${i * 0.08}s">
<div class="bento-head"><span class="bento-icon">${icon(service.id)}</span><span class="mono dim">${pad(i)}</span></div>
<h3>${esc(service.title)}</h3><p>${esc(service.blurb)}</p>
<ul class="pills">${service.items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></article>`,
  ).join('')
  return `<section class="section" id="services"><div class="container">
<header class="section-head reveal"><span class="eyebrow mono">(${pad(index)}) Services</span>
<h2 class="display">What I <em>build</em><span class="accent">.</span></h2>
<p>Three services for ${esc(place)} businesses, done properly — the same production standard I bring to platforms serving thousands of users a day.</p></header>
<div class="bento">${cards}</div></div></section>`
}

// Hertfordshire constellation: every town plotted from real coordinates, lines out from base.
function mapSvg(current) {
  const [LAT_MAX, LON_MIN, K, S] = [52.01, -0.62, Math.cos((51.8 * Math.PI) / 180), 1000]
  const at = ([lat, lon]) => [Math.round((lon - LON_MIN) * K * S), Math.round((LAT_MAX - lat) * S)]
  const base = at(TOWN_CONTENT[BASE].geo)
  const grid = Array.from({ length: 8 }, (_, i) => i * 50)
    .map((v) => `<line class="map-grid" x1="${v}" y1="-10" x2="${v}" y2="400"/><line class="map-grid" x1="-10" y1="${v}" x2="340" y2="${v}"/>`)
    .join('')
  const lines = TOWNS.filter((town) => town.slug !== BASE)
    .map((town) => {
      const [x, y] = at(TOWN_CONTENT[town.slug].geo)
      return `<line class="map-line${town.slug === current ? ' is-current' : ''}" x1="${base[0]}" y1="${base[1]}" x2="${x}" y2="${y}"/>`
    })
    .join('')
  const towns = TOWNS.map((town) => {
    const { geo, map } = TOWN_CONTENT[town.slug]
    const [x, y] = at(geo)
    const isCurrent = town.slug === current
    const [lx, ly, anchor] =
      { left: [x - 12, y + 4, 'end'], below: [x, y + 22, 'middle'], 'above-left': [x - 12, y - 12, 'end'] }[map.side] ?? [x + 12, y + 4, 'start']
    return `<a class="map-town${isCurrent ? ' is-current' : ''}" href="${areaPath(town.slug)}"${isCurrent ? ' aria-current="page"' : ''}>
${isCurrent ? `<circle class="map-ping" cx="${x}" cy="${y}" r="5"/>` : ''}${town.slug === BASE ? `<circle class="map-base" cx="${x}" cy="${y}" r="11"/>` : ''}
<circle class="map-dot" cx="${x}" cy="${y}" r="${isCurrent ? 5.5 : 4}"/><text class="map-label" x="${lx}" y="${ly}" text-anchor="${anchor}">${esc(map.label)}</text></a>`
  }).join('')
  return `<svg class="map" viewBox="-20 0 360 400" role="img" aria-label="Map of the Hertfordshire towns I cover, with lines from my base in Hemel Hempstead">${grid}${lines}${towns}</svg>`
}

function mapCard(current) {
  const meta = current ? fromBase(current) : `${TOWNS.length} towns · one developer`
  return `<aside class="bento-card map-card reveal">
<div class="bento-head"><span class="mono dim">Hertfordshire · service area</span><span class="mono accent">${esc(meta)}</span></div>
${mapSvg(current)}
<div class="map-legend mono">${current && current !== BASE ? `<span><span class="key"></span>${esc(areaName(current))}</span>` : ''}<span><span class="key key-base"></span>Base — Hemel Hempstead</span></div>
</aside>`
}

function localSection(slug, index) {
  const town = TOWN_CONTENT[slug]
  const name = areaName(slug)
  const ideas = town.ideas.map((idea, i) => `<li><span class="mono">${pad(i)}</span><span>${esc(idea)}</span></li>`).join('')
  const related = town.links
    .map((link) => `<a href="${areaPath(link)}">${esc(areaName(link))} ${icon('arrow', 14)}</a>`)
    .join('')
  return `<section class="section" id="local" style="padding-top:0"><div class="container local">
<div class="reveal">
<span class="eyebrow mono">(${pad(index)}) Local</span>
<h2 class="display">Built for <em>${esc(name)}</em><span class="accent">.</span></h2>
<p class="local-lede">${esc(town.context)}</p>
<span class="mono dim">Projects that work well here</span>
<ol class="ideas" style="margin-top:14px">${ideas}</ol>
<div class="nearby"><span class="mono dim">Also covering ${esc(town.nearby.join(' · '))}</span>
<div class="chips">${related}<a href="${areaPath(HUB.slug)}">All of Hertfordshire ${icon('arrow', 14)}</a></div></div>
</div>
${mapCard(slug)}
</div></section>`
}

function workSection(index, { compact }) {
  const cards = PROJECTS.map(
    (project, i) => `<article class="project reveal" style="--brand:${project.brand};transition-delay:${i * 0.08}s">
<div class="project-media"><img src="${encodeURI(project.image)}" alt="${esc(project.title)} — ${esc(project.tag)}" width="1600" height="1100" loading="lazy" decoding="async"></div>
<div class="project-body"><span class="chip">${esc(project.tag)}</span><h3>${esc(project.title)}</h3>${compact ? '' : `<p>${esc(project.body)}</p>`}</div></article>`,
  ).join('')
  return `<section class="section" id="work" style="padding-top:0"><div class="container">
<header class="section-head reveal"><span class="eyebrow mono">(${pad(index)}) Selected work</span>
<h2 class="display">Real projects,<br> <em>live</em> in production<span class="accent">.</span></h2>
<p>Client websites, booking systems, automation platforms and AI agents — shipped end to end and still running.</p></header>
<div class="work">${cards}</div>
<div class="work-more"><a class="btn btn-ghost" href="/#work">${roll('See the full portfolio')} ${icon('arrow')}</a></div>
</div></section>`
}

function processSection(index, { compact }) {
  const steps = STEPS.map(
    ([title, body], i) => `<li class="step"><span class="step-num">${pad(i)}</span><h3>${esc(title)}</h3>${compact ? '' : `<p>${esc(body)}</p>`}</li>`,
  ).join('')
  return `<section class="section" id="process" style="padding-top:0"><div class="container">
<header class="section-head reveal"><span class="eyebrow mono">(${pad(index)}) Process</span>
<h2 class="display">How it <em>works</em><span class="accent">.</span></h2>
<p>One person from first call to launch — no account managers and no hand-offs between teams.</p></header>
<ol class="steps reveal">${steps}</ol></div></section>`
}

function faqSection(place, faqs, index) {
  const items = faqs
    .map(
      (faq, i) => `<details${i === 0 ? ' open' : ''}><summary><span class="mono">${pad(i)}</span><span>${esc(faq.q)}</span><span class="plus" aria-hidden="true"></span></summary>
<p class="faq-answer">${esc(faq.a)}</p></details>`,
    )
    .join('')
  return `<section class="section" id="faq" style="padding-top:0"><div class="container">
<header class="section-head reveal"><span class="eyebrow mono">(${pad(index)}) FAQ</span>
<h2 class="display">Questions from <em>${esc(place)}</em><span class="accent">.</span></h2></header>
<div class="faq reveal">${items}</div></div></section>`
}

function contactSection(place, index) {
  return `<section class="contact" id="contact"><div class="container">
<span class="eyebrow mono">(${pad(index)}) Contact</span>
<h2 class="contact-title reveal">Let's build <em>yours</em><span class="accent">.</span></h2>
<div class="contact-row">
<p class="contact-lede">Tell me what your business does and what isn't working. I'll come back to you with ideas and next steps${
    place === 'Hertfordshire' ? '' : ` — and if you're in ${esc(place)}, we can meet in person`
  }.</p>
<a class="contact-orb" href="${mailto(place)}"><span>Email me</span>${icon('arrow', 26)}</a>
</div>
<div class="contact-links">
<a class="contact-link" href="mailto:${EMAIL}"><span class="mono dim">Email</span><span class="contact-link-main">${esc(EMAIL)}</span></a>
<a class="contact-link" href="${LINKEDIN_URL}" rel="me"><span class="mono dim">LinkedIn</span><span class="contact-link-main">${roll('Connect')} ${icon('arrow', 16)}</span></a>
<a class="contact-link" href="/"><span class="mono dim">Portfolio</span><span class="contact-link-main">${roll('eduard-dev.co.uk')} ${icon('arrow', 16)}</span></a>
</div>
</div>
${footer()}
</section>`
}

function footer() {
  const links = SERVICE_AREAS.map(
    (area) => `<a href="${areaPath(area.slug)}">Web design ${esc(area.name)}</a>`,
  ).join('')
  return `<footer class="footer"><div class="container">
<nav class="footer-areas" aria-label="Areas covered">${links}</nav>
<div class="footer-row"><span class="mono dim">© ${new Date().getFullYear()} Eduard Proca · Based in Hemel Hempstead, Hertfordshire</span>
<a class="mono dim" href="${GITHUB_URL}" rel="me">GitHub</a>
<a class="footer-top mono" href="#top">Back to top ↑</a></div></div>
<div class="footer-wordmark" aria-hidden="true">EDUARD<span class="accent">.</span>DEV</div>
</footer>`
}

function page({ head: headHtml, place, body }) {
  return `${headHtml}
<body>
<div class="grain" aria-hidden="true"></div>
${nav(place)}
<main>
${body}
</main>
<script>${SCRIPT}</script>
</body>
</html>
`
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

export function renderTownPage(slug) {
  const town = TOWN_CONTENT[slug]
  const name = areaName(slug)
  const path = areaPath(slug)
  const url = `${SITE_URL}${path}`
  const title = `Web Design & Automation in ${name} | Eduard Proca`
  // Shared blocks stay short here so each town page is mostly its own copy.
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
        {
          '@type': 'City',
          name,
          geo: { '@type': 'GeoCoordinates', latitude: town.geo[0], longitude: town.geo[1] },
          containedInPlace: { '@type': 'AdministrativeArea', name: 'Hertfordshire' },
        },
        { '@type': 'AdministrativeArea', name: 'Hertfordshire' },
      ]),
      faqSchema(faqs),
    ],
  }

  return page({
    head: head({ title, description: town.description, url, schema }),
    place: name,
    body: `${hero({
      place: name,
      title: heroTitle(name),
      tag: slug === BASE ? 'Local developer — based here' : `Taking on projects in ${name}`,
      meta: coords(town.geo),
      intro: town.intro,
      trail,
    })}
${marquee(town.nearby)}
${stats()}
${servicesSection(name, 0)}
${localSection(slug, 1)}
${workSection(2, { compact: true })}
${processSection(3, { compact: true })}
${faqSection(name, faqs, 4)}
${contactSection(name, 5)}`,
  })
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
    (town, i) => `<a class="bento-card town reveal" href="${areaPath(town.slug)}" style="transition-delay:${(i % 3) * 0.08}s">
<div class="bento-head"><span class="mono dim">${coords(TOWN_CONTENT[town.slug].geo)}</span><span class="town-go">${icon('arrow')}</span></div>
<h3>${esc(town.name)}</h3><p>${esc(TOWN_CONTENT[town.slug].context.split('. ')[0])}.</p>
<span class="mono accent" style="margin-top:auto;padding-top:12px">${esc(fromBase(town.slug))}</span></a>`,
  ).join('')

  return page({
    head: head({ title, description: HUB_CONTENT.description, url, schema }),
    place: 'Hertfordshire',
    body: `${hero({
      place: 'Hertfordshire',
      title: heroTitle('Hertfordshire'),
      tag: 'Based in Hemel Hempstead',
      meta: `${TOWNS.length} towns · in-person meetings`,
      intro: HUB_CONTENT.intro,
      trail,
    })}
${marquee(TOWNS.map((town) => town.name))}
${stats()}
${servicesSection('Hertfordshire', 0)}
<section class="section" id="areas" style="padding-top:0"><div class="container">
<div class="local">
<header class="reveal"><span class="eyebrow mono">(02) Areas</span>
<h2 class="display">Towns I <em>work</em> in<span class="accent">.</span></h2>
<p class="local-lede">From Berkhamsted to Letchworth — every town below is close enough to meet in person, and each page covers how I help businesses there.</p></header>
${mapCard(null)}
</div>
<div class="towns" style="margin-top:clamp(40px,6vw,80px)">${towns}</div>
</div></section>
${workSection(2, { compact: false })}
${processSection(3, { compact: false })}
${faqSection('Hertfordshire', faqs, 4)}
${contactSection('Hertfordshire', 5)}`,
  })
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
    .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
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
