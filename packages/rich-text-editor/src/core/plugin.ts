/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from './commands';
import { type RteBlockNode } from './document';

/**
 * A feature described in engine-agnostic terms. A plugin is a plain object: it
 * declares what exists (`schema`, `marks`, `inlines`), how it looks
 * (`toDom` / `toHtml`, `renderComponent`), and how to interact with it
 * (toolbar, hotkeys, input rules).
 * It never executes anything itself — runtime effects go through the
 * EditorControlApi it is handed.
 *
 * Plugins are written as functions returning this object:
 *
 * ```ts
 * export const boldPlugin = (): RtePlugin => ({ id: 'bold', marks: { bold: defineMark({ … }) } });
 * plugins={[boldPlugin(), mentionPlugin({ items })]}
 * ```
 */
export type RtePlugin = {
    id: string;
    /** Block types, and attributes every text block carries (alignment). */
    schema?: readonly SchemaDefinition[];
    /** Marks (`defineMark`), keyed by the key they are stored under on a text node. */
    marks?: Record<string, MarkDefinition>;
    /**
     * Void inline elements (`defineInline`), keyed by type. The editor only
     * renders `editorComponent` with generic props; every behaviour beyond
     * that belongs to the plugin.
     */
    inlines?: Record<string, InlineDefinition>;
    /**
     * This feature's control in the toolbar, handed the feature's own node at
     * the selection (or null) and the commands bound to it — so a button is
     * `isActive` + `toggle`.
     *
     * Rendered as a component of its own, keyed by the plugin's `id`: it may
     * use hooks, and its state survives edits and other plugins coming and
     * going. It re-renders when what it is handed changes — the selection
     * snapshot, the own node, `isActive` — not on every keystroke, so derive
     * what it shows from its props rather than reading the editor elsewhere.
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

export type SchemaDefinition = BlockDefinition | AttributeDefinition;

/**
 * One piece of data a block carries, stored flat on the document node.
 * Rendering writes it out; the fields below only say how to read it back from
 * pasted HTML.
 */
export type AttributeSpec = {
    /** Value when the attribute is absent. */
    default?: unknown;
    /**
     * The DOM attribute to read this one back from when parsing pasted HTML:
     * `level: { parseFromDomAttribute: 'data-level' }`.
     */
    parseFromDomAttribute?: string;
    /**
     * Read it back from a CSS property instead, for a value that lives in the
     * style attribute.
     */
    parseFromStyle?: string;
};

/** One rule for recognizing pasted HTML as a block. Required on every block. */
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

/** Read a mark's or inline's value back from a pasted element. */
export type NodeParseRule<TValue> = {
    /** Element that is recognized, e.g. `a[data-mention-id]`. */
    tag: string;
    /**
     * The value the element carries, or null when it turns out not to be this
     * node after all — a `span` without a colour is no font colour.
     */
    value: (element: HTMLElement) => TValue | null;
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
 * A void inline element: portable markup (`toHtml`), how to read it back
 * (`parse`), how it looks readonly (`renderComponent`) and, optionally,
 * everything shown while editing (`editorComponent`). Its value is stored flat
 * on the document node.
 *
 * Without an `editorComponent` the editor draws `toHtml`. With one, a node
 * inserted without a value (`api.insert(type)`) is a draft the component
 * completes: it is left out of the document until it has a value.
 */
export type InlineDefinition<TValue = Record<string, unknown>> = {
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly NodeParseRule<TValue>[];
    renderComponent: (props: { value: TValue }) => ReactNode;
    editorComponent?: (props: InlineEditorProps<TValue>) => ReactNode;
};

/**
 * Types an inline node's callbacks by its value, then erases the type so the
 * definition fits `RtePlugin.inlines` beside nodes with other values.
 */
export const defineInline = <TValue extends object>(definition: InlineDefinition<TValue>): InlineDefinition =>
    definition as unknown as InlineDefinition;

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
 * A mark: portable markup (`toHtml`), how to read it back (`parse`), how it
 * looks (`renderComponent`) and, optionally, UI shown while editing
 * (`editorComponent`). A mark carrying nothing is stored as `true` on the text
 * node, one carrying a value as that value.
 */
export type MarkDefinition<TValue = Record<string, unknown>> = {
    /**
     * Where this mark sits when marks nest on the same text: lower wraps
     * higher, ties keep the order their plugins were passed in. Defaults to
     * `0`.
     */
    nesting?: number;
    /** Text typed at the end of the mark carries it on. Defaults to true; a link says false. */
    inclusive?: boolean;
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly NodeParseRule<TValue>[];
    renderComponent: (props: { value: TValue; children: ReactNode }) => ReactNode;
    editorComponent?: (props: MarkEditorProps<TValue>) => ReactNode;
};

/** `defineInline` for marks. */
export const defineMark = <TValue extends object>(definition: MarkDefinition<TValue>): MarkDefinition =>
    definition as unknown as MarkDefinition;
