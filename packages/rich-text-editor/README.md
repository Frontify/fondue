# @frontify/fondue-rich-text-editor

Rich text editing for the Fondue design system: an editor, a static reader and codecs that share one stored JSON format.

## Mount an editor

```tsx
import { RichTextEditor } from '@frontify/fondue-rich-text-editor';
import { documentModel } from '@frontify/fondue-rich-text-editor/features';
import { createEmptyDocument } from '@frontify/fondue-rich-text-editor/model';
import '@frontify/fondue-rich-text-editor/styles';

const defaultValue = { documentId: 'note-1', revision: null, document: createEmptyDocument(documentModel) };

export const Notes = () => <RichTextEditor profile="document" aria-label="Notes" defaultValue={defaultValue} />;
```

The editor is uncontrolled: it takes `defaultValue` once, and the host replaces the document with the handle's `replaceDocument`, saves through `services.persistence`, or reads the snapshot through the form-field hook. The guides in Storybook, under Rich Text Editor, Guides, cover each of these.

## Guides

| Guide | What it covers |
| --- | --- |
| Authoring | Writing a plugin: the vocabulary part, the editor part and its `needs`, the reader part, and `definePlugin` |
| Reader and codecs | Rendering stored documents without the editor, and HTML, Markdown and plain text output |
| Accessibility | The keyboard model, the toolbar, content checks, alternative text and language marking |
| Compatibility | The stored format, model versions and migrations |
| Observability | Diagnostics and the counters a host can collect |
| Limitations | Features no shipped profile installs, and defaults that may surprise a host |

## Layers

Each product folder under `src` is one layer; lint keeps the imports between them in this order.

| Folder | Holds |
| --- | --- |
| `model` | The stored format: documents, the content model, validation, migrations, limits and content checks |
| `features` | One folder per feature: its vocabulary part (`feature.ts`), editor part (`editor.ts`), optional reader part and its plugin unit (`index.ts`) |
| `runtime` | The editing session: state, commands, the editor API, uploads, suggestions and history; the engine definition in `runtime/definition`, which compiles a content model and editor parts into the engine's schema, keymaps and input rules; the HTML and paste import in `runtime/import`; the only layer that holds the engine |
| `persistence` | The save coordinator |
| `bridge` | The plugin API and the React adapter for node views, chrome and overlays |
| `ui` | Toolbar, menus and suggestion lists |
| `react` | `RichTextEditor`, its parts, hooks and the shipped profiles |
| `reader` | Static rendering of stored documents |
| `codecs` | HTML, Markdown and plain text export, and Markdown import |
| `entries` | The reader and authoring entry modules and the shipped feature readers |
| `locales` | One message catalogue per shipped locale |
| `styles` | The package stylesheet and its shared style helpers |
| `testing` | The feature contract suite, fake services and input helpers |

## Codecs and blocked documents

`toHTML`, `toPlainText` and `toMarkdown` return empty output for a document that cannot be read, such as one from another model. Check `blocked` on the result before storing its `html`, `text` or `markdown`, so empty output never replaces real content.

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
