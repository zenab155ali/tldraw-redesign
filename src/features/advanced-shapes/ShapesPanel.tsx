/**
 * ADVANCED SHAPES PANEL — Creative Studio
 * ─────────────────────────────────────────
 * Renders a floating panel with categorised shapes.
 * Clicking a shape calls editor.createShape() to place it on the canvas.
 * Completely separate from tldraw internals — uses only the public Editor API.
 */
import { useEditor, createShapeId } from 'tldraw'

interface ShapeDef {
  label: string
  preview: React.ReactNode
  create: (editor: ReturnType<typeof useEditor>) => void
}

// ── SVG previews ────────────────────────────────────────────────────────────

const Cube3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <polygon points="22,4 38,13 38,31 22,40 6,31 6,13" fill="url(#cubeTop)" opacity="0.9"/>
    <polygon points="22,4 38,13 22,22 6,13" fill="url(#cubeFace1)"/>
    <polygon points="6,13 22,22 22,40 6,31" fill="url(#cubeFace2)"/>
    <polygon points="38,13 22,22 22,40 38,31" fill="url(#cubeFace3)"/>
    <defs>
      <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#818cf8"/><stop offset="1" stopColor="#6366f1"/>
      </linearGradient>
      <linearGradient id="cubeFace1" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#a5b4fc"/><stop offset="1" stopColor="#818cf8"/>
      </linearGradient>
      <linearGradient id="cubeFace2" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#4f46e5"/><stop offset="1" stopColor="#6366f1"/>
      </linearGradient>
      <linearGradient id="cubeFace3" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#818cf8"/>
      </linearGradient>
    </defs>
  </svg>
)

const Card3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="8" y="12" width="30" height="22" rx="4" fill="#e0e7ff" stroke="#c7d2fe" strokeWidth="1"/>
    <rect x="4" y="8" width="30" height="22" rx="4" fill="url(#cardGrad)" stroke="#a5b4fc" strokeWidth="1"/>
    <rect x="6" y="12" width="14" height="2" rx="1" fill="white" opacity="0.7"/>
    <rect x="6" y="16" width="20" height="1.5" rx="1" fill="white" opacity="0.5"/>
    <rect x="6" y="20" width="16" height="1.5" rx="1" fill="white" opacity="0.5"/>
    <defs>
      <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#6366f1"/><stop offset="1" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
  </svg>
)

const Button3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="4" y="16" width="36" height="16" rx="6" fill="#3730a3"/>
    <rect x="4" y="13" width="36" height="16" rx="6" fill="url(#btnGrad)"/>
    <rect x="6" y="14" width="32" height="6" rx="3" fill="white" opacity="0.15"/>
    <text x="22" y="25" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">CLICK</text>
    <defs>
      <linearGradient id="btnGrad" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#818cf8"/><stop offset="1" stopColor="#4f46e5"/>
      </linearGradient>
    </defs>
  </svg>
)

const Star3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <path d="M22 4l4.5 9 10 1.5-7.2 7 1.7 10L22 27l-9 4.5 1.7-10L7.5 14.5l10-1.5z" fill="url(#starGrad)"/>
    <path d="M22 6l3.8 7.7 8.5 1.2-6.1 6 1.4 8.5L22 25.4l-7.6 4 1.4-8.5-6.1-6 8.5-1.2z" fill="url(#starInner)" opacity="0.6"/>
    <defs>
      <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#fbbf24"/><stop offset="1" stopColor="#f59e0b"/>
      </linearGradient>
      <linearGradient id="starInner" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#fde68a"/><stop offset="1" stopColor="#fcd34d"/>
      </linearGradient>
    </defs>
  </svg>
)

const SpeechBubble = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <path d="M6 8h32a3 3 0 013 3v16a3 3 0 01-3 3H24l-6 6v-6H6a3 3 0 01-3-3V11a3 3 0 013-3z" fill="url(#bubbleGrad)" stroke="#c7d2fe" strokeWidth="1"/>
    <rect x="10" y="15" width="14" height="2" rx="1" fill="white" opacity="0.8"/>
    <rect x="10" y="20" width="20" height="2" rx="1" fill="white" opacity="0.6"/>
    <defs>
      <linearGradient id="bubbleGrad" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#dbeafe"/><stop offset="1" stopColor="#bfdbfe"/>
      </linearGradient>
    </defs>
  </svg>
)

const Diamond3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <polygon points="22,4 38,18 22,40 6,18" fill="url(#diamondGrad)"/>
    <polygon points="22,4 38,18 22,20 6,18" fill="white" opacity="0.25"/>
    <polygon points="6,18 22,20 22,40" fill="url(#diamondSide)"/>
    <polygon points="38,18 22,20 22,40" fill="url(#diamondSide2)"/>
    <defs>
      <linearGradient id="diamondGrad" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#67e8f9"/><stop offset="1" stopColor="#06b6d4"/>
      </linearGradient>
      <linearGradient id="diamondSide" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#0891b2"/><stop offset="1" stopColor="#06b6d4"/>
      </linearGradient>
      <linearGradient id="diamondSide2" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#22d3ee"/><stop offset="1" stopColor="#67e8f9"/>
      </linearGradient>
    </defs>
  </svg>
)

const Cylinder3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="8" y="16" width="28" height="20" fill="url(#cylBody)"/>
    <ellipse cx="22" cy="36" rx="14" ry="5" fill="url(#cylBottom)"/>
    <ellipse cx="22" cy="16" rx="14" ry="5" fill="url(#cylTop)"/>
    <defs>
      <linearGradient id="cylBody" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#34d399"/><stop offset="0.5" stopColor="#6ee7b7"/><stop offset="1" stopColor="#059669"/>
      </linearGradient>
      <radialGradient id="cylTop" cx="0.5" cy="0.5" r="0.5">
        <stop stopColor="#a7f3d0"/><stop offset="1" stopColor="#34d399"/>
      </radialGradient>
      <radialGradient id="cylBottom" cx="0.5" cy="0.5" r="0.5">
        <stop stopColor="#059669"/><stop offset="1" stopColor="#047857"/>
      </radialGradient>
    </defs>
  </svg>
)

const Badge = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="16" fill="url(#badgeGrad)"/>
    <circle cx="22" cy="22" r="12" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="3 2"/>
    <text x="22" y="27" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Inter,sans-serif">PRO</text>
    <defs>
      <radialGradient id="badgeGrad" cx="0.3" cy="0.3" r="0.8">
        <stop stopColor="#fb923c"/><stop offset="1" stopColor="#dc2626"/>
      </radialGradient>
    </defs>
  </svg>
)

const Arrow3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <path d="M4 18h24v-6l12 10-12 10v-6H4z" fill="url(#arrowGrad)"/>
    <path d="M4 18h24v4H4z" fill="white" opacity="0.2"/>
    <defs>
      <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#f472b6"/><stop offset="1" stopColor="#ec4899"/>
      </linearGradient>
    </defs>
  </svg>
)

const Hexagon3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <polygon points="22,4 36,13 36,31 22,40 8,31 8,13" fill="url(#hexGrad)"/>
    <polygon points="22,4 36,13 22,16 8,13" fill="white" opacity="0.2"/>
    <polygon points="8,13 22,16 22,40 8,31" fill="black" opacity="0.1"/>
    <defs>
      <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#c084fc"/><stop offset="1" stopColor="#7c3aed"/>
      </linearGradient>
    </defs>
  </svg>
)

const Panel3D = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="6" y="10" width="32" height="24" rx="6" fill="url(#panelGrad)" filter="url(#panelShadow)"/>
    <rect x="6" y="10" width="32" height="8" rx="6" fill="white" opacity="0.15"/>
    <rect x="10" y="23" width="12" height="2" rx="1" fill="white" opacity="0.5"/>
    <rect x="10" y="27" width="18" height="2" rx="1" fill="white" opacity="0.35"/>
    <defs>
      <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#38bdf8"/><stop offset="1" stopColor="#0284c7"/>
      </linearGradient>
      <filter id="panelShadow">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0284c7" floodOpacity="0.3"/>
      </filter>
    </defs>
  </svg>
)

const Isometric = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <polygon points="22,8 36,16 36,28 22,20" fill="url(#isoTop)"/>
    <polygon points="22,8 8,16 8,28 22,20" fill="url(#isoLeft)"/>
    <polygon points="8,28 22,36 36,28 22,20" fill="url(#isoBottom)"/>
    <defs>
      <linearGradient id="isoTop" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#fde68a"/><stop offset="1" stopColor="#f59e0b"/>
      </linearGradient>
      <linearGradient id="isoLeft" x1="0" y1="0" x2="1" y2="0">
        <stop stopColor="#fbbf24"/><stop offset="1" stopColor="#d97706"/>
      </linearGradient>
      <linearGradient id="isoBottom" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#92400e"/><stop offset="1" stopColor="#78350f"/>
      </linearGradient>
    </defs>
  </svg>
)

// ── Shape definitions (what gets placed on canvas) ──────────────────────────

const SHAPE_SECTIONS: { title: string; shapes: ShapeDef[] }[] = [
  {
    title: '3D Objects',
    shapes: [
      {
        label: '3D Cube',
        preview: <Cube3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 80,
            y: center.y - 80,
            props: {
              geo: 'rectangle',
              w: 160,
              h: 160,
              color: 'violet',
              fill: 'solid',
              dash: 'draw',
              text: '3D Cube',
              font: 'draw',
              size: 'm',
              labelColor: 'white',
            },
          })
        },
      },
      {
        label: '3D Card',
        preview: <Card3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 90,
            y: center.y - 60,
            props: {
              geo: 'rectangle',
              w: 180,
              h: 120,
              color: 'violet',
              fill: 'solid',
              dash: 'solid',
              size: 's',
              text: 'Card',
              font: 'sans',
              labelColor: 'white',
            },
          })
        },
      },
      {
        label: '3D Button',
        preview: <Button3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 70,
            y: center.y - 25,
            props: {
              geo: 'rectangle',
              w: 140,
              h: 50,
              color: 'indigo' as any,
              fill: 'solid',
              dash: 'solid',
              size: 's',
              text: 'CLICK ME',
              font: 'sans',
              labelColor: 'white',
            },
          })
        },
      },
      {
        label: 'Cylinder',
        preview: <Cylinder3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 60,
            y: center.y - 80,
            props: {
              geo: 'ellipse',
              w: 120,
              h: 160,
              color: 'green',
              fill: 'solid',
              dash: 'solid',
              size: 'm',
              text: '',
              font: 'sans',
            },
          })
        },
      },
      {
        label: 'Isometric',
        preview: <Isometric />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 70,
            y: center.y - 70,
            props: {
              geo: 'rhombus',
              w: 140,
              h: 140,
              color: 'yellow',
              fill: 'solid',
              dash: 'solid',
              size: 'm',
              text: '',
              font: 'sans',
            },
          })
        },
      },
      {
        label: '3D Panel',
        preview: <Panel3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 100,
            y: center.y - 70,
            props: {
              geo: 'rectangle',
              w: 200,
              h: 140,
              color: 'light-blue' as any,
              fill: 'solid',
              dash: 'solid',
              size: 's',
              text: 'Panel',
              font: 'sans',
              labelColor: 'white',
            },
          })
        },
      },
    ],
  },
  {
    title: 'Decorative',
    shapes: [
      {
        label: 'Star',
        preview: <Star3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 70,
            y: center.y - 70,
            props: {
              geo: 'star',
              w: 140,
              h: 140,
              color: 'yellow',
              fill: 'solid',
              dash: 'solid',
              size: 'm',
              text: '',
              font: 'sans',
            },
          })
        },
      },
      {
        label: 'Diamond',
        preview: <Diamond3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 70,
            y: center.y - 70,
            props: {
              geo: 'diamond',
              w: 140,
              h: 140,
              color: 'light-blue' as any,
              fill: 'solid',
              dash: 'solid',
              size: 'm',
              text: '',
              font: 'sans',
            },
          })
        },
      },
      {
        label: 'Hexagon',
        preview: <Hexagon3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 70,
            y: center.y - 80,
            props: {
              geo: 'hexagon',
              w: 140,
              h: 160,
              color: 'violet',
              fill: 'solid',
              dash: 'solid',
              size: 'm',
              text: '',
              font: 'sans',
            },
          })
        },
      },
      {
        label: 'Badge',
        preview: <Badge />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 60,
            y: center.y - 60,
            props: {
              geo: 'ellipse',
              w: 120,
              h: 120,
              color: 'red',
              fill: 'solid',
              dash: 'solid',
              size: 's',
              text: 'PRO',
              font: 'sans',
              labelColor: 'white',
            },
          })
        },
      },
      {
        label: 'Speech Bubble',
        preview: <SpeechBubble />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 90,
            y: center.y - 60,
            props: {
              geo: 'cloud',
              w: 180,
              h: 120,
              color: 'blue',
              fill: 'solid',
              dash: 'solid',
              size: 'm',
              text: 'Hello!',
              font: 'sans',
              labelColor: 'black',
            },
          })
        },
      },
      {
        label: 'Arrow',
        preview: <Arrow3D />,
        create: (editor) => {
          const id = createShapeId()
          const center = editor.getViewportPageCenter()
          editor.createShape({
            id,
            type: 'geo',
            x: center.x - 80,
            y: center.y - 40,
            props: {
              geo: 'arrow-right',
              w: 160,
              h: 80,
              color: 'pink',
              fill: 'solid',
              dash: 'solid',
              size: 'm',
              text: '',
              font: 'sans',
            },
          })
        },
      },
    ],
  },
]

// ── Panel component ─────────────────────────────────────────────────────────

interface ShapesPanelProps {
  onClose: () => void
}

export function ShapesPanel({ onClose }: ShapesPanelProps) {
  const editor = useEditor()

  function handleShape(def: ShapeDef) {
    def.create(editor)
    // Select the just-created shape so user can see it's placed
    editor.selectAll()
    editor.zoomToSelection({ animation: { duration: 300 } })
    editor.selectNone()
  }

  return (
    <div className="cs-shapes-panel" role="dialog" aria-label="3D Shapes Library">
      <div className="cs-panel-header">
        <div className="cs-panel-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5"/>
            <path d="M2 12l10 5 10-5"/>
          </svg>
          Shapes Library
          <span className="cs-panel-title-badge">NEW</span>
        </div>
        <button
          className="cs-panel-close"
          onClick={onClose}
          aria-label="Close shapes panel"
        >
          ✕
        </button>
      </div>

      <div className="cs-panel-scroll">
        {SHAPE_SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="cs-section-label">{section.title}</div>
            <div className="cs-shape-grid">
              {section.shapes.map((shape) => (
                <button
                  key={shape.label}
                  className="cs-shape-card"
                  onClick={() => handleShape(shape)}
                  aria-label={`Add ${shape.label} to canvas`}
                  title={`Add ${shape.label}`}
                >
                  <div className="cs-shape-preview">{shape.preview}</div>
                  <span className="cs-shape-label">{shape.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
