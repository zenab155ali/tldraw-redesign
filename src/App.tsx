import { Tldraw, DefaultToolbar, DefaultToolbarContent, useEditor, exportToBlob } from 'tldraw'
import 'tldraw/tldraw.css'
import './features/ui-skin/theme.css'
import { ShapesPanel } from './features/advanced-shapes/ShapesPanel'
import { useState } from 'react'

// ── CustomToolbar ────────────────────────────────────────────────────────────
// Wraps DefaultToolbar with a modern pill-shaped container styled in theme.css.
function CustomToolbar() {
  return (
    <div className="cs-toolbar-wrapper">
      <DefaultToolbar>
        <DefaultToolbarContent />
      </DefaultToolbar>
    </div>
  )
}

// ── ExportButton ─────────────────────────────────────────────────────────────
// Must be rendered as a child of <Tldraw> so useEditor() has access to context.
// Calls tldraw's exportToBlob API and triggers a PNG download.
function ExportButton() {
  const editor = useEditor() // valid: rendered inside <Tldraw> children

  async function handleExport() {
    const shapeIds = [...editor.getCurrentPageShapeIds()]
    if (shapeIds.length === 0) {
      alert('Add some shapes to the canvas first.')
      return
    }
    try {
      const blob = await exportToBlob({
        editor,
        ids: shapeIds,
        format: 'png',
        opts: { background: true },
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'creative-studio-export.png'
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Export failed:', err)
      alert('Export failed — check the console for details.')
    }
  }

  return (
    <button
      className="cs-btn cs-btn-primary"
      onClick={handleExport}
      aria-label="Export canvas as PNG"
      title="Export all shapes on current page as PNG"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Export PNG
    </button>
  )
}

// ── TopPanel ─────────────────────────────────────────────────────────────────
// Rendered inside <Tldraw> children so ExportButton can use useEditor().
// Controls the 3D shapes panel toggle and the export action.
function TopPanel({ onToggleShapes, shapesOpen }: { onToggleShapes: () => void; shapesOpen: boolean }) {
  return (
    <div className="cs-topbar">
      <div className="cs-topbar-left">
        <div className="cs-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12z" fill="url(#lg1)"/>
            <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="lg1" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Creative Studio</span>
        </div>
      </div>
      <div className="cs-topbar-right">
        <button
          className={`cs-btn cs-btn-ghost${shapesOpen ? ' cs-btn-active' : ''}`}
          onClick={onToggleShapes}
          aria-label="Toggle 3D shapes library panel"
          aria-pressed={shapesOpen}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          3D Shapes
        </button>
        {/* ExportButton is here — inside Tldraw children — so useEditor() works */}
        <ExportButton />
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
// TopPanel, ExportButton, and ShapesPanel are all rendered as children of
// <Tldraw>, which provides the editor React context they depend on.
export default function App() {
  const [shapesOpen, setShapesOpen] = useState(false)

  return (
    <div className="cs-app">
      <div className="cs-canvas-area">
        <Tldraw components={{ Toolbar: CustomToolbar }}>
          <TopPanel
            onToggleShapes={() => setShapesOpen((v: boolean) => !v)}
            shapesOpen={shapesOpen}
          />
          {shapesOpen && <ShapesPanel onClose={() => setShapesOpen(false)} />}
        </Tldraw>
      </div>
    </div>
  )
}
