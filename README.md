# Fondue

The design system for the [Frontify](https://frontify.com) ecosystem: React components, icons, charts, design tokens and a rich text editor, shipped as one package.

[![CI](https://github.com/Frontify/fondue/actions/workflows/continuous-deployment.yaml/badge.svg)](https://github.com/Frontify/fondue/actions/workflows/continuous-deployment.yaml)
[![npm](https://img.shields.io/npm/v/@frontify/fondue/latest.svg)](https://www.npmjs.com/package/@frontify/fondue)
[![Known Vulnerabilities](https://snyk.io/test/github/Frontify/fondue/badge.svg)](https://snyk.io/test/github/Frontify/fondue)

**[Storybook](https://fondue-components.frontify.com)** · **[Setup guide](https://fondue-components.frontify.com/?path=/docs/documentation-getting-started--documentation)** · **[Design documentation](https://weare.frontify.com/document/1266?#/using-fondue)** · **[Contributing](CONTRIBUTING.md)**

## Quick start

Requires React 18.

```shell
npm i @frontify/fondue
```

Import the tokens and styles once at your app's root, then wrap the app in the `ThemeProvider`:

```tsx
import '@frontify/fondue/tokens/base';
import '@frontify/fondue/components/styles';

import { Button, ThemeProvider } from '@frontify/fondue/components';

export const App = () => (
    <ThemeProvider theme="light">
        <Button>Hello Fondue</Button>
    </ThemeProvider>
);
```

Fonts aren't bundled for licensing reasons, and Tailwind needs extra config. The [setup guide](https://fondue-components.frontify.com/?path=/docs/documentation-getting-started--documentation) covers both.

## What's in the package

Everything is imported from `@frontify/fondue`. Each entry point is tree-shakeable.

| Entry point                         | Contents                                                        |
| ----------------------------------- | --------------------------------------------------------------- |
| `@frontify/fondue/components`       | React components and the `ThemeProvider`                        |
| `@frontify/fondue/icons`            | Icon components                                                 |
| `@frontify/fondue/charts`           | Chart components                                                |
| `@frontify/fondue/tokens/base`      | Design tokens as CSS variables                                  |
| `@frontify/fondue/tokens/tailwind`  | Tailwind v3 preset with a class for every token                 |
| `@frontify/fondue/rte`              | Rich text editor (legacy)                                       |
| `@frontify/fondue/rich-text-editor` | Rich text editor (**experimental**, API and format may change)  |
| `@frontify/fondue/sdk`              | Machine-readable metadata for components, icons, tokens, guides |

Entry points with styles have a matching `/styles` import, e.g. `@frontify/fondue/charts/styles`.

## Using Fondue with AI coding agents

Install the Fondue skill so agents (Claude Code, Cursor, Codex, …) look up real components, props and tokens instead of guessing:

```shell
npx skills add frontify/fondue/packages/sdk
```

The skill queries the Fondue version installed in your project. See the [SDK README](packages/sdk/README.md) for the underlying API.

## Contributing

```shell
pnpm i
pnpm build
pnpm storybook   # http://localhost:6010
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow, adding components, and releasing.
