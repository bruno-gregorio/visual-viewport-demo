'use client'

import { type HTMLProps, type CSSProperties } from 'react'
import { useVisualViewportHeight, useVisualViewportWidth } from './use-visual-viewport'

export type VisualViewportContainerProps = HTMLProps<HTMLDivElement> & {
  doNotTrackWidth?: boolean
  doNotTrackHeight?: boolean
}

export function VisualViewportContainer(props: VisualViewportContainerProps) {
  const {
    doNotTrackHeight = false,
    doNotTrackWidth = false,
    style = {},
    children,
    ...otherProps
  } = props
  const height = useVisualViewportHeight()
  const width = useVisualViewportWidth()

  const controlHeight = !(height === null || doNotTrackHeight)
  const controlWidth = !(width === null || doNotTrackWidth)

  const inlineStyles: CSSProperties = {
    ...style,
    height: controlHeight ? (height ? `${height}px` : '100dvh') : undefined,
    width: controlWidth ? (width ? `${width}px` : '100dvw') : undefined,
    position: 'fixed',
    bottom: '0px',
  }

  return <div style={inlineStyles} {...otherProps}>{children}</div>
}
