# tldraw — Creative Studio Redesign v2

A modern redesign of the [tldraw](https://tldraw.dev) canvas SDK, adding:

- **Modern light theme** — polished toolbar, glassmorphism panels, smooth hover/click animations
- **3D Shapes Library panel** — 12 categorised shapes (3D Cube, Card, Button, Cylinder, Isometric, Star, Diamond, Hexagon, Badge, Speech Bubble, Arrow, Panel) placed directly on the canvas via the public Editor API
- **Gradient accent colours** — indigo/violet gradient brand applied across toolbar and buttons
- **Accessible UI** — all new components include `aria-label`, `role`, and keyboard-accessible buttons

## What changed vs stock tldraw

| Area | Change |
|---|---|
| Top bar | New branded header with Export button |
| Toolbar | Pill shape, rounded buttons, scale-on-hover |
| Style panel | Rounded corners, elevated shadow |
| New: Shapes panel | Floating 3D shapes library (click any shape to place it) |

## Run locally

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Structure

```
src/
  App.tsx                              # Main app shell
  features/
    ui-skin/theme.css                  # All CSS overrides — modern light theme
    advanced-shapes/ShapesPanel.tsx    # 3D shapes library panel
```

All new code lives inside `src/features/` — completely separate from tldraw internals.
