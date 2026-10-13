/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent, type ReactNode } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from './commands';
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
    /**
     * Inline nodes in the component-based shape (`defineInline`), keyed by
     * type. The editor only renders `editorComponent` with generic props; every
     * behaviour beyond that belongs to the plugin.
     */
    inlines?: Record<string, InlineNodeDefinition>;
    /** Marks in the component-based shape (`defineMark`), keyed by type. */
    marks?: Record<string, MarkNodeDefinition>;
    /**
     * This feature's control in the toolbar. Re-rendered on every editor state
     * change, handed the feature's own node at the selection (or null) and the
     * commands bound to it — so a button is `isActive` + `toggle`.
     */
    toolbarItem?: (props: ToolbarItemProps) => ReactNode;
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

/** One rule for recognizing pasted HTML. Required on every block, inline and mark. */
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
    /** How pasted HTML becomes this block. Always listed — nothing is inferred from `toDom`. */
    parseRules: readonly ParseRule[];
};

export type InlineDefinition = {
    kind: 'inline';
    type: string;
    attributes?: Record<string, AttributeSpec>;
    toDom: (attrs: Record<string, unknown>) => HtmlSpec;
    renderComponent: (props: { node: RteInlineElementNode }) => ReactNode;
    editorComponent?: (props: { node: RteInlineElementNode }) => ReactNode;
    /** How pasted HTML becomes this inline. Always listed — nothing is inferred from `toDom`. */
    parseRules: readonly ParseRule[];
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
    /** How pasted HTML becomes this mark. Always listed — nothing is inferred from `toDom`. */
    parseRules: readonly ParseRule[];
    /** Set when the mark came from `RtePlugin.marks` (`defineMark`): the engine stores its value whole. */
    valueMark?: MarkNodeDefinition;
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

/** Read a node's value back from a pasted element. */
export type NodeParseRule<TValue> = {
    /** Element that is recognized, e.g. `a[data-mention-id]`. */
    tag: string;
    value: (element: HTMLElement) => TValue;
};

/** What the editor hands an inline node's `editorComponent`. */
export type InlineEditorProps<TValue> = {
    /** The node's value, or null until it has one (inserted without attributes). */
    value: TValue | null;
    /** Store a new value on the node. */
    setValue: (value: TValue) => void;
    /** The editor's selection is on this node, or the caret sits right after it. */
    isFocused: boolean;
    /** The node is inside a selected range of text. The editor already paints the highlight over it. */
    isSelected: boolean;
    /** Its editing UI is open — set by `setOpen`, or from outside (the toolbar's `openEditor`). */
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    /** Delete the node, leaving the caret where it was. */
    remove: () => void;
    api: EditorControlApi;
};

/**
 * An inline node described by components: portable markup (`toHtml`), how to
 * read it back (`parse`), how it looks readonly (`renderComponent`) and
 * everything shown while editing (`editorComponent`, defaults to
 * `renderComponent`). Its value is stored flat on the document node.
 */
export type InlineNodeDefinition<TValue = Record<string, unknown>> = {
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly NodeParseRule<TValue>[];
    renderComponent: (props: { value: TValue }) => ReactNode;
    editorComponent?: (props: InlineEditorProps<TValue>) => ReactNode;
};

/**
 * Types an inline node's callbacks by its value, then erases the type so the
 * definition fits `RtePlugin.inlines` beside nodes with other values.
 */
export const defineInline = <TValue extends object>(definition: InlineNodeDefinition<TValue>): InlineNodeDefinition =>
    definition as unknown as InlineNodeDefinition;

/**
 * The plugin's own node at the selection: the first type it declares (a mark,
 * an inline, a block), found around the selection. For a mark it is the whole
 * run, edges included — a caret at the end of a link still finds the link.
 */
export type SelectedNode = {
    type: string;
    /** Its value — a mark's attributes, a block's attributes. */
    value: Record<string, unknown>;
    /** The text it covers; for a block, the selected text. */
    text: string;
};

/**
 * What a `toolbarItem` gets: the API, the plugin's own node at the selection,
 * the selection, and commands bound to the plugin's own type that do the right
 * thing for its kind — a mark toggles on the selection, a list wraps, a text
 * block switches type, a void block is inserted.
 */
export type ToolbarItemProps = {
    api: EditorControlApi;
    /** The plugin's own node at the selection, or null when the selection is not in one. */
    selectedNode: SelectedNode | null;
    selection: RteSelectionSnapshot;
    /** The selection carries this mark, or sits in this block. */
    isActive: boolean;
    /** On or off: toggle the mark, wrap/unwrap the list, switch the block type, insert the void block. */
    toggle: (value?: Record<string, unknown>) => void;
    /** Set the value on the whole selected node (re-sets a mark across its run, updates a block's attributes). */
    setValue: (value: Record<string, unknown>) => void;
    /** Replace the selected node's text, leaving it selected so `setValue` applies to it. */
    setText: (text: string) => void;
    /** Take it away: the mark off its whole run, the list unwrapped, the block back to a paragraph. */
    remove: () => void;
    /** Open the plugin's `editorComponent` on its node at the selection — the toolbar handing over to it. */
    openEditor: () => void;
};

/** What the editor hands a mark's `editorComponent`. */
export type MarkEditorProps<TValue> = {
    value: TValue;
    /** The marked text, still editable. Put it where the text belongs. */
    children: ReactNode;
    /** Replace the value across the whole run of the mark. */
    setValue: (value: TValue) => void;
    /** The selection is inside this run of the mark (edges included). */
    isFocused: boolean;
    /** Its editing UI is open — set by `setOpen`, or from outside (the toolbar's `openEditor`). */
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    /** Take the mark off the whole run, keeping the text. */
    remove: () => void;
    api: EditorControlApi;
};

/**
 * A mark described by components. `nesting` is where it sits when marks nest
 * on the same text: lower wraps higher.
 */
export type MarkNodeDefinition<TValue = Record<string, unknown>> = {
    nesting?: number;
    /** Text typed at the end of the mark carries it on. Defaults to true; a link says false. */
    inclusive?: boolean;
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly NodeParseRule<TValue>[];
    renderComponent: (props: { value: TValue; children: ReactNode }) => ReactNode;
    editorComponent?: (props: MarkEditorProps<TValue>) => ReactNode;
};

/** `defineInline` for marks. */
export const defineMark = <TValue extends object>(definition: MarkNodeDefinition<TValue>): MarkNodeDefinition =>
    definition as unknown as MarkNodeDefinition;
