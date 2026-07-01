'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback: () => void) {
  if (typeof window === 'undefined' || !window.visualViewport) {
    return () => {}
  }

  const viewport = window.visualViewport

  viewport.addEventListener('resize', callback)
  viewport.addEventListener('scroll', callback)
  window.addEventListener('touchend', callback)

  return () => {
    viewport.removeEventListener('resize', callback)
    viewport.removeEventListener('scroll', callback)
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

function getOffsetTopSnapshot(): number | null {
  if (typeof window === 'undefined' || !window.visualViewport) {
    return null
  }

  return window.visualViewport.offsetTop
}

function getOffsetLeftSnapshot(): number | null {
  if (typeof window === 'undefined' || !window.visualViewport) {
    return null
  }

  return window.visualViewport.offsetLeft
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

export function useVisualViewportOffsetTop() {
  return useSyncExternalStore(subscribe, getOffsetTopSnapshot, getServerSnapshot)
}

export function useVisualViewportOffsetLeft() {
  return useSyncExternalStore(subscribe, getOffsetLeftSnapshot, getServerSnapshot)
}
