type SwitchOption<T extends string | number> = {
  title: string
  value: T
}

type SwitchProps<T extends string | number> = {
  options: SwitchOption<T>[]
  value: T
  onChange: (value: T) => void
}

export function Switch<T extends string | number>({ options, value, onChange }: SwitchProps<T>) {
  return (
    <div className='flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/5 p-1'>
      {options.map(option => {
        const isActive = option.value === value
        return (
          <button
            key={String(option.value)}
            type='button'
            onClick={() => onChange(option.value)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition ${
              isActive ? 'bg-indigo-500 text-white' : 'text-neutral-400 hover:text-neutral-100'
            }`}
          >
            {option.title}
          </button>
        )
      })}
    </div>
  )
}
