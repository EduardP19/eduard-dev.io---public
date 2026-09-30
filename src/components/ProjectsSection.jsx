import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MoveRight } from 'lucide-react'
import ProjectCard from './ProjectCard'
import { useMediaQuery } from '../hooks/useMediaQuery'

const MotionDiv = motion.div

function ProjectList({ projects, trackClick }) {
  return projects.map((project, index) => (
    <ProjectCard
      key={project.id ?? project.slug ?? project.title}
      index={index}
      title={project.title}
      category={project.category || 'Project'}
      industry={project.industry || 'Client Work'}
      image={project.image}
      beforeImage={project.beforeImage}
      brandColor={project.brandColor}
      description={project.description || project.summary || ''}
      summary={project.summary || project.description || ''}
      highlights={project.highlights}
      caseStudy={project.caseStudy}
      liveUrl={project.liveUrl}
      onOpen={() => trackClick?.(`Open Project ${project.title}`)}
      onLiveClick={() => trackClick?.(`Open Live ${project.title}`)}
    />
  ))
}

function Intro({ count }) {
  return (
    <div className="work-intro">
      <span className="eyebrow mono">(01) Selected work</span>
      <h2 className="display">
        Work that <em className="serif">speaks</em>
        <br /> for itself<span className="accent">.</span>
      </h2>
      <p>
        Real client websites, platforms and AI systems — built for clarity, speed and revenue.
        Tap any project for the case study.
      </p>
      <span className="work-count mono">
        {String(count).padStart(2, '0')} projects <MoveRight size={14} />
      </span>
    </div>
  )
}

function Outro() {
  return (
    <a href="#contact" className="work-outro" data-cursor="Talk">
      <span className="eyebrow mono">Next one could be yours</span>
      <span className="work-outro-title">
        Let&apos;s build <em className="serif">something</em>
      </span>
      <span className="work-outro-arrow">
        <ArrowRight size={28} />
      </span>
    </a>
  )
}

// Vertical scroll drives a pinned horizontal gallery (desktop and mobile).
function HorizontalGallery({ projects, trackClick }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [distance, setDistance] = useState(0)
  const distanceValue = useMotionValue(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Hold still for the first and last 6% of the pin so the intro and final card rest in view.
  const x = useTransform([scrollYProgress, distanceValue], ([progress, d]) => {
    const t = Math.min(1, Math.max(0, (progress - 0.06) / 0.88))
    return -t * d
  })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const measure = () => {
      const next = Math.max(0, track.scrollWidth - window.innerWidth)
      distanceValue.set(next)
      setDistance(next)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [distanceValue, projects.length])

  return (
    <div ref={sectionRef} className="work-pin" style={{ height: `calc(${distance}px + var(--pin-vh))` }}>
      <div className="work-sticky">
        <MotionDiv ref={trackRef} className="work-track" style={{ x }}>
          <Intro count={projects.length} />
          <ProjectList projects={projects} trackClick={trackClick} />
          <Outro />
        </MotionDiv>
        <div className="work-progress" aria-hidden="true">
          <MotionDiv className="work-progress-bar" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  )
}

function ProjectsSection({ projects, projectsError, trackClick }) {
  const safeProjects = useMemo(() => (Array.isArray(projects) ? projects : []), [projects])
  // Pinned horizontal gallery on every screen size; stacked list only for reduced motion.
  const useGallery = useMediaQuery('(prefers-reduced-motion: no-preference)')

  return (
    <section id="work" className="work" aria-label="Selected projects">
      {/* Legacy anchor so old #projects links keep working. */}
      <span id="projects" className="anchor-alias" aria-hidden="true" />
      {projectsError ? <p className="projects-error container">{projectsError}</p> : null}

      {safeProjects.length === 0 ? (
        <div className="container work-loading">
          <Intro count={0} />
          <div className="work-skeleton" />
        </div>
      ) : useGallery ? (
        <HorizontalGallery projects={safeProjects} trackClick={trackClick} />
      ) : (
        <div className="container work-stack">
          <Intro count={safeProjects.length} />
          <ProjectList projects={safeProjects} trackClick={trackClick} />
          <Outro />
        </div>
      )}
    </section>
  )
}

export default ProjectsSection
