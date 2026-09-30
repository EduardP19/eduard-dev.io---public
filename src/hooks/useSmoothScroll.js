import { useEffect } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from '../lib/scroll'

// Boots Lenis smooth scrolling and hijacks in-page anchor links so they glide.
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    window.__lenis = lenis

    let frame = 0
    const loop = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    const onAnchorClick = (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null
      if (!anchor) return
      const hash = anchor.getAttribute('href')
      if (!hash || hash.length < 2) return
      const target = document.querySelector(hash)
      if (!target) return
      event.preventDefault()
      lenis.scrollTo(target, { duration: 1.4 })
    }
    document.addEventListener('click', onAnchorClick)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])
}
