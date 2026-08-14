/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The engine adapter: the ProseMirror implementation of the `CreateEditor`
 * port. This folder is the only place that knows ProseMirror exists (enforced
 * by the linter).
 *
 * VOCABULARY. In here, a "feature" is an `RtePlugin` from the domain — Bold,
 * Mention, one a consumer wrote. "Plugin" on its own always means a ProseMirror
 * plugin. The whole job of this folder is turning the first into the second.
 *
 * TWO PHASES, TWO FOLDERS, which answers "when does this run":
 * - `setup/` runs ONCE, at mount, and its results are frozen afterwards. Nothing
 *   in it has ever seen an `EditorView`.
 * - `live/` closes over the mounted view and runs on every keystroke and every
 *   read. Nothing in it works without a living editor.
 * `editor.ts` spans both, which is why it sits outside either. They meet in
 * `setup/keystrokes.ts`: setup assembles the pipeline, live is what it runs.
 *
 * Reading order:
 * - `editor.ts`                  — the orchestrator: setup once, mount, then wire the live parts into the handle
 * - `setup/schema.ts`            — the mounted features → one engine schema, plus what the commands need to know about it
 * - `setup/pasteRules.ts`        — how pasted HTML is recognized as one of our blocks or marks
 * - `setup/keystrokes.ts`        — what happens when a key is pressed, as one ordered pipeline
 * - `live/controlApi.ts`         — the api features drive: the selection snapshot, then mark and block commands
 * - `live/lists.ts`              — everything list: which list the caret is in, the commands, the three keys
 * - `live/documentConversion.ts` — the document boundary: RTE format ↔ engine format
 * - `live/floating.ts`           — where floating UI hangs: trigger tracking, anchors, screen rects
 * - `live/placeholder.ts`        — the text shown while nothing has been typed
 */

export { createEditor } from './editor';
