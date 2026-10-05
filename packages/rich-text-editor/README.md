# @frontify/fondue-rich-text-editor

The Fondue rich text editor, built on ProseMirror. It succeeds `@frontify/fondue-rte`.

The package is private until its 1.0 release. Each entry joins `package.json` with its first export.

| Entry       | Exports                                                              |
| ----------- | -------------------------------------------------------------------- |
| `./model`   | `RuntimeEnvironment`, `IdSource` and `defaultIdSource`               |
| `./testing` | `createTestEnvironment`, `TestEnvironment` and `RuntimeEnvironment`  |

## Development

Run each command from `packages/rich-text-editor`, or with `pnpm --filter @frontify/fondue-rich-text-editor`.

| Command                    | Runs                                                       |
| -------------------------- | ---------------------------------------------------------- |
| `pnpm build`               | The ES module build into `dist`                            |
| `pnpm lint`                | oxlint, with the layer rules and the `rte-style` plugin    |
| `pnpm format:check`        | oxfmt                                                      |
| `pnpm typecheck`           | `tsgo` over the source and over the tooling files          |
| `pnpm test`                | Vitest with coverage, in the `node` and `dom` projects     |
| `pnpm test:components:ci`  | Playwright component tests in Chromium, Firefox and WebKit |
| `pnpm check:<name>`        | One guard script from `scripts/check-<name>.ts`            |
| `pnpm storybook`           | Storybook on port 6012                                     |

`PLATFORM.md` lists the web platform features the package may use at the browser floor. `pnpm check:platform` reads it.
