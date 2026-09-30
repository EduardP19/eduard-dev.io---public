import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

const MotionDiv = motion.div

const wrap = (min, max, value) => {
  const range = max - min
  return ((((value - min) % range) + range) % range) + min
}

// Endless ticker whose speed and direction react to how fast you scroll.
function MarqueeRow({ items, baseVelocity }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const factor = velocityFactor.get()
    if (factor < 0) direction.current = -1
    else if (factor > 0) direction.current = 1
    moveBy += direction.current * moveBy * factor
    baseX.set(baseX.get() + moveBy)
  })

  // Four copies so the -25% wrap is seamless on ultra-wide screens.
  return (
    <div className="marquee-row">
      <MotionDiv className="marquee-track" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy > 0}>
            {items.map((item) => (
              <span className="marquee-item" key={`${copy}-${item}`}>
                {item}
                <span className="marquee-star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </MotionDiv>
    </div>
  )
}

function VelocityMarquee({ rows }) {
  return (
    <section className="marquee" aria-label="Technologies I work with">
      {rows.map((items, index) => (
        <MarqueeRow key={index} items={items} baseVelocity={index % 2 === 0 ? -2.2 : 2.2} />
      ))}
    </section>
  )
}

export default VelocityMarquee
