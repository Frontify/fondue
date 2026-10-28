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

When the host unmounts the editor, or remounts it with a new `key`, while changes are unsaved, the editor writes nothing; if it had already shown its document, it also emits `persistence.disposed-dirty`. Await the handle's `requestCommit` before a route change or a remount:

```tsx
const committed = await handle.requestCommit({ reason: 'navigate' });
if (committed.status !== 'acknowledged') {
    return;
}
```

## Guides

| Guide | What it covers |
| --- | --- |
| Authoring | Writing a plugin: the vocabulary part, the editor part and its `needs`, the reader part, and `definePlugin` |
| Reader and codecs | Rendering stored documents without the editor, and HTML, Markdown and plain text output |
| Accessibility | The keyboard model, the toolbar, content checks, alternative text and language marking |
| Compatibility | The stored format, model versions and migrations |
| Observability | Diagnostics and the counters a host can collect |
| Limitations | Features no shipped profile installs, and defaults that may surprise a host |

## Add a plugin

A new shipped plugin adds these files, all inside `src/plugins/<Name>/`:

- `feature.ts`: the vocabulary part.
- `editor.ts`: the editor part.
- `index.ts`: the plugin, built with `definePlugin`.
- `locales/<locale>.ts`: its strings, one table per locale.
- `<Name>.stories.tsx`: its stories.
- `__tests__/`: its tests.
- `fixtures/`: its stored documents.

Then list the plugin in the two public barrels and in the profile lists that ship it. An outside plugin is smaller: the Authoring guide shows a mark in one file.

## Layers

Lint divides `src` into four rings. `oxlint.config.ts` holds the exact rules, and its messages say why each one exists.

| Ring | Folders | Holds | Import rule |
| --- | --- | --- | --- |
| content | `model`, `codecs`, `reader` | The stored format, its HTML, Markdown and text output, and static rendering | Server-safe: no editor code and no ProseMirror |
| plugins | `plugins` | One folder per plugin: its feature, editor part, optional reader part and `index` | A feature imports only `#/model`, its own migration and a declared dependency's feature; an editor part reaches the editor only through the plugin API |
| engine | `runtime`, `persistence` | The editing session and the save coordinator | `runtime` is the only product code that imports ProseMirror |
| shell | `bridge`, `ui`, `react` | The plugin API, the toolbar and menus, and `RichTextEditor` with the shipped profiles | Never ProseMirror. `ui` reaches the runtime only through `#/runtime/port`, `#/runtime/definition` and `#/runtime/import/fromHtml`; `react` through `#/runtime/port`, `#/runtime/definition` and `#/runtime/import`, plus `#/runtime/assembly` in the two files that build the engine |

| Folder | Holds and imports |
| --- | --- |
| `entries` | The public entry modules; the reader entries import reader code only |
| `locales` | One string table per shipped locale, which also loads each plugin's strings for that locale; no other layer's code |
| `styles` | The stylesheet and its helpers; imports nothing in the package |
| `testing` | The contract suite, fake services and input helpers; the contract suite also imports React and the engine compile path |
| `docs` | The Storybook guides; a guide imports the package only through its public entries |
| `__tests__` | Package-wide tests, which the layer rules above do not cover; they import `#/model` or `#/model/internal`, never a model file |

A shipped plugin splits into `feature.ts`, `editor.ts` (or `editor.tsx`) and `index.ts`, plus an optional reader part, so server code loads its vocabulary without editor code. For the same reason, its feature and its plugin are listed separately: the feature in the features barrel and in each shipping profile's feature list, the plugin in the root entry and in that profile's plugin list.

`#/model` is the public model entry, and `#/model/internal` is the model's barrel for the package's own layers and is never exported.

The root entry exports the command and persistence types beside the component because the handle's signatures name them.

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
| `pnpm qualification:stamp` | Rewrite a version's qualification record and report commit from a gate run (`--unit`, `--components`, optional `--version`) |

## Entries

| Entry | What it exports |
| --- | --- |
| `.` | `RichTextEditor`, `defineEditor`, the shipped plugins, `modelOf` and the host-facing types |
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
