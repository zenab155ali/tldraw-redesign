import { Tldraw, useEditor, DefaultToolbar, TldrawUiMenuItem, useTools, DefaultToolbarContent } from 'tldraw'
import 'tldraw/tldraw.css'
import './features/ui-skin/theme.css'
import { ShapesPanel } from './features/advanced-shapes/ShapesPanel'
import { ExportButton } from './features/export/ExportButton'
import { useState } from 'react'

// ── Toolbar override: adds "Shapes" button ──────────────────────────────────
function CustomToolbar() {
  return (
    <div className="cs-toolbar-wrapper">
      <DefaultToolbar>
        <DefaultToolbarContent />
      </DefaultToolbar>
    </div>
  )
}

// ── Top header bar ──────────────────────────────────────────────────────────
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
                <stop stopColor="#6366f1"/>
                <stop offset="1" stopColor="#8b5cf6"/>
              </linearGradient>
            </defs>
          </svg>
          <span>Creative Studio</span>
        </div>
      </div>

      <div className="cs-topbar-right">
        <button
          className={`cs-btn cs-btn-ghost ${shapesOpen ? 'cs-btn-active' : ''}`}
          onClick={onToggleShapes}
          aria-label="Toggle 3D shapes panel"
          aria-pressed={shapesOpen}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          3D Shapes
        </button>
        {/*
         * The real export control is <ExportButton>, rendered as a child of
         * <Tldraw> further down (not here) because it needs tldraw's editor
         * context via useEditor() — TopBar is a sibling of <Tldraw>, not a
         * descendant, so useEditor() would throw here. It's visually docked
         * into this slot of the top bar via the `.cs-export-btn-slot` CSS
         * class (position: fixed), so it reads as part of the top bar even
         * though it lives inside the tldraw tree in the DOM.
         */}
      </div>
    </div>
  )
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [shapesOpen, setShapesOpen] = useState(false)

  return (
    <div className="cs-app">
      <TopBar onToggleShapes={() => setShapesOpen(v => !v)} shapesOpen={shapesOpen} />

      <div className="cs-canvas-area">
        <Tldraw
          components={{
            Toolbar: CustomToolbar,
          }}
        >
          <div className="cs-export-btn-slot">
            <ExportButton filename="creative-studio-export" />
          </div>
          {shapesOpen && <ShapesPanel onClose={() => setShapesOpen(false)} />}
        </Tldraw>
      </div>
    </div>
  )
}
