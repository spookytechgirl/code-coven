# Cloudflare Pages preparation · Mission 003

Status: configured locally for a static Pages GitHub build. **Not deployed.** No remote repository was created, pushed, or changed. The existing academy design and functionality are preserved.

## Exact recommended settings

| Cloudflare Pages setting                    | Value                                                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Project type                                | Pages, using Git integration (not a Worker)                                                          |
| Framework preset                            | React (Vite), if offered; otherwise None with these explicit settings                                |
| Build command                               | `npm run build`                                                                                      |
| Build output directory                      | `dist`                                                                                               |
| Root directory                              | Leave blank (repository root); the repository must contain this project's `package.json` at its root |
| Production branch                           | The actual default branch of the repository you choose; select it explicitly                         |
| Build system                                | Current v3 image                                                                                     |
| Build environment variable                  | `NODE_VERSION=24.19.0`                                                                               |
| Build environment variable                  | `PNPM_VERSION=11.25.0`                                                                               |
| Application environment variables / secrets | None                                                                                                 |

Set runtime selectors for both Production and Preview environments. `.nvmrc` also specifies Node, and `package.json` records the pnpm version. Keep `pnpm-lock.yaml` committed. Cloudflare should install dependencies with pnpm, then npm runs the project's build script; this does not switch the installation package manager. Do not set `NODE_ENV=production` for dependency installation, because the build needs dev dependencies such as Vite and TypeScript. No custom dependency-install skip is needed.

If the build log does not select pnpm 11.25.0, correct `PNPM_VERSION` before proceeding; do not work around it with `npm install` or another lockfile. The v3 image does not infer pnpm versions from the lockfile or runtime versions from package `engines` alone. [Cloudflare build-image documentation](https://developers.cloudflare.com/pages/configuration/build-image/).

## Why refreshes work

React Router's BrowserRouter continues to own application routes. Pages serves existing assets directly, then uses the root entry document for unmatched paths when no top-level `404.html` exists. Consequently `/dashboard`, `/courses`, `/academy`, nested department/course pages, and informational routes reach the application on direct navigation and refresh. React Router renders its own not-found screen for unknown routes.

There is deliberately no `/* /index.html 200` catch-all redirect and no Worker: the native fallback preserves real static assets without extra rewrites. Do not add `public/404.html` later without revisiting this setup. A missing file may also receive SPA HTML, so browser asset checks verify content and actual image loading rather than relying only on HTTP status. [Cloudflare serving and SPA behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/).

`public/_headers` is copied to `dist/_headers`. It applies security headers without defining caching overrides or redirects. Local `vite preview` serves the production output but does not itself apply those header rules. [Cloudflare response headers](https://developers.cloudflare.com/pages/configuration/headers/).

## GitHub connection steps — user actions for later

1. Choose or create the intended GitHub repository when you are ready. Use a private repository if desired; Pages supports private repositories. This task has not created one.
2. Put this project's contents at that repository's root: application source, `public`, package/configuration files, `pnpm-lock.yaml`, documentation, and verification scripts. Review the file selection before committing. Respect `.gitignore`; exclude `node_modules`, `.pnpm-store`, `.tools`, `dist`, artifacts, synced `sources`, and any secret-bearing files. Keep the package and lockfile together.
3. Commit and push using your preferred GitHub client only when you authorize that action. If you use an existing local repository, inspect its remote first and preserve it. This guide does not assume a repository URL or branch name.
4. Sign in to Cloudflare. Go to **Workers & Pages → Create application → Pages → Connect to Git**. Select GitHub, authorize the Cloudflare GitHub app only for the intended repository, and select that repository.
5. Choose the actual production branch. Enter the settings table above, including the two nonsecret runtime variables. Keep the project on the free plan; no domain purchase, database, or paid add-on is needed.
6. **Stop before “Save and Deploy” while deployment remains unauthorized.** Completing that action starts the first build and public deployment. Git integration also causes future pushes to trigger builds/deployments, so only activate it when ready for that behavior.
7. After explicit deployment approval in a future task, select Save and Deploy. Inspect the log for Node 24.19.0, pnpm 11.25.0, successful installation, typechecking, and the generated `dist` output. Use the actual URL Cloudflare assigns; none is preselected here.
8. After that future deployment, check direct navigation and refresh on `/`, `/dashboard`, `/courses`, `/academy`, and at least one nested course/department route. Check Hexi, department illustrations, favicon, theme persistence, mobile navigation, and response headers in browser developer tools. Confirm no asset loads as HTML and no CSP violations appear.
9. Once a real public domain and approved share image exist, add canonical and absolute Open Graph URLs. Existing Open Graph text metadata works without inventing a production address. A custom domain is optional.

These UI steps follow the [official Pages Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/). Cloudflare can change labels; choose the Pages Git flow and review the explicit build values before any future deployment.

## Remaining limitations

- Cloudflare installation and edge behavior cannot be confirmed without an actual build/deployment. Local production preview plus a simulated header check verifies the application side only.
- Art and learning content remain clearly marked concepts/demo data. No real student progress is stored.
- No semantic lint configuration exists. TypeScript, formatting, distribution checks, and browser smoke checks are available.
- Package dependencies and the current source/configuration were inspected; future changes and previously existing remote Git history are outside this local review.

## Local verification results · October 14, 2026

| Check                                        | Result                                                                                                                                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| pnpm frozen-lockfile install                 | Passed without changing the application lockfile                                                                                                                                                                   |
| `npm run build`                              | Passed, with the isolated local npm CLI; pnpm remains the installation manager                                                                                                                                     |
| `pnpm typecheck`                             | Passed                                                                                                                                                                                                             |
| `pnpm check:format`                          | Passed                                                                                                                                                                                                             |
| Semantic lint                                | Not configured; no lint command was available                                                                                                                                                                      |
| `pnpm test:build`                            | All 6 tests passed                                                                                                                                                                                                 |
| Production browser smoke checks              | Passed at `http://127.0.0.1:4173`, including direct navigation and refresh, course filters, metadata/favicon, both themes, mobile menus, tips, keyboard skip link, reduced motion, and overflow at 375/768/1440 px |
| Production CSP simulation                    | Passed with no browser errors, blocked resources, failed asset requests, or missing images                                                                                                                         |
| Credential-pattern scan                      | No matches in the application and configuration files inspected; no root `.env` files found                                                                                                                        |
| Output contents                              | 6 static files, about 338 KiB total uncompressed; main JavaScript about 94.4 KiB gzip, CSS 7.3 KiB gzip, study SVG 1.8 KiB gzip; no build-size warning                                                             |
| Actual Cloudflare deployment / edge behavior | Not run; requires future deployment approval                                                                                                                                                                       |

Created: `.nvmrc`, `public/favicon.svg` (copy of existing Hexi), `public/_headers`, `scripts/verify-build.mjs`, and this guide. Modified: `.gitignore`, `package.json`, `index.html`, `src/App.tsx` (page titles), `src/layouts/DashboardLayout.tsx` (version label), `scripts/verify-browser.cjs`, and `README.md`. Application dependencies, artwork originals, curriculum, styling, Vite/TypeScript configuration, and route definitions remain unchanged. Generated `dist` and verification screenshots are ignored. Temporary npm tooling lives in ignored `.tools/` solely to run the exact requested build command in this desktop environment.
