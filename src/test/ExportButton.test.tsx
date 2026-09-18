/**
 * Tests for ExportButton — Creative Studio
 * Verifies rendering, accessibility, empty-canvas guard, and export trigger.
 */
// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

vi.mock('tldraw', async () => ({
  useEditor: vi.fn(),
  exportToBlob: vi.fn(),
}))

import { ExportButton } from '../features/export/ExportButton'
import { useEditor, exportToBlob } from 'tldraw'

const mockExportToBlob = vi.mocked(exportToBlob)
const mockUseEditor = vi.mocked(useEditor)

// Mock browser APIs
global.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
global.URL.revokeObjectURL = vi.fn()
global.alert = vi.fn()

function makeEditor(shapeIds: string[] = ['shape-1', 'shape-2']) {
  return { getCurrentPageShapeIds: () => new Set(shapeIds) }
}

describe('ExportButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseEditor.mockReturnValue(makeEditor() as any)
  })

  it('renders with correct accessible label', () => {
    render(<ExportButton />)
    expect(screen.getByRole('button', { name: /export canvas as png/i })).toBeInTheDocument()
  })

  it('renders with title tooltip for sighted users', () => {
    render(<ExportButton />)
    expect(screen.getByTitle(/download all shapes as a png image/i)).toBeInTheDocument()
  })

  it('shows alert and does NOT call exportToBlob when canvas is empty', async () => {
    mockUseEditor.mockReturnValue(makeEditor([]) as any)
    render(<ExportButton />)
    fireEvent.click(screen.getByRole('button', { name: /export canvas as png/i }))
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        'Nothing to export — add some shapes to the canvas first.'
      )
    })
    expect(mockExportToBlob).not.toHaveBeenCalled()
  })

  it('calls exportToBlob with png format and background:true', async () => {
    mockExportToBlob.mockResolvedValue(new Blob(['data'], { type: 'image/png' }))
    render(<ExportButton />)
    fireEvent.click(screen.getByRole('button', { name: /export canvas as png/i }))
    await waitFor(() => {
      expect(mockExportToBlob).toHaveBeenCalledWith(
        expect.objectContaining({
          format: 'png',
          opts: { background: true },
        })
      )
    })
  })

  it('passes all current shape IDs to exportToBlob', async () => {
    mockUseEditor.mockReturnValue(makeEditor(['id-a', 'id-b', 'id-c']) as any)
    mockExportToBlob.mockResolvedValue(new Blob(['data'], { type: 'image/png' }))
    render(<ExportButton />)
    fireEvent.click(screen.getByRole('button', { name: /export canvas as png/i }))
    await waitFor(() => {
      const call = mockExportToBlob.mock.calls[0][0]
      expect(call.ids).toContain('id-a')
      expect(call.ids).toContain('id-b')
      expect(call.ids).toContain('id-c')
    })
  })

  it('creates an object URL from the exported blob', async () => {
    const blob = new Blob(['data'], { type: 'image/png' })
    mockExportToBlob.mockResolvedValue(blob)
    render(<ExportButton />)
    fireEvent.click(screen.getByRole('button', { name: /export canvas as png/i }))
    await waitFor(() => {
      expect(URL.createObjectURL).toHaveBeenCalledWith(blob)
    })
  })

  it('revokes object URL after download to prevent memory leaks', async () => {
    mockExportToBlob.mockResolvedValue(new Blob(['data'], { type: 'image/png' }))
    render(<ExportButton />)
    fireEvent.click(screen.getByRole('button', { name: /export canvas as png/i }))
    await waitFor(() => {
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url')
    })
  })

  it('shows error alert when exportToBlob rejects', async () => {
    mockExportToBlob.mockRejectedValue(new Error('network error'))
    render(<ExportButton />)
    fireEvent.click(screen.getByRole('button', { name: /export canvas as png/i }))
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith(
        'Export failed — see console for details.'
      )
    })
  })
})
