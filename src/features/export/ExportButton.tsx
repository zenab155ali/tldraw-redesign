/**
 * ExportButton — Creative Studio
 *
 * Renders a button that exports all shapes on the current tldraw page as a
 * PNG file and triggers a browser download.
 *
 * IMPORTANT: This component must be rendered as a child of <Tldraw> so that
 * useEditor() can resolve the editor React context correctly.
 *
 * Handles two error cases explicitly:
 *  1. Empty canvas — alerts the user rather than exporting a blank image.
 *  2. exportToBlob runtime failure — logs to console and shows an alert.
 */
import { useEditor, exportToBlob } from 'tldraw'

interface ExportButtonProps {
  /** Optional filename without extension. Defaults to "tldraw-export". */
  filename?: string
}

export function ExportButton({ filename = 'tldraw-export' }: ExportButtonProps) {
  const editor = useEditor()

  async function handleExport() {
    const shapeIds = [...editor.getCurrentPageShapeIds()]

    if (shapeIds.length === 0) {
      alert('Nothing to export — add some shapes to the canvas first.')
      return
    }

    try {
      const blob = await exportToBlob({
        editor,
        ids: shapeIds,
        format: 'png',
        opts: { background: true },
      })

      // Trigger browser download
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `${filename}.png`
      anchor.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('[ExportButton] exportToBlob failed:', err)
      alert('Export failed — see console for details.')
    }
  }

  return (
    <button
      onClick={handleExport}
      aria-label="Export canvas as PNG"
      title="Download all shapes as a PNG image"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '7px 14px',
        borderRadius: '8px',
        border: 'none',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: 'white',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(99,102,241,0.35)',
        transition: 'all 0.15s ease',
      }}
    >
      Export PNG
    </button>
  )
}
