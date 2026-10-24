import { motion } from 'framer-motion'
import { Bot, Globe, Workflow } from 'lucide-react'
import { EMAIL, SERVICES } from '../lib/site'
import { trackClick } from '../lib/track'

const MotionDiv = motion.div
const ICONS = { web: Globe, automation: Workflow, ai: Bot }

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow mono">(05) Freelance</span>
          <h2 className="display display-sm">
            Need it <em className="serif">built</em>
            <br /> for your business<span className="accent">?</span>
          </h2>
          <p>
            Alongside my main role I take on a small number of freelance projects — websites,
            automations and AI agents for UK small businesses, built to the same production
            standard as the work above.
          </p>
        </header>
        <div className="services-grid">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.id] ?? Globe
            return (
              <MotionDiv
                key={service.id}
                className="bento-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="bento-head">
                  <span className="bento-icon">
                    <Icon size={18} />
                  </span>
                  <span className="mono dim">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.blurb}</p>
                <ul className="bento-pills">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </MotionDiv>
            )
          })}
        </div>
        <a
          href={`mailto:${EMAIL}?subject=Project%20enquiry`}
          className="services-cta mono"
          onClick={() => trackClick('Services Enquiry')}
        >
          Start a project enquiry →
        </a>
      </div>
    </section>
  )
}

export default Services
