import { useState } from 'react'

export default function DocCard({ doc }) {
  const [hovered, setHovered] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const {
    title = 'Untitled Document',
    description = '',
    category = 'Research',
    author = 'Unknown Author',
    year = '',
    fileUrl = '',
    fileType = 'PDF',
    pages = null,
  } = doc || {}

  const badgeClass = fileType?.toLowerCase() === 'pdf' ? 'badge-pdf' : 'badge-doc'

  const getFileName = (url) => {
    if (!url) return 'document.pdf'
    return url.split('/').pop()
  }

  const handleDownload = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!fileUrl) return

    setDownloading(true)

    try {
      // CASE 1: API or remote file
      if (fileUrl.startsWith('/api') || fileUrl.startsWith('http')) {
        const response = await fetch(fileUrl)

        if (!response.ok) throw new Error('Download failed')

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = url
        a.download = getFileName(fileUrl)

        document.body.appendChild(a)
        a.click()

        a.remove()
        window.URL.revokeObjectURL(url)
      }

      // CASE 2: static file (public folder)
      else {
        const a = document.createElement('a')
        a.href = fileUrl
        a.download = getFileName(fileUrl)
        a.target = '_blank'
        a.rel = 'noopener noreferrer'

        document.body.appendChild(a)
        a.click()
        a.remove()
      }
    } catch (err) {
      console.error('Download error:', err)
      alert('Failed to download document')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: hovered ? '1px solid rgba(201,168,76,0.3)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        transition: 'var(--transition)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.4)' : 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          background: 'rgba(220,80,80,0.1)',
          border: '1px solid rgba(220,80,80,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z"
              stroke="#e07070" strokeWidth="1.6" strokeLinejoin="round"/>
            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
              stroke="#e07070" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>

        <span className={`badge ${badgeClass}`}>{fileType}</span>
      </div>

      {/* Category */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--accent-gold)',
      }}>
        {category}
      </p>

      {/* Title */}
      <h3 style={{
        fontSize: '1.05rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: '1.35',
      }}>
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p style={{
          fontSize: '0.855rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.65',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {description}
        </p>
      )}

      {/* Footer */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
            {author}
          </p>
          {year && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {year}{pages ? ` · ${pages} pages` : ''}
            </p>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="btn btn-outline"
          style={{
            padding: '0.4rem 0.9rem',
            fontSize: '0.78rem',
            opacity: downloading ? 0.6 : 1,
            cursor: downloading ? 'not-allowed' : 'pointer',
          }}
        >
          {downloading ? 'Downloading...' : 'Download'}
        </button>
      </div>
    </article>
  )
}