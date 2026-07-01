# Visual Viewport

A small monorepo built around the browser's [Visual Viewport API][vv-api]:

- **[`react-vv`](packages/react-vv)** — tiny, dependency-free React hooks that
  track the visual viewport and expose it as CSS variables. _(publishable library)_
- **[`visual-viewport-demo`](apps/visual-viewport-demo)** — a demo page comparing
  how different full-height CSS units behave when a mobile keyboard opens.

**Live demo:** https://bruno-gregorio.github.io/visual-viewport-demo/

[vv-api]: https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API

## Layout

```
.
├── packages/
│   └── react-vv/               the React hooks library (published to npm)
├── apps/
│   └── visual-viewport-demo/   the demo site (deployed to GitHub Pages)
├── scripts/
│   └── deploy-gh-pages.sh       build the demo + publish to the gh-pages branch
├── biome.json                   shared lint/format config
└── package.json                 workspace root + orchestration scripts
```

The demo consumes `react-vv` as a workspace dependency (`workspace:*`). In dev and
in the demo build it resolves straight to the library's source (via a Vite alias +
tsconfig path), so there's no need to build the library first to work on the demo.

## Getting started

Requires [Bun](https://bun.sh).

```sh
bun install        # install every workspace
bun run dev        # start the demo dev server
```

To test on a real device, expose the dev server through a tunnel (e.g.
`cloudflared tunnel --url http://localhost:5173`) and open the URL on your phone —
`*.trycloudflare.com` is already whitelisted in the demo's `vite.config.ts`.

## Scripts (run from the repo root)

| Script              | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `bun run dev`       | Start the demo dev server.                              |
| `bun run build`     | Build the library, then the demo.                       |
| `bun run build:lib` | Build only `react-vv` (emits JS + types to `dist/`).    |
| `bun run build:demo`| Build only the demo site.                               |
| `bun run preview`   | Preview the built demo.                                 |
| `bun run lint`      | Lint the whole workspace with Biome.                    |
| `bun run format`    | Format the whole workspace with Biome.                  |
| `bun run deploy`    | Build the demo and publish it to GitHub Pages.          |

## Deploying the demo

`bun run deploy` runs [`scripts/deploy-gh-pages.sh`](scripts/deploy-gh-pages.sh),
which builds the demo and pushes the output to the **`gh-pages`** branch (branch
strategy). Point GitHub Pages at that branch (root) once, in the repo settings.

## Publishing the library

`react-vv` builds with `tsc` to `packages/react-vv/dist` (ESM + `.d.ts`). When
you're ready:

```sh
bun run build:lib
cd packages/react-vv && npm publish
```

## Tech

React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7, Bun workspaces, Biome.

## License

[MIT](LICENSE)
