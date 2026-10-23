# @frontify/rich-text-editor

Rich text editing for the Fondue design system.

## Commands

Run these from `packages/rich-text-editor`.

| Command | Description |
| --- | --- |
| `pnpm build` | Build the library |
| `pnpm install:playwright` | Install Playwright browsers |
| `pnpm format` | Format the package |
| `pnpm format:check` | Check formatting |
| `pnpm lint` | Lint the package |
| `pnpm lint:fix` | Lint and apply fixes |
| `pnpm storybook` | Start the repo's Storybook, which holds this package's stories |
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
| `./html` | `fromHTML` |
| `./testing` | The feature contract suite, the input helpers and the runtime probe |
| `./locales/*` | One message catalogue per shipped locale, such as `./locales/de-DE` |
| `./styles` | The package stylesheet, which styles the editor, the reader and `toHTML` output |
