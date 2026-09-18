/**
 * Tests for the ShapesPanel component (Creative Studio addition).
 * These verify the panel renders correctly and shape cards are accessible.
 * tldraw's editor is mocked so tests run without a real canvas.
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

// ── Mock tldraw so tests run without a real canvas ──────────────────────────
vi.mock('tldraw', () => ({
  useEditor: () => ({
    createShape: vi.fn(),
    getViewportPageCenter: () => ({ x: 0, y: 0 }),
    selectAll: vi.fn(),
    zoomToSelection: vi.fn(),
    selectNone: vi.fn(),
  }),
}))

import { ShapesPanel } from '../features/advanced-shapes/ShapesPanel'

describe('ShapesPanel', () => {
  it('renders the panel with correct accessible label', () => {
    const onClose = vi.fn()
    render(<ShapesPanel onClose={onClose} />)
    expect(screen.getByRole('dialog', { name: /3D Shapes Library/i })).toBeInTheDocument()
  })

  it('renders the close button', () => {
    const onClose = vi.fn()
    render(<ShapesPanel onClose={onClose} />)
    expect(screen.getByRole('button', { name: /close shapes panel/i })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(<ShapesPanel onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close shapes panel/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('renders 3D Objects section', () => {
    render(<ShapesPanel onClose={vi.fn()} />)
    expect(screen.getByText('3D Objects')).toBeInTheDocument()
  })

  it('renders Decorative section', () => {
    render(<ShapesPanel onClose={vi.fn()} />)
    expect(screen.getByText('Decorative')).toBeInTheDocument()
  })

  it('renders 3D Cube shape card with accessible label', () => {
    render(<ShapesPanel onClose={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Add 3D Cube to canvas/i })).toBeInTheDocument()
  })

  it('renders Star shape card', () => {
    render(<ShapesPanel onClose={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Add Star to canvas/i })).toBeInTheDocument()
  })

  it('renders Speech Bubble shape card', () => {
    render(<ShapesPanel onClose={vi.fn()} />)
    expect(screen.getByRole('button', { name: /Add Speech Bubble to canvas/i })).toBeInTheDocument()
  })

  it('clicking a shape card does not close the panel', () => {
    const onClose = vi.fn()
    render(<ShapesPanel onClose={onClose} />)
    const cubeButton = screen.getByRole('button', { name: /Add 3D Cube to canvas/i })
    fireEvent.click(cubeButton)
    // Panel stays open after placing a shape — onClose is NOT called
    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders exactly 12 shape cards', () => {
    render(<ShapesPanel onClose={vi.fn()} />)
    // Each shape card has aria-label starting with "Add"
    const cards = screen.getAllByRole('button', { name: /^Add .+ to canvas$/i })
    expect(cards).toHaveLength(12)
  })
})
