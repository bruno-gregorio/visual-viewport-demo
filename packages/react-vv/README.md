# react-vv

Tiny, dependency-free React hooks around the [Visual Viewport API][vv-api]. Track the visual viewport's size (the area actually visible, excluding the on-screen keyboard and browser UI) and, optionally, mirror it into CSS variables.

Built on `useSyncExternalStore`, so it's concurrent-safe and SSR-safe (returns `null` on the server).

[vv-api]: https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API

## Install

```sh
npm install react-vv
# or
bun add react-vv
```

`react` (>= 18) is a peer dependency.

## Usage

### Read the viewport size

```tsx
import {
  useVisualViewportHeight,
  useVisualViewportWidth
} from 'react-vv'

function Example() {
  const height = useVisualViewportHeight() // number | null
  const width = useVisualViewportWidth() // number | null

  // `null` before hydration / when the API is unavailable
  return <div style={{ height: height ?? '100dvh' }} />
}
```

### Expose the viewport as CSS variables

`useVisualViewportVars` writes the live viewport size to `--spacing-vvh` and
`--spacing-vvw` on `document.body` (falling back to `100dvh` / `100dvw`), so you
can drive layout straight from CSS:

```tsx
import { useVisualViewportVars } from 'react-vv'

function App() {
  useVisualViewportVars()
  return <main style={{ height: 'var(--spacing-vvh)' }}>…</main>
}
```

With Tailwind CSS v4 the `--spacing-*` tokens become utilities automatically
(e.g. `h-vvh`). See the [demo app](../../apps/visual-viewport-demo) for a full example.

## API

| Export                     | Returns          | Description                                             |
| -------------------------- | ---------------- | ------------------------------------------------------ |
| `useVisualViewportHeight()`| `number \| null` | Current `visualViewport.height` in px.                 |
| `useVisualViewportWidth()` | `number \| null` | Current `visualViewport.width` in px.                  |
| `useVisualViewportVars()`  | `void`           | Syncs size to `--spacing-vvh` / `--spacing-vvw`.       |

## License

[MIT](../../LICENSE)
