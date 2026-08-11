/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The engine adapter. This folder is the only place that knows ProseMirror
 * exists (enforced by ESLint): it translates plugin declarations into engine
 * configuration, hosts the live editor, converts documents at the boundary, and
 * implements the EditorControlApi.
 *
 * Reading order:
 * - `editor.ts`      — the live editor and the handle React drives it through
 * - `schema.ts`      — the plugin set → one engine schema (`nodeSpecs`, `attributes`, `render`)
 * - `document.ts`    — RTE format ↔ engine format
 * - `api/`           — the EditorControlApi, one file per thing it acts on
 * - `enginePlugins`  — the plugin stack: hotkeys, input rules, triggers, baseline
 * - `floating.ts`    — where a plugin's floating UI sits on screen
 * - `triggers.ts`    — which typed trigger is open, and what was typed after it
 * - `placeholder.ts` — the text shown while nothing has been typed
 * - `queries.ts`     — side-effect-free reads of the document around the selection
 *
 * Nothing else is exported: the component above imports only the handle.
 */

export { createEditor, type EditorHandle } from './editor';
export { type FloatingPlacement, type FloatingRect } from './floating';
