export type DisplayType = 'dvh' | 'svh' | 'lvh' | 'vh' | '100%' | 'vvh'

export type Unit = {
  value: DisplayType
  /** Label used by the switch. */
  title: string
  /** Short label used by the readout. */
  label: string
  /**
   * CSS length probed to resolve the unit, or `null` when the value comes from
   * the Visual Viewport API instead of a CSS length.
   */
  css: string | null
}

export const UNITS: readonly Unit[] = [
  { value: 'dvh', title: 'height: 100dvh', label: '100dvh', css: '100dvh' },
  { value: 'svh', title: 'height: 100svh', label: '100svh', css: '100svh' },
  { value: 'lvh', title: 'height: 100lvh', label: '100lvh', css: '100lvh' },
  { value: 'vh', title: 'height: 100vh', label: '100vh', css: '100vh' },
  { value: '100%', title: 'height: 100%', label: '100%', css: '100%' },
  { value: 'vvh', title: 'Visual viewport height', label: 'visualViewport.height', css: null }
]
