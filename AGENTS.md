# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress-based documentation site for software engineering educational materials ("Tarkvaraarenduse Õppematerjalid"), used at Kuressaare Ametikool. Content is written in Estonian.

## Commands

- **Dev server:** `npm run docs:dev`
- **Build:** `npm run docs:build`
- **Preview build:** `npm run docs:preview`

## Architecture

- **VitePress config:** `docs/.vitepress/config.js` — defines site metadata, navigation, sidebar structure, and base path (`/oppematerjalid/`)
- **Content pages:** Markdown files under `docs/` organized by topic
- **Build output:** `docs/.vitepress/dist/` (gitignored)
- **Deployment:** GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on push to `master`

## Content Structure

The site covers multiple topics, each in its own folder under `docs/`:

- **`javascript/`** — JavaScript basics and advanced topics
- **`nodejs/`** — Node.js and Express.js
- **`testing/`** — Testing fundamentals, TDD, mocking, API testing with Jest/Supertest
- **`docker/`** — Docker basics and Docker Compose
- **`nginx/`** — Nginx basics and reverse proxy
- **`databases/`** — SQL basics and Prisma ORM

Each topic folder contains content pages and an `assignments.md` file with exercises.

## Key Details

- Language/locale is `et-EE` (Estonian)
- Base URL path is `/oppematerjalid/`
- Node 20 is used in CI
- No test suite or linter is configured — this is a docs-only project
