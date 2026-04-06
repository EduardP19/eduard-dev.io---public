import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

function ProjectImage({ image, title, className = '' }) {
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
    </div>
  )
}

function ProjectCard({
  title,
  category,
  industry,
  image,
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
  const dialogTitleId = useId()

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
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
  const openModal = () => {
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
            onClick={() => setIsOpen(false)}
          >
            <MotionDiv
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              className="portfolio-dialog-shell"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="portfolio-dialog-close"
                aria-label={`Close ${title} details`}
              >
                <X size={18} />
              </button>

              <div className="portfolio-dialog-grid">
                <ProjectImage image={image} title={title} className="portfolio-dialog-image" />

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
