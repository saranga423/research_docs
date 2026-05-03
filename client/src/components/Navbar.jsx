import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',              label: 'Home' },
  { to: '/documents',     label: 'Documents' },
  { to: '/presentations', label: 'Presentations' },
  { to: '/about',         label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: scrolled ? 'rgba(13,15,20,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
      transition: '0.3s ease',
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '34px', height: '34px',
            background: 'var(--accent-gold)',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#0d0f14" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M12 2v20M3 7l9 5 9-5" stroke="#0d0f14" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '0.01em',
          }}>
            Research<span style={{ color: 'var(--accent-gold)' }}>Portal</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul style={{
          display: 'flex',
          listStyle: 'none',
          gap: '0.25rem',
          alignItems: 'center',
        }} className="desktop-nav">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                style={({ isActive }) => ({
                  display: 'inline-block',
                  padding: '0.45rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--accent-gold-dim)' : 'transparent',
                  transition: 'var(--transition)',
                  letterSpacing: '0.02em',
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          className="hamburger"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '22px',
              height: '2px',
              background: 'var(--text-primary)',
              borderRadius: '1px',
              transition: '0.2s',
            }}/>
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border-subtle)',
          padding: '1rem 2rem 1.5rem',
        }}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.65rem 0',
                fontSize: '1rem',
                color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                borderBottom: '1px solid var(--border-subtle)',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}