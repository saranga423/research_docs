import { useState } from 'react'
import PptCard from '../components/PptCard'
import { presentations } from '../data/library'

export default function Presentations() {
  const [search, setSearch]     = useState('')
  const [category, setCategory] = useState('All')
  const [view, setView]         = useState('grid') // 'grid' | 'list'

  const categories = ['All', ...new Set(presentations.map(ppt => ppt.category).filter(Boolean))]

  const filtered = presentations.filter(p => {
    const title = (p.title || '').toLowerCase()
    const presenter = (p.presenter || '').toLowerCase()
    const event = (p.event || '').toLowerCase()
    const cat = (p.category || '').toLowerCase()

    const searchText = search.toLowerCase()

    const matchSearch =
      title.includes(searchText) ||
      presenter.includes(searchText) ||
      event.includes(searchText)

    const matchCat =
      category === 'All' || cat === category.toLowerCase()

    return matchSearch && matchCat
  })

  return (
    <div className="page-enter" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span className="section-label">Slides</span>
        <h1 className="section-title">Presentations</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: '1.7' }}>
          Conference talks, seminar slides, and workshop presentations from our team.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search by title, presenter, event…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--bg-card)', padding: '0.3rem', borderRadius: '8px' }}>
          {['grid','list'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '0.35rem 0.7rem',
              borderRadius: '6px',
              background: view === v ? 'var(--accent-gold-dim)' : 'transparent',
              border: view === v ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
              color: view === v ? 'var(--accent-gold)' : 'var(--text-muted)',
              transition: 'var(--transition)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center',
            }}>
              {v === 'grid'
                ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/></svg>
                : <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              }
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{
            padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.82rem',
            fontWeight: category === cat ? 500 : 400,
            border: category === cat ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
            background: category === cat ? 'var(--accent-gold-dim)' : 'var(--bg-card)',
            color: category === cat ? 'var(--accent-gold)' : 'var(--text-muted)',
            transition: 'var(--transition)', cursor: 'pointer',
          }}>{cat}</button>
        ))}
      </div>

      {/* Count */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
        {`${filtered.length} presentation${filtered.length !== 1 ? 's' : ''} found`}
      </p>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
            <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          <p>No presentations match your search.</p>
        </div>
      ) : view === 'grid' ? (
        <div className="cards-grid">
          {filtered.map(ppt => <PptCard key={ppt._id} ppt={ppt} />)}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(ppt => <PptListRow key={ppt._id} ppt={ppt} />)}
        </div>
      )}
    </div>
  )
}

function PptListRow({ ppt }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: hovered ? '1px solid rgba(201,168,76,0.25)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius)',
        padding: '1rem 1.4rem',
        display: 'flex', alignItems: 'center', gap: '1.25rem',
        transition: 'var(--transition)',
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 8,
        background: 'rgba(201,130,60,0.1)', border: '1px solid rgba(201,130,60,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="#e09a50" strokeWidth="1.6"/>
          <path d="M8 21h8M12 17v4" stroke="#e09a50" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ppt.title}</p>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ppt.presenter} · {ppt.event} · {ppt.date}</p>
      </div>
      {ppt.slideCount && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0 }}>{ppt.slideCount} slides</span>}
      <a href={ppt.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ padding: '0.38rem 0.85rem', fontSize: '0.78rem', flexShrink: 0 }}>Download</a>
    </div>
  )
}