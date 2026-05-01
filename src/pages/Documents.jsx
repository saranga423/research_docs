import { useEffect, useState } from 'react'
import DocCard from '../components/DocCard'

/* ── fallback sample data (shown until backend returns real data) ── */
const SAMPLE_DOCS = [
  // ── Research / Detection Models ──
  {
    _id: '1',
    title: 'Disease Detection',
    description: 'Research document on plant disease detection models and methodologies.',
    category: 'Agriculture AI',
    author: 'Research Group',
    year: '2024',
    fileType: 'PDF',
    pages: null,
    fileUrl: '/uploads/documents/Disease Detection.pdf',
  },
  {
    _id: '2',
    title: 'Gender Detection',
    description: 'Model and analysis for gender detection using machine learning techniques.',
    category: 'Machine Learning',
    author: 'Research Group',
    year: '2024',
    fileType: 'PDF',
    pages: null,
    fileUrl: '/uploads/documents/Gender Detection.pdf',
  },
  {
    _id: '3',
    title: 'Pollination Readiness Detection',
    description: 'System for detecting crop pollination readiness using AI-based analysis.',
    category: 'Agriculture AI',
    author: 'Research Group',
    year: '2024',
    fileType: 'PDF',
    pages: null,
    fileUrl: '/uploads/documents/Pollination Readiness Detection.pdf',
  },

  // ── Reports / Academic Submissions ──
  {
    _id: '4',
    title: 'Individual Final Report',
    description: 'Final individual project report submission.',
    category: 'Academic Reports',
    author: 'IT22031020',
    year: '2024',
    fileType: 'DOCX',
    pages: null,
    fileUrl: '/uploads/documents/Individual Final Report(IT22031020).docx',
  },
  {
    _id: '5',
    title: 'IT22309860 Report',
    description: 'Research and implementation documentation.',
    category: 'Academic Reports',
    author: 'IT22309860',
    year: '2024',
    fileType: 'DOCX',
    pages: null,
    fileUrl: '/uploads/documents/Pollination_Readiness_IT22309860 (1).docx',
  },
  {
    _id: '6',
    title: 'Thilina Document',
    description: 'Supporting academic document submission.',
    category: 'Academic Reports',
    author: 'Thilina',
    year: '2024',
    fileType: 'DOCX',
    pages: null,
    fileUrl: '/uploads/documents/Thilina.doc (1).docx',
  },
  {
    _id: '7',
    title: 'IT Project Document',
    description: 'Group project documentation file.',
    category: 'Academic Reports',
    author: 'Group Submission',
    year: '2024',
    fileType: 'DOCX',
    pages: null,
    fileUrl: '/uploads/documents/25-26J-189 (1).docx',
  },

  // ── Institutional / Reference ──
  {
    _id: '8',
    title: 'SLIIT Institutional Document',
    description: 'Institutional reference and academic guideline document.',
    category: 'Institutional',
    author: 'SLIIT',
    year: '2024',
    fileType: 'PDF',
    pages: null,
    fileUrl: '/uploads/documents/SRI LANKA INSTITUTE OF INFORMATION TECHNOLOGY1 (1) (1).pdf',
  },

  
]

const CATEGORIES = ['All', ...Array.from(new Set(SAMPLE_DOCS.map(d => d.category)))]

export default function Documents() {
  const [docs, setDocs]           = useState([])
  const [loading, setLoading]     = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [error]         = useState(null)
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await fetch('/api/documents')
        if (!res.ok || !data?.length) {
          throw new Error('Empty or invalid data')
        }
        const data = await res.json()
        console.log("DOCUMENT API RESPONSE:", data)
        setDocs(data)
      } catch {
        setDocs(SAMPLE_DOCS) // fallback
      } finally {
        setLoading(false)
      }
    }
    fetchDocs()
  }, [])

  const filtered = docs.filter(d => {
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
          {CATEGORIES.map(cat => (
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
        {loading ? 'Loading…' : `${filtered.length} document${filtered.length !== 1 ? 's' : ''} found`}
      </p>

      {/* Grid */}
      {loading ? (
        <LoadingSkeleton />
      ) : filtered.length === 0 ? (
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

function LoadingSkeleton() {
  return (
    <div className="cards-grid">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {[44,12,80,120,40].map((h, j) => (
            <div key={j} style={{
              height: h, borderRadius: 6,
              background: 'linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-card-hover) 50%, var(--bg-secondary) 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.4s infinite',
              opacity: 0.7,
            }}/>
          ))}
          <style>{`
            @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
          `}</style>
        </div>
      ))}
    </div>
  )
}