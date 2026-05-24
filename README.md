# Visual Viewport Demo

A small playground that shows how different ways of sizing a full-height layout react when a mobile browser's on-screen keyboard opens.

**Live demo:** https://bruno-gregorio.github.io/visual-viewport-demo/

Open it on a phone, tap the input at the bottom, and toggle between the height modes. You'll see the layout collapse, get pushed off-screen, stay anchored, or follow the keyboard depending on which unit is in use.

## What it compares

The same layout (header, centered controls, focused input at the bottom) is rendered with six different outer heights:

| Mode  | CSS                            | Behavior when the keyboard opens                                              |
| ----- | ------------------------------ | ----------------------------------------------------------------------------- |
| `dvh` | `height: 100dvh`               | Tracks the *dynamic* viewport — shrinks to fit alongside the keyboard.        |
| `svh` | `height: 100svh`               | Locked to the *small* viewport — UI bars are always considered visible.       |
| `lvh` | `height: 100lvh`               | Locked to the *large* viewport — the bottom is pushed under the keyboard.     |
| `vh`  | `height: 100vh`                | Legacy unit — behaves like `lvh` on most modern browsers.                     |
| `100%`| `height: 100%`                 | Inherits from `<html>`/`<body>` — typically equivalent to `lvh`.              |
| `vvh` | `height: var(--spacing-vvh)`   | Driven by the [Visual Viewport API][vv-api] — follows the keyboard precisely. |

The `vvh` mode reads `window.visualViewport.height` via `useSyncExternalStore` and writes it to a CSS variable, which Tailwind then exposes as the `h-vvh` utility.

[vv-api]: https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API

## Project structure

```
src/
  components/Switch.tsx           segmented control for picking a mode
  hooks/use-visual-viewport.ts    useSyncExternalStore wrappers around window.visualViewport
  hooks/use-visual-viewport-vars.ts   syncs viewport size to --spacing-vvh / --spacing-vvw
  pages/Welcome.tsx               the demo page
  main.tsx                        router setup
  index.css                       Tailwind entry + theme tokens
```

## Running locally

```sh
bun install
bun run dev
```

To test on a real device, expose the dev server through a tunnel (e.g. `cloudflared tunnel --url http://localhost:5173`) and open the URL on your phone — `*.trycloudflare.com` is already whitelisted in `vite.config.ts`.

## Tech

React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7.

## License

[MIT](LICENSE)

