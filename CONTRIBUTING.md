# Contributing to react-confirm-lite

Thank you for contributing to **react-confirm-lite**.
This project is a **library + example app** setup, so local development requires **two terminals running in parallel**.

Direct pushes to `main` are blocked. All changes go through branches and pull requests.

---

## Prerequisites

* Node.js (LTS recommended)
* npm
* Git

---

## Repository Structure

```text
react-confirm-lite/
├─ src/              # Library source code
├─ dist/             # Built output (generated)
├─ example/          # Vite example app
├─ tsup.config.ts    # Library bundler config
```

---

## Local Development (Two-Terminal Setup)

You **must run two terminals at the same time** when developing.

### Terminal 1 — Library Build (Watch Mode)

This terminal watches the library source and rebuilds on every change.

From the **project root**:

```bash
npm install
npm run build:watch
```

What this does:

* Runs `tsup --watch`
* Rebuilds `dist/` automatically when `src/` changes
* Keeps the library output up to date for the example app

⚠️ Do not close this terminal while developing.

---

### Terminal 2 — Example App (Vite)

This terminal runs the example app that consumes the local library build.

```bash
cd example
npm install
npm run dev
```

You will see something like:

```text
Local: http://localhost:5173
```

Open this URL in your browser.

Now:

* Edit files in `src/` (library)
* `dist/` updates via Terminal 1
* Example app hot-reloads via Vite

This is the **expected workflow**.

---

## Making Changes

* Library code → `src/`
* Example/demo code → `example/src/`

Do **not** manually edit `dist/` files.

---

## Git Workflow (Important)

### 1. Create a feature branch

Never work on `main`.

```bash
git checkout -b fix/confirm-animation
```

### 2. Commit your changes

```bash
git add .
git commit -m "Fix confirm animation timing"
```

### 3. Push your branch

```bash
git push --set-upstream origin fix/confirm-animation
```

---

## Pull Requests

* Base branch: `main`
* Explain **what changed and why**
* Keep PRs focused (one feature or fix)

### Main branch rules

* ❌ No direct pushes to `main`
* ❌ No local merges into `main`
* ❌ No merge commits
* ✅ Pull Requests only
* ✅ Squash & Merge only

Even maintainers must follow this.

---

## Commit Guidelines

* Clear, descriptive messages
* One logical change per commit

Good:

```text
Fix confirm dialog animation glitch
```

Bad:

```text
update stuff
```

---

## If Something Breaks

* Ensure **both terminals are running**
* Restart `build:watch` if `dist/` looks outdated
* Reinstall deps if Vite fails

If unsure, open a Pull Request and explain the issue.

---

## Summary

| Task                 | Required   |
| -------------------- | ---------- |
| Run `build:watch`    | Terminal 1 |
| Run Vite example     | Terminal 2 |
| Edit library code    | `src/`     |
| Push to `main`       | ❌          |
| Use feature branches | ✅          |
| Use Pull Requests    | ✅          |

---
