# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

Personal portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Commands

```bash
pnpm dev        # Start development server
pnpm build      # Production build
pnpm start      # Run production server
pnpm lint       # Run ESLint
pnpm lint:fix   # Run ESLint with auto-fix
```

## Architecture

- **App Router**: Uses Next.js App Router in `src/app/`
- **Path alias**: `@/*` maps to `./src/*` (e.g., `import X from "@/components/X"`)
- **Components**: Reusable UI components in `src/components/`
- **Constants**: Shared data (nav links, social links) in `src/lib/constants.ts`
- **Styling**: Tailwind CSS v4 with custom theme colors defined in `src/app/globals.css` (page, card, accent, heading, body, etc.)
- **Static assets**: Images and resume PDF in `public/`
