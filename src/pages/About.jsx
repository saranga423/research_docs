import { useState } from 'react'

const TEAM = [
  {
    name: 'Dr. Dharshana Kasthurirathna',
    role: 'Assistant Professor at SLIIT',
    area: 'Complex Systems, Network Science, Computational Game Theory, Machine Learning, Distributed Systems',
  },
  {
    name: 'Ms. Hansi De Silva',
    role: 'Lecturer | Department of Software Engineering',
    area: 'Machine Learning, NLP, Cloud Computing',
  },
  {
    name: 'W.M.S.N.K. Rasingolla',
    role: 'Undergraduate Researcher',
    area: 'Faculty of Computing',
  },
  {
    name: 'J.M.R.T.D. Galahitiyawa',
    role: 'Undergraduate Researcher',
    area: 'Faculty of Computing',
  },
  {
    name: 'H.M.T.P. Herath',
    role: 'Undergraduate Researcher',
    area: 'Faculty of Computing',
  },
]

const MILESTONES = [
  {
    year: '2024',
    title: 'Research Initiation & System Design',
    desc: 'Defined Smart Pollination Assistant architecture integrating IoT sensing, computer vision, and machine learning for pumpkin farming optimization.',
  },
  {
    year: '2024',
    title: 'Dataset Engineering',
    desc: 'Built and annotated domain-specific dataset covering pumpkin flower morphology and environmental sensor readings.',
  },
  {
    year: '2025',
    title: 'Model Development',
    desc: 'Trained CNN and YOLO-based architectures with active learning for adaptive flower classification and detection.',
  },
  {
    year: '2026',
    title: 'Field Deployment & Validation',
    desc: 'Deployed IoT-enabled system in real agricultural conditions and validated pollination prediction performance.',
  },
]

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const palette = ['#c9a84c', '#6aabee', '#e07070', '#7ecb8a', '#b57bee', '#e09a50']
  const color = palette[name.charCodeAt(0) % palette.length]

  return (
    <div style={{
      width: 54,
      height: 54,
      borderRadius: '50%',
      background: `${color}18`,
      border: `1.5px solid ${color}55`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontFamily: 'var(--font-display)',
      color,
    }}>
      {initials}
    </div>
  )
}

function SectionTitle({ label, title, desc }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {desc && (
        <p style={{ color: 'var(--text-secondary)', maxWidth: 700, lineHeight: 1.7 }}>
          {desc}
        </p>
      )}
    </div>
  )
}

export default function About() {
  return (
    <div className="page-enter" style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>

      {/* INTRO */}
      <section style={{ maxWidth: 750, marginBottom: '5rem' }}>
        <span className="section-label">About</span>
        <h1 className="section-title">Smart Pollination Research Group</h1>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1rem' }}>
          An applied research initiative focused on precision agriculture, combining IoT sensing,
          machine learning, and computer vision to improve pumpkin pollination efficiency and yield optimization.
        </p>

        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          The platform consolidates research outputs including datasets, models, system architecture,
          and experimental results for academic and agricultural stakeholders.
        </p>
      </section>

      {/* MILESTONES */}
      <section style={{ marginBottom: '5rem' }}>
        <SectionTitle
          label="History"
          title="Research Milestones"
        />

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: 70,
            top: 0,
            bottom: 0,
            width: 1,
            background: 'var(--border-subtle)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.2rem' }}>
            {MILESTONES.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ minWidth: 60, textAlign: 'right' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.8rem',
                  }}>
                    {m.year}
                  </span>
                </div>

                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'var(--accent-gold)',
                  marginTop: 6,
                  zIndex: 1,
                }} />

                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    marginBottom: 6,
                  }}>
                    {m.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ marginBottom: '5rem' }}>
        <SectionTitle label="People" title="Research Team" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
        }}>
          {TEAM.map((t, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.3rem',
                display: 'flex',
                gap: '1rem',
                transition: 'var(--transition)',
              }}
            >
              <Avatar name={t.name} />

              <div>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t.name}
                </p>

                <p style={{ fontSize: '0.78rem', color: 'var(--accent-gold)' }}>
                  {t.role}
                </p>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {t.area}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 18,
        padding: '2.5rem',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem',
      }}>
        <div>
          <SectionTitle label="Contact" title="Collaborate With Us" />

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.2rem' }}>
            Open for collaboration in smart agriculture systems, AI-driven crop monitoring,
            and IoT-based agricultural optimization research.
          </p>

          <a href="mailto:smart.pollination@researchlab.edu" className="btn btn-gold">
            smart.pollination@researchlab.edu
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            ['Location', 'Faculty of Computing, University of Colombo Area'],
            ['Office', 'SLIIT Malabe Campus, Sri Lanka'],
            ['Email', 'smart.pollination@researchlab.edu'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: '1rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--accent-gold)',
                minWidth: 70,
                textTransform: 'uppercase',
              }}>
                {k}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}