import { ReactNode } from 'react';

/**
 * Declaration of one piece of data a block, inline, or mark carries. Stored
 * flat on the document node; rendering writes it out itself, so the only
 * parse-side concern is reading it back from HTML.
 */
declare type AttributeSpec = {
    /** Value when the attribute is absent. */
    default?: unknown;
    /**
     * Read this attribute back from a DOM attribute when parsing pasted HTML
     * — e.g. an image's `src`. Pass a string when the DOM attribute is named
     * differently (`id: { parseFromDomAttribute: 'data-mention-id' }`).
     */
    parseFromDomAttribute?: boolean | string;
};

declare type BlockSpec = {
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
    render: (props: {
        node: RteBlockNode;
        children: ReactNode;
    }) => ReactNode;
    /** How pasted HTML becomes this block, e.g. `[{ tag: 'h2', attributes: { level: 2 } }]`. */
    parseRules?: readonly ParseRule[];
};

/** The flag this plugin sets on text nodes. */
declare type BoldMark = {
    bold?: boolean;
};

export declare const BoldPlugin: RtePlugin;

/**
 * Convenience bundle of every built-in plugin, in toolbar order. Nothing is
 * mounted automatically — pass these (or a subset) to RichTextEditor.
 */
export declare const defaultPlugins: RtePlugin[];

/**
 * The API exposed to plugins. This is the seam that hides the engine: if the
 * engine is swapped, this interface stays stable and only the adapter changes.
 * Plugin code never imports from the engine, only from here.
 */
export declare type EditorControlApi = {
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

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
declare type HeadingBlock = {
    type: 'heading';
    level: 1 | 2 | 3;
    children: RteInlineNode[];
};

export declare const HeadingPlugin: RtePlugin;

/** The void block this plugin adds: no text children, data lives in attributes. */
declare type ImageBlock = {
    type: 'image';
    src: string;
    alt?: string;
};

export declare const ImagePlugin: RtePlugin;

declare type InlineSpec = {
    /** Inline type name stored on inline nodes, e.g. `mention`. */
    type: string;
    /** The data this inline carries — a mention's `id` and `label`. */
    attributes?: Record<string, AttributeSpec>;
    /**
     * How the inline looks. Inline elements are void: there is no children
     * slot, visible content (`@{label}`) is rendered from the attributes.
     */
    render: (props: {
        node: RteInlineElementNode;
    }) => ReactNode;
    /** How pasted HTML becomes this inline, e.g. `[{ tag: 'span[data-mention-id]' }]`. */
    parseRules?: readonly ParseRule[];
};

/** The flag this plugin sets on text nodes. */
declare type ItalicMark = {
    italic?: boolean;
};

export declare const ItalicPlugin: RtePlugin;

/** The value this plugin sets on text nodes. */
declare type LinkMark = {
    link?: {
        href: string;
    };
};

export declare const LinkPlugin: RtePlugin;

declare type MarkSpec = {
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
    render: (props: {
        children: ReactNode;
        value: Record<string, unknown>;
    }) => ReactNode;
    /** Additional rules for recognizing pasted HTML, e.g. `[{ tag: 'b' }]` for bold. */
    parseRules?: readonly ParseRule[];
};

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
declare type ParagraphBlock = {
    type: 'paragraph';
    children: RteInlineNode[];
};

/** One rule for recognizing pasted HTML. */
declare type ParseRule = {
    /** Element that is recognized, e.g. `h2` or `b`. */
    tag: string;
    /** Attribute values this element implies, e.g. `{ level: 2 }` for `h2`. */
    attributes?: Record<string, unknown>;
};

/** The block type this plugin adds. Part of the assembled RteBlock union at the package root. */
declare type QuoteBlock = {
    type: 'quote';
    children: RteInlineNode[];
};

export declare const QuotePlugin: RtePlugin;

export declare const RichTextEditor: <TBlock extends RteBlockNode = RteBlock>(props: RichTextEditorProps<TBlock>) => ReactNode;

/**
 * The editor is generic over its block union with the *official* one as the
 * default, so `value`/`onChange` are typed documents out of the box. Re-typed
 * rather than re-implemented: the component itself stays engine- and
 * plugin-agnostic.
 */
export declare type RichTextEditorProps<TBlock extends RteBlockNode = RteBlock> = RichTextEditorProps_2<TBlock>;

/**
 * `TBlock` is the document's block union. The editor itself is agnostic, so it
 * defaults to the structural skeleton here; the package root re-exports this
 * component with the official `RteBlock` union as the default, so consumers of
 * the shipped plugins get a typed `value`/`onChange` without passing anything.
 * Consumer plugins widen it: `RichTextEditor<RteBlock | CalloutBlock>`.
 */
declare type RichTextEditorProps_2<TBlock extends RteBlockNode = RteBlockNode> = {
    value?: RteDocumentOf<TBlock>;
    onChange?: (value: RteDocumentOf<TBlock>) => void;
    /** The plugins to mount, in toolbar order (e.g. `defaultPlugins`, extended or reduced as needed). */
    plugins?: RtePlugin[];
};

/**
 * The official RTE block union: every block type the built-in plugins produce,
 * with strictly typed children. Apps, serializers, and backend code should
 * consume THIS, not the structural `RteBlockNode`. Extending it is a
 * wire-format change and should be a deliberate act, made in the same PR that
 * ships the plugin implementing the new type.
 *
 * `TExtraInline` is the escape hatch for consumer plugins that contribute a
 * mark or an inline element: pass `RteText & HighlightMark` for an extra mark,
 * or `MentionInline` for an extra inline element.
 */
export declare type RteBlock<TExtraInline = never> = WithOfficialChildren<ParagraphBlock | HeadingBlock | QuoteBlock | ImageBlock, TExtraInline>;

/**
 * Structural shape of any block. Plugin-declared attributes (a heading's
 * `level`) live flat on the node; the adapter reads them generically by the
 * names the plugin registered.
 */
export declare type RteBlockNode = {
    type: string;
    /** Absent on void blocks (e.g. images), which carry data in attributes only. */
    children?: RteInlineNode[];
};

/**
 * A document of official blocks — what `RichTextEditor` reads and emits, and
 * the annotation to use when authoring one by hand:
 *
 * ```ts
 * const doc: RteDocument = {
 *     version: 1,
 *     blocks: [{ type: 'heading', level: 2, children: [{ text: 'Title' }] }],
 * };
 * ```
 *
 * Consumer plugins widen the union once, here:
 * `RteDocument<RteBlock | CalloutBlock>`.
 */
export declare type RteDocument<TBlock extends RteBlockNode = RteBlock> = RteDocumentOf<TBlock>;

/**
 * Every contract the editor is built on, all engine-agnostic: the document
 * format, the plugin declaration, and the API plugins act through.
 * `prosemirror.ts` is the only module that translates them into engine terms.
 */
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
declare type RteDocumentOf<TBlock extends RteBlockNode = RteBlockNode> = {
    version: 1;
    blocks: TBlock[];
};

/**
 * A void inline element (e.g. a mention): no text content of its own, data
 * lives flat in attributes. Discriminated from text nodes by having `type`
 * instead of `text`, and open for the same reason.
 */
declare type RteInlineElementNode = {
    type: string;
    [attribute: string]: unknown;
};

/** What can sit inside a block: text runs, or void inline elements (mentions). */
export declare type RteInlineNode = RteTextNode | RteInlineElementNode;

/**
 * A feature described in engine-agnostic terms. A plugin is a plain object:
 * it declares what exists (schema), how it looks (render, styles), and how to
 * interact with it (toolbar, hotkeys) — and never executes anything itself;
 * runtime effects go through the EditorControlApi it is handed.
 */
export declare type RtePlugin = {
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
 * A text run as the shipped plugins write it: the marks that exist, and nothing
 * else. Closed on purpose — `{ text: 'x', bod: true }` is a compile error,
 * which the open text node behind the plugin contract cannot catch.
 *
 * Note that void inline elements (mentions) are deliberately NOT part of the
 * official inline union: their index signature would satisfy the union's
 * excess-property check and every mark typo would pass again. Consumer inline
 * elements come in through `RteBlock`'s parameter instead.
 */
export declare type RteText = {
    text: string;
} & BoldMark & ItalicMark & LinkMark;

/**
 * A text leaf. Marks live flat on the node, keyed by the mark key a plugin
 * registered: plain marks as booleans (`bold: true`), value-carrying marks as
 * objects (`link: { href }`). The index signature makes the format open — a
 * stored document may carry marks from plugins this build doesn't know.
 * Authoring goes through the package root's closed `RteText`, which lists the
 * marks that actually ship, so typos in mark keys are caught.
 */
declare type RteTextNode = {
    text: string;
    [mark: string]: unknown;
};

/**
 * Rewrites an official block's `children` from the open skeleton to the
 * official inline union, so mark keys are checked inside block literals.
 * Distributes over the union; blocks without children (images) pass through.
 * `Omit &` preserves the `type` literal, so `switch` still narrows.
 */
declare type WithOfficialChildren<TBlock, TExtraInline> = TBlock extends {
    children: RteInlineNode[];
} ? Omit<TBlock, 'children'> & {
    children: (RteText | TExtraInline)[];
} : TBlock;

export { }
