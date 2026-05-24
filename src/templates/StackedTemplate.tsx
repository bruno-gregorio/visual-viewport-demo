import type { ReactNode } from 'react'

type StackedTemplateProps = {
  title: ReactNode
  body: ReactNode
  footer: ReactNode
}

export function StackedTemplate({ title, body, footer }: StackedTemplateProps) {
  return (
    <main className='min-h-dvh bg-neutral-950 bg-[radial-gradient(ellipse_at_top,var(--color-indigo-500),transparent_60%)]/25 text-neutral-100'>
      <div className='mx-auto grid min-h-dvh max-w-3xl grid-rows-3 px-6 py-10'>
        <header className='self-start'>{title}</header>
        <section className='self-center'>{body}</section>
        <footer className='self-end'>{footer}</footer>
      </div>
    </main>
  )
}
