import { Tldraw, DefaultToolbar, DefaultToolbarContent, useEditor, exportToBlob } from 'tldraw'
import 'tldraw/tldraw.css'
import './features/ui-skin/theme.css'
import { ShapesPanel } from './features/advanced-shapes/ShapesPanel'
import { useState } from 'react'

// Wraps the default toolbar with a modern pill-shaped container (CSS in theme.css)
function CustomToolbar() {
  return (
    <div className="cs-toolbar-wrapper">
      <DefaultToolbar>
        <DefaultToolbarContent />
      </DefaultToolbar>
    </div>
  )
}

// Export button — wired to tldraw's exportToBlob API, downloads a PNG
function ExportButton() {
  const editor = useEditor()

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
      alert('Export failed. Please try again.')
    }
  }

  return (
    <button
      className="cs-btn cs-btn-primary"
      onClick={handleExport}
      aria-label="Export canvas as PNG"
      title="Export canvas as PNG"
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

function TopBar({ onToggleShapes, shapesOpen }: { onToggleShapes: () => void; shapesOpen: boolean }) {
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
        <ExportButton />
      </div>
    </div>
  )
}

export default function App() {
  const [shapesOpen, setShapesOpen] = useState(false)
  return (
    <div className="cs-app">
      <TopBar onToggleShapes={() => setShapesOpen((v: boolean) => !v)} shapesOpen={shapesOpen} />
      <div className="cs-canvas-area">
        <Tldraw components={{ Toolbar: CustomToolbar }}>
          {shapesOpen && <ShapesPanel onClose={() => setShapesOpen(false)} />}
        </Tldraw>
      </div>
    </div>
  )
}
