# portfolio

Source code of my personal portfolio, [noa-marchionni.fr](https://noa-marchionni.fr).

It is a static, bilingual website: English by default, French under `/fr/`.
The site is being rebuilt step by step. This repository currently contains the
foundation only: project setup, routing for both languages and automated checks.

## Stack

- [Astro](https://astro.build/) with its built-in i18n routing, static output
- TypeScript (strict)
- Plain CSS, no CSS framework and no UI library
- GitHub Actions for continuous integration

## Requirements

- Node.js 24 (LTS) or later, see [.nvmrc](.nvmrc)
- npm
- Google Chrome, only to run the Lighthouse check locally

## Getting started

```sh
npm install
npm run dev
```

The development server runs on <http://localhost:4321/>.

## Build

```sh
npm run build     # generates the static site in dist/
npm run preview   # serves dist/ locally
```

## Checks

| Command                    | What it does                                               |
| -------------------------- | ---------------------------------------------------------- |
| `npm run check`            | Type checks Astro and TypeScript files                     |
| `npm run build`            | Builds the site                                            |
| `npm run check:links`      | Fails on any broken link in the generated site             |
| `npm run check:lighthouse` | Runs Lighthouse (mobile) on every page and enforces scores |

`check:links` and `check:lighthouse` run against `dist/`, so build first.

Lighthouse thresholds: Performance at least 95, Accessibility, Best Practices
and SEO at 100.

The same checks run in CI on every pull request and on every push to `main`.

## Project structure

```text
src/
  i18n/      locale list and helpers
  layouts/   base HTML layout (lang, meta tags, hreflang links)
  pages/     English pages at the root, French pages under fr/
scripts/     check scripts used locally and in CI
```

## URL conventions

- English pages have no prefix (`/`), French pages live under `/fr/`.
- Every page URL ends with a trailing slash.
- Each page declares its canonical URL and its alternate language versions.
