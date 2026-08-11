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
 *
 * `children` holds text runs for a text block, or other blocks for a container
 * block (a list holds its items). Which one applies follows from the block's
 * declared `content`, so the adapter never has to guess. Void blocks (images)
 * have no `children` at all.
 */
export type RteBlockNode = {
    type: string;
    children?: RteInlineNode[] | RteBlockNode[];
};

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
export type ParagraphBlock = {
    type: 'paragraph';
    children: RteInlineNode[];
};

/** What can sit inside a text block: text runs, or void inline elements (mentions, line breaks). */
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
 * interact with it (toolbar, hotkeys, input rules, combobox) — and never
 * executes anything itself; runtime effects go through the EditorControlApi it
 * is handed.
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
    /** A caret-anchored picker opened by a trigger character (a mention's `@`, an emoji's `:`). */
    combobox?: ComboboxSpec;
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
    /**
     * Read this attribute back from a CSS property when parsing pasted HTML —
     * e.g. `color` for a font-color mark, whose value lives in the style
     * attribute rather than in one of its own.
     */
    parseFromStyle?: string;
};

/** One rule for recognizing pasted HTML. */
export type ParseRule = {
    /** Element that is recognized, e.g. `h2` or `b`. */
    tag: string;
    /** Attribute values this element implies, e.g. `{ level: 2 }` for `h2`. */
    attributes?: Record<string, unknown>;
};

export type BlockSpec = {
    /** Block type name stored on document nodes, e.g. `heading`. Word characters only — the engine's content grammar has no room for dashes. */
    type: string;
    /** The data this block carries — a heading's `level`, an image's `src`. */
    attributes?: Record<string, AttributeSpec>;
    /**
     * What sits inside the block: editable text (the default), or other blocks
     * for a container such as a list or a list item.
     */
    content?: 'text' | 'blocks';
    /**
     * With `content: 'blocks'`, the block types allowed inside. The first entry
     * is what a newly created block gets filled with, so put the text-bearing
     * one first (`['paragraph', 'bulletList']` for a list item).
     */
    contains?: readonly string[];
    /**
     * True for a list: a container whose `contains` names its item type. It is
     * what makes the list commands (`toggleList`, `indentListItem`, …) work on
     * this block — they read the item type from here rather than being told.
     */
    isList?: boolean;
    /** True for blocks without editable text (e.g. images); void blocks have no `children`. */
    isVoid?: boolean;
    /**
     * How the block looks: a React render function whose markup becomes the
     * engine's description of the block. Nested elements are kept — a check
     * item can draw a checkbox beside its text — under one rule: `children`,
     * the editable content slot, must be the only thing inside its own element.
     * This is the single source of rendering truth; copy/paste derives from it.
     *
     * An element carrying `data-rte-toggle="<attribute>"` (a checkbox) flips
     * that boolean attribute when clicked, which is how a void control inside
     * an otherwise declarative render stays interactive.
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
     * slot, visible content (`@{label}`) is rendered from the attributes, and
     * nested elements are kept as rendered.
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

/**
 * An attribute every text block carries, contributed by one plugin but applied
 * across block types. It affects the block's appearance through CSS rather than
 * through the owning plugin's render function, which is what lets alignment
 * work on blocks the align plugin knows nothing about.
 */
export type BlockAttributeSpec = {
    /** Attribute name stored on block nodes, e.g. `align`. */
    name: string;
    /** Value when the attribute is absent. */
    default?: unknown;
    /**
     * The CSS a value applies to the block element, e.g. `text-align: center`.
     * Values are strings — clear the attribute by setting it to null.
     */
    toStyle: (value: string) => string;
    /** Read the value back from this CSS property when parsing pasted HTML, e.g. `text-align`. */
    parseFromStyle?: string;
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

/** One choice in a combobox. `hint` is the secondary text — an emoji glyph, a user's email. */
export type ComboboxItem = {
    id: string;
    label: string;
    hint?: string;
};

/**
 * A picker that opens at the caret when `trigger` is typed at the start of a
 * word, and stays open while the query has no spaces. The editor renders the
 * list and drives it from the keyboard; the plugin only supplies items and
 * acts on the choice.
 */
export type ComboboxSpec = {
    /** The character that opens it, e.g. `@`. */
    trigger: string;
    /** Choices for what has been typed after the trigger. Called on every keystroke. */
    items: (query: string) => readonly ComboboxItem[];
    /** Insert the choice. The trigger and its query are already removed from the document. */
    onSelect: (item: ComboboxItem, api: EditorControlApi) => void;
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
    /**
     * The attributes of a value-carrying mark at the selection (`{ href }` for a
     * link, `{ color }` for font colour), or null when the mark is not there —
     * what plugin UI needs to show the current value instead of just on/off.
     */
    getMarkValue(key: string): Record<string, unknown> | null;
    /** Strip every mark from the selection — the formatting half of "reset formatting". */
    removeAllMarks(): void;

    setBlockType(type: string, attrs?: Record<string, unknown>): void;
    isBlockActive(type: string, attrs?: Record<string, unknown>): boolean;
    /** Set attributes on every block the selection touches — how alignment is applied. */
    updateBlockAttributes(attrs: Record<string, unknown>): void;
    /** Insert a node at the selection — how void blocks (images) and inline elements (mentions) get added. */
    insert(type: string, attrs?: Record<string, unknown>): void;
    /** Insert plain text at the selection, marks and all — what a combobox choice usually comes down to. */
    insertText(text: string): void;
    /** The block the selection starts in — type and attributes only, no children. For toolbar state. */
    getCurrentBlock(): RteBlockNode | null;

    /**
     * Wrap the selection in a list, or unwrap it when it already is one of that
     * type. Switching between list types converts in place.
     */
    toggleList(type: string): void;
    /** Nest the current list item under the one above it. Returns false when there is nothing to nest. */
    indentListItem(): boolean;
    /** Lift the current list item out one level, leaving the list entirely at the top. */
    outdentListItem(): boolean;
    /** Split the current list item in two — Enter inside a list. Returns false outside one. */
    splitListItem(): boolean;
    /**
     * Replace every list the selection touches with the blocks its items held.
     * Unlike `outdentListItem`, this works on a selection that merely *contains*
     * lists rather than sitting inside one — what "reset formatting" needs.
     */
    unwrapLists(): boolean;

    isSelectionCollapsed(): boolean;
    /** Return focus to the editor, e.g. after closing plugin UI. */
    focus(): void;
    /** Give up focus, e.g. to commit a single-line editor on Enter. */
    blur(): void;
};
