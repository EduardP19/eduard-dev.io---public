import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const MotionSpan = motion.span

// Wrap any button/link: it drifts toward the cursor, then springs back.
function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (event) => {
    if (event.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MotionSpan
      ref={ref}
      className={`magnetic ${className}`.trim()}
      style={{ x: springX, y: springY }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </MotionSpan>
  )
}

export default Magnetic
