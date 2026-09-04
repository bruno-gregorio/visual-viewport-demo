import { useLayoutEffect, useState } from 'react'
import { useVisualViewportHeight } from 'react-vv'
import { type DisplayType, UNITS } from '../units'

/** Every CSS length the readout resolves by measuring a hidden probe element. */
const PROBED_LENGTHS = UNITS.map(unit => unit.css).filter(css => css !== null)

type ResolvedLengths = Record<string, number | null>

/**
 * Lays out one off-screen probe per CSS length and reports the height each one
 * resolves to, keeping the values in sync as the viewport changes.
 *
 * The probes live in a `position: fixed` box so they stay out of the document
 * flow, and so `100%` resolves against the layout viewport instead of an
 * ancestor that happens to have no height.
 *
 * Measuring in a layout effect keeps the first paint of a mount correct: the
 * page swaps between a `<main>` and a `<VisualViewportContainer>`, which
 * remounts this subtree, and a passive effect would flash empty values.
 */
function useResolvedLengths(lengths: readonly string[]): ResolvedLengths {
  const [resolved, setResolved] = useState<ResolvedLengths>({})

  useLayoutEffect(() => {
    const container = document.createElement('div')
    container.setAttribute('aria-hidden', 'true')
    container.style.cssText =
      'position:fixed;top:0;left:0;width:1px;height:100%;overflow:hidden;visibility:hidden;pointer-events:none'

    const probes = lengths.map(length => {
      const probe = document.createElement('div')
      probe.style.height = length
      container.append(probe)
      // An unsupported length is dropped by the CSSOM, leaving the property empty.
      return { length, probe, supported: probe.style.height !== '' }
    })

    document.body.append(container)

    const read = () => {
      const next: ResolvedLengths = {}
      for (const { length, probe, supported } of probes) {
        next[length] = supported ? probe.getBoundingClientRect().height : null
      }
      setResolved(prev => (lengths.every(length => prev[length] === next[length]) ? prev : next))
    }

    read()

    const observer = new ResizeObserver(read)
    for (const { probe } of probes) {
      observer.observe(probe)
    }

    return () => {
      observer.disconnect()
      container.remove()
    }
  }, [lengths])

  return resolved
}

function formatPx(height: number | null) {
  if (height === null) {
    return 'n/a'
  }

  return `${Math.round(height * 10) / 10}px`
}

type UnitMeasurementsProps = {
  /** The unit the page is currently laid out with, highlighted in the list. */
  active: DisplayType
}

export function UnitMeasurements({ active }: UnitMeasurementsProps) {
  const resolved = useResolvedLengths(PROBED_LENGTHS)
  const visualViewportHeight = useVisualViewportHeight()

  const rows = UNITS.map(unit => ({
    unit,
    height: unit.css === null ? visualViewportHeight : (resolved[unit.css] ?? null)
  }))

  const largest = Math.max(...rows.map(row => row.height ?? 0), 1)

  return (
    <div className='w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-3'>
      <h2 className='px-1 pb-2 text-xs font-medium tracking-wider text-neutral-400 uppercase'>
        Resolved height
      </h2>

      <ul className='grid gap-1'>
        {rows.map(({ unit, height }) => {
          const isActive = unit.value === active
          return (
            <li key={unit.value} className='relative isolate overflow-hidden rounded-lg'>
              <div
                aria-hidden='true'
                className={`absolute inset-y-0 left-0 -z-10 transition-[width] duration-200 ease-out ${
                  isActive ? 'bg-indigo-500/40' : 'bg-white/5'
                }`}
                style={{ width: `${((height ?? 0) / largest) * 100}%` }}
              />
              <div className='flex items-center justify-between gap-3 px-2 py-1.5 font-mono text-xs'>
                <span className={isActive ? 'text-white' : 'text-neutral-400'}>{unit.label}</span>
                <span className={`tabular-nums ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                  {formatPx(height)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <p className='px-1 pt-2 text-[11px] leading-snug text-neutral-500'>
        100% is probed against the layout viewport — the on-screen keyboard never shrinks it.
      </p>
    </div>
  )
}
