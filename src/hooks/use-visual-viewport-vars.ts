import { useEffect, useCallback } from 'react'
import { useVisualViewport } from './use-visual-viewport'

export function useVisualViewportVars() {
  const viewport = useVisualViewport()
  const update = useCallback(() => {
    document.body.style.setProperty(
      '--spacing-vvh',
      viewport?.height ? `${viewport.height}px` : '100dvh'
    )
    document.body.style.setProperty(
      '--spacing-vvw',
      viewport?.width ? `${viewport.width}px` : '100dvw'
    )
  }, [viewport?.height, viewport?.width])

  // biome-ignore lint/correctness/useExhaustiveDependencies: only using those values
  useEffect(() => {
    if (!viewport) {
      return
    }

    update()

    return () => {
      document.body.style.removeProperty('--spacing-vvh')
      document.body.style.removeProperty('--spacing-vvw')
    }
  }, [viewport?.height, viewport?.width])
}
