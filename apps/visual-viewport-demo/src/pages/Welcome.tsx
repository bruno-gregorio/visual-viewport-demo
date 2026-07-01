import { useState } from 'react'
import { VisualViewportContainer } from 'react-vv'
import { Switch } from '../components/Switch'

type DisplayType = 'dvh' | 'svh' | 'lvh' | 'vh' | '100%' | 'vvh'

const heightClass: Record<Exclude<DisplayType, 'vvh'>, string> = {
  dvh: 'h-dvh',
  svh: 'h-svh',
  lvh: 'h-lvh',
  vh: 'h-screen',
  '100%': 'h-full'
}

const surfaceClass =
  'grid overflow-hidden justify-items-center bg-neutral-950 bg-[radial-gradient(ellipse_at_top,var(--color-indigo-500),transparent_60%)]/25 text-neutral-100'

export function Welcome() {
  const [display, setDisplay] = useState<DisplayType>('dvh')

  const content = (
    <div className='grid h-full w-full max-w-3xl grid-rows-[auto_1fr_auto] gap-6 px-6 py-10'>
      <header>
        <h1 className='bg-linear-to-br from-white to-neutral-500 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl'>
          Visual Viewport
        </h1>
      </header>

      <section className='grid place-items-center'>
        <Switch<DisplayType>
          value={display}
          onChange={setDisplay}
          options={[
            { value: 'dvh', title: 'height: 100dvh' },
            { value: 'svh', title: 'height: 100svh' },
            { value: 'lvh', title: 'height: 100lvh' },
            { value: 'vh', title: 'height: 100vh' },
            { value: '100%', title: 'height: 100%' },
            { value: 'vvh', title: 'Visual viewport height' }
          ]}
        />
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
