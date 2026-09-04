'use client'

import type { CSSProperties, HTMLProps } from 'react'
import {
  useVisualViewportHeight,
  useVisualViewportOffsetTop,
  useVisualViewportWidth
} from './use-visual-viewport'

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
  const offsetTop = useVisualViewportOffsetTop()

  const controlHeight = !(height === null || doNotTrackHeight)
  const controlWidth = !(width === null || doNotTrackWidth)

  const inlineStyles: CSSProperties = {
    transition: 'width 200ms ease-out, height 200ms ease-out',
    ...style,
    height: controlHeight ? (height ? `${height}px` : '100dvh') : undefined,
    width: controlWidth ? (width ? `${width}px` : '100dvw') : undefined,
    position: 'fixed',
    top: controlHeight ? `${offsetTop ?? 0}px` : '0px'
  }

  return (
    <div style={inlineStyles} {...otherProps}>
      {children}
    </div>
  )
}
