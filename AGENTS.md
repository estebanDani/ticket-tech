# Code Review Rules - Ticket Tech

Este archivo define los estándares de código que Guardian Angel usará para revisar los PRs.

---

## TypeScript

- **NO usar `any`** - Siempre usar tipos específicos o `unknown` si es necesario
- Usar `const` sobre `let` cuando el valor no cambia
- Preferir `interface` sobre `type` para definir objetos
- Usar optional chaining (`?.`) y nullish coalescing (`??`)
- Los tipos deben estar en archivos separados (`types.ts` o `*.types.ts`)
- Exportar tipos con `export type` para mejor tree-shaking

## React / Next.js

- **Solo componentes funcionales** - No usar class components
- Usar named exports: `export function Component()` no `export default`
- No usar `import * as React` - Usar named imports: `import { useState, useEffect }`
- Custom hooks deben empezar con `use` y estar en carpeta `hooks/`
- Los componentes deben tener un solo propósito (Single Responsibility)
- Usar `'use client'` solo cuando sea estrictamente necesario

## Estado y Data Fetching

- Preferir Server Components cuando sea posible
- Para estado global, usar Context API o Zustand
- No usar `useEffect` para data fetching - Usar Server Components o React Query
- Memoizar con `useMemo` y `useCallback` solo cuando haya problemas de performance comprobados

## Material UI (MUI)

- Usar el sistema de theming de MUI - No hardcodear colores
- Preferir componentes de MUI sobre HTML nativo cuando exista equivalente
- Usar `sx` prop para estilos one-off, crear styled components para estilos reutilizables
- No mezclar Tailwind con MUI en el mismo componente
- Seguir el spacing system de MUI (múltiplos de 8px)

## Estilos

- No usar inline styles con `style={{}}`
- No usar `!important`
- Colores deben venir del theme, no hardcodeados
- Responsive design usando breakpoints de MUI (`xs`, `sm`, `md`, `lg`, `xl`)

## Estructura de Archivos

- Componentes en PascalCase: `UserCard.tsx`
- Hooks en camelCase: `useAuth.ts`
- Utils/helpers en camelCase: `formatDate.ts`
- Un componente por archivo (excepto componentes internos pequeños)

## Accesibilidad

- Todas las imágenes deben tener `alt` descriptivo
- Elementos interactivos deben tener `aria-label` si no tienen texto visible
- Usar elementos semánticos: `<button>`, `<nav>`, `<main>`, `<article>`
- Mantener jerarquía correcta de headings (h1 → h2 → h3)

## Performance

- No importar librerías enteras: `import { Button } from '@mui/material'` no `import * as MUI`
- Lazy load de componentes pesados con `dynamic()` de Next.js
- Optimizar imágenes con `next/image`

## Prohibido

- `console.log` en código productivo (usar `console.warn` o `console.error` solo para errores reales)
- `// @ts-ignore` o `// @ts-nocheck`
- Variables sin usar
- Imports sin usar
- Funciones de más de 50 líneas (extraer a funciones más pequeñas)
- Componentes de más de 200 líneas (dividir en subcomponentes)
