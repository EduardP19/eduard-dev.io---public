import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const MotionDiv = motion.div
const MotionSpan = motion.span
const DURATION = 1500

// Counter-driven intro curtain. Calls onDone once the curtain starts lifting.
function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const total = reduced ? 200 : DURATION
    const start = performance.now()
    let frame = 0

    const tick = (now) => {
      const t = Math.min(1, (now - start) / total)
      // Ease-out so the count slows near 100 — feels like real loading.
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setVisible(false)
        onDone?.()
      }
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible ? (
        <MotionDiv
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="preloader-top">
            <span>eduard.dev</span>
            <span>Portfolio — {new Date().getFullYear()}</span>
          </div>
          <div className="preloader-word">
            {'EDUARD'.split('').map((letter, index) => (
              <MotionSpan
                key={letter + index}
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.05 * index, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {letter}
              </MotionSpan>
            ))}
          </div>
          <div className="preloader-bottom">
            <div className="preloader-bar">
              <span style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
            <span className="preloader-count">{String(progress).padStart(3, '0')}</span>
          </div>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  )
}

export default Preloader
