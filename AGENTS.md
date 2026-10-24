# AGENTS.md

Learning monorepo: independent Node/Express/MongoDB/Next.js projects. There is no root `package.json`, workspace, shared lockfile, CI, or tests. `cd` into one project and use its own `package.json` / `node_modules`.

## Projects

| Directory | Purpose | Run |
| --- | --- | --- |
| `m-43-my-first-server` | Express 5 basics, single `index.js` | `node index.js` (port 5000) |
| `m-43-user-management-server` | Express + CORS, in-memory users | `node index.js` (port 5000) |
| `m43-user-management-client` | Next 16 App Router UI, HeroUI, code in `src/` | `npm run dev` (port 3000) |
| `m44-simple-crud-server` | Express + MongoDB native driver CRUD | `node index.js` (port 5000) |
| `m44-simple-crud-client` | Next 16 App Router UI, shadcn/ui | `npm run dev` (port 3000) |

The root `README.md` uses older module/project names that do not match these directories.

## Runtime gotchas

- All servers and both clients default to the same ports (5000 API, 3000 web). Do not run two stacks at once; use `PORT=5001 node index.js` or `npm run dev -- -p 3001`.
- Server projects have no `dev`/`start`/watch script and only a stub `test` script (`exit 1`). Run `node index.js`; there is no test suite to run.
- `m44-simple-crud-server` loads `.env` via `dotenv/config` and needs `DB_USER` and `DB_PASS` (optional `PORT`). It uses database `simpleCrudDB`, collection `users`, and crashes if the MongoDB connection fails. `PATCH /users/:id` uses `upsert: true`, so it can create a user for an unknown id.
- `m-43-user-management-server` stores users in a module-level array: all additions are lost on restart.
- Both Next clients hardcode `http://localhost:5000`; there is no API-base env var.
- `m44-simple-crud-client` statically prerenders `/users`, so `next build` calls the API at build time. Start the server first.

## Next.js 16

- This is not the Next.js from training data. Read the relevant guide in `<app>/node_modules/next/dist/docs/` before changing Next code.
- Both clients contain an auto-generated `AGENTS.md` with a `nextjs-agent-rules` block; `next dev` recreates it. Do not remove it; commit it with your work.
- `m43-user-management-client` enables `cacheComponents`, `partialPrefetching`, and `reactCompiler` in `next.config.mjs`; check the bundled docs before adding data fetching or caching.

## m44-simple-crud-client specifics

- Route files are `.jsx` under `app/`; shadcn primitives are `.tsx` under `components/ui/`.
- `npm run typecheck` and `npm run format` only cover `.ts`/`.tsx` (see `tsconfig.json` include and the format script), so they skip the `.jsx` route code. Use `npm run lint` to check routes.
- shadcn is configured as `base-nova` on `@base-ui/react`, not Radix. Compose with `render={<Button />}` instead of `asChild`. `cn` comes from the `cn` package (re-exported by `@/lib/utils`).
- Add components with `npx shadcn@latest add <name>`; they land in `components/ui/`.

## Conventions

- ESM everywhere (`"type": "module"`) with Express 5 `import` syntax.
- In `m44-simple-crud-client`, Prettier is set to no semicolons, double quotes, LF, and Tailwind class sorting against `app/globals.css`.
- Commits use conventional prefixes (`feat:`, `docs:`) on `main`.
