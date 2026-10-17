# Code Coven · v0.3.0

**A Little Magic. A Lot of Code.** A completely free, cozy magical coding academy. Free to learn. Free to grow. Free forever.

The public academy, searchable course catalog, seven open departments, student demo dashboard, Daylight/Midnight themes, and Hexi concept illustrations work as a static React application. Mission 003 prepares it for Cloudflare Pages while preserving its design. Mission 008 classroom changes remain local and unpublished. The GitHub repository is [spookytechgirl/code-coven](https://github.com/spookytechgirl/code-coven).

## Living academy blueprint

The [Academy Vision](docs/ACADEMY_VISION.md) explains Crystal's founding direction and the academy's free, inclusive educational purpose. The blueprint separates verified implementation from Planned and Proposed work:

- [Design System](docs/DESIGN_SYSTEM.md): visual identity, Hexi, themes, reusable UI, and accessibility boundaries.
- [Learning Architecture](docs/LEARNING_ARCHITECTURE.md): current curriculum scaffolding and planned Kids, Adults, and AI learning experiences.
- [Feature Registry](docs/FEATURE_REGISTRY.md): feature purposes, audiences, locations, dependencies, statuses, benefits, and accessibility/security considerations.
- [Decision Log](docs/DECISION_LOG.md): recorded decisions, tradeoffs, evidence, and explicitly undocumented history.
- [Reference Guide](docs/REFERENCE_GUIDE.md): how independent projects can study the architecture without assuming branding rights or private access.

Developers and AI coding agents should follow [AGENTS.md](AGENTS.md) and maintain the affected documents alongside relevant changes. [ARTWORK.md](ARTWORK.md) and [DEPLOYMENT.md](DEPLOYMENT.md) remain the detailed asset and hosting guides. Mission 008 implements one print() pilot with Kids/Adults teaching and a downloadable AI specification. Broader curricula, Python execution, agent APIs, and capability-based progression remain Planned.

## Stack and structure

- React / React DOM 19.3.0, React Router 7.18.4, Lucide React 1.55.0.
- Vite 8.3.4 with the React plugin; default root URL base `/`, output `dist`, no server functions.
- TypeScript 7.0.2 with strict checking, ES2022 target, bundler resolution, no source emission.
- Tailwind CSS 4.3.3 integrated through `@tailwindcss/vite` and the stylesheet import. Custom Daylight/Midnight tokens and responsive styles live in `src/styles/`; no separate Tailwind config is required.
- Node 24.19.0 (`.nvmrc`), pnpm 11.25.0 (`packageManager`), exact dependencies in `pnpm-lock.yaml`.
- `src/pages`, `src/layouts`, `src/components`: page content, public/student shells, reusable UI and artwork.
- `src/data`, `src/types`: Department → LearningPath → Course → CourseModule → Lesson → Challenge; sample progress is separate from curriculum metadata.
- `src/assets`: local Hexi and study concepts, bundled by Vite. Other concepts are reusable inline SVGs. System fonts and local Lucide icons require no external font or image services.
- `public`: favicon and Cloudflare response headers, copied into the build output.

React Router uses `BrowserRouter` with routes for `/`, `/dashboard`, `/courses`, `/courses/:courseId`, `/academy`, `/academy/:departmentId`, public informational pages, and student sidebar pages. Both public and student areas retain not-found screens.

## Install and run locally

Install Node 24.19.0 (for example, `nvm install` then `nvm use`) and pnpm 11.25.0. If your Node installation includes Corepack, `corepack enable` and `corepack prepare pnpm@11.25.0 --activate` select the package manager. Otherwise install that pnpm version using its official installer/package-manager instructions.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:5173. Stop with Ctrl+C. Vite may select another port if that one is already in use.

If Node and pnpm are not on your terminal's PATH, configure your Node installation or version manager before running these commands. The project does not require a computer-specific runtime path.

## Checks and production preview

```sh
pnpm typecheck
pnpm check:format
pnpm build
pnpm test:build
pnpm preview --port 4173 --strictPort
```

Open http://127.0.0.1:4173 and try entering or refreshing `/dashboard`, `/courses`, `/academy`, and nested course/department routes directly. `npm run build` invokes the same build script and is the recommended Cloudflare command; dependency installation remains pnpm-based. Do not run `npm install` or create a second lockfile.

There is no ESLint configuration or lint script. `check:format` is a formatting check, not a semantic lint substitute. TypeScript checks types; `test:build` uses Node's built-in test runner to verify distribution contents, metadata, local entry assets, security-header declarations, and SPA-fallback prerequisites.

The optional browser smoke test requires Playwright plus an installed Chrome, not application dependencies:

```sh
BASE_URL=http://127.0.0.1:4173 CHECK_PAGES_HEADERS=1 PLAYWRIGHT_CHANNEL=chrome node scripts/verify-browser.cjs
```

If Playwright is installed outside the project, set `PLAYWRIGHT_MODULE` to its module directory. For example, with a separately installed local tools directory:

```sh
BASE_URL=http://127.0.0.1:4173 CHECK_PAGES_HEADERS=1 PLAYWRIGHT_CHANNEL=chrome PLAYWRIGHT_MODULE="$PWD/.tools/node_modules/playwright" node scripts/verify-browser.cjs
```

The optional `.tools/` directory is ignored by Git. Supply your own Playwright installation there or use the standard module resolution shown above.

The browser test exercises both themes, route loading and refreshes, filters, tips, mobile menus, keyboard navigation, reduced motion, asset requests, and overflow checks. Vite preview does **not** apply Cloudflare `_headers`; the test reproduces the single global header rule on local responses to exercise the production CSP. This is local simulation, not verification of a deployed Cloudflare edge. Screenshots are saved to ignored `artifacts/`.

## Cloudflare Pages readiness

See [DEPLOYMENT.md](DEPLOYMENT.md) for exact build settings, routing behavior, and step-by-step GitHub connection instructions. Do not click **Save and Deploy** until deployment is explicitly authorized. The repository may already be connected to automatic Pages deployments; a future push can trigger one. This local mission does not push or deploy.

No Wrangler config, Worker, Functions directory, redirects file, database, authentication, or private runtime configuration is needed. Native Pages SPA fallback is intentional: the build must have `index.html` and **no top-level `404.html`**. Existing static assets are served normally before fallback routing.

## Environment and security

The app requires **no environment variables or credentials**; `.env.example` is unnecessary. `.env` and local variants, `.dev.vars`, private key files, dependencies, build output, temporary tools, and generated artifacts are ignored. Do not put secrets in frontend code or variables prefixed `VITE_`: Vite embeds those values into public browser JavaScript. Build-only `NODE_VERSION` and `PNPM_VERSION` are nonsecret runtime selectors.

The theme and separate human lesson-completion IDs may persist in browser `localStorage`, with a fallback if storage is unavailable. No submitted code, answers, names, or ages are saved or transmitted. There are no analytics, external scripts, API integrations, real student records, or network-backed features. `public/_headers` restricts scripts and assets to local origins, blocks framing and object embeds, and disables camera, microphone, and geolocation permissions. The CSP applies on Pages production responses, not the Vite development server.

A current source/configuration scan found no credential-like tokens or private keys; that is a scoped code review, not a guarantee about future files or Git history. The initial pre-commit review found no existing project history or advertised remote references. Review the exact files you upload to GitHub; exclude synced `sources/`, credentials, and build artifacts.

## Demo and artwork limitations

Catalog lesson totals describe planned content. Python Potions now contains one complete output pilot with two Kids adaptations, an Adults lesson, and a machine-readable AI lesson. Other courses remain previews. Restricted practice checks source text only; no Python runs. Human activity completion saves only in this browser and never updates the dashboard’s demo XP/progress. Notes, earned quests, achievements, login, community, and Ask Hexi remain placeholders. The local coding tips rotate on request without a background timer.

Mission 015 preserves all existing academy/course illustrations and Hexi while removing visitor-facing temporary artwork labels. No image was replaced, recolored, cropped, or regenerated. [ARTWORK.md](ARTWORK.md) records the label inventory and asset guidance; [Mission 015 review](docs/MISSION_015_REVIEW.md) records scope and verification. No paid services are required.

The homepage HTML contains the requested title, description, favicon, viewport, and Open Graph title/description/type/site-name/locale. Client navigation gives named pages readable titles. No final domain, canonical URL, `og:url`, or absolute social-image URL is invented; add those after the public origin and approved share image are known. This is a client-rendered SPA, so deeper page-specific search/social previews would require future prerendering work.

Synced `sources/` material is read-only reference content and is excluded from the application repository.

## Mission 008 · The Three Paths of Python

Start at `/learn`, choose Kids, Adults, or AIs, and switch pathways freely. Direct routes:

- `/learn/kids/python/first-spell?band=little`: Little Apprentices, ages 6–9.
- `/learn/kids/python/first-spell?band=junior`: Junior Spellcasters, ages 10–13.
- `/learn/adults/python/first-program`: Adults pilot.
- `/learn/ai/python/output-fundamentals`: AI specification, sample assessments, and JSON downloads.

Age bands guide difficulty, not access. The canonical learning objective is “Use Python's print() function to display text.” The content JSON is validated with Valibot; human adaptations and the populated Python module reference it. There is no interpreter, public agent API, registration, or account synchronization. Three classroom routes are loaded on demand; current source assets/themes and existing routes are preserved.

Run the native lesson tests with `pnpm test:lessons`; TypeScript also checks `tests/`. `pnpm check:format` covers those tests. For browser integration checks, start the production preview and run:

```sh
BASE_URL=http://127.0.0.1:4173 PLAYWRIGHT_CHANNEL=chrome node --experimental-strip-types scripts/verify-lessons.cjs
```

As with the original browser test, set `PLAYWRIGHT_MODULE` to your optional Playwright installation if needed. Tests cover content/schema/evaluation, retries, clipboard/download, browser completion isolation/reset, storage failure, navigation, keyboard interactions, reduced motion, CSP, and both themes at phone/tablet/laptop/desktop widths. See [AI_INTEGRATION.md](docs/AI_INTEGRATION.md) for contract details and [LEARNING_ARCHITECTURE.md](docs/LEARNING_ARCHITECTURE.md) for boundaries. No learning effectiveness or full accessibility conformance is claimed.

[Mission 008 review notes and complete file list](docs/MISSION_008_REVIEW.md).
