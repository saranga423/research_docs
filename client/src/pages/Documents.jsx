import { useState } from 'react'
import DocCard from '../components/DocCard'
import { documents } from '../data/library'

export default function Documents() {
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')

  const categories = ['All', ...new Set(documents.map(doc => doc.category).filter(Boolean))]

  const filtered = documents.filter(d => {
  const title = (d.title || '').toLowerCase()
  const author = (d.author || '').toLowerCase()
  const desc = (d.description || '').toLowerCase()
  const cat = (d.category || '').toLowerCase()

  const searchText = search.toLowerCase()

  const matchSearch =
    title.includes(searchText) ||
    author.includes(searchText) ||
    desc.includes(searchText)

  const matchCat =
    category === 'All' || cat === category.toLowerCase()

  return matchSearch && matchCat
})

  return (
    <div className="page-enter" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <span className="section-label">Library</span>
        <h1 className="section-title">Research Documents</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: '1.7' }}>
          Papers, reports, and academic documents produced by our research group.
        </p>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', gap: '1rem', marginBottom: '2rem',
        flexWrap: 'wrap', alignItems: 'center',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search by title, author…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: category === cat ? 500 : 400,
                border: category === cat ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                background: category === cat ? 'var(--accent-gold-dim)' : 'var(--bg-card)',
                color: category === cat ? 'var(--accent-gold)' : 'var(--text-muted)',
                transition: 'var(--transition)',
                cursor: 'pointer',
              }}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
        {`${filtered.length} document${filtered.length !== 1 ? 's' : ''} found`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          <p>No documents match your search.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {filtered.map(doc => <DocCard key={doc._id} doc={doc} />)}
        </div>
      )}
    </div>
  )
}