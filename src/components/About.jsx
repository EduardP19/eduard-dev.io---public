import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ABOUT_TEXT, EXPERIENCE } from '../lib/site'

const MotionSpan = motion.span
const MotionDiv = motion.div
const MotionLi = motion.li

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <span className="reveal-word">
      <MotionSpan style={{ opacity }}>{children}</MotionSpan>{' '}
    </span>
  )
}

// Paragraph that "reads itself" — each word lights up as you scroll through.
function ScrollRevealText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className="reveal-text">
      {words.map((word, index) => {
        const start = index / words.length
        return (
          <Word key={`${word}-${index}`} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })

  return (
    <div ref={ref} className="timeline">
      <div className="timeline-rail" aria-hidden="true">
        <MotionDiv className="timeline-rail-fill" style={{ scaleY: scrollYProgress }} />
      </div>
      <ol>
        {EXPERIENCE.map((item, index) => (
          <MotionLi
            key={item.org}
            className="timeline-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="timeline-dot" aria-hidden="true" />
            <span className="mono dim">{item.period}</span>
            <h3>
              {item.role} <span className="timeline-org">@ {item.org}</span>
            </h3>
            <p>{item.body}</p>
            <div className="timeline-tags">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </MotionLi>
        ))}
      </ol>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <span className="eyebrow mono">(04) About</span>
        <ScrollRevealText text={ABOUT_TEXT} />

        <div className="about-grid">
          <div className="about-side">
            <span className="eyebrow mono">Experience</span>
            <h2 className="display display-sm">
              Two tracks,
              <br /> <em className="serif">both</em> live<span className="accent">.</span>
            </h2>
            <p>
              Full-time on a production automation platform, freelance on client builds, and
              nights on Resevia — an AI receptionist for beauty salons built on Next.js,
              Supabase, the Claude API, Twilio and Cal.com.
            </p>
          </div>
          <Timeline />
        </div>
      </div>
    </section>
  )
}

export default About
