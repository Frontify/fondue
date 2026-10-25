---
"@frontify/fondue-rich-text-editor": major
---

feat(RichTextEditor): release 1.0, the first published version of the rich text editor

### API

- `@frontify/fondue-rich-text-editor`: `RichTextEditor` and its parts, `defineEditor`, `modelOf`, `pluginsById`, one plugin unit per shipped feature (such as `boldPlugin`), the profiles, the editor handle, and the form and persistence hooks.
- `./authoring`: `definePlugin`, `defineEditorPart`, `extendPlugin`, `defineReaderFeature`, `defineReactPresentation`, the editor API types, and the dialog, listbox, menu and node chrome building blocks. An editor part declares the API facets its commands use in `needs`.
- `./model`: `defineFeature`, `compileContentModel`, `decodeDocument`, `migrateDocument`, `toJsonSchema`, the content checks and the reference and asset helpers.
- `./features`: the shipped features and the inline, comment, document and brand document profiles.
- `./reader`: `RichTextReader` and `defineReaderFeature`. `./codecs`: `createCodecs` for HTML, Markdown and plain text, whose results carry `blocked`. `./html`: `fromHTML`.
- `./testing`: `runFeatureContract`, the persistence, upload and reference service kits, and the keyboard helpers.
- `./locales/*` and `./styles`.

### Format

- Documents store `format: 'frontify.rich-text'` and `formatVersion: 1`. Each profile model writes and reads version 1, as the Compatibility guide lists, with its JSON Schema published per model and version.

### Output

- `RichTextReader` and the codecs render every shipped feature from stored JSON with no editing engine, on the server and in the browser.

### Interaction

- Keyboard model, toolbar, overlays, paste and drop, input rules and content checks of the shipped features, as the Accessibility guide and the 1.0.0 accessibility report describe.

### Dependencies

The versions `pnpm-lock.yaml` resolves for this release:

- `@radix-ui/react-toolbar@1.1.19`
- `emojibase-data@17.0.0`
- `lowlight@3.3.0`
- `markdown-it@15.0.2`
- `prosemirror-commands@1.7.2`
- `prosemirror-dropcursor@1.8.4`
- `prosemirror-gapcursor@1.4.1`
- `prosemirror-history@1.5.1`
- `prosemirror-keymap@1.2.3`
- `prosemirror-model@1.25.12`
- `prosemirror-schema-list@1.5.1`
- `prosemirror-state@1.4.4`
- `prosemirror-transform@1.12.2`
- `prosemirror-view@1.42.6`
