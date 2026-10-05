# diff-lab reviewer notes

## Architecture
The repository contains two Vite React/TypeScript applications: the primary student portal under `my-app/` and a separate practice project under `practice/react-revision/`. `my-app` uses React Router for page-level navigation, shared layout/components under `src/components`, page components under `src/pages`, and reusable Radix/shadcn-style primitives under `src/components/ui`. Styling is primarily Tailwind CSS v4, integrated through `@tailwindcss/vite`.

## Conventions
- Use the `@/` alias for imports from `my-app/src`; it is configured consistently in `my-app/tsconfig.json` and `my-app/vite.config.ts`. Existing examples include `@/components/ui/sidebar` and `@/lib/utils`.
- Keep route declarations centralized in `my-app/src/App.tsx`; pages are imported from `./pages/*` and registered with `<Route>`.
- Shared application UI belongs in `my-app/src/components`, with focused components such as `AppSidebar.tsx`, `PageHeader.tsx`, and `Statcard.tsx`. Reusable primitive wrappers belong in `src/components/ui`.
- UI primitives wrap Radix components, preserve their props via `React.ComponentProps`, merge caller classes with `cn`, and add `data-slot` attributes. Follow `my-app/src/components/ui/accordion.tsx` and `alert-dialog.tsx`.
- Components use named exports for reusable components (`AppSidebar`, `PageHeader`, `StatsCard`) and default exports for page-level components such as `App` in `my-app/src/App.tsx`.
- Tailwind utility classes are the dominant styling mechanism, including arbitrary values, state/data selectors, dark-mode classes, and custom animation utilities. Avoid replacing these with unrelated styling systems.
- Navigation metadata is data-driven: add sidebar entries to the `menuItems` array in `my-app/src/components/AppSidebar.tsx` rather than duplicating menu markup.
- The primary app uses semicolons and double quotes in application files, while generated UI primitives generally use no semicolons and single quotes. Preserve the local file’s style.
- Both projects use the standard Vite scripts: `build` runs `tsc -b && vite build`, and `lint` runs `eslint .`.

## Intentional non-standard choices
- `/Create` is capitalized in `my-app/src/App.tsx`; do not normalize route casing without checking links or requirements.
- `PageHeader` intentionally uses fixed-position notification overlays and a full-screen transparent backdrop (`my-app/src/components/PageHeader.tsx`) to escape clipped parent containers.
- The `practice/react-revision` project is a separate minimal exercise app and does not share the primary app’s alias, Tailwind, or dependency setup.

## Watch out for
- New `@/` imports must work in both TypeScript and Vite configuration; update both alias definitions if the source layout changes.
- Avoid introducing sidebar links whose paths are absent from `my-app/src/App.tsx`, or routes that bypass the existing page/layout structure.
- Preserve Radix prop forwarding and `className` merging in `src/components/ui`; dropping `{...props}` or `cn(...)` can silently break accessibility, state styling, or consumer overrides.
- Check overlay z-index, click-outside behavior, and fixed positioning when modifying notification/dialog UI.
- Run `npm run build` as well as lint-sensitive checks: TypeScript project references can catch errors that ESLint does not.