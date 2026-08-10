/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

/**
 * Every contract the editor is built on, all engine-agnostic: the document
 * format, the plugin declaration, and the API plugins act through.
 * `prosemirror.ts` is the only module that translates them into engine terms.
 */

// ---------------------------------------------------------------------------
// The document
// ---------------------------------------------------------------------------

/**
 * The canonical RTE document: what gets stored and sent over the wire. It is
 * NOT the editor's internal representation — the adapter converts to and from
 * the engine's native format at the boundary.
 *
 * This is the *open* form, parameterized over the blocks it may contain: the
 * editor knows only the structural skeleton plus the paragraph baseline.
 * Concrete blocks and marks are declared by the plugins implementing them,
 * and the package root closes the parameter over the official union —
 * `RteDocument` (no `Of`) is the type consumers use.
 */
export type RteDocumentOf<TBlock extends RteBlockNode = RteBlockNode> = {
    version: 1;
    blocks: TBlock[];
};

/**
 * Structural shape of any block. Plugin-declared attributes (a heading's
 * `level`) live flat on the node; the adapter reads them generically by the
 * names the plugin registered.
 */
export type RteBlockNode = {
    type: string;
    /** Absent on void blocks (e.g. images), which carry data in attributes only. */
    children?: RteInlineNode[];
};

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
export type ParagraphBlock = {
    type: 'paragraph';
    children: RteInlineNode[];
};

/** What can sit inside a block: text runs, or void inline elements (mentions). */
export type RteInlineNode = RteTextNode | RteInlineElementNode;

/**
 * A text leaf. Marks live flat on the node, keyed by the mark key a plugin
 * registered: plain marks as booleans (`bold: true`), value-carrying marks as
 * objects (`link: { href }`). The index signature makes the format open — a
 * stored document may carry marks from plugins this build doesn't know.
 * Authoring goes through the package root's closed `RteText`, which lists the
 * marks that actually ship, so typos in mark keys are caught.
 */
export type RteTextNode = {
    text: string;
    [mark: string]: unknown;
};

/**
 * A void inline element (e.g. a mention): no text content of its own, data
 * lives flat in attributes. Discriminated from text nodes by having `type`
 * instead of `text`, and open for the same reason.
 */
export type RteInlineElementNode = {
    type: string;
    [attribute: string]: unknown;
};

// ---------------------------------------------------------------------------
// The plugin contract
// ---------------------------------------------------------------------------

/**
 * A feature described in engine-agnostic terms. A plugin is a plain object:
 * it declares what exists (schema), how it looks (render, styles), and how to
 * interact with it (toolbar, hotkeys) — and never executes anything itself;
 * runtime effects go through the EditorControlApi it is handed.
 */
export type RtePlugin = {
    id: string;
    /** The document schema this plugin contributes. */
    schema?: {
        blocks?: readonly BlockSpec[];
        inlines?: readonly InlineSpec[];
        marks?: readonly MarkSpec[];
    };
    /** Toolbar UI for this feature. Re-rendered with the control API on every editor state change. */
    toolbar?: (api: EditorControlApi) => ReactNode;
    /** Keybindings, keyed `Mod-b` style (Mod = Cmd on macOS, Ctrl elsewhere). */
    hotkeys?: Record<string, (api: EditorControlApi) => void>;
    /**
     * CSS for this plugin's rendered output. Selectors are plain
     * (`blockquote { … }`) — the editor scopes them to its own content.
     */
    styles?: string;
};

/**
 * Declaration of one piece of data a block, inline, or mark carries. Stored
 * flat on the document node; rendering writes it out itself, so the only
 * parse-side concern is reading it back from HTML.
 */
export type AttributeSpec = {
    /** Value when the attribute is absent. */
    default?: unknown;
    /**
     * Read this attribute back from a DOM attribute when parsing pasted HTML
     * — e.g. an image's `src`. Pass a string when the DOM attribute is named
     * differently (`id: { parseFromDomAttribute: 'data-mention-id' }`).
     */
    parseFromDomAttribute?: boolean | string;
};

/** One rule for recognizing pasted HTML. */
export type ParseRule = {
    /** Element that is recognized, e.g. `h2` or `b`. */
    tag: string;
    /** Attribute values this element implies, e.g. `{ level: 2 }` for `h2`. */
    attributes?: Record<string, unknown>;
};

export type BlockSpec = {
    /** Block type name stored on document nodes, e.g. `heading`. */
    type: string;
    /** The data this block carries — a heading's `level`, an image's `src`. */
    attributes?: Record<string, AttributeSpec>;
    /** True for blocks without editable text (e.g. images); void blocks have no `children`. */
    isVoid?: boolean;
    /**
     * How the block looks: a React render function returning a single root
     * element, with `children` as the editable content slot. This is the
     * single source of rendering truth — copy/paste is derived from its output.
     */
    render: (props: { node: RteBlockNode; children: ReactNode }) => ReactNode;
    /** How pasted HTML becomes this block, e.g. `[{ tag: 'h2', attributes: { level: 2 } }]`. */
    parseRules?: readonly ParseRule[];
};

export type InlineSpec = {
    /** Inline type name stored on inline nodes, e.g. `mention`. */
    type: string;
    /** The data this inline carries — a mention's `id` and `label`. */
    attributes?: Record<string, AttributeSpec>;
    /**
     * How the inline looks. Inline elements are void: there is no children
     * slot, visible content (`@{label}`) is rendered from the attributes.
     */
    render: (props: { node: RteInlineElementNode }) => ReactNode;
    /** How pasted HTML becomes this inline, e.g. `[{ tag: 'span[data-mention-id]' }]`. */
    parseRules?: readonly ParseRule[];
};

export type MarkSpec = {
    /** Flag name stored on text nodes, e.g. `bold` — `{ text: 'x', bold: true }`. */
    key: string;
    /**
     * The data this mark carries, stored as an object under the mark key —
     * a link's `href` gives `{ text: '…', link: { href } }`. Marks without
     * attributes are stored as plain `true`.
     */
    attributes?: Record<string, AttributeSpec>;
    /**
     * How the mark looks: a single element wrapping `children`. That element
     * is also recognized when parsing pasted HTML.
     */
    render: (props: { children: ReactNode; value: Record<string, unknown> }) => ReactNode;
    /** Additional rules for recognizing pasted HTML, e.g. `[{ tag: 'b' }]` for bold. */
    parseRules?: readonly ParseRule[];
};

// ---------------------------------------------------------------------------
// The control API
// ---------------------------------------------------------------------------

/**
 * The API exposed to plugins. This is the seam that hides the engine: if the
 * engine is swapped, this interface stays stable and only the adapter changes.
 * Plugin code never imports from the engine, only from here.
 */
export type EditorControlApi = {
    /** Toggle a mark on the selection. `value` sets the mark's attributes when turning it on (`{ href }` for links). */
    toggleMark(key: string, value?: Record<string, unknown>): void;
    isMarkActive(key: string): boolean;

    setBlockType(type: string, attrs?: Record<string, unknown>): void;
    isBlockActive(type: string, attrs?: Record<string, unknown>): boolean;
    /** Insert a node at the selection — how void blocks (images) and inline elements (mentions) get added. */
    insert(type: string, attrs?: Record<string, unknown>): void;
    /** The block the selection starts in — type and attributes only, no children. For toolbar state. */
    getCurrentBlock(): RteBlockNode | null;

    isSelectionCollapsed(): boolean;
    /** Return focus to the editor, e.g. after closing plugin UI. */
    focus(): void;
};
