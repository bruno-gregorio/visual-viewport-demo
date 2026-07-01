import { useEffect } from 'react'
import {
  useVisualViewportHeight,
  useVisualViewportWidth,
} from './use-visual-viewport'

export function useVisualViewportVars() {
  const height = useVisualViewportHeight()
  const width = useVisualViewportWidth()

  useEffect(() => {
    document.body.style.setProperty(
      '--spacing-vvh',
      height ? `${height}px` : '100dvh'
    )
    document.body.style.setProperty(
      '--spacing-vvw',
      width ? `${width}px` : '100dvw'
    )

    return () => {
      document.body.style.removeProperty('--spacing-vvh')
      document.body.style.removeProperty('--spacing-vvw')
    }
  }, [height, width])
}
