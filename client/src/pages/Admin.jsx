import { useState } from 'react'

const TABS = ['Document', 'Presentation']

const INPUT_STYLE = {
  width: '100%',
  padding: '0.7rem 1rem',
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius)',
  color: 'var(--text-primary)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'var(--transition)',
}

const LABEL_STYLE = {
  display: 'block',
  fontSize: '0.78rem',
  fontFamily: 'var(--font-mono)',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '0.45rem',
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  )
}

const EMPTY_DOC = {
  title: '', description: '', category: '', author: '',
  year: '', fileUrl: '', fileType: 'PDF', pages: '',
}

const EMPTY_PPT = {
  title: '', description: '', category: '', presenter: '',
  date: '', event: '', fileUrl: '', thumbnailUrl: '', slideCount: '',
}

export default function Admin() {
  const [tab, setTab]         = useState('Document')
  const [docForm, setDocForm] = useState(EMPTY_DOC)
  const [pptForm, setPptForm] = useState(EMPTY_PPT)
  const [status, setStatus]   = useState(null) // {type:'success'|'error', msg}
  const [loading, setLoading] = useState(false)

  const focus = e => (e.target.style.borderColor = 'var(--accent-gold)')
  const blur  = e => (e.target.style.borderColor = 'var(--border-subtle)')

  const handleDocChange = e => setDocForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handlePptChange = e => setPptForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submitDoc = async e => {
    e.preventDefault()
    setLoading(true); setStatus(null)
    try {
      const body = { ...docForm, pages: docForm.pages ? Number(docForm.pages) : undefined }
      const res  = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error((await res.json()).message)
      setStatus({ type: 'success', msg: '✅ Document added successfully!' })
      setDocForm(EMPTY_DOC)
    } catch (err) {
      setStatus({ type: 'error', msg: `❌ ${err.message}` })
    } finally {
      setLoading(false)
    }
  }

  const submitPpt = async e => {
    e.preventDefault()
    setLoading(true); setStatus(null)
    try {
      const body = { ...pptForm, slideCount: pptForm.slideCount ? Number(pptForm.slideCount) : undefined }
      const res  = await fetch('/api/presentations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error((await res.json()).message)
      setStatus({ type: 'success', msg: '✅ Presentation added successfully!' })
      setPptForm(EMPTY_PPT)
    } catch (err) {
      setStatus({ type: 'error', msg: `❌ ${err.message}` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-enter" style={{ maxWidth: '760px', margin: '0 auto', padding: '4rem 2rem' }}>

      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="section-label">Admin</span>
        <h1 className="section-title">Upload Research Files</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Add documents and presentations to the database. Upload your files to
          Google Drive first, then paste the shareable link below.
        </p>
      </div>

      {/* Google Drive tip */}
      <div style={{
        background: 'rgba(201,168,76,0.07)',
        border: '1px solid rgba(201,168,76,0.2)',
        borderRadius: 'var(--radius)',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--accent-gold)' }}>💡 How to get a Google Drive link:</strong><br />
        Upload file → Right-click → Share → Anyone with link → Copy link.<br />
        Then change the URL from:<br />
        <code style={{ color: 'var(--accent-gold)', fontSize: '0.78rem' }}>
          https://drive.google.com/file/d/<b>FILE_ID</b>/view
        </code><br />
        To:<br />
        <code style={{ color: 'var(--accent-gold)', fontSize: '0.78rem' }}>
          https://drive.google.com/uc?export=download&id=<b>FILE_ID</b>
        </code>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: '0.35rem',
        background: 'var(--bg-card)',
        padding: '0.3rem',
        borderRadius: 'var(--radius)',
        marginBottom: '2rem',
        width: 'fit-content',
      }}>
        {TABS.map(t => (
          <button key={t} onClick={() => { setTab(t); setStatus(null) }} style={{
            padding: '0.5rem 1.4rem',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: tab === t ? 500 : 400,
            background: tab === t ? 'var(--accent-gold-dim)' : 'transparent',
            border: tab === t ? '1px solid rgba(201,168,76,0.3)' : '1px solid transparent',
            color: tab === t ? 'var(--accent-gold)' : 'var(--text-muted)',
            transition: 'var(--transition)',
            cursor: 'pointer',
          }}>{t}</button>
        ))}
      </div>

      {/* Status banner */}
      {status && (
        <div style={{
          padding: '0.9rem 1.2rem',
          borderRadius: 'var(--radius)',
          marginBottom: '1.5rem',
          fontSize: '0.875rem',
          background: status.type === 'success' ? 'rgba(100,200,100,0.08)' : 'rgba(220,80,80,0.08)',
          border: `1px solid ${status.type === 'success' ? 'rgba(100,200,100,0.25)' : 'rgba(220,80,80,0.25)'}`,
          color: status.type === 'success' ? '#7ecb8a' : '#e07070',
        }}>{status.msg}</div>
      )}

      {/* ── DOCUMENT FORM ── */}
      {tab === 'Document' && (
        <form onSubmit={submitDoc} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <Field label="Title *">
              <input name="title" value={docForm.title} onChange={handleDocChange} required
                placeholder="e.g. Deep Learning Survey"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="Author *">
              <input name="author" value={docForm.author} onChange={handleDocChange} required
                placeholder="e.g. Dr. A. Fernando"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <Field label="Description">
            <textarea name="description" value={docForm.description} onChange={handleDocChange}
              placeholder="Brief summary of the document…"
              rows={3}
              style={{ ...INPUT_STYLE, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <Field label="Category *">
              <input name="category" value={docForm.category} onChange={handleDocChange} required
                placeholder="e.g. Machine Learning"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="Year">
              <input name="year" value={docForm.year} onChange={handleDocChange}
                placeholder="e.g. 2024"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="Pages">
              <input name="pages" value={docForm.pages} onChange={handleDocChange}
                type="number" placeholder="e.g. 32"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
            <Field label="File URL (Google Drive) *">
              <input name="fileUrl" value={docForm.fileUrl} onChange={handleDocChange} required
                placeholder="https://drive.google.com/uc?export=download&id=..."
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="File Type">
              <select name="fileType" value={docForm.fileType} onChange={handleDocChange}
                style={{ ...INPUT_STYLE, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                <option value="PDF">PDF</option>
                <option value="DOC">DOC</option>
                <option value="DOCX">DOCX</option>
              </select>
            </Field>
          </div>

          <button type="submit" disabled={loading} className="btn btn-gold"
            style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Saving…' : '+ Add Document'}
          </button>
        </form>
      )}

      {/* ── PRESENTATION FORM ── */}
      {tab === 'Presentation' && (
        <form onSubmit={submitPpt} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <Field label="Title *">
              <input name="title" value={pptForm.title} onChange={handlePptChange} required
                placeholder="e.g. AI in Healthcare"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="Presenter *">
              <input name="presenter" value={pptForm.presenter} onChange={handlePptChange} required
                placeholder="e.g. Dr. A. Fernando"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <Field label="Description">
            <textarea name="description" value={pptForm.description} onChange={handlePptChange}
              placeholder="Brief summary of the presentation…"
              rows={3}
              style={{ ...INPUT_STYLE, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <Field label="Category *">
              <input name="category" value={pptForm.category} onChange={handlePptChange} required
                placeholder="e.g. Cloud Computing"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="Date">
              <input name="date" value={pptForm.date} onChange={handlePptChange}
                placeholder="e.g. March 2024"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="Slide Count">
              <input name="slideCount" value={pptForm.slideCount} onChange={handlePptChange}
                type="number" placeholder="e.g. 42"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <Field label="Event / Conference">
            <input name="event" value={pptForm.event} onChange={handlePptChange}
              placeholder="e.g. IEEE Conference 2024"
              style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <Field label="File URL (Google Drive) *">
              <input name="fileUrl" value={pptForm.fileUrl} onChange={handlePptChange} required
                placeholder="https://drive.google.com/uc?export=download&id=..."
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
            <Field label="Thumbnail URL (optional)">
              <input name="thumbnailUrl" value={pptForm.thumbnailUrl} onChange={handlePptChange}
                placeholder="https://... (image URL)"
                style={INPUT_STYLE} onFocus={focus} onBlur={blur} />
            </Field>
          </div>

          <button type="submit" disabled={loading} className="btn btn-gold"
            style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Saving…' : '+ Add Presentation'}
          </button>
        </form>
      )}

      {/* Responsive */}
      <style>{`
        @media (max-width: 600px) {
          form > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}