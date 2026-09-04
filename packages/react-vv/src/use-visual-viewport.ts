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

  const documentBoundingRect = window.document.body.getBoundingClientRect()

  const vvBottommostPoint = window.visualViewport.offsetTop + window.visualViewport.height
  let correctionOffset = 0

  if (vvBottommostPoint < documentBoundingRect.height * 0.99) {
    correctionOffset = documentBoundingRect.height - vvBottommostPoint
  }

  return window.visualViewport.height + correctionOffset
}

function getWidthSnapshot(): number | null {
  if (typeof window === 'undefined' || !window.visualViewport) {
    return null
  }

  const documentBoundingRect = window.document.body.getBoundingClientRect()

  const vvRightmostPoint = window.visualViewport.offsetLeft + window.visualViewport.width
  let correctionOffset = 0

  if (vvRightmostPoint < documentBoundingRect.width * 0.99) {
    correctionOffset = documentBoundingRect.width - vvRightmostPoint
  }

  return window.visualViewport.width + correctionOffset
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
