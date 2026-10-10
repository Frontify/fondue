# @frontify/fondue-rich-text-editor

Rich text editing for the Fondue design system.

This package is private and unreleased.

## Commands

Run these from `packages/rich-text-editor`.

| Command | Description |
| --- | --- |
| `pnpm build` | Build the library |
| `pnpm build:storybook` | Build Storybook |
| `pnpm install:playwright` | Install Playwright browsers |
| `pnpm format` | Format the package |
| `pnpm format:check` | Check formatting |
| `pnpm lint` | Lint the package |
| `pnpm lint:fix` | Lint and apply fixes |
| `pnpm storybook` | Start Storybook on port 6012 |
| `pnpm typecheck` | Typecheck the package |
| `pnpm test` | Run unit tests with coverage |
| `pnpm test:watch` | Run unit tests in watch mode |
| `pnpm test:components` | Run component tests in the Playwright UI |
| `pnpm test:components:ci` | Run component tests |

## Entries

| Entry | What it exports |
| --- | --- |
| `.` | `RichTextEditor`, `defineEditor` and the host-facing types |
| `./model` | The content model and documents |
| `./features` | The shipped features |
| `./reader` | `RichTextReader` and `defineReaderFeature` |
| `./codecs` | `createCodecs` |
| `./testing` | The input helpers and the runtime probe |
