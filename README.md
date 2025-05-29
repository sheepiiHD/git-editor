# GitHub-style Contribution Grid (React + TypeScript)

> **Disclaimer**
>
> This project is provided **solely for educational and experimentation purposes.**  
> Use it responsibly and in accordance with GitHub's [Terms of Service](https://docs.github.com/en/site-policy/github-terms/github-terms-of-service) & [Acceptable Use Policies](https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies).  
> Generating fake activity to mislead others about your contributions may violate those terms and could lead to account sanctions.

This project is a minimal, fully-typed React implementation of the familiar GitHub contribution graph.  
Squares become greener as the contribution count grows, you can hover to see details, and click a square to toggle its value.ok

## Quick start

1. Install dependencies

```bash
pnpm install # or npm install / yarn install
```

2. Start the development server

```bash
pnpm dev # or npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

## Scripts

• `dev` – starts Vite in development mode with hot-module reload.  
• `build` – builds a production bundle.  
• `preview` – serves the production build locally.

## Project structure

```
src/
  ├─ components/ContributionGraph.tsx   # Re-usable graph component
  ├─ data/generateRandomContributions.ts # Utility to create demo data
  ├─ App.tsx                            # Demo page
  ├─ main.tsx                           # React entrypoint
  └─ styles.css                         # Global & component styles
```

## Component API

`<ContributionGraph>` accepts these props:

| prop                | type                                   | default | description                                   |
|---------------------|----------------------------------------|---------|-----------------------------------------------|
| `contributions`     | `Record<string, number>`               | —       | Date string (`YYYY-MM-DD`) → count mapping    |
| `startOfWeekOnSunday` | `boolean`                            | `false` | Set `true` to align graph starting on Sunday  |
| `onCellClick`       | `(date: string, count: number) => void`| —       | Fired when a cell is clicked                  |

## License

MIT © 2024 