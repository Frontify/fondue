# @frontify/fondue-rich-text-editor

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
| `.` | `RichTextEditor`, `defineEditor`, the shipped plugin units, `modelOf` and the host-facing types |
| `./model` | The content model and documents |
| `./features` | The shipped features |
| `./reader` | `RichTextReader` and `defineReaderFeature` |
| `./authoring` | `definePlugin`, `extendPlugin`, `defineEditorPart`, `defineReactPresentation`, `defineReaderFeature` and the types and components an editor part uses |
| `./codecs` | `createCodecs` |
| `./html` | `fromHTML` |
| `./testing` | The feature contract suite, the input helpers and the runtime probe |
| `./locales/*` | One message catalogue per shipped locale, such as `./locales/de-DE` |
| `./styles` | The package stylesheet, which styles the editor, the reader and `toHTML` output |

## Defaults that may surprise a host

- Only the Brand document profile offers alignment. The other profiles install `blocks.align`, so stored alignment is kept and shown, but their authors cannot set it.
- The typography input rules, such as smart quotes and the arrow `->`, are off: the `input-rules` feature turns a rule group on only when its `typography` option lists it.
- The Markdown shortcuts of each feature stay on in every profile that installs the feature, such as `**` for bold and `## ` for a heading.
