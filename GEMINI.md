# GEMINI.md

## Project Overview

This is a web application built with [Next.js](https://nextjs.org/), a popular framework for building server-rendered [React](https://react.dev/) applications. The project is written in [TypeScript](https://www.typescriptlang.org/) and uses [Tailwind CSS](https://tailwindcss.com/) for styling.

The project structure follows the standard Next.js App Router conventions. The main page component is located at `src/app/page.tsx`, and the root layout is at `src/app/layout.tsx`.

The project is configured with ESLint for code linting and uses the Geist font.

## Building and Running

To work with this project, you need to have Node.js and npm (or a compatible package manager like yarn, pnpm, or bun) installed.

### Development

To start the development server, run:

```bash
npm run dev
```

This will start the application on [http://localhost:3000](http://localhost:3000). The page will auto-update as you edit the files.

### Building

To create a production-ready build of the application, run:

```bash
npm run build
```

This will generate an optimized build in the `.next` directory.

### Production

To start the application in production mode (after building), run:

```bash
npm run start
```

### Linting

To check the code for any linting errors, run:

```bash
npm run lint
```

## Development Conventions

### Code Style

The project uses the standard Next.js ESLint configuration (`eslint-config-next`) to enforce code style and best practices.

### Styling

Styling is done using Tailwind CSS. Utility classes are preferred for styling components.

### Path Aliases

The project is configured with a path alias `@/*` that maps to the `src/*` directory. This should be used for importing modules from within the `src` directory to avoid long relative paths.
