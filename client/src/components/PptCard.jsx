import { useState } from 'react'

export default function PptCard({ ppt }) {
  const [hovered, setHovered] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const {
    title = 'Untitled Presentation',
    description = '',
    category = 'Research',
    presenter = 'Unknown',
    date = '',
    fileUrl = '',
    slideCount = null,
    thumbnailUrl = null,
    event = '',
  } = ppt || {}

  // Extract filename safely
  const getFileName = (url) => {
    if (!url) return 'presentation.pptx'
    return url.split('/').pop()
  }

  const handleDownload = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!fileUrl) return

    setDownloading(true)

    try {
      // CASE 1: backend API download (recommended)
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
      alert('Failed to download file')
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
        overflow: 'hidden',
        transition: 'var(--transition)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.4)' : 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          height: '140px',
          background: thumbnailUrl
            ? `url(${thumbnailUrl}) center/cover`
            : 'linear-gradient(135deg, #1a1e2e 0%, #222840 100%)',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {!thumbnailUrl && (
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
            <rect x="2" y="3" width="20" height="14" rx="2" stroke="var(--text-primary)" strokeWidth="1.4" />
            <path d="M8 21h8M12 17v4" stroke="var(--text-primary)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}

        {slideCount && (
          <span
            style={{
              position: 'absolute',
              bottom: '0.6rem',
              right: '0.7rem',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(6px)',
              padding: '0.2rem 0.55rem',
              borderRadius: '20px',
              fontSize: '0.68rem',
              color: 'var(--text-secondary)',
            }}
          >
            {slideCount} slides
          </span>
        )}

        <span className="badge badge-ppt" style={{ position: 'absolute', top: '0.7rem', left: '0.7rem' }}>
          PPT
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
        <p
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold)',
          }}
        >
          {category}
        </p>

        <h3
          style={{
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: '1.35',
          }}
        >
          {title}
        </h3>

        {description && (
          <p
            style={{
              fontSize: '0.855rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.65',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </p>
        )}

        {event && (
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {event}
          </p>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              {presenter}
            </p>
            {date && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{date}</p>}
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
      </div>
    </article>
  )
}