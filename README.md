# Fondue design system by Frontify

[<img src="https://img.shields.io/github/actions/workflow/status/frontify/fondue/pages/pages-build-deployment?label=preview&logo=github&style=flat-square" alt="GitHub Pages Preview status">](https://fondue-components.frontify.com/)
[<img src="https://snyk.io/test/github/Frontify/fondue/badge.svg" alt="Known Vulnerabilities">](https://snyk.io/test/github/Frontify/fondue)
[<img src="https://img.shields.io/npm/v/@frontify/fondue/latest.svg" alt="Latest npm version released">](https://www.npmjs.com/package/@frontify/fondue)

## Using `@frontify/fondue`

# Getting started

Welcome to Fondue, the design system for the [Frontify](https://frontify.com) ecosystem.

## Installation

Add the Fondue design system package as a dependency to your project.

```shell
npm i @frontify/fondue
# or
pnpm i @frontify/fondue
# or
yarn add @frontify/fondue
```

## Finding components

You can browse all available components in the Storybook instance of the [Fondue design system](https://fondue-components.frontify.com).
This Storybook contains all components from all subpackages in the Fondue monorepo. Each component will have a badge in the top bar indicating its current lifecycle state.

For the designers, the documentation is available in the [Fondue design system documentation](https://weare.frontify.com/document/1266?#/using-fondue) on weare.

## Usage

During the transition period in which we are cleaning up the Fondue components, you can use old and new components side by side.

### Was this component already refactored?

If a component was refactored, the old implementation will be marked as **deprecated**.

This will be visible in the code when you consume the component and through a badge in the top bar of the Storybook story.

### Using refactored components

If you want to use a refactored component, you can already import them through the `/components` subexport in the fondue package.

```tsx
import { Button } from "@frontify/fondue/components";

const App = () => <Button>Click Me</Button>;
```

### Using old components

If you are using the old components, you can continue to import them directly from the `@frontify/fondue` package.

```tsx
import { Button } from "@frontify/fondue";

const App = () => <Button>Click Me</Button>;
```

## Contributing

See [Contribution guidelines](CONTRIBUTING.md) for contributing and local development help.

## Important links

-   [Storybook](https://fondue-components.frontify.com) – Storybook for previewing Fondue components
-   [Fondue documentation](https://weare.frontify.com/document/1266?#/using-fondue) – Documentation for the Fondue design system
-   [Tailwind](https://tailwindcss.com/docs) – Utility-first CSS framework used in fondue
