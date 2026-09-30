import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { GitHubMark } from './Icons'
import ShaderBackground from './ShaderBackground'
import ScrambleText from './ScrambleText'
import Magnetic from './Magnetic'
import { RollText } from './Nav'
import { CV_URL, GITHUB_URL, HERO_WORDS, SHOW_CV_BUTTON } from '../lib/site'
import { trackClick } from '../lib/track'

const MotionDiv = motion.div
const MotionSpan = motion.span
const MotionP = motion.p
const EASE = [0.22, 1, 0.36, 1]

// Each line slides up out of a clipped mask once the preloader is gone.
function Line({ children, delay, ready, className = '' }) {
  return (
    <span className={`hero-line ${className}`.trim()}>
      <MotionSpan
        className="hero-line-inner"
        initial={{ y: '115%', rotate: 4 }}
        animate={ready ? { y: '0%', rotate: 0 } : undefined}
        transition={{ duration: 1.1, delay, ease: EASE }}
      >
        {children}
      </MotionSpan>
    </span>
  )
}

function Hero({ ready, hrName }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay, ease: EASE },
  })

  return (
    <section id="hero" ref={ref} className="hero">
      <MotionDiv className="hero-bg" style={{ scale: bgScale }}>
        <ShaderBackground />
      </MotionDiv>
      <div className="hero-grid-lines" aria-hidden="true" />

      <MotionDiv className="hero-inner" style={{ y: titleY, opacity: fade }}>
        <MotionDiv className="hero-top" {...fadeUp(0.1)}>
          <span className="tag">
            <span className="pulse-dot" /> Available for developer roles
          </span>
          <span className="hero-meta mono">Hemel Hempstead, UK · Remote / Hybrid</span>
        </MotionDiv>

        <h1 className="hero-title">
          <Line ready={ready} delay={0.15} className="hero-line-sm">
            {hrName ? (
              <>
                Hello <em>{hrName}</em>, I&apos;m Eduard —
              </>
            ) : (
              <>
                Hi, I&apos;m <em>Eduard</em> — I build
              </>
            )}
          </Line>
          <Line ready={ready} delay={0.25}>
            {hrName ? 'I build ' : ''}
            <span className="hero-accent">
              <ScrambleText words={HERO_WORDS} active={ready} />
            </span>
          </Line>
          <Line ready={ready} delay={0.35}>
            that <em className="serif">actually</em> ship.
          </Line>
        </h1>

        <div className="hero-bottom">
          <MotionP className="hero-lede" {...fadeUp(0.6)}>
            AI Software Engineer working in JavaScript/TypeScript, React, Next.js and Supabase.
            Production systems handling <strong>10k+ monthly users</strong>,{' '}
            <strong>250+ daily API requests</strong>, CRM and third-party integrations.
          </MotionP>

          <MotionDiv className="hero-ctas" {...fadeUp(0.72)}>
            <Magnetic>
              <a
                href="#work"
                className="btn btn-accent btn-lg"
                data-cursor="Scroll"
                onClick={() => trackClick('View My Work')}
              >
                <RollText>View my work</RollText>
                <ArrowDownRight size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#chat" className="btn btn-ghost btn-lg" onClick={() => trackClick('Ask AI Hero')}>
                <RollText>Ask my AI</RollText>
              </a>
            </Magnetic>
            {SHOW_CV_BUTTON ? (
              <Magnetic>
                <a
                  href={CV_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-lg"
                  onClick={() => trackClick('Download My CV')}
                >
                  <RollText>Download CV</RollText>
                </a>
              </Magnetic>
            ) : null}
            <Magnetic>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-lg btn-round"
                aria-label="View GitHub profile"
                onClick={() => trackClick('View GitHub Hero')}
              >
                <GitHubMark size={20} />
              </a>
            </Magnetic>
          </MotionDiv>
        </div>
      </MotionDiv>

      <MotionDiv className="hero-scroll" {...fadeUp(1)} aria-hidden="true">
        <span className="mono">Scroll</span>
        <span className="hero-scroll-track">
          <span />
        </span>
      </MotionDiv>
    </section>
  )
}

export default Hero
