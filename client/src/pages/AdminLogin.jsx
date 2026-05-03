import { useState } from 'react'

const ADMIN_PASSWORD = 'research2024'

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin_auth', 'true')
        onLogin()
      } else {
        setError('Incorrect password. Try again.')
        setPassword('')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }}/>

      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        padding: '2.5rem',
        position: 'relative',
        boxShadow: '0 0 80px rgba(201,168,76,0.06)',
      }}>
        {/* Lock icon */}
        <div style={{
          width: 56, height: 56,
          background: 'var(--accent-gold-dim)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '1.5rem',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--accent-gold)" strokeWidth="1.8"/>
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="var(--accent-gold)" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="12" cy="16" r="1.5" fill="var(--accent-gold)"/>
          </svg>
        </div>

        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          marginBottom: '0.4rem',
        }}>Admin Access</p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.6rem',
        }}>Sign in</h1>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--text-muted)',
          marginBottom: '2rem',
          lineHeight: '1.6',
        }}>
          Enter the admin password to manage documents and presentations.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoFocus
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                background: 'var(--bg-secondary)',
                border: error
                  ? '1px solid rgba(220,80,80,0.6)'
                  : '1px solid var(--border-subtle)',
                borderRadius: '10px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border 0.2s',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.1em',
              }}
              onFocus={e => !error && (e.target.style.border = '1px solid rgba(201,168,76,0.5)')}
              onBlur={e => !error && (e.target.style.border = '1px solid var(--border-subtle)')}
            />
          </div>

          {error && (
            <p style={{
              fontSize: '0.82rem',
              color: '#e07070',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#e07070" strokeWidth="1.8"/>
                <path d="M12 7v6M12 16.5v.5" stroke="#e07070" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !password}
            className="btn btn-gold"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '0.8rem',
              fontSize: '0.9rem',
              opacity: !password ? 0.5 : 1,
            }}
          >
            {loading ? 'Verifying…' : 'Enter Admin Panel'}
          </button>
        </div>

        <p style={{
          marginTop: '1.5rem',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
        }}>
          Default password: <span style={{ color: 'var(--accent-gold)' }}>research2024</span>
        </p>
      </div>
    </div>
  )
}