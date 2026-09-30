import { useEffect, useState } from 'react'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'

// Cycles through words with a "decrypting" character scramble between them.
function ScrambleText({ words, interval = 2600, active = true }) {
  const [display, setDisplay] = useState(words[0])

  useEffect(() => {
    if (!active || words.length < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let index = 0
    let frame = 0
    let timer = 0

    const scrambleTo = (next) => {
      const from = words[index]
      const length = Math.max(from.length, next.length)
      const queue = Array.from({ length }, (_, i) => ({
        from: from[i] ?? '',
        to: next[i] ?? '',
        start: Math.floor(Math.random() * 14),
        end: 14 + Math.floor(Math.random() * 18),
      }))
      let tick = 0

      const step = () => {
        let done = 0
        const out = queue
          .map(({ from: a, to: b, start, end }) => {
            if (tick >= end) {
              done += 1
              return b
            }
            if (tick >= start) return b === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            return a
          })
          .join('')
        setDisplay(out)
        tick += 1
        if (done < queue.length) frame = requestAnimationFrame(step)
      }
      step()
    }

    timer = window.setInterval(() => {
      const next = (index + 1) % words.length
      scrambleTo(words[next])
      index = next
    }, interval)

    return () => {
      window.clearInterval(timer)
      cancelAnimationFrame(frame)
    }
  }, [words, interval, active])

  return (
    <span className="scramble" aria-label={words.join(', ')}>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}

export default ScrambleText
