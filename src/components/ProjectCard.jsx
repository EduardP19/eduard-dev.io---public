import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

const ACCENT_FALLBACK_HEX = '#00f3ff'

function normalizeHexColor(value) {
  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  const shortHexMatch = /^#([0-9a-fA-F]{3})$/.exec(trimmed)
  if (shortHexMatch) {
    const [r, g, b] = shortHexMatch[1].split('')
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }

  if (/^#([0-9a-fA-F]{6})$/.test(trimmed)) {
    return trimmed.toLowerCase()
  }

  return null
}

function hexToRgb(hexColor) {
  const normalized = normalizeHexColor(hexColor)
  if (!normalized) {
    return null
  }

  const value = normalized.slice(1)
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  }
}

function isBrightColor(hexColor) {
  const rgb = hexToRgb(hexColor)
  if (!rgb) {
    return true
  }

  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness >= 150
}

function toAlphaColor(hexColor, alpha) {
  const rgb = hexToRgb(hexColor)
  if (!rgb) {
    return `rgba(0, 243, 255, ${alpha})`
  }

  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
}

function ProjectImage({ image, title, className = '', children = null }) {
  const [hasError, setHasError] = useState(false)
  const showImage = typeof image === 'string' && image.trim() && !hasError

  return (
    <div className={`portfolio-card-media ${className}`.trim()}>
      {showImage ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="portfolio-card-media-fallback">
          <span>{title}</span>
        </div>
      )}
      {children}
    </div>
  )
}

function ProjectCard({
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
  const MotionDiv = motion.div
  const [isOpen, setIsOpen] = useState(false)
  const [compareMode, setCompareMode] = useState('after')
  const dialogTitleId = useId()
  const closeModal = () => {
    setIsOpen(false)
    setCompareMode('after')
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setCompareMode('after')
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
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
  const activeTextColor = isBrightColor(safeBrandColor) ? '#061014' : '#f5fbff'
  const modalImage = hasBeforeImage && compareMode === 'before' ? beforeImage : image
  const compareThemeStyle = {
    '--project-brand-color': safeBrandColor,
    '--project-brand-text': activeTextColor,
    '--project-brand-glow': toAlphaColor(safeBrandColor, 0.34),
    '--project-brand-soft': toAlphaColor(safeBrandColor, 0.16),
  }
  const openModal = () => {
    setCompareMode('after')
    setIsOpen(true)
    onOpen?.()
  }

  return (
    <>
      <article
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openModal()
          }
        }}
        className={`portfolio-card ${className}`.trim()}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <ProjectImage image={image} title={title} />

        <div className="portfolio-card-body">
          <span className="portfolio-card-pill">{safeCategory}</span>

          <h3>{title}</h3>
          <p>{safeSummary}</p>

          <div className="portfolio-card-tags">
            {safeHighlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="portfolio-card-details-link">
            View Details
            <ArrowUpRight size={14} />
          </div>
        </div>
      </article>

      <AnimatePresence>
        {isOpen ? (
          <MotionDiv
            className="portfolio-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <MotionDiv
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              className="portfolio-dialog-shell"
              style={compareThemeStyle}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="portfolio-dialog-close"
                aria-label={`Close ${title} details`}
              >
                <X size={18} />
              </button>

              <div className="portfolio-dialog-grid">
                <ProjectImage
                  key={modalImage ?? 'project-image-fallback'}
                  image={modalImage}
                  title={title}
                  className="portfolio-dialog-image"
                >
                  {hasBeforeImage ? (
                    <div className="portfolio-compare-overlay">
                      <div className="portfolio-compare-panel">
                        <span className="portfolio-compare-title">Compare Views</span>
                        <div className="portfolio-compare-toggle" role="tablist" aria-label={`${title} compare mode`}>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={compareMode === 'before'}
                            className={`portfolio-compare-pill ${compareMode === 'before' ? 'is-active' : ''}`}
                            onClick={() => setCompareMode('before')}
                          >
                            Before
                          </button>
                          <button
                            type="button"
                            role="tab"
                            aria-selected={compareMode === 'after'}
                            className={`portfolio-compare-pill ${compareMode === 'after' ? 'is-active' : ''}`}
                            onClick={() => setCompareMode('after')}
                          >
                            After
                          </button>
                        </div>
                      </div>
                      <span className="portfolio-compare-mode-badge">
                        {compareMode === 'before' ? 'Before snapshot' : 'After snapshot'}
                      </span>
                    </div>
                  ) : null}
                </ProjectImage>

                <div className="portfolio-dialog-content">
                  <div className="portfolio-dialog-header">
                    <span className="portfolio-card-pill">{safeCategory}</span>
                    <span className="portfolio-dialog-industry">{safeIndustry}</span>
                  </div>

                  <div className="portfolio-dialog-title-row">
                    <h3 id={dialogTitleId}>{title}</h3>
                    {liveUrl ? (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${title} live site`}
                        className="portfolio-dialog-live-link"
                        onClick={() => onLiveClick?.()}
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    ) : null}
                  </div>

                  <p className="portfolio-dialog-summary">{safeSummary}</p>

                  <div className="portfolio-dialog-stack">
                    <div>
                      <p className="portfolio-dialog-label">Overview</p>
                      <p className="portfolio-dialog-copy">{safeDescription}</p>
                    </div>

                    {caseStudy ? (
                      <div>
                        <p className="portfolio-dialog-label">Case Study</p>
                        <p className="portfolio-dialog-copy">{caseStudy}</p>
                      </div>
                    ) : null}

                    <div>
                      <p className="portfolio-dialog-label">What I Focused On</p>
                      <div className="portfolio-dialog-tags">
                        {safeHighlights.map((item) => (
                          <span key={`${title}-${item}`}>{item}</span>
                        ))}
                      </div>
                    </div>

                    {liveUrl ? (
                      <div className="portfolio-dialog-actions">
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="portfolio-dialog-secondary-link"
                          onClick={() => onLiveClick?.()}
                        >
                          Open Project
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default ProjectCard
