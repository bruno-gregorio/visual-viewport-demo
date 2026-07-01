'use client'

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

function getHeightSnapshot(): number | null {
  if (typeof window === 'undefined' || !window.visualViewport) {
    return null
  }

  return window.visualViewport.height
}

function getWidthSnapshot(): number | null {
  if (typeof window === 'undefined' || !window.visualViewport) {
    return null
  }

  return window.visualViewport.width
}

function getServerSnapshot(): null {
  return null
}

export function useVisualViewportHeight() {
  return useSyncExternalStore(subscribe, getHeightSnapshot, getServerSnapshot)
}

export function useVisualViewportWidth() {
  return useSyncExternalStore(subscribe, getWidthSnapshot, getServerSnapshot)
}
