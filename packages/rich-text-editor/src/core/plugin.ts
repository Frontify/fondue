/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type ReactNode } from 'react';

import { type EditorControlApi } from './commands';
import { type RteBlockNode, type RteInlineElementNode } from './document';

/**
 * A feature described in engine-agnostic terms. A plugin is a plain object: it
 * declares what exists (`schema`), how it looks (`toDom` / `renderComponent`),
 * and how to interact with it (toolbar, hotkeys, input rules, autocomplete).
 * It never executes anything itself — runtime effects go through the
 * EditorControlApi it is handed.
 *
 * Plugins are written as functions returning this object:
 *
 * ```ts
 * export const boldPlugin = (): RtePlugin => ({ id: 'bold', schema: [{ kind: 'mark', type: 'bold', … }] });
 * plugins={[boldPlugin(), mentionPlugin({ items })]}
 * ```
 */
export type RtePlugin = {
    id: string;
    schema?: readonly SchemaDefinition[];
    /** Toolbar UI for this feature. Re-rendered with the control API on every editor state change. */
    toolbar?: (api: EditorControlApi) => ReactNode;
    /**
     * Keybindings, keyed `Mod-b` style (Mod = Cmd on macOS, Ctrl elsewhere).
     * Return `false` to leave the key unhandled, so the editor's own bindings
     * (and the browser's) still run — that is how an Enter handler says it only
     * applies inside a list.
     */
    hotkeys?: Record<string, (api: EditorControlApi) => boolean | void>;
    /** Text rewritten as it is typed: markdown shortcuts and typography. */
    inputRules?: readonly RteInputRule[];
    /**
     * A suggestion menu opened by typing a trigger at the start of a word (`@`).
     * The editor anchors it, tracks the query, and routes keys; the plugin
     * decides what to show.
     */
    autocomplete?: {
        trigger: string;
        component: (context: AutocompleteContext) => ReactNode | null;
    };
    /**
     * A class for the editable element itself, for a feature that styles the
     * content as a whole rather than nodes it renders — the column layout.
     */
    contentClassName?: string;
    /**
     * Custom properties set alongside it, which is how a value configured on
     * the plugin reaches its stylesheet: `{ '--rte-columns': '3' }`.
     */
    contentProperties?: Record<string, string>;
};

export type SchemaDefinition = BlockDefinition | InlineDefinition | MarkDefinition | AttributeDefinition;

/**
 * One piece of data a block, inline or mark carries, stored flat on the
 * document node. Rendering writes it out; the fields below only say how to read
 * it back from pasted HTML.
 */
export type AttributeSpec = {
    /** Value when the attribute is absent. */
    default?: unknown;
    /**
     * The DOM attribute to read this one back from when parsing pasted HTML:
     * `href: { parseFromDomAttribute: 'href' }`, or a differently named one
     * (`id: { parseFromDomAttribute: 'data-mention-id' }`).
     */
    parseFromDomAttribute?: string;
    /**
     * Read it back from a CSS property instead, for a value that lives in the
     * style attribute — `color` for a font-color mark.
     */
    parseFromStyle?: string;
};

/** One rule for recognizing pasted HTML. */
export type ParseRule = {
    /** Element that is recognized, e.g. `h2` or `b`. */
    tag: string;
    /** Attribute values this element implies, e.g. `{ style: 'heading2' }` for `h2`. */
    attributes?: Record<string, unknown>;
};

/**
 * A static description of an HTML element. The engine turns this into its own
 * DOM output; `children: true` is the editable content hole. A string (or a
 * mix of strings and nested specs) is static content — a mention's `@label`.
 */
export type HtmlSpec = {
    tag: string;
    attrs?: Record<string, string>;
    children?: true | string | (HtmlSpec | string)[];
};

export type BlockDefinition = {
    kind: 'block';
    /** Stored on the document as `{ type }`. */
    type: string;
    attributes?: Record<string, AttributeSpec>;
    /**
     * What the block holds:
     * - omit            → leaf, no editable content (column break)
     * - `'text'`        → inline runs (paragraph, quote, heading)
     * - `{ items }`     → list wrapping that item type
     * - `{ blocks }`    → container of those block types (list item)
     */
    children?: 'text' | { items: string } | { blocks: readonly string[] };
    toDom: (attrs: Record<string, unknown>) => HtmlSpec;
    renderComponent: (props: { node: RteBlockNode; children?: ReactNode }) => ReactNode;
    editorComponent?: (props: {
        node: RteBlockNode;
        children?: ReactNode;
        updateAttributes: (attrs: Record<string, unknown>) => void;
    }) => ReactNode;
    parseRules?: readonly ParseRule[];
};

export type InlineDefinition = {
    kind: 'inline';
    type: string;
    attributes?: Record<string, AttributeSpec>;
    toDom: (attrs: Record<string, unknown>) => HtmlSpec;
    renderComponent: (props: { node: RteInlineElementNode }) => ReactNode;
    editorComponent?: (props: { node: RteInlineElementNode }) => ReactNode;
    parseRules?: readonly ParseRule[];
};

export type MarkDefinition = {
    kind: 'mark';
    type: string;
    attributes?: Record<string, AttributeSpec>;
    /**
     * Where this mark sits when marks nest on the same text: lower wraps
     * higher, ties keep the order their plugins were passed in. Defaults to
     * `0`.
     */
    nesting?: number;
    toDom: (attrs: Record<string, unknown>) => HtmlSpec;
    renderComponent: (props: { children: ReactNode; value: Record<string, unknown> }) => ReactNode;
    parseRules?: readonly ParseRule[];
};

/**
 * A field every text block carries (alignment). Same `schema` list as nodes —
 * not a parallel plugin key.
 */
export type AttributeDefinition = {
    kind: 'attribute';
    type: string;
    default?: string;
    toStyle: (value: string) => string;
    parseFromStyle?: string;
};

/**
 * A text pattern rewritten while typing. Declared, not implemented: the adapter
 * owns the matching, so a plugin never touches the engine's input machinery.
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

/** Consumes the key when it returns true, leaving it to the editor otherwise. */
export type AutocompleteKeyHandler = (event: KeyboardEvent<HTMLElement>) => boolean;

/** What the editor hands an autocomplete menu: the API, what was typed, and the keyboard. */
export type AutocompleteContext = {
    api: EditorControlApi;
    /** What has been typed after the trigger. */
    query: string;
    /**
     * Remove the trigger and its query from the document, so a choice can be
     * inserted in their place.
     */
    clearQuery(): void;
    /** Close without touching the text (Escape). */
    close(): void;
    /**
     * Take keys while this content is open, before the editor sees them — how a
     * picker gets the arrow keys without stealing the caret. Register from an
     * effect and return the result as its cleanup; registering again replaces
     * the previous handler, so re-running on every render is fine.
     */
    onKeys(handler: AutocompleteKeyHandler): () => void;
};
