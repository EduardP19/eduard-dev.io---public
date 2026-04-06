import { useMemo } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

function ProjectsSection({ projects, projectsError, trackClick }) {
  const MotionDiv = motion.div
  const safeProjects = useMemo(() => (Array.isArray(projects) ? projects : []), [projects])

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <h2>Projects</h2>
        <p className="projects-subtitle">
          Work that speaks for itself. Real client websites and systems, built for clarity and
          performance.
        </p>
        {projectsError ? <p className="projects-error">{projectsError}</p> : null}

        <div className="portfolio-grid">
          {safeProjects.map((project, index) => (
            <MotionDiv
              key={project.id ?? project.slug ?? project.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.28, delay: index * 0.02, ease: 'easeOut' }}
              className={project.featured || index === 0 ? 'portfolio-grid-featured' : ''}
            >
              <ProjectCard
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
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
