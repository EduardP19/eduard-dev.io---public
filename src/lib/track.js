// Safe GA4 click tracking — gtag is only present in production builds.
export function trackClick(label) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'cta_click', {
    cta_name: label,
    page_path: window.location.pathname,
  })
}
