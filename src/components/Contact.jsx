import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import Magnetic from './Magnetic'
import { RollText } from './Nav'
import { GitHubMark, LinkedInMark } from './Icons'
import { CV_URL, EMAIL, GITHUB_URL, LINKEDIN_URL, SHOW_CV_BUTTON } from '../lib/site'
import { scrollToTarget } from '../lib/scroll'
import { trackClick } from '../lib/track'

const MotionSpan = motion.span
const MotionH2 = motion.h2

// Parent owns the in-view trigger — the clipped children have no visible area to observe.
const titleVariants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const wordVariants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
}

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      trackClick('Copy Email')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <span className="eyebrow mono">(05) Contact</span>
        <MotionH2
          className="contact-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {["Let's", 'work', 'together'].map((word, index) => (
            <span className="hero-line" key={word}>
              <MotionSpan className="hero-line-inner" variants={wordVariants}>
                {index === 1 ? <em className="serif">{word}</em> : word}
                {index === 2 ? <span className="accent">.</span> : null}
              </MotionSpan>
            </span>
          ))}
        </MotionH2>

        <div className="contact-row">
          <p className="contact-lede">
            I&apos;m available for developer roles — ideally where AI is part of the product or
            the workflow. If you need someone who ships and keeps learning, let&apos;s talk.
          </p>

          <Magnetic strength={0.5}>
            <a
              href={`mailto:${EMAIL}`}
              className="contact-orb"
              data-cursor="Email"
              onClick={() => trackClick('Email Me')}
            >
              <span>Email me</span>
              <ArrowUpRight size={26} />
            </a>
          </Magnetic>
        </div>

        <div className="contact-links">
          <button type="button" className="contact-link" onClick={copyEmail}>
            <span className="mono dim">Email</span>
            <span className="contact-link-main">
              {EMAIL}
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </span>
            <span className={`contact-toast mono ${copied ? 'is-visible' : ''}`} role="status">
              {copied ? 'Copied to clipboard' : ''}
            </span>
          </button>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            onClick={() => trackClick('Connect on LinkedIn')}
          >
            <span className="mono dim">LinkedIn</span>
            <span className="contact-link-main">
              <LinkedInMark size={16} /> <RollText>Connect</RollText> <ArrowUpRight size={16} />
            </span>
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            onClick={() => trackClick('View GitHub Contact')}
          >
            <span className="mono dim">GitHub</span>
            <span className="contact-link-main">
              <GitHubMark size={16} /> <RollText>EduardP19</RollText> <ArrowUpRight size={16} />
            </span>
          </a>
          {SHOW_CV_BUTTON ? (
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              onClick={() => trackClick('Download My CV')}
            >
              <span className="mono dim">CV</span>
              <span className="contact-link-main">
                <RollText>Download</RollText> <ArrowUpRight size={16} />
              </span>
            </a>
          ) : null}
        </div>
      </div>

      <footer className="footer">
        <div className="container footer-row">
          <span className="mono dim">© {new Date().getFullYear()} Eduard P.</span>
          <span className="mono dim footer-built">Built with React, WebGL & a Gemini-powered agent</span>
          <button type="button" className="footer-top mono" onClick={() => scrollToTarget(0)}>
            Back to top <ArrowUp size={14} />
          </button>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          EDUARD<span className="accent">.</span>DEV
        </div>
      </footer>
    </section>
  )
}

export default Contact
