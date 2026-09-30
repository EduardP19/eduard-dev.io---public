import { motion } from 'framer-motion'
import { Blocks, BrainCircuit, Code2, Database, Layers, Wrench } from 'lucide-react'
import { SKILL_GROUPS } from '../lib/site'

const MotionDiv = motion.div
const ICONS = {
  ai: BrainCircuit,
  frontend: Layers,
  backend: Database,
  languages: Code2,
  platforms: Blocks,
  tooling: Wrench,
}

// Animated "agent graph" for the featured AI card: nodes pulse, edges flow.
function AgentGraph() {
  const nodes = [
    { x: 60, y: 70, label: 'SMS' },
    { x: 200, y: 40, label: 'LLM' },
    { x: 330, y: 80, label: 'Calendar' },
    { x: 130, y: 160, label: 'CRM' },
    { x: 280, y: 170, label: 'Stripe' },
  ]
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [3, 4],
    [2, 4],
  ]

  return (
    <svg className="agent-graph" viewBox="0 0 400 220" aria-hidden="true">
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          className="agent-edge"
        />
      ))}
      {nodes.map((node, index) => (
        <g key={node.label} className="agent-node" style={{ animationDelay: `${index * 0.4}s` }}>
          <circle cx={node.x} cy={node.y} r={index === 1 ? 16 : 8} />
          <text x={node.x} y={node.y + (index === 1 ? 36 : 26)} textAnchor="middle">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function SkillCard({ group, index }) {
  const Icon = ICONS[group.id] ?? Code2

  const onPointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <MotionDiv
      className={`bento-card ${group.featured ? 'bento-featured' : ''} bento-${group.id}`}
      onPointerMove={onPointerMove}
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
      {group.featured ? <AgentGraph /> : null}
      <h3>{group.title}</h3>
      <p>{group.blurb}</p>
      <ul className="bento-pills">
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </MotionDiv>
  )
}

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow mono">(02) Stack</span>
          <h2 className="display">
            The <em className="serif">toolkit</em> behind
            <br /> the work<span className="accent">.</span>
          </h2>
          <p>
            What I use day to day across AI-powered web apps, client builds and automation-led
            systems.
          </p>
        </header>
        <div className="bento">
          {SKILL_GROUPS.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
