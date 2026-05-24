import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  if (typeof window === 'undefined' || !window.visualViewport) {
    return () => {}
  }

  const viewport = window.visualViewport

  viewport.addEventListener('resize', callback)
  window.addEventListener('touchend', callback)

  return () => {
    viewport.removeEventListener('resize', callback)
    window.removeEventListener('touchend', callback)
  }
}

function getSnapshot(): VisualViewport | null {
  if (typeof window === 'undefined') {
    return null
  }

  return window.visualViewport ? { ...window.visualViewport } : null
}

function getServerSnapshot(): VisualViewport | null {
  return null
}

export function useVisualViewport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
