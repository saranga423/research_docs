import { NavLink } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-secondary)',
      padding: '3rem 2rem 2rem',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}>
              Research<span style={{ color: 'var(--accent-gold)' }}>Portal</span>
            </span>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              marginTop: '0.75rem',
              lineHeight: '1.7',
              maxWidth: '220px',
            }}>
              A centralised hub for research documents, papers, and presentations.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '1rem',
            }}>Navigation</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[['/', 'Home'], ['/documents', 'Documents'], ['/presentations', 'Presentations'], ['/about', 'About']].map(([to, label]) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    style={{ color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'var(--transition)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent-gold)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              marginBottom: '1rem',
            }}>Contact</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.8' }}>
              Sri Lanka Institute of Information Technology<br />
              Faculty of Computing<br />
              SLIIT Malabe Campus, New Kandy Road, Malabe.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © {year} Research Portal. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
            Built with MERN Stack
          </p>
        </div>
      </div>
    </footer>
  )
}