import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, ChevronsLeftRight, X } from 'lucide-react'
import { lockScroll, unlockScroll } from '../lib/scroll'

const MotionDiv = motion.div
const MotionArticle = motion.article
const ACCENT_FALLBACK_HEX = '#c8ff2e'

function normalizeHexColor(value) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  const shortHexMatch = /^#([0-9a-fA-F]{3})$/.exec(trimmed)
  if (shortHexMatch) {
    const [r, g, b] = shortHexMatch[1].split('')
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return /^#([0-9a-fA-F]{6})$/.test(trimmed) ? trimmed.toLowerCase() : null
}

function hexToRgb(hexColor) {
  const normalized = normalizeHexColor(hexColor)
  if (!normalized) return null
  const value = normalized.slice(1)
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

function isBrightColor(hexColor) {
  const rgb = hexToRgb(hexColor)
  if (!rgb) return true
  return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 >= 150
}

function toAlphaColor(hexColor, alpha) {
  const rgb = hexToRgb(hexColor) ?? { r: 200, g: 255, b: 46 }
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

function ProjectImage({ image, title, className = '', children = null }) {
  const [hasError, setHasError] = useState(false)
  const showImage = typeof image === 'string' && image.trim() && !hasError

  return (
    <div className={`project-media ${className}`.trim()}>
      {showImage ? (
        <img src={image} alt={title} loading="lazy" draggable="false" onError={() => setHasError(true)} />
      ) : (
        <div className="project-media-fallback">
          <span>{title}</span>
        </div>
      )}
      {children}
    </div>
  )
}

// Drag (or arrow-key) slider that wipes between the old and new design.
function CompareSlider({ before, after, title }) {
  const [position, setPosition] = useState(50)
  const frameRef = useRef(null)
  const dragging = useRef(false)

  const setFromClientX = (clientX) => {
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }

  return (
    <div
      ref={frameRef}
      className="compare"
      data-cursor="Drag"
      onPointerDown={(event) => {
        dragging.current = true
        event.currentTarget.setPointerCapture(event.pointerId)
        setFromClientX(event.clientX)
      }}
      onPointerMove={(event) => dragging.current && setFromClientX(event.clientX)}
      onPointerUp={() => {
        dragging.current = false
      }}
    >
      <img src={after} alt={`${title} — after`} draggable="false" />
      <img
        src={before}
        alt={`${title} — before`}
        draggable="false"
        className="compare-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      />
      <span className="compare-tag compare-tag-before mono">Before</span>
      <span className="compare-tag compare-tag-after mono">After</span>
      <div
        className="compare-handle"
        style={{ left: `${position}%` }}
        role="slider"
        tabIndex={0}
        aria-label={`${title} before and after comparison`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
          if (event.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
        }}
      >
        <span className="compare-knob">
          <ChevronsLeftRight size={16} />
        </span>
      </div>
    </div>
  )
}

function ProjectCard({
  index = 0,
  title,
  category,
  industry,
  image,
  beforeImage,
  brandColor,
  description,
  summary,
  highlights,
  caseStudy,
  liveUrl,
  className = '',
  onOpen,
  onLiveClick,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dialogTitleId = useId()
  const closeButtonRef = useRef(null)

  // Subtle 3D tilt that follows the pointer.
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 })
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 })

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => event.key === 'Escape' && setIsOpen(false)
    lockScroll()
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()
    return () => {
      unlockScroll()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const safeHighlights = Array.isArray(highlights) ? highlights : []
  const safeCategory = category || 'Project'
  const safeIndustry = industry || 'Client Work'
  const safeSummary = summary || description || ''
  const safeDescription = description || summary || ''
  const hasBeforeImage = typeof beforeImage === 'string' && beforeImage.trim().length > 0
  const safeBrandColor = normalizeHexColor(brandColor) ?? ACCENT_FALLBACK_HEX
  const themeStyle = {
    '--brand': safeBrandColor,
    '--brand-text': isBrightColor(safeBrandColor) ? '#07070a' : '#f5f5f0',
    '--brand-glow': toAlphaColor(safeBrandColor, 0.35),
    '--brand-soft': toAlphaColor(safeBrandColor, 0.14),
  }

  const openModal = () => {
    setIsOpen(true)
    onOpen?.()
  }

  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    event.currentTarget.style.setProperty('--mx', `${px * 100}%`)
    event.currentTarget.style.setProperty('--my', `${py * 100}%`)
    if (event.pointerType === 'mouse') {
      rotateY.set((px - 0.5) * 8)
      rotateX.set((0.5 - py) * 8)
    }
  }

  const resetTilt = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  const modal = (
    <AnimatePresence>
      {isOpen ? (
        <MotionDiv
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <MotionDiv
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="dialog"
            style={themeStyle}
            data-lenis-prevent
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              className="dialog-close"
              aria-label={`Close ${title} details`}
            >
              <X size={18} />
            </button>

            <div className="dialog-grid">
              <div className="dialog-media">
                {hasBeforeImage && image ? (
                  <CompareSlider before={beforeImage} after={image} title={title} />
                ) : (
                  <ProjectImage image={image} title={title} />
                )}
                {hasBeforeImage ? (
                  <p className="dialog-media-hint mono">Drag to compare the rebuild</p>
                ) : null}
              </div>

              <div className="dialog-content">
                <div className="dialog-meta">
                  <span className="chip chip-brand">{safeCategory}</span>
                  <span className="mono dim">{safeIndustry}</span>
                </div>

                <h3 id={dialogTitleId} className="dialog-title">
                  {title}
                </h3>
                <p className="dialog-summary">{safeSummary}</p>

                <div className="dialog-block">
                  <p className="eyebrow mono">Overview</p>
                  <p>{safeDescription}</p>
                </div>

                {caseStudy ? (
                  <div className="dialog-block">
                    <p className="eyebrow mono">Case study</p>
                    <p>{caseStudy}</p>
                  </div>
                ) : null}

                {safeHighlights.length ? (
                  <div className="dialog-block">
                    <p className="eyebrow mono">What I focused on</p>
                    <ul className="dialog-highlights">
                      {safeHighlights.map((item) => (
                        <li key={`${title}-${item}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-brand"
                    onClick={() => onLiveClick?.()}
                  >
                    Visit live project <ArrowUpRight size={16} />
                  </a>
                ) : null}
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  )

  return (
    <>
      <MotionArticle
        role="button"
        tabIndex={0}
        data-cursor="Open"
        onClick={openModal}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openModal()
          }
        }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
        className={`project-card ${className}`.trim()}
        style={{ ...themeStyle, rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
        aria-haspopup="dialog"
        aria-label={`${title} — open case study`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProjectImage image={image} title={title}>
          <span className="project-index mono">{String(index + 1).padStart(2, '0')}</span>
          {hasBeforeImage ? <span className="project-badge mono">Before / After</span> : null}
        </ProjectImage>

        <div className="project-body">
          <div className="project-row">
            <span className="mono dim">{safeCategory}</span>
            <span className="project-arrow">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <h3>{title}</h3>
          <p>{safeSummary}</p>
          <div className="project-tags">
            {safeHighlights.slice(0, 3).map((item) => (
              <span key={item}>{item.length > 34 ? `${item.slice(0, 32)}…` : item}</span>
            ))}
          </div>
        </div>
        <span className="project-spotlight" aria-hidden="true" />
      </MotionArticle>

      {typeof document !== 'undefined' ? createPortal(modal, document.body) : null}
    </>
  )
}

export default ProjectCard
