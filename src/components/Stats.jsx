import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { STATS } from '../lib/site'

const MotionDiv = motion.div

function CountUp({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.round(latest)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref} className="stat-value">
      {prefix}
      {value}
      <span className="accent">{suffix}</span>
    </span>
  )
}

function Stats() {
  return (
    <section className="stats" aria-label="Impact in numbers">
      <div className="container stats-grid">
        {STATS.map((stat, index) => (
          <MotionDiv
            key={stat.label}
            className="stat"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="stat-index mono">0{index + 1}</span>
            <CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            <span className="stat-label">{stat.label}</span>
          </MotionDiv>
        ))}
      </div>
    </section>
  )
}

export default Stats
