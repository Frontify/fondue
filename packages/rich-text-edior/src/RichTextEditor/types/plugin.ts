/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type ReactNode } from 'react';

import { type EditorControlApi } from './api';
import { type BlockAttributeSpec, type BlockSpec, type InlineSpec, type MarkSpec } from './schema';

/**
 * The plugin declaration, plus the interaction pieces only a plugin declares:
 * input rules and floating UI.
 */

/**
 * A feature described in engine-agnostic terms. A plugin is a plain object:
 * it declares what exists (schema), how it looks (render), and how to interact
 * with it (toolbar, hotkeys, input rules, combobox) — and never executes
 * anything itself; runtime effects go through the EditorControlApi it is handed.
 *
 * Plugins are written as functions returning this object, which is what makes
 * options a plain parameter and keeps the literal contextually typed:
 *
 * ```ts
 * export const boldPlugin = (): RtePlugin => ({ id: 'bold', … });
 * plugins={[boldPlugin(), mentionPlugin({ items })]}
 * ```
 *
 * Styling is not part of this contract: a plugin's render function puts its own
 * SCSS-module class on the elements it returns, which is also how its toolbar UI
 * is styled. The two fields below are the exception — a feature that lays out
 * the *whole* content has nothing of its own to hang a class on.
 */
export type RtePlugin = {
    id: string;
    /** The document schema this plugin contributes. */
    schema?: {
        blocks?: readonly BlockSpec[];
        inlines?: readonly InlineSpec[];
        marks?: readonly MarkSpec[];
        /**
         * Attributes added to *every* text block rather than to one block type
         * — how alignment applies to paragraphs, headings and list items alike.
         */
        blockAttributes?: readonly BlockAttributeSpec[];
    };
    /** Toolbar UI for this feature. Re-rendered with the control API on every editor state change. */
    toolbar?: (api: EditorControlApi) => ReactNode;
    /**
     * Keybindings, keyed `Mod-b` style (Mod = Cmd on macOS, Ctrl elsewhere).
     * Return `false` to leave the key unhandled, so the editor's own bindings
     * (and the browser's) still run — an Enter handler that only applies inside
     * a list says so that way.
     */
    hotkeys?: Record<string, (api: EditorControlApi) => boolean | void>;
    /** Text rewritten as it is typed: markdown shortcuts and typography. */
    inputRules?: readonly RteInputRule[];
    /**
     * UI floating over the content rather than sitting in the toolbar: the panel
     * under a link, the picker at a typed `@`. One mechanism for all of it — see
     * `FloatingSpec`. A plugin may declare more than one.
     */
    floating?: readonly FloatingSpec[];
    /**
     * A class for the editable element itself, for a feature that styles the
     * content as a whole rather than nodes it renders — the column layout.
     */
    contentClassName?: string;
    /**
     * Custom properties set alongside it, which is how a value configured on the
     * plugin reaches its stylesheet: `{ '--rte-columns': '3' }`.
     */
    contentProperties?: Record<string, string>;
};

/**
 * A text pattern rewritten while typing. Declared, not implemented: the
 * adapter owns the matching, so a plugin never touches the engine's input
 * machinery.
 */
export type RteInputRule =
    /** Plain substitution once `match` has been typed: `-->` becomes `→`, `(c)` becomes `©`. */
    | { kind: 'text'; match: string; replaceWith: string }
    /** Typographic quotes: `"` becomes `open` at the start of a word, `close` after one. */
    | { kind: 'quotes'; match: string; open: string; close: string }
    /** Wrapping delimiters turn into a mark: `**bold**`, `` `code` ``. */
    | { kind: 'mark'; key: string; delimiter: string }
    /** A prefix turns the block into another type: `## ` becomes a level-2 heading. */
    | { kind: 'block'; match: string; block: string; attributes?: Record<string, unknown> }
    /** A prefix wraps the block in a list: `- `, `1. `. */
    | { kind: 'list'; match: string; list: string };

/**
 * What a piece of floating UI hangs under. Each kind answers the one question
 * the plugin cannot: which stretch of the document this UI is about.
 *
 * - `'selection'` — the caret, or the range that is selected.
 * - `{ mark }` — the whole run of that mark around the selection. A link's panel
 *   stays put while the caret moves inside the link, and there is no anchor at
 *   all while the selection is outside one.
 * - `{ trigger }` — text typed after a trigger character at the start of a word
 *   (`@`, `:`). Open while the typed query has no spaces, and closed by Escape
 *   until the caret moves on. What was typed arrives as `query`.
 */
export type FloatingAnchor = 'selection' | { mark: string } | { trigger: string };

/** Consumes the key when it returns true, leaving it to the editor otherwise. */
export type FloatingKeyHandler = (event: KeyboardEvent<HTMLElement>) => boolean;

/** What the editor hands floating content: the API, what was typed, and the keyboard. */
export type FloatingContext = {
    api: EditorControlApi;
    /** For a `{ trigger }` anchor: what has been typed after it. Empty for the others. */
    query: string;
    /**
     * Remove the trigger and its query from the document, so a choice can be
     * inserted in their place. Does nothing for the other anchors.
     */
    clearQuery(): void;
    /** Close without touching the text (Escape). Does nothing for the other anchors. */
    close(): void;
    /**
     * Take keys while this content is open, before the editor sees them — how a
     * picker gets the arrow keys without stealing the caret. Register from an
     * effect and return the result as its cleanup; registering again replaces
     * the previous handler, so re-running on every render is fine.
     */
    onKeys(handler: FloatingKeyHandler): () => void;
};

/**
 * UI that floats over the content: the panel under a link, the picker at a typed
 * `@`. The split is the same in both cases, and it is why there is one mechanism
 * rather than two: only the editor can turn a document position into a place on
 * screen and route keys away from the caret, and only the plugin knows what to
 * put there. So the plugin returns content and nothing else — the editor anchors
 * it, shows it, and takes it away when the anchor is gone.
 *
 * `render` runs on every editor state change, so it reads what to show straight
 * off the API rather than tracking the editor itself.
 */
export type FloatingSpec = {
    anchor: FloatingAnchor;
    /**
     * What to show, or null for "not now" — which is how a plugin narrows the
     * anchor further (a link shows its panel only for a caret sitting in one,
     * not for a selection dragged across it; a picker shows nothing when the
     * query matches no items). Returning null has to happen *here* rather than
     * inside a component: it is what tells the editor there is nothing to open.
     */
    render: (context: FloatingContext) => ReactNode;
};
