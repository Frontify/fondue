# Restructure `src/adapters/prosemirror/` to be self-explanatory

> **Status: done.** 18 files → 10, in `setup/` + `live/`. Verified: `tsgo --noEmit`
> clean, oxlint clean (only the two pre-existing warnings outside the adapter),
> `oxfmt --check` clean, and `dist/index.d.ts` **byte-identical** to the
> pre-change build (checked by building HEAD with the adapter stashed and
> diffing) — so the public API did not move. Behaviour covered by a 40-check
> Playwright pass over the stories, all green: undo/redo, all three bold paths,
> `*` vs `**` precedence, list toggle/split/indent/outdent/type-switch, reset
> formatting, mention trigger open/filter/dismiss/select, floating toolbar and
> link panel anchoring, paste of a check list + heading + quote, placeholder,
> readonly, the check-list checkbox, caret-after-mention, and injected align CSS.

## Context

The adapter is 18 small files (avg 66 lines) in one flat folder. Reading it requires preexisting knowledge: names are ProseMirror jargon (`domSpec.ts`), the paste parser hides in `attributes.ts`, "what happens when a key is pressed" crosses 9 files, "plugin" means three different things, and the load-bearing invariants exist only as scattered comments. Goal: fewer files whose names and grouping answer "what happens **when**, and **why**" — behavior identical, single export `createEditor` kept.

Scope: reshape freely (merge/split/rename), subfolders named by execution phase.

## Target structure (10 files, was 18)

```
src/adapters/prosemirror/
├── index.ts                    facade: one export + reading order covering every file
├── editor.ts                   orchestrator: run setup once, mount the view, wire live parts into the handle
├── engine.scss                 (unchanged)
├── setup/                      runs ONCE at mount; outputs frozen afterwards
│   ├── schema.ts               mounted features → one engine schema + SchemaBundle (absorbs nodeSpecs, domSpec, attr defaults)
│   ├── pasteRules.ts           how pasted HTML is recognized (the parser hidden in attributes.ts, surfaced)
│   └── keystrokes.ts           the ordered key-press pipeline (absorbs enginePlugins + inputRules)
└── live/                       closes over the mounted view; runs per keystroke / per read
    ├── controlApi.ts           EditorControlApi: selection snapshot first, then marks, blocks, assembly (absorbs api/)
    ├── lists.ts                everything list: findList/findItemType + list commands + list keybindings
    ├── documentConversion.ts   RTE wire format ↔ engine doc + shared node-reading helpers (was document.ts)
    ├── floating.ts             trigger tracking + anchor resolution + screen-rect geometry (absorbs triggers.ts)
    └── placeholder.ts          empty-doc decoration (pure move)
```

Naming: `setup/` vs `live/` — a file in `live/` cannot work without a living `EditorView`; a file in `setup/` never touches one. `editor.ts` spans both, so it stays at the root.

One deliberate cross-phase import, documented in the keystrokes header: `setup/keystrokes.ts` imports `triggerTrackingPlugin` from `live/floating.ts` and `listKeys` from `live/lists.ts` — **setup wires what live runs**. (`live/*` importing the `SchemaBundle` type is type-only.)

## Vocabulary + renames

- Inside the adapter, an `RtePlugin` is a **feature** (`features: RtePlugin[]`); bare "plugin" always means a ProseMirror plugin. Stated once in `index.ts`, applied everywhere.
- Drop the `pm` prefix on adapter-defined names: `pmParseDom` → `pasteRules`, `pmAttrs` → `attrDefaults`, `documentToPm`/`pmToDocument` → `toEngineDocument`/`toRteDocument`, `shallowBlockFromPm` → `shallowBlock`, `buildEnginePlugins` → `keystrokePipeline`, `createApi` → `createControlApi`, `triggerPlugin` → `triggerTrackingPlugin`. Import aliases for foreign types (`PmPlugin`) stay.
- `queries.ts` dissolves: `findList`/`findItemType` → `live/lists.ts`; `findMarkRange` → `live/controlApi.ts` (exported; floating imports it).

## Where each pain point lands

- **Keystroke story in one place:** `setup/keystrokes.ts` opens with a numbered narrative (undo keys → feature hotkeys, merged first-taker-wins → list keys → input rules → trigger tracking → engine baseline); the returned array carries matching `// (1)`…`// (6)` comments.
- **Three bold paths documented** in the keystrokes header: toolbar → api, hotkey → same api, typing `**bold**` → input rule that builds the transaction directly, bypassing the control api (the engine's rule machinery owns undo grouping there). Cross-referenced from controlApi's marks section.
- **Lists get a home:** `live/lists.ts` holds lookup + commands + `listKeys` (moved out of enginePlugins); header names the two facts that must live elsewhere and why (schema declares `isList` in setup; the pipeline slots list keys in keystrokes).
- **editor.ts temporal coupling named, not removed:** three banner sections (setup — runs once / mount / the live handle); `() => api` becomes a named `getApi` with a late-binding docblock; `readOnlyNow`/`placeholderNow` grouped as `const current = { readOnly, placeholder }` with `refresh()` documented as "re-read `current` and redraw".
- **Invariants promoted** to numbered top-of-file blocks with `// invariant (n)` back-references in code:
  - `setup/schema.ts`: paragraph declared first = default block; mark declaration order = nesting order; `defining: true` on non-list content blocks; list items stay out of the `block` group.
  - `setup/pasteRules.ts`: qualified selectors (priority 60) outrank bare tags, or the paragraph baseline swallows every pasted `p`.
  - `setup/keystrokes.ts`: feature hotkeys precede list keys (blurOnBreak takes Enter); longer mark delimiters sort first (`**` before `*`); array order IS the precedence.
- **index.ts facade docblock rewritten** to state the vocabulary rule, the two-phase folder layout, and a reading order that names all nine files (the current one omits a third of the folder).

## Constraints verified

- `oxlint.config.ts`: **no changes needed** — all adapter globs are whole-folder (`src/adapters/prosemirror/**`, lines 92/180), so `setup/`/`live/` are covered. New files must carry the copyright header and import only `#/domain` + `#/ports`.
- Sole external importer is `src/ui/hooks/useEditorHandle.ts` via the facade — untouched.
- `src/domain/` and `src/ports/` contracts unchanged; `dist/index.d.ts` must stay name-for-name identical (checked by diff, step 10).

## Implementation steps (each leaves `tsgo --noEmit` green)

1. Baseline: `pnpm build`, stash `dist/index.d.ts`; typecheck + lint clean.
2. Extract `setup/pasteRules.ts` from `attributes.ts` (rename `pmParseDom` → `pasteRules`, add invariant block); update importers.
3. Build `setup/schema.ts`: merge `schema.ts` + `nodeSpecs.ts` + rest of `attributes.ts` + `domSpec.ts`; internalize helpers; section banners + invariants; delete the four old files; fix import paths.
4. Move `document.ts` → `live/documentConversion.ts` with export renames; label shared-helpers section; fix importers.
5. Build `live/lists.ts`: `api/lists.ts` + `findList`/`findItemType` + `listKeyCommands` (from enginePlugins, renamed `listKeys`).
6. Build `live/floating.ts`: merge `triggers.ts` + `floating.ts` (sections: trigger tracking / anchors / geometry); fix importers; delete originals.
7. Build `live/controlApi.ts`: merge `api/index|selection|marks|blocks` + `findMarkRange`; snapshot-first ordering; delete `queries.ts` + `api/`; update editor + floating.
8. Build `setup/keystrokes.ts`: merge `enginePlugins.ts` + `inputRules.ts`; numbered precedence narrative + three-bold-paths note + invariants; delete originals.
9. Move `placeholder.ts` → `live/placeholder.ts`; polish `editor.ts` (banners, `getApi`, `current`); rewrite `index.ts` docblock; sweep `plugins` → `features` param names.
10. Verify: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` + diff `dist/index.d.ts` against baseline (must be identical), then Storybook (port 6012) Playwright smoke: typing + undo/redo; bold via toolbar/Mod-b/`**bold**`; `*` vs `**`; list toggle/split/indent/outdent/type-switch in place; reset formatting; `@` mention combobox open/filter/dismiss/select; floating toolbar rect; paste HTML (`p` text-style + `data-check-list` `ul` survive); placeholder; readOnly/placeholder prop flips keep selection + history; checkbox toggle click; mention click places caret after.
