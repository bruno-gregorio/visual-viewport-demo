import { useState } from 'react'
import { Switch } from '../components/Switch'
import { useVisualViewportVars } from '../hooks/use-visual-viewport-vars'

type DisplayType = 'dvh' | 'svh' | 'lvh' | 'vh' | '100%' | 'vvh'

export function Welcome() {
  useVisualViewportVars()
  const [display, setDisplay] = useState<DisplayType>('dvh')

  let displayClass = 'h-dvh'

  switch (display) {
    case '100%':
      displayClass = 'h-full'
      break
    case 'svh':
      displayClass = 'h-svh'
      break
    case 'vh':
      displayClass = 'h-screen'
      break
    case 'lvh':
      displayClass = 'h-lvh'
      break
    case 'vvh':
      displayClass = 'h-vvh'
      break
    default:
      displayClass = 'h-dvh'
      break
  }

  const containerClasses =
    displayClass +
    ' bg-neutral-950 bg-[radial-gradient(ellipse_at_top,var(--color-indigo-500),transparent_60%)]/25 text-neutral-100'

  return (
    <main className={containerClasses}>
      <div className='mx-auto grid min-h-dvh max-w-3xl grid-rows-3 px-6 py-10'>
        <header className='self-start'>
          <h1 className='bg-linear-to-br from-white to-neutral-500 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl'>
            Visual Viewport
          </h1>
        </header>

        <section className='self-center'>
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

        <footer className='self-end'>
          <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
            <input
              type='text'
              placeholder='Say something…'
              className='flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 placeholder:text-neutral-500 focus:border-indigo-400 focus:outline-none'
            />
            <button
              type='submit'
              className='rounded-xl bg-indigo-500 px-4 py-3 font-medium hover:bg-indigo-400'
            >
              Send
            </button>
          </form>
        </footer>
      </div>
    </main>
  )
}
