/* (c) Copyright Frontify Ltd., all rights reserved. */

// The plugin author's guide, in the order an author meets it: the content a
// plugin declares (blocks, marks, inlines), the plugin that adds the editing UI
// to it, the toolbar entries it offers as data, then menu, keyboard, paste and
// typing hooks.

import { type FondueIconProps } from '@frontify/fondue-icons';
import { type ComponentType, type CSSProperties, type ReactNode } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from './commands';
import { type HtmlSpec, type StyleMap } from './htmlSpec';

/**
 * What a document can hold, apart from how it is edited: the renderer, the
 * HTML export and a server load only this. It imports no editing code.
 *
 * Every node is described the same way: `toHtml` (the static markup) and
 * `parse` (how pasted HTML is read back). An advanced node adds a readonly
 * React view under `render.component`. Export and copy always use `toHtml`.
 */
export type RteContent = {
    /** Block types (`defineBlock`), keyed by the `type` they are stored under. */
    blocks?: Record<string, BlockDefinition>;
    /** Marks (`defineMark`), keyed by the key they are stored under on a text node. */
    marks?: Record<string, MarkDefinition>;
    /** Void inline elements (`defineInline`), keyed by the `type` they are stored under. */
    inlines?: Record<string, InlineDefinition>;
    /** Attributes every text block carries, whichever plugin declared the block (alignment), keyed by stored name. */
    blockAttributes?: Record<string, BlockAttributeDefinition>;
    /** A class for the editable element itself, for a feature that styles the content as a whole (the column layout). */
    contentClassName?: string;
    /** Custom properties set on the editable element, how a plugin option reaches its stylesheet: `{ '--rte-columns': '3' }`. */
    contentProperties?: Record<string, string>;
};

/** Types an `RteContent` with no wider type. */
export const defineContent = (content: RteContent): RteContent => content;

export const typesOf = (content: RteContent | undefined): string[] => [
    ...Object.keys(content?.marks ?? {}),
    ...Object.keys(content?.blocks ?? {}),
    ...Object.keys(content?.inlines ?? {}),
];

/** The only type a content declares (a mark, block or inline name), or undefined when it declares none or several. */
export const onlyTypeOf = (content: RteContent | undefined): string | undefined => {
    const types = typesOf(content);
    return types.length === 1 ? types[0] : undefined;
};

/**
 * A feature, described as data: its `content` (what exists) and how to
 * interact with it (toolbar, editing views, hotkeys, input rules). It never
 * runs anything itself: effects go through the `EditorControlApi` it is handed.
 *
 * ```ts
 * export const boldContent = defineContent({ marks: { bold: defineMark({ tag: 'strong' }) } });
 * export const boldPlugin = definePlugin({
 *     content: boldContent,
 *     toolbar: [{ icon: IconTextFormatBold, shortcut: 'Mod-b' }],
 *     inputRules: [{ delimiter: '**' }],
 * });
 * plugins={[boldPlugin, mentionPlugin({ items })]}
 * ```
 */
export type RtePlugin = {
    id: string;
    content?: RteContent;
    /** The toolbar controls this feature offers, in the order given. */
    toolbar?: readonly RteToolbarEntry[];
    /**
     * The editor's view of a node in place of its `toHtml`, by the node's type.
     *
     * - A block keeps the outer element `toHtml` gives it (a list item stays an
     *   `<li>`); the view draws what is inside, with the content as `children`.
     * - A mark's view is the whole element, with the run's text as `children`.
     * - An inline inserted without a value (`api.insert(type)`) is a draft the
     *   view completes: its `value` is null until then, and the draft is left
     *   out of the document.
     */
    edit?: Record<string, RteEditView>;
    /** Entries for the floating bar's "Turn into" menu and the `/` menu, in the order given. */
    commands?: readonly RteBlockCommand[];
    /**
     * Keybindings, keyed `Mod-b` style (Mod = Cmd on macOS, Ctrl elsewhere) or
     * by a single typed character (`@`). Modifiers are Mod, Cmd, Meta, Ctrl,
     * Alt and Shift in any case; any other throws when the editor mounts. They run
     * before the editor's own, in plugin order.
     */
    hotkeys?: Record<string, HotkeyHandler>;
    /** Text rewritten as it is typed: markdown shortcuts and autolinks. */
    inputRules?: readonly (RteInputRule | RteDelimiterRule)[];
    /** Runs before the editor's own paste, in plugin order. */
    onPaste?: PasteHandler;
};

/** `definePlugin`'s input: `id` defaults to the content's only type. */
export type RtePluginDefinition = Omit<RtePlugin, 'id'> & { id?: string };

export const definePlugin = ({ id, ...plugin }: RtePluginDefinition): RtePlugin => {
    const resolved = id ?? onlyTypeOf(plugin.content);
    if (resolved === undefined) {
        const types = typesOf(plugin.content);
        if (types.length === 0) {
            throw new Error('A plugin that declares no type needs an `id`.');
        }
        throw new Error(`A plugin that declares several types (${types.join(', ')}) needs an \`id\`.`);
    }
    return { id: resolved, ...plugin };
};

/** Wrapping delimiters that turn into the plugin's only mark: `{ delimiter: '**' }`. */
export type RteDelimiterRule = { delimiter: string };

// Each view is typed by its own node's value, so a map of several can only be typed loosely.
// oxlint-disable-next-line typescript/no-explicit-any -- the views of one plugin have different value types.
export type RteEditView = ComponentType<EditProps<any, any>>;

/** An icon component, as `@frontify/fondue-icons` exports them. Typed by their own size prop, which React's `propTypes` check makes invariant. */
export type RteIcon = ComponentType<Pick<FondueIconProps, 'size'>>;

/** One toolbar control, as data the editor draws. */
export type RteToolbarEntry = {
    /** The type it turns on and off: one of the plugin's marks, blocks or inlines. Defaults to the plugin's only one. */
    toggles?: string;
    /** Accessible name and tooltip. Defaults to the toggled type's name with its first letter capitalised. One string so it can become a translation key later. */
    label?: string;
    icon?: RteIcon;
    /** `Mod-b` style. Registered as a toggle of `toggles` unless the plugin's `hotkeys` binds the same key; shown in the tooltip. */
    shortcut?: string;
    /**
     * In the floating bar (`'inline'`) or not (`'hidden'`). The top toolbar
     * shows every entry regardless.
     *
     * Defaults to `'inline'` for a mark, `'hidden'` otherwise: a block reaches
     * the floating bar through `commands`.
     */
    floating?: 'inline' | 'hidden';
    /**
     * Custom UI in place of the button: a plain function, called inside a
     * component of its own keyed by the plugin's `id`, so it may use hooks
     * (always the same ones) and keeps its state across edits and rebuilt plugins. It re-renders only when its props change (selection
     * snapshot, selected node, `isActive`), so derive what it shows from them.
     */
    render?: (props: ToolbarItemProps) => ReactNode;
    /** Also offered in the `/` menu, and in Turn into for a text block or list, found by these extra words. */
    menu?: { keywords?: readonly string[] };
};

// --- Nodes ---

/**
 * `defaults` is required once a block's value names attributes: only the ones
 * listed there are read back off the stored node, so one left out would reach
 * `toHtml` as nothing. A value without attributes may leave it out.
 */
type DefaultsWhenValued<TValue> = [keyof TValue] extends [never]
    ? unknown
    : string extends keyof TValue
      ? unknown
      : { defaults: TValue };

/**
 * Type a node's callbacks by its value, then erase the type so the definition
 * fits a plugin's map beside nodes with other values.
 */
export const defineBlock = <TValue extends object = Record<string, never>>(
    definition: BlockDefinition<TValue> & DefaultsWhenValued<TValue>,
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

/**
 * `defineBlock` for marks. A mark that is only a tag may say `tag` instead of
 * `toHtml`: `defineMark({ tag: 'strong' })` writes `<strong>` and reads it back.
 */
export const defineMark = <TValue extends object = Record<string, never>>(
    definition:
        | MarkDefinition<TValue>
        | ({ tag: string; parse?: readonly MarkParseRule<TValue>[] } & Omit<
              MarkDefinition<TValue>,
              'toHtml' | 'parse'
          >),
): MarkDefinition => {
    if (!('tag' in definition)) {
        return definition as unknown as MarkDefinition;
    }
    const { tag, parse, ...rest } = definition;
    return { ...rest, toHtml: () => ({ tag, children: true }), parse: parse ?? [{ tag }] } as unknown as MarkDefinition;
};

/** A mark: stored as `true` on the text node when it carries nothing, else as its value. */
export type MarkDefinition<TValue = Record<string, unknown>> = {
    /** Where the mark sits when marks nest on the same text: lower wraps higher, ties keep plugin order. Defaults to `0`. */
    nesting?: number;
    /** Text typed at the end of the mark carries it on. Defaults to true; a link says false. */
    inclusive?: boolean;
    /** Mark types that cannot sit on the same text as this one: putting this mark on takes them off. A type no mounted plugin registers is ignored. */
    excludes?: readonly string[];
    /** Typing rules do not rewrite text carrying this mark — inline code keeps `--` and `**` as typed. Defaults to false. */
    excludesInputRules?: boolean;
    /** What the mark carries when put on without a value (a toggle, a parse rule). Defaults to `{}`. */
    defaults?: TValue;
    /** The mark's markup around its text, which goes where `children: true` is. */
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly MarkParseRule<TValue>[];
    render?: {
        /** Readonly view in place of `toHtml`. */
        component?: ComponentType<{ value: TValue; children: ReactNode }>;
    };
};

/** `defineBlock` for inline elements. */
export const defineInline = <TValue extends object = Record<string, never>>(
    definition: InlineDefinition<TValue>,
): InlineDefinition => definition as unknown as InlineDefinition;

/** A void inline element (a mention, a line break): no text of its own, its value stored flat on the document node. */
export type InlineDefinition<TValue = Record<string, unknown>> = {
    /** What the inline stores when inserted or parsed without a value; unused when the plugin has an `edit` view for it. Defaults to `{}`. */
    defaults?: TValue;
    toHtml: (value: TValue) => HtmlSpec;
    parse: readonly ParseRule<TValue>[];
    render?: {
        /** Readonly view in place of `toHtml`. */
        component?: ComponentType<{ value: TValue }>;
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

/** A rule that matches any element whose own `style` attribute declares the CSS property, handed the declared value. */
export type StyleParseRule<TValue> = {
    /** A CSS property name: `font-weight`. */
    style: string;
    /** Never set: lets TypeScript tell a style rule from a tag rule. */
    tag?: undefined;
    value?: (cssValue: string) => TValue | null;
};

/** When `clears` is true for the declared value, the element's content does not carry the mark even if an ancestor set it (`<strong><span style="font-weight:normal">`). */
export type MarkClearRule = {
    /** A CSS property name: `font-weight`. */
    style: string;
    clears: (cssValue: string) => boolean;
};

/** The rules a mark reads pasted HTML with: by tag, by declared style, or to clear it. The `style?: undefined` lets TypeScript type a style rule's `value`. */
export type MarkParseRule<TValue> =
    | (ParseRule<TValue> & { style?: undefined })
    | StyleParseRule<TValue>
    | MarkClearRule;

/**
 * What the editor hands a node's `edit` view: the same for blocks, marks
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
 * What a toolbar entry's `render` gets: the API, the entry's selected node, the
 * selection, and commands bound to the entry's toggled type that do the right
 * thing for its kind. Anything else goes through `api`.
 */
export type ToolbarItemProps = {
    api: EditorControlApi;
    /** The entry's toggled type at the selection, or null when the selection is not in one. */
    selectedNode: SelectedNode | null;
    selection: RteSelectionSnapshot;
    /** The selection carries this mark, or sits in this block. Never for an inline. */
    isActive: boolean;
    /**
     * Toggle the mark, wrap or unwrap the list, switch a text block to this
     * type or back to a paragraph, insert the void block or the inline.
     * `value` is what is stored when turning it on. Does nothing for a block
     * holding other blocks (a list item), or an entry with no type of its own.
     */
    toggle: (value?: Record<string, unknown>) => void;
    /** Open the plugin's `edit` view on its node at the selection. */
    openEditor: () => void;
};

/**
 * The entry's toggled type at the selection: a mark, a block or an inline.
 *
 * A mark is found as its whole run, edges included: a caret at the end of a
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
    | { kind: 'markPattern'; pattern: RegExp; mark: string; value: (match: string) => Record<string, unknown> }
    /**
     * Text swapped for other text the moment its last character is typed, no
     * space needed: `->` becomes `→`. A string matches as written; a pattern
     * is anchored to the end of the text before the caret, so a lookbehind can
     * say what may not come before it, and its `replace` may use `$1`. An
     * inline element reads as U+FFFC in the text. The rule steps aside when
     * the text it would replace carries a mark that opts out (inline code).
     * Only the matched text is replaced, so match a character only to look at
     * it with a lookbehind.
     *
     * With `waitForRunEnd` the rule fires only once the NEXT typed character
     * ends the run, and that character stays after the replacement. A
     * character ends the run when it is whitespace or one of
     * `, ; : ! ? ) ] } …` (not `.`, which may be a decimal point or a
     * file extension). Any other character leaves the text as typed.
     */
    | { kind: 'text'; match: string | RegExp; replace: string; waitForRunEnd?: boolean };
