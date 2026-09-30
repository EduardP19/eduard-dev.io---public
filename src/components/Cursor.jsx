import { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, [data-cursor]'

// Two-part cursor: an exact dot plus a lagging ring that grows over
// interactive elements and shows a label when [data-cursor="Label"] is set.
function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!enabled) return undefined

    document.documentElement.classList.add('has-custom-cursor')
    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let frame = 0

    const onMove = (event) => {
      pos.x = event.clientX
      pos.y = event.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }
    }

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    const onOver = (event) => {
      const target = event.target instanceof Element ? event.target.closest(INTERACTIVE) : null
      const root = ringRef.current?.parentElement
      if (!root) return
      root.classList.toggle('is-hover', Boolean(target))
      root.classList.toggle('is-text', Boolean(target?.matches('input, textarea')))
      setLabel(target?.getAttribute('data-cursor') || '')
    }

    const onDown = () => ringRef.current?.parentElement?.classList.add('is-down')
    const onUp = () => ringRef.current?.parentElement?.classList.remove('is-down')
    const onLeave = () => ringRef.current?.parentElement?.classList.add('is-hidden')
    const onEnter = () => ringRef.current?.parentElement?.classList.remove('is-hidden')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)

    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className={`cursor ${label ? 'has-label' : ''}`} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-label">{label}</span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}

export default Cursor
