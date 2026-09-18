# tldraw — Creative Studio Redesign

A modern redesign of the [tldraw](https://tldraw.dev) canvas SDK adding a polished light theme, a 3D shapes library panel, and a working PNG export button.

## Features added

### Modern light theme — `src/features/ui-skin/theme.css`
CSS variable overrides scoped to tldraw's class selectors:
- Toolbar: pill shape, rounded corners, shadow, scale-on-hover, active-tool gradient
- Style panel, menu panel, navigation panel: rounded corners, elevated shadows
- `transition: all 0.15s ease` on all interactive elements for smooth feedback

### 3D Shapes Library panel — `src/features/advanced-shapes/ShapesPanel.tsx`
Floating panel with 12 shapes in two categories, placed on the canvas via `editor.createShape()`:
- **3D Objects:** Cube · Card · Button · Cylinder · Isometric · Panel
- **Decorative:** Star · Diamond · Hexagon · Badge · Speech Bubble · Arrow

Each card shows an SVG gradient preview. Clicking places the shape at the viewport center.

### Working PNG export — `src/App.tsx`
`ExportButton` is rendered inside `<Tldraw>` children so `useEditor()` resolves correctly.
Calls `exportToBlob({ editor, ids, format: 'png' })`, triggers a browser download, and handles both empty-canvas and runtime error cases.

### Accessible UI
- `aria-label` and `aria-pressed` on the shapes toggle button
- `aria-label` and `title` on the export button
- All interactive elements reachable by keyboard

## Run locally

```bash
npm install
npx vite
# open http://localhost:5173
```

## Build

```bash
npx tsc --noEmit   # type check
npx vite build     # production build
```

## File structure

```
src/
  App.tsx                                   # App shell — TopPanel, ExportButton, ShapesPanel
  features/
    ui-skin/theme.css                        # Modern light theme overrides
    advanced-shapes/ShapesPanel.tsx          # 3D shapes library panel
```

Original tldraw functionality is fully preserved. All additions are clearly separated in `src/features/` or isolated components in `src/App.tsx`.

## Screenshot

![Creative Studio running with 3D shapes panel open](screenshot.png)
