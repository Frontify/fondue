/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The engine adapter: the ProseMirror implementation of the `CreateEditor` port.
 * This folder is the only place that knows ProseMirror exists (enforced by the
 * linter). It translates plugin declarations into engine configuration, hosts the
 * live editor, converts documents at the boundary, and implements the
 * EditorControlApi.
 *
 * Reading order:
 * - `editor.ts`      — the live editor and the handle React drives it through
 * - `schema.ts`      — the plugin set → one engine schema (`nodeSpecs`, `attributes`, `domSpec`)
 * - `document.ts`    — RTE format ↔ engine format
 * - `api/`           — the EditorControlApi, one file per thing it acts on
 * - `enginePlugins`  — the plugin stack: hotkeys, input rules, triggers, baseline
 * - `floating.ts`    — where a plugin's floating UI sits on screen
 * - `triggers.ts`    — which typed trigger is open, and what was typed after it
 * - `placeholder.ts` — the text shown while nothing has been typed
 * - `queries.ts`     — side-effect-free reads of the document around the selection
 *
 * One export, and deliberately so: everything the shell needs to say about a
 * live editor is said by the ports it already depends on.
 */

export { createEditor } from './editor';
