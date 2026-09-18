# tldraw — Creative Studio Redesign

A modern redesign of the [tldraw](https://tldraw.dev) canvas SDK with a new visual theme and an interactive 3D shapes library panel.

## What's new

### 1. Modern light theme (`src/features/ui-skin/theme.css`)
CSS variable overrides applied to the tldraw editor:
- Toolbar: pill shape, rounded corners, elevated shadow, scale-on-hover buttons
- Active tool: indigo/violet gradient highlight
- Style panel: rounded corners, elevated card shadow
- Menu and navigation panels: consistent rounded shadow treatment
- Smooth `transition: all 0.15s ease` on all interactive elements

### 2. 3D Shapes Library panel (`src/features/advanced-shapes/ShapesPanel.tsx`)
A floating panel with 12 categorised shapes placed directly on the canvas via `editor.createShape()`:

**3D Objects:** 3D Cube · 3D Card · 3D Button · Cylinder · Isometric · 3D Panel

**Decorative:** Star · Diamond · Hexagon · Badge · Speech Bubble · Arrow

Each shape card shows a rendered SVG preview with gradient fills. Clicking any card places the shape at the current viewport center.

### 3. Working PNG export (`src/App.tsx` — `ExportButton`)
The Export PNG button calls tldraw's `exportToBlob` API, downloads a PNG of all shapes on the current page, and handles empty-canvas and error cases gracefully.

### 4. Accessible top bar
- `aria-label` and `aria-pressed` on the 3D Shapes toggle button
- `aria-label` on the Export button
- All new interactive elements are keyboard accessible

## Run locally

```bash
npm install
npx vite
# → http://localhost:5173
```

## Project structure

```
src/
  App.tsx                              # App shell, top bar, wired Export button
  features/
    ui-skin/theme.css                  # Modern light theme CSS overrides
    advanced-shapes/ShapesPanel.tsx    # 3D shapes library panel
```

All new code is inside `src/features/` — completely separate from tldraw internals.
Original tldraw functionality is fully preserved.
