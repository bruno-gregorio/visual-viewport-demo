import { useEffect } from 'react'
import { useVisualViewport } from './use-visual-viewport'

export function useVisualViewportVars() {
  const viewport = useVisualViewport()

  useEffect(() => {
    if (!viewport) {
      return
    }

    const update = () => {
      document.body.style.setProperty('--spacing-vvh', `${viewport.height}px`)
      document.body.style.setProperty('--spacing-vvw', `${viewport.width}px`)
    }

    update()

    viewport.addEventListener('resize', update)
    window.addEventListener('touchend', update)

    return () => {
      viewport.removeEventListener('resize', update)
      window.removeEventListener('touchend', update)

      document.body.style.removeProperty('--spacing-vvh')
      document.body.style.removeProperty('--spacing-vvw')
    }
  }, [viewport])
}
