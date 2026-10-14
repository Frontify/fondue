/* (c) Copyright Frontify Ltd., all rights reserved. */

// The plugin author's guide, in the order an author meets it: the plugin
// itself, the nodes it declares (blocks, marks, inlines), the editing UI it
// can draw, then toolbar, menu, keyboard, paste and typing hooks.

import { type ComponentType, type CSSProperties, type ReactNode } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from './commands';
import { type HtmlSpec, type StyleMap } from './htmlSpec';

/**
 * A feature, described as data: a plain object declaring what exists
 * (`blocks`, `marks`, `inlines`, `blockAttributes`) and how to interact with it
 * (toolbar, hotkeys, input rules). It never runs anything itself — effects go
 * through the `EditorControlApi` it is handed.
 *
 * Every node is described the same way: `toHtml` (the static markup) and
 * `parse` (how pasted HTML is read back). An advanced node adds React under
 * `render`: `component` for a richer readonly view, `edit` for interactive
 * editing. Export and copy always use `toHtml`.
 *
 * Plugins are functions returning this object:
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
    /** Attributes every text block carries, whichever plugin declared the block (alignment), keyed by stored name. */
    blockAttributes?: Record<string, BlockAttributeDefinition>;
    /**
     * This feature's toolbar control. Rendered as a component of its own, keyed
     * by the plugin's `id`, so it may use hooks and keeps its state across
     * edits. It re-renders only when its props change (selection snapshot, own
     * node, `isActive`), so derive what it shows from them.
     */
    toolbarItem?: (props: ToolbarItemProps) => ReactNode;
    /**
     * Where `toolbarItem` goes in the floating bar: `'inline'` in the bar,
     * `'overflow'` behind its "More" button, `'hidden'` not at all. The top
     * toolbar shows every item regardless.
     *
     * Defaults to `'inline'` for a plugin that owns a mark, `'hidden'`
     * otherwise — a block reaches the floating bar through `commands`.
     */
    floatingToolbar?: 'inline' | 'overflow' | 'hidden';
    /** Entries for the floating bar's "Turn into" menu and the `/` menu, in the order given. */
    commands?: readonly RteBlockCommand[];
    /**
     * Keybindings, keyed `Mod-b` style (Mod = Cmd on macOS, Ctrl elsewhere) or
     * by a single typed character (`@`). Modifiers are Mod, Cmd, Meta, Ctrl,
     * Alt and Shift in any case; a binding with any other is dropped. They run
     * before the editor's own, in plugin order.
     */
    hotkeys?: Record<string, HotkeyHandler>;
    /** Text rewritten as it is typed: markdown shortcuts and typography. */
    inputRules?: readonly RteInputRule[];
    /** Runs before the editor's own paste, in plugin order. */
    onPaste?: PasteHandler;
    /** A class for the editable element itself, for a feature that styles the content as a whole (the column layout). */
    contentClassName?: string;
    /** Custom properties set on the editable element, how a plugin option reaches its stylesheet: `{ '--rte-columns': '3' }`. */
    contentProperties?: Record<string, string>;
};

// --- Nodes ---

/**
 * Type a node's callbacks by its value, then erase the type so the definition
 * fits a plugin's map beside nodes with other values.
 */
export const defineBlock = <TValue extends object = Record<string, never>>(
    definition: BlockDefinition<TValue>,
): BlockDefinition => definition as unknown as BlockDefinition;

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
         * Readonly view in place of `toHtml`. `style` carries what every text
         * block carries (alignment); put it on the outermost element.
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
 * What a block holds:
 * - omit            → nothing editable (column break)
 * - `'text'`        → text and inline elements (paragraph, quote, heading)
 * - `{ items }`     → a list of that item type
 * - `{ blocks }`    → those block types (a list item)
 */
export type ContentModel = 'text' | { items: string } | { blocks: readonly string[] };

/** `defineBlock` for marks. */
export const defineMark = <TValue extends object = Record<string, never>>(
    definition: MarkDefinition<TValue>,
): MarkDefinition => definition as unknown as MarkDefinition;

/** A mark: stored as `true` on the text node when it carries nothing, else as its value. */
export type MarkDefinition<TValue = Record<string, unknown>> = {
    /** Where the mark sits when marks nest on the same text: lower wraps higher, ties keep plugin order. Defaults to `0`. */
    nesting?: number;
    /** Text typed at the end of the mark carries it on. Defaults to true; a link says false. */
    inclusive?: boolean;
    /** Typing rules do not rewrite text carrying this mark — inline code keeps `--` and `**` as typed. Defaults to false. */
    excludesInputRules?: boolean;
    /** What the mark carries when put on without a value (a toggle, a parse rule). Defaults to `{}`. */
    defaults?: TValue;
    /** The mark's markup around its text, which goes where `children: true` is. */
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly ParseRule<TValue>[];
    render?: {
        /** Readonly view in place of `toHtml`. */
        component?: ComponentType<{ value: TValue; children: ReactNode }>;
        /** The editor's view in place of `toHtml`: the whole element, with the run's text as `children`. */
        edit?: ComponentType<EditProps<TValue>>;
    };
};

/** `defineBlock` for inline elements. */
export const defineInline = <TValue extends object = Record<string, never>>(
    definition: InlineDefinition<TValue>,
): InlineDefinition => definition as unknown as InlineDefinition;

/**
 * A void inline element (a mention, a line break): no text of its own, its
 * value stored flat on the document node.
 *
 * With a `render.edit`, a node inserted without a value (`api.insert(type)`) is
 * a draft the component completes — `value` is null until then, and the draft
 * is left out of the document.
 */
export type InlineDefinition<TValue = Record<string, unknown>> = {
    /** What the inline stores when inserted or parsed without a value; unused with `render.edit`. Defaults to `{}`. */
    defaults?: TValue;
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly ParseRule<TValue>[];
    render?: {
        /** Readonly view in place of `toHtml`. */
        component?: ComponentType<{ value: TValue }>;
        edit?: ComponentType<EditProps<TValue, TValue | null>>;
    };
};

/**
 * One rule for reading pasted HTML back into a node. Leave `value` out when the
 * element carries none (`<strong>`); return null from it when the element is
 * not this node after all (a `span` without a colour is no font colour).
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
    /** The node's content, still editable (a block's text, a mark's run); put it where the content belongs. Absent for inlines. */
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

/** An attribute every text block carries: how it styles the block, and how it is read back. */
export type BlockAttributeDefinition = {
    /** Value when the attribute is absent. */
    default?: string;
    /** The CSS it puts on the block's outermost element. */
    style: (value: string) => StyleMap;
    /** Read it back from a pasted element, or null when the element does not set it. */
    parse?: (element: HTMLElement) => string | null;
};

// --- Toolbar ---

/**
 * What a `toolbarItem` gets: the API, the plugin's own node at the selection,
 * the selection, and commands bound to the plugin's own type that do the right
 * thing for its kind. Anything else goes through `api`.
 */
export type ToolbarItemProps = {
    api: EditorControlApi;
    /** The plugin's own node at the selection, or null when the selection is not in one. */
    selectedNode: SelectedNode | null;
    selection: RteSelectionSnapshot;
    /** The selection carries this mark, or sits in this block. Never for an inline. */
    isActive: boolean;
    /**
     * Toggle the mark, wrap or unwrap the list, switch a text block to this
     * type or back to a paragraph, insert the void block or the inline.
     * `value` is what is stored when turning it on. Does nothing for a block
     * holding other blocks (a list item), or a plugin with no type of its own.
     */
    toggle: (value?: Record<string, unknown>) => void;
    /** Open the plugin's `render.edit` on its node at the selection. */
    openEditor: () => void;
};

/**
 * The plugin's own node at the selection, of the type its toolbar item acts on:
 * the first mark it declares, else its first block, else its first inline.
 *
 * A mark is found as its whole run, edges included — a caret at the end of a
 * link still finds the link. A block is the innermost one of that type around
 * the selection. An inline is never found: the selection sits beside one.
 */
export type SelectedNode = {
    type: string;
    /** Its value — a mark's attributes, a block's attributes. */
    value: Record<string, unknown>;
    /** The text it covers; for a block, the selected text. */
    text: string;
};

// --- Menus, keyboard, paste, typing ---

/** A labelled entry a plugin offers to the "Turn into" menu and the `/` menu. */
export type RteBlockCommand = {
    /** Unique across plugins, e.g. `'heading-1'`. */
    id: string;
    /** What the menus call it: `'Heading 1'`. */
    label: string;
    icon?: ReactNode;
    /** Further words the `/` menu filters by: `['h1', 'title']`. */
    keywords?: readonly string[];
    /** `'turnInto'` converts the current block (and is offered by `/` too); `'insert'` adds something (only `/`). */
    group: 'turnInto' | 'insert';
    /** Whether the selection is already this — the Turn-into button shows the active label. */
    isActive?: (selection: RteSelectionSnapshot) => boolean;
    run: (api: EditorControlApi) => void;
};

/** A plugin's handler for one key. Return `false` to leave the key to the next handler, and in the end the editor and browser. */
export type HotkeyHandler = (api: EditorControlApi) => boolean | void;

/** A plugin's `onPaste`, handed the clipboard's text and HTML (if any). Return true when handled: the default paste and later plugins are skipped. */
export type PasteHandler = (paste: { text: string; html: string | null }, api: EditorControlApi) => boolean;

/**
 * A text pattern rewritten while typing. Declared, not implemented: the editor
 * does the matching, so a plugin only says what to look for.
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
    | { kind: 'list'; match: string; list: string }
    /**
     * A token ended by a space (or punctuation then a space) becomes text
     * carrying the mark — an autolink. `pattern` matches the token only; the
     * engine anchors it to the end of the text before the terminator.
     */
    | { kind: 'markPattern'; pattern: RegExp; mark: string; value: (match: string) => Record<string, unknown> };
