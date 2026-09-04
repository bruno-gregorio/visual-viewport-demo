import { useState } from 'react'
import { VisualViewportContainer } from 'react-vv'
import { Switch } from '../components/Switch'
import { UnitMeasurements } from '../components/UnitMeasurements'
import { type DisplayType, UNITS } from '../units'

const heightClass: Record<Exclude<DisplayType, 'vvh'>, string> = {
  dvh: 'h-dvh',
  svh: 'h-svh',
  lvh: 'h-lvh',
  vh: 'h-screen',
  '100%': 'h-full'
}

const switchOptions = UNITS.map(({ value, title }) => ({ value, title }))

const surfaceClass =
  'grid grid-rows-[minmax(0,1fr)] overflow-hidden justify-items-center bg-neutral-950 bg-[radial-gradient(ellipse_at_top,var(--color-indigo-500),transparent_60%)]/25 text-neutral-100'

export function Welcome() {
  const [display, setDisplay] = useState<DisplayType>('dvh')

  const content = (
    <div className='grid h-full w-full max-w-3xl grid-rows-[auto_minmax(0,1fr)_auto] gap-6 px-6 py-10'>
      <header>
        <h1 className='bg-linear-to-br from-white to-neutral-500 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl'>
          Visual Viewport
        </h1>
      </header>

      <section className='flex flex-col overflow-y-auto'>
        <div className='m-auto grid w-full justify-items-center gap-4'>
          <UnitMeasurements active={display} />
          <Switch<DisplayType> value={display} onChange={setDisplay} options={switchOptions} />
        </div>
      </section>

      <footer>
        <form onSubmit={e => e.preventDefault()}>
          <input
            type='text'
            placeholder='Focus to display keyboard'
            className='w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 placeholder:text-neutral-500 focus:border-indigo-400 focus:outline-none'
          />
        </form>
      </footer>
    </div>
  )

  if (display === 'vvh') {
    return (
      <VisualViewportContainer className={`inset-x-0 ${surfaceClass}`}>
        {content}
      </VisualViewportContainer>
    )
  }

  return <main className={`${heightClass[display]} ${surfaceClass}`}>{content}</main>
}
