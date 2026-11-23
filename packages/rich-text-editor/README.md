# @frontify/fondue-rich-text-editor

> [!WARNING]
> **Experimental.** This package is still in development. Its API and stored document format can change
> in any release, including minor and patch releases, until it reaches 1.0. This also applies when you
> import it through `@frontify/fondue/rich-text-editor`.

A plugin-based rich text editor for React. Documents are plain JSON (`RteDocument`);
every block, mark and inline comes from a plugin.

```tsx
import { RichTextEditor, RichTextRenderer } from '@frontify/fondue-rich-text-editor';
import { defaultContent, defaultPlugins } from '@frontify/fondue-rich-text-editor/plugins';
import '@frontify/fondue-rich-text-editor/styles';

<RichTextEditor plugins={defaultPlugins} value={doc} onChange={setDoc} />
<RichTextRenderer plugins={defaultContent} value={doc} />
```

The renderer needs no editing code, so it reads only each feature's content, not its plugin.
The renderer, `serializeToHtml`, `parseHtml` and `toPlainText` need `plugins`, so a read-only view
bundles only what it passes. Pass `defaultContent` for every shipped plugin, or your own content or
plugins. The editor falls back to `defaultPlugins`.

A host that sets its own text looks passes the same `look` to both sides:

```tsx
<RichTextEditor plugins={[textStylePlugin({ look }), boldPlugin]} value={doc} onChange={setDoc} />
<RichTextRenderer plugins={[textStyleContent({ look }), boldContent]} value={doc} />
```

## Language

The editor and its shipped plugins speak the 11 languages of `@frontify/fondue-components`.
The editor takes its language from the `lang` of the `ThemeProvider`'s `locale`, so the host
passes the same locale it passes for the components. The editor holds its own strings for each
language. The wording is fixed: a host chooses the language, not the words.

```tsx
import { deCH } from '@frontify/fondue/components/locales/de-CH';

<ThemeProvider locale={deCH}>
    <RichTextEditor />
</ThemeProvider>
```

A language outside the 11 shows the editor in English, with a warning in development.

## Writing a plugin

A feature has two parts. Its content (`defineContent`) says what exists: blocks, marks and
inlines, and how each one is written as HTML and read back. Its plugin (`definePlugin`) adds
the editing on top: toolbar buttons, editing views, keys and typing rules. Export both from one
file, the plugin as a function that returns `definePlugin(...)`. A page that only shows documents
then keeps the content and its bundler drops the plugin with its editing code, since nothing calls
it. Every plugin is called, `boldPlugin()`, and takes its options there when it has any, like
`mentionPlugin({ items })`. The package's own plugins are checked by a spec that fails when
editing UI lands in the renderer bundle.

```tsx
export const highlightContent = defineContent({
    marks: { highlight: defineMark({ tag: 'mark' }) },
});

export const highlightPlugin = () =>
    definePlugin({
        content: highlightContent,
        toolbar: [{ label: 'Highlight', icon: IconHighlight, shortcut: 'Mod-h' }],
    });

<RichTextEditor plugins={[...defaultPlugins, highlightPlugin()]} />
<RichTextRenderer plugins={[...defaultContent, highlightContent]} value={doc} />
```

Your plugin's `label` is its own text in the host's language, or a function the editor calls with
its language (`({ lang }) => …`), so the label follows a change of language. Any other text
your plugin shows is its own too.

`@frontify/fondue-components`, `@frontify/fondue-icons` and `@frontify/fondue-tokens` are peer dependencies:
the host installs them beside this package and loads `@frontify/fondue-tokens/styles` and
`@frontify/fondue-components/styles`.

## Where things are

Layers import inward only; `oxlint.config.ts` enforces it.

```
src/
├── core/            The contract: document types, RtePlugin, the registry. Imports nothing else.
├── plugins/         One folder per feature (Bold, Link, List, …). Each imports only core, ui, locales and plugins/shared.
├── ui/              Controls the shell and the plugins both draw with (ToolbarButton), and the translator. Imports at most core and locales.
├── locales/         The strings of the editor and its shipped plugins, one file per language. Imports nothing.
├── renderer/        Readonly view and HTML export, both from each feature's content (`toHtml`).
├── editor/          The editing shell.
│   ├── RichTextEditor.tsx   The component a host mounts.
│   ├── parseHtml.ts         Stored HTML to a document; with useEditorHandle, the only file that loads the engine.
│   ├── port.ts              The seam between the shell and an engine.
│   ├── components/          Toolbar, floating bar, Turn into, `/` menu.
│   ├── helpers/             Pure logic the components share.
│   ├── hooks/               State and DOM wiring; useEditorHandle loads the engine for the live editor.
│   └── engines/prosemirror/ The only code that knows ProseMirror.
├── stories/         Storybook.
├── __tests__/       Package-level specs: rendering, HTML parity, SSR, type derivation.
├── documentFormat.ts  The closed document type for the shipped plugins.
└── index.ts           The public API.
```

Specs for a single module sit next to it (`registry.spec.ts` beside `registry.ts`).

## Scripts

`pnpm typecheck` · `pnpm lint` · `pnpm test` · `pnpm storybook` · `pnpm build`

## Browser tests

The browser tests (`*.ct.tsx`) run in Playwright.

- Chromium and WebKit run on every pull request that changes this package. The check must pass.
- Firefox runs every night. A failure there does not block a pull request.
- If a WebKit test is flaky, quarantine that test. Do not remove WebKit from the run.
- Playwright's WebKit is not Safari: input methods (IME) and some selection behaviour are different. Before a release, test the editor by hand in real Safari.
