/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type CSSProperties, type ReactNode } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from './commands';
import { type HtmlSpec, type StyleMap } from './htmlSpec';

/**
 * A feature described in engine-agnostic terms. A plugin is a plain object: it
 * declares what exists (`blocks`, `marks`, `inlines`, `blockAttributes`), and
 * how to interact with it (toolbar, hotkeys, input rules). It never executes
 * anything itself — runtime effects go through the EditorControlApi it is
 * handed.
 *
 * Every block, mark and inline is described the same way: `toHtml` (the static
 * markup) and `parse` (how pasted HTML is read back). That is the whole of a
 * basic node. An advanced one adds React under `render`: `component` for a
 * richer readonly view, `edit` for interactive editing. Export and copy always
 * use `toHtml`.
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
    /** Block types (`defineBlock`), keyed by the `type` they are stored under. */
    blocks?: Record<string, BlockDefinition>;
    /** Marks (`defineMark`), keyed by the key they are stored under on a text node. */
    marks?: Record<string, MarkDefinition>;
    /** Void inline elements (`defineInline`), keyed by the `type` they are stored under. */
    inlines?: Record<string, InlineDefinition>;
    /**
     * Attributes every text block carries, whichever plugin declared the
     * block — alignment. Keyed by the name they are stored under.
     */
    blockAttributes?: Record<string, BlockAttributeDefinition>;
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

/**
 * One rule for reading pasted HTML back into a node: the element it
 * recognizes, and the value that element carries. Leave `value` out when the
 * element carries none (`<strong>`); return null from it when the element turns
 * out not to be this node after all (a `span` without a colour is no font
 * colour).
 */
export type ParseRule<TValue> = {
    /** A CSS selector: `strong`, `a[href]`, `li[data-checked]`. */
    tag: string;
    value?: (element: HTMLElement) => TValue | null;
};

/**
 * What the editor hands a node's `render.edit` — the same for blocks, marks
 * and inlines. `TCurrent` is what `value` can be right now: an inline's is
 * null while it is a draft.
 */
export type EditProps<TValue, TCurrent = TValue> = {
    value: TCurrent;
    /**
     * The node's content, still editable — a block's text, a mark's run. Put
     * it where the content belongs. Absent for inlines, which have none.
     */
    children?: ReactNode;
    /** Store a new value: on the block, across the mark's whole run, on the inline. */
    setValue: (value: TValue) => void;
    /** The selection is in the node, or (for an inline) the caret sits right after it. */
    isFocused: boolean;
    /** The node is inside a selected range. The editor already paints the highlight. */
    isSelected: boolean;
    /** Its editing UI is open — set by `setOpen`, or from outside (the toolbar's `openEditor`). */
    isOpen: boolean;
    setOpen: (open: boolean) => void;
    /** Take it away: the block, the mark (keeping its text), the inline. */
    remove: () => void;
    api: EditorControlApi;
};

/**
 * What a block holds:
 * - omit            → nothing editable (column break)
 * - `'text'`        → text and inline elements (paragraph, quote, heading)
 * - `{ items }`     → a list of that item type
 * - `{ blocks }`    → those block types (a list item)
 */
export type ContentModel = 'text' | { items: string } | { blocks: readonly string[] };

/**
 * A block type. Its value is the attributes it stores, flat on the document
 * node; `defaults` declares them — an attribute missing there is not stored.
 */
export type BlockDefinition<TValue = Record<string, unknown>> = {
    content?: ContentModel;
    defaults?: TValue;
    /** The block's markup. `children: true` is where its content goes. */
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly ParseRule<Partial<TValue>>[];
    render?: {
        /**
         * Readonly view in place of `toHtml`. Export and copy still use
         * `toHtml`. `style` carries what every text block carries (alignment);
         * put it on the outermost element.
         */
        component?: ComponentType<{ value: TValue; children?: ReactNode; style?: CSSProperties }>;
        /**
         * The editor's view in place of `toHtml`. The block keeps the outer
         * element `toHtml` gives it (a list item stays an `<li>`); this draws
         * what is inside, with the content as `children`.
         */
        edit?: ComponentType<EditProps<TValue>>;
    };
};

/**
 * A mark. One carrying nothing is stored as `true` on the text node, one
 * carrying a value as that value.
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
    /** The mark's markup around its text, which goes where `children: true` is. */
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly ParseRule<TValue>[];
    render?: {
        /** Readonly view in place of `toHtml`. Export and copy still use `toHtml`. */
        component?: ComponentType<{ value: TValue; children: ReactNode }>;
        /** The editor's view in place of `toHtml`: the whole element, with the run's text as `children`. */
        edit?: ComponentType<EditProps<TValue>>;
    };
};

/**
 * A void inline element (a mention, a line break): no text of its own, its
 * value stored flat on the document node.
 *
 * With a `render.edit`, a node inserted without a value (`api.insert(type)`) is
 * a draft the component completes — `value` is null until then, and the draft
 * is left out of the document.
 */
export type InlineDefinition<TValue = Record<string, unknown>> = {
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly ParseRule<TValue>[];
    render?: {
        /** Readonly view in place of `toHtml`. Export and copy still use `toHtml`. */
        component?: ComponentType<{ value: TValue }>;
        edit?: ComponentType<EditProps<TValue, TValue | null>>;
    };
};

/** An attribute every text block carries: how it styles the block, and how it is read back. */
export type BlockAttributeDefinition = {
    /** Value when the attribute is absent. */
    default?: string;
    /** The CSS it puts on the block's outermost element. */
    style: (value: string) => StyleMap;
    /** Read it back from a pasted element, or null when the element does not set it. */
    parse?: (element: HTMLElement) => string | null;
};

/**
 * Type a node's callbacks by its value, then erase the type so the definition
 * fits a plugin's map beside nodes with other values.
 */
export const defineBlock = <TValue extends object = Record<string, never>>(
    definition: BlockDefinition<TValue>,
): BlockDefinition => definition as unknown as BlockDefinition;

/** `defineBlock` for marks. */
export const defineMark = <TValue extends object = Record<string, never>>(
    definition: MarkDefinition<TValue>,
): MarkDefinition => definition as unknown as MarkDefinition;

/** `defineBlock` for inline elements. */
export const defineInline = <TValue extends object = Record<string, never>>(
    definition: InlineDefinition<TValue>,
): InlineDefinition => definition as unknown as InlineDefinition;

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
    /** Open the plugin's `render.edit` on its node at the selection — the toolbar handing over to it. */
    openEditor: () => void;
};
