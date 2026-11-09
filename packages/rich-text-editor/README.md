# @frontify/fondue-rich-text-editor

A plugin-based rich text editor for React. Documents are plain JSON (`RteDocument`);
every block, mark and inline comes from a plugin.

```tsx
import { defaultPlugins, RichTextEditor, RichTextRenderer } from '@frontify/fondue-rich-text-editor';
import '@frontify/fondue-rich-text-editor/styles';

<RichTextEditor plugins={defaultPlugins} value={doc} onChange={setDoc} />
<RichTextRenderer value={doc} />
```

The renderer needs no editing code, so it reads only each feature's content, not its plugin.
With no `plugins` it uses `defaultContent`. Pass your own content, or your plugins, when the
document holds more than the defaults.

## Writing a plugin

A feature has two parts. Its content (`defineContent`) says what exists: blocks, marks and
inlines, and how each one is written as HTML and read back. Its plugin (`definePlugin`) adds
the editing on top: toolbar buttons, editing views, keys and typing rules. Export both from one
file and mark each top-level call `/* @__PURE__ */`. A page that only shows documents then keeps
the content and its bundler drops the plugin with its editing code. A computed key or any other
side effect in a `definePlugin` argument stops the bundler from dropping it. The package's own
plugins are checked by a spec that fails when editing UI lands in the renderer bundle.

```tsx
export const highlightContent = /* @__PURE__ */ defineContent({
    marks: { highlight: /* @__PURE__ */ defineMark({ tag: 'mark' }) },
});

export const highlightPlugin = /* @__PURE__ */ definePlugin({
    content: highlightContent,
    toolbar: [{ icon: IconHighlight, shortcut: 'Mod-h' }],
});

<RichTextEditor plugins={[...defaultPlugins, highlightPlugin]} />
<RichTextRenderer plugins={[...defaultContent, highlightContent]} value={doc} />
```

A plugin with options is a function that returns `definePlugin(...)`, like `mentionPlugin({ items })`.

`@frontify/fondue-components`, `@frontify/fondue-icons` and `@frontify/fondue-tokens` are peer dependencies:
the host installs them beside this package and loads `@frontify/fondue-tokens/styles` and
`@frontify/fondue-components/styles`.

## Where things are

Layers import inward only; `oxlint.config.ts` enforces it.

```
src/
├── core/            The contract: document types, RtePlugin, the registry. Imports nothing else.
├── plugins/         One folder per feature (Bold, Link, List, …). Each imports only core and plugins/shared.
├── renderer/        Readonly view and HTML export, both from each feature's content (`toHtml`).
├── editor/          The editing shell.
│   ├── RichTextEditor.tsx   The component a host mounts.
│   ├── port.ts              The seam between the shell and an engine.
│   ├── components/          Toolbar, floating bar, Turn into, `/` menu.
│   ├── helpers/             Pure logic the components share.
│   ├── hooks/               State and DOM wiring; useEditorHandle is the only file that loads the engine.
│   └── engines/prosemirror/ The only code that knows ProseMirror.
├── stories/         Storybook.
├── __tests__/       Package-level specs: rendering, HTML parity, SSR, type derivation.
├── documentFormat.ts  The closed document type for the shipped plugins.
└── index.ts           The public API.
```

Specs for a single module sit next to it (`registry.spec.ts` beside `registry.ts`).

## Scripts

`pnpm typecheck` · `pnpm lint` · `pnpm test` · `pnpm storybook` · `pnpm build`
