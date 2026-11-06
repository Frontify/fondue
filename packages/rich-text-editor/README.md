# @frontify/fondue-rich-text-editor

A plugin-based rich text editor for React. Documents are plain JSON (`RteDocument`);
every block, mark and inline comes from a plugin.

```tsx
import { defaultPlugins, RichTextEditor, RichTextRenderer } from '@frontify/fondue-rich-text-editor';
import '@frontify/fondue-rich-text-editor/styles';

<RichTextEditor plugins={defaultPlugins} value={doc} onChange={setDoc} />
<RichTextRenderer plugins={defaultPlugins} value={doc} />
```

`@frontify/fondue-components`, `@frontify/fondue-icons` and `@frontify/fondue-tokens` are peer dependencies:
the host installs them beside this package and loads `@frontify/fondue-tokens/styles` and
`@frontify/fondue-components/styles`.

## Where things are

Layers import inward only; `oxlint.config.ts` enforces it.

```
src/
├── core/            The contract: document types, RtePlugin, the registry. Imports nothing else.
├── plugins/         One folder per feature (Bold, Link, List, …). Each imports only core and plugins/shared.
├── renderer/        Readonly view and HTML export, both from each plugin's `toHtml`.
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

## Browser tests

The browser tests (`*.ct.tsx`) run in Playwright.

- Chromium and WebKit run on every pull request that changes this package. The check must pass.
- Firefox runs every night. A failure there does not block a pull request.
- If a WebKit test is flaky, quarantine that test. Do not remove WebKit from the run.
- Playwright's WebKit is not Safari: input methods (IME) and some selection behaviour are different. Before a release, test the editor by hand in real Safari.
