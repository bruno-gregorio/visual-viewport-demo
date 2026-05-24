import { StackedTemplate } from '../templates/StackedTemplate'

export function Welcome() {
  return (
    <StackedTemplate
      title={
        <h1 className='bg-linear-to-br from-white to-neutral-500 bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl'>
          Visual Viewport
        </h1>
      }
      body={
        <p className='max-w-xl text-lg text-neutral-300'>
          A playground for exploring how the on-screen keyboard reshapes the
          viewport. Type something below and watch the page breathe.
        </p>
      }
      footer={
        <form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
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
      }
    />
  )
}
