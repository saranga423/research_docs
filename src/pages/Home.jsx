import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STATS = [
  { label: 'Research Papers', value: '1' },
  { label: 'Presentations',   value: '4' },
  { label: 'Contributors',    value: '9'  },
  { label: 'Years Active',    value: '1'   },
]

const TOPICS = [
  'Precision Agriculture',
  'Pumpkin Pollination Optimization',
  'Computer Vision for Crop Monitoring',
  'Machine Learning',
  'IoT Sensor Integration (Temperature, Humidity, Light)',
  'Pollination Readiness Prediction',
  'Smart Farming Systems',
  'Mobile-based Agricultural AI',
  'Active Learning in Agriculture',
  'Environmental Data Analysis',
  'Real-time Crop Monitoring',
];

export default function Home() {
  const [, setVisible] = useState(false)
  useEffect(() => { setTimeout(() => setVisible(true), 50) }, [])

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 2rem',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}/>

        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}/>

        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          position: 'relative', zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}>
          {/* Left content */}
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '20px',
              background: 'var(--accent-gold-dim)',
              border: '1px solid rgba(201,168,76,0.25)',
              marginBottom: '1.75rem',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-gold)' }}/>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
              }}>Academic Research Hub</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: '1.12',
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
            }}>
              Centralised<br/>
              <span style={{ color: 'var(--accent-gold)' }}>Knowledge</span><br/>
              Repository
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.75',
              maxWidth: '480px',
              marginBottom: '2.5rem',
            }}>
              A curated collection of research documents, academic papers,
              and conference presentations from our research group.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/documents" className="btn btn-gold">
                Browse Documents
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/presentations" className="btn btn-outline">
                View Presentations
              </Link>
            </div>
          </div>

          {/* Stats panel */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(201,168,76,0.06)',
          }}>
            {STATS.map(({ label, value }, i) => (
              <div key={label} style={{
                padding: '1.75rem 1.5rem',
                background: 'var(--bg-card)',
                borderRight: i % 2 === 0 ? '1px solid var(--border-subtle)' : 'none',
                borderBottom: i < 2 ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.4rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}>{value}</p>
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-mono)',
                }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Responsive: stack on small screens */}
        <style>{`
          @media (max-width: 768px) {
            section > div > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Topics section */}
      <section style={{ padding: '5rem 2rem', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <span className="section-label">Research Areas</span>
          <h2 className="section-title">Topics We Cover</h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            justifyContent: 'center',
            marginTop: '2rem',
          }}>
            {TOPICS.map(topic => (
              <span key={topic} style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                background: 'var(--bg-card)',
                transition: 'var(--transition)',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  e.target.style.borderColor = 'var(--accent-gold)'
                  e.target.style.color = 'var(--accent-gold)'
                  e.target.style.background = 'var(--accent-gold-dim)'
                }}
                onMouseLeave={e => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.color = 'var(--text-secondary)'
                  e.target.style.background = 'var(--bg-card)'
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{
          maxWidth: '700px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '3.5rem 2.5rem',
          boxShadow: '0 0 80px rgba(201,168,76,0.05)',
        }}>
          <span className="gold-line" style={{ margin: '0 auto 1.5rem' }}/>
          <h2 className="section-title">Explore the Collection</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.75' }}>
            Browse our full library of research documents and slide decks, or
            contribute your own work to the repository.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/documents"    className="btn btn-gold">Documents</Link>
            <Link to="/presentations" className="btn btn-outline">Presentations</Link>
          </div>
        </div>
      </section>
    </div>
  )
}