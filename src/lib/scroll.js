// Shared scroll helpers. Lenis (smooth scroll) is exposed on window.__lenis
// so any component can scroll, pause or resume it without prop drilling.

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToTarget(target, options = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target
  if (!element && target !== 0) return

  const lenis = window.__lenis
  if (lenis) {
    lenis.scrollTo(element ?? 0, { duration: 1.4, ...options })
    return
  }

  if (target === 0) {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    return
  }

  element.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

export function lockScroll() {
  window.__lenis?.stop()
  document.documentElement.classList.add('is-locked')
}

export function unlockScroll() {
  window.__lenis?.start()
  document.documentElement.classList.remove('is-locked')
}

export { prefersReducedMotion }
