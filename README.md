# Fondue Design System by Frontify

<a href="https://github.com/Frontify/fondue/actions/workflows/continuous-integration.yml">
    <img src="https://github.com/Frontify/react-components/actions/workflows/continuous-integration.yml/badge.svg" alt="CI Status" />
</a>
<a href="https://snyk.io/test/github/Frontify/fondue">
    <img src="https://snyk.io/test/github/Frontify/fondue/badge.svg" alt="Known Vulnerabilities" />
</a>
<a href="https://github.com/Frontify/fondue/blob/main/README.md" title="latest">
    <img alt="latest" src="https://img.shields.io/npm/v/@frontify/fondue/latest.svg" />
</a>

## Using `@frontify/fondue`

# Getting Started

Welcome to Fondue, The Design System for the [Frontify](https://frontify.com) ecosystem.

## Installation

Add the Fondue Design System Package as a dependency to your project. `pnpm i @frontify/fondue`

## Finding Components

You can browse all available components in the Storybook instance for the [Fondue Design System](https://fondue-components.frontify.com).
This Storybook contains all Components from all subpackages in the Fondue Monorepo. Each Component will have a Badge in the Top Bar indicating it's current lifecycele state.

For the designers, the documentation is available in the [Fondue Design System Documentation](https://weare.frontify.com/document/1266?#/using-fondue) on weare.

## Usage

During the transition period in which we are cleaning up the Fondue Components, you can use old and new components side by side.

### Was this component already refactored?

If a component was refactored, the old implementation will be marked as **deprecated**.

This will be visible in the code when you consume the Component and through a Badge in the Top Bar of the Storybook Story.

### Using Refactored Components

If you want to use a refactored component, you can already import them through the `/components` subexport in the fondue package.

```tsx
import { Button } from "@frontify/fondue/components";

const App = () => <Button>Click Me</Button>;
```

### Using Old Components

If you are using the old components, you can continue to import them directly from the `@frontify/fondue` package.

```tsx
import { FondueButton } from "@frontify/fondue";

const App = () => <FondueButton>Click Me</FondueButton>;
```

## Contributing

See [Contribution Guidelines](CONTRIBUTING.md) for contributing and local development help.

## Important Links

-   [Storybook](https://storybook.js.org/docs/react/get-started/introduction) – Used for isolated development and documentation of Fondue components
-   [https://www.cypress.io/](Cypress) – Used for Testing in Fondue
-   [Frontify React Guidelines](https://www.notion.so/React-Architecture-0ce55540be0b48fa88a2c3848e35eb81) – Internal Coding Guidelines for Frontify
-   [Fondue Tokens](https://github.com/Frontify/fondue-tokens) – Design Tokens used at Frontify
-   [Tailwind](https://tailwindcss.com/docs) – Utility-first CSS framework used in Fondue
