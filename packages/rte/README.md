# Fondue Rich Text Editor

<a href="https://github.com/Frontify/fondue/actions/workflows/continuous-integration.yml">
    <img src="https://github.com/Frontify/react-components/actions/workflows/continuous-integration.yml/badge.svg" alt="CI Status" />
</a>
<a href="https://snyk.io/test/github/Frontify/fondue">
    <img src="https://snyk.io/test/github/Frontify/fondue/badge.svg" alt="Known Vulnerabilities" />
</a>
<a href="https://github.com/Frontify/fondue/blob/main/README.md" title="latest">
    <img alt="latest" src="https://img.shields.io/npm/v/@frontify/fondue-rte/latest.svg" alt="NPM Version" />
</a>

Rich Text Editor components for the Fondue Design System, built with [Plate](https://platejs.org/) (based on [Slate.js](https://www.slatejs.org/)).

## Installation

```shell
npm install @frontify/fondue-rte
```

Or using pnpm:

```shell
pnpm add @frontify/fondue-rte
```

## Usage

```typescript
import { RichTextEditor } from '@frontify/fondue-rte';

// Use the Rich Text Editor in your component
<RichTextEditor />
```

## Features

- Built on Plate editor framework with extensive plugin system
- Full-featured rich text editing capabilities
- Integrated with Fondue design system tokens and components
- Comprehensive accessibility support
- TypeScript support

## Development

This package is part of the Fondue monorepo. For development:

1. Install dependencies from the root:
   ```shell
   pnpm install
   ```

2. Build the package:
   ```shell
   pnpm build:rte
   ```

3. Run Storybook for development:
   ```shell
   pnpm storybook
   ```
   The RTE Storybook will be available at http://localhost:6011

4. Run tests:
   ```shell
   cd packages/rte
   pnpm test
   ```

## Testing

This package uses [Cypress](https://www.cypress.io/) for component testing.

## Contributing

See [Contribution Guidelines](../../CONTRIBUTING.md) for contributing and local development help.

## Related Packages

- [@frontify/fondue](../fondue) - Main Fondue component library
- [@frontify/fondue-components](../components) - New refactored Fondue components
- [@frontify/fondue-tokens](../tokens) - Design tokens
- [@frontify/fondue-icons](../icons) - Icon components

## Important Links

- [Fondue Storybook](https://fondue-components.frontify.com/) - Component documentation
- [Plate Documentation](https://platejs.org/) - Plate editor framework
- [Slate Documentation](https://www.slatejs.org/) - Slate.js core library
