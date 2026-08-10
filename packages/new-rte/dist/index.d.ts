import { ReactNode } from 'react';

/** Declaration of one piece of data a block, inline, or mark carries. */
export declare type AttributeSpec = {
    /** Value when the attribute is absent. */
    default?: unknown;
    /**
     * Read this attribute back from a DOM attribute when parsing pasted
     * HTML — e.g. an image's `src`, a link's `href`. Pass a string when the
     * DOM attribute is named differently (`id: { parseFromDomAttribute:
     * 'data-mention-id' }`). Writing it out is the render function's job.
     */
    parseFromDomAttribute?: boolean | string;
};

export declare type BlockSpec = {
    /** Block type name stored on document nodes, e.g. `heading`. */
    type: string;
    /**
     * The data this block carries, stored flat on the document node —
     * a heading's `level`, an image's `src`.
     */
    attributes?: Record<string, AttributeSpec>;
    /** True for blocks without editable text content (e.g. images). Void blocks have no `children` in the document. */
    isVoid?: boolean;
    /**
     * How the block looks: a React render function returning a single root
     * element. `children` is the editable content slot. This is the single
     * source of rendering truth — copy/paste serialization is derived from
     * its output.
     */
    render: (props: RenderBlockProps) => ReactNode;
    /**
     * How pasted HTML becomes this block, e.g. `[{ tag: 'h2', attributes:
     * { level: 2 } }]`. Blocks always declare their parse rules explicitly.
     */
    parseRules?: readonly ParseRule[];
};

/** The flag this plugin sets on text nodes. */
export declare type BoldMark = {
    bold?: boolean;
};

export declare const BoldPlugin: FondueRtePlugin;

/**
 * Build a document from plain block literals — no type annotations needed.
 * Block types and their attrs are fully checked; mark flags and inline
 * elements are open by design (the wire format admits contributions from
 * plugins this build doesn't know). When the document uses a consumer
 * plugin's own block type, pass it once: `createDocument<CalloutBlock>([...])`.
 */
export declare const createDocument: <TExtraBlock extends FrontifyBlockNode = never>(blocks: readonly (FrontifyBlock | NoInfer<TExtraBlock>)[]) => FrontifyDocument;

/**
 * Convenience bundle of every built-in plugin, in toolbar order. Nothing is
 * mounted automatically — pass these (or a subset) to RichTextEditor.
 */
export declare const defaultPlugins: FondueRtePlugin[];

/**
 * The API exposed to plugins. This is the seam that hides the engine: if
 * the engine is swapped, this interface stays stable and only the adapter
 * changes. Plugin code never imports from the engine, only from here.
 */
export declare type EditorControlApi = {
    /** Toggle a mark on the selection. `value` sets the mark's attrs when turning it on (e.g. `{ href }` for links). */
    toggleMark(key: string, value?: Record<string, unknown>): void;
    isMarkActive(key: string): boolean;
    setBlockType(type: string, attrs?: Record<string, unknown>): void;
    isBlockActive(type: string, attrs?: Record<string, unknown>): boolean;
    /** Insert a new block at the selection (the way to add void blocks like images). */
    insertBlock(type: string, attrs?: Record<string, unknown>): void;
    /** Insert a void inline element at the selection (the way to add mentions). */
    insertInline(type: string, attrs?: Record<string, unknown>): void;
    /** The block the selection starts in — type and attributes only, no children. For toolbar state (e.g. a heading-level dropdown). */
    getCurrentBlock(): FrontifyBlockNode | null;
    /**
     * The selection in document terms. Capture it before opening UI that
     * steals focus (a link popover's input), pass it back to setSelection
     * to restore before applying the edit.
     */
    getSelection(): FrontifySelection | null;
    setSelection(selection: FrontifySelection): void;
    isSelectionCollapsed(): boolean;
    /** Return focus to the editor, e.g. after closing plugin UI. */
    focus(): void;
};

/**
 * A feature described in engine-agnostic terms. A plugin is a plain object:
 * it declares what exists (schema), how it looks (render, styles), and how
 * to interact with it (toolbar, hotkeys) — and never executes anything
 * itself; runtime effects go through the EditorControlApi it is handed.
 */
export declare type FondueRtePlugin = {
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
 * The official Frontify document format: the assembled union of every
 * block and mark type the built-in plugins produce. Apps, serializers, and
 * backend code should consume THESE types — the structural *Node types are
 * only the skeleton. Extending these unions is a wire-format change and
 * should be a deliberate act, made in the same PR that ships the plugin
 * implementing the new type.
 */
export declare type FrontifyBlock = ParagraphBlock | HeadingBlock | QuoteBlock | ImageBlock;

/**
 * Structural shape of any block. Plugin-declared attrs (e.g. a heading's
 * `level`) live flat on the node; the adapter reads them generically by the
 * attr names the plugin registered.
 */
export declare type FrontifyBlockNode = {
    type: string;
    /** Absent on void blocks (e.g. images), which carry data in attrs only. */
    children?: FrontifyInlineNode[];
};

/**
 * The canonical Frontify document: what gets stored and sent over the wire.
 * It is NOT the editor's internal representation — the adapter converts
 * to/from the engine's native format at the boundary.
 *
 * Core only defines the structural skeleton plus the paragraph baseline.
 * Concrete block and mark types are declared by the plugins that implement
 * them, and the package root assembles the official union of everything
 * that ships.
 */
export declare type FrontifyDocument = {
    version: 1;
    blocks: FrontifyBlockNode[];
};

/**
 * A void inline element (e.g. a mention): no text content of its own, data
 * lives flat in attributes. Discriminated from text nodes by having `type`
 * instead of `text`. Open like text marks — a stored document may carry
 * inline types from plugins this build doesn't know.
 */
export declare type FrontifyInlineElementNode = {
    type: string;
    [attribute: string]: unknown;
};

/** What can sit inside a block: text runs, or void inline elements (mentions). */
export declare type FrontifyInlineNode = FrontifyTextNode | FrontifyInlineElementNode;

/**
 * A position in the document: `path` is `[blockIndex, childIndex]` into
 * `blocks` and the block's `children`, `offset` is the character offset in
 * that text node. A void block (image) is addressed by `[blockIndex]` alone.
 */
export declare type FrontifyPoint = {
    path: number[];
    offset: number;
};

/** A selection in document terms, engine-independent. */
export declare type FrontifySelection = {
    anchor: FrontifyPoint;
    focus: FrontifyPoint;
};

export declare type FrontifyText = FrontifyTextNode & BoldMark & ItalicMark & LinkMark;

/**
 * A text leaf. Marks live flat on the node, keyed by the mark key a plugin
 * registered: plain marks as booleans (`bold: true`), value-carrying marks
 * as objects (`link: { href }`). The index signature makes the format open —
 * a stored document may carry marks from plugins this build doesn't know.
 * The named mark types (BoldMark, …) layer typed access on top.
 */
export declare type FrontifyTextNode = {
    text: string;
    [mark: string]: unknown;
};

/** The block type this plugin adds. Part of the assembled FrontifyBlock union at the package root. */
export declare type HeadingBlock = {
    type: 'heading';
    level: 1 | 2 | 3;
    children: FrontifyInlineNode[];
};

export declare const HeadingPlugin: FondueRtePlugin;

/** The void block this plugin adds: no text children, data lives in attributes. */
export declare type ImageBlock = {
    type: 'image';
    src: string;
    alt?: string;
};

export declare const ImagePlugin: FondueRtePlugin;

export declare type InlineSpec = {
    /** Inline type name stored on inline nodes, e.g. `mention`. */
    type: string;
    /** The data this inline carries, stored flat on the node — a mention's `id` and `label`. */
    attributes?: Record<string, AttributeSpec>;
    /**
     * How the inline looks: a React render function returning a single root
     * element. Inline elements are void — there is no children slot; visible
     * content (e.g. `@{label}`) is rendered from the attributes.
     */
    render: (props: RenderInlineProps) => ReactNode;
    /** How pasted HTML becomes this inline, e.g. `[{ tag: 'span[data-mention-id]' }]`. */
    parseRules?: readonly ParseRule[];
};

export declare const isHeadingBlock: (node: FrontifyBlockNode) => node is HeadingBlock;

export declare const isImageBlock: (node: FrontifyBlockNode) => node is ImageBlock;

export declare const isQuoteBlock: (node: FrontifyBlockNode) => node is QuoteBlock;

/** The flag this plugin sets on text nodes. */
export declare type ItalicMark = {
    italic?: boolean;
};

export declare const ItalicPlugin: FondueRtePlugin;

/** The value this plugin sets on text nodes. */
export declare type LinkMark = {
    link?: {
        href: string;
    };
};

export declare const LinkPlugin: FondueRtePlugin;

export declare type MarkSpec = {
    /** Flag name stored on text nodes, e.g. `bold` — `{ text: 'x', bold: true }`. */
    key: string;
    /**
     * The data this mark carries, stored as an object under the mark key —
     * a link's `href` gives `{ text: '…', link: { href } }`. Marks without
     * attributes are stored as plain `true`.
     */
    attributes?: Record<string, AttributeSpec>;
    /**
     * How the mark looks: a React render function wrapping `children` in a
     * single element. The element it renders is also recognized when parsing
     * pasted HTML.
     */
    render: (props: RenderMarkProps) => ReactNode;
    /** Additional rules for recognizing pasted HTML as this mark, e.g. `[{ tag: 'b' }]` for bold. */
    parseRules?: readonly ParseRule[];
};

/** The baseline block every editor has; the default for empty documents and Enter-key splits. */
export declare type ParagraphBlock = {
    type: 'paragraph';
    children: FrontifyInlineNode[];
};

/** One rule for recognizing pasted HTML. */
export declare type ParseRule = {
    /** Element that is recognized, e.g. `h2` or `b`. */
    tag: string;
    /** Attribute values this element implies, e.g. `{ level: 2 }` for `h2`. */
    attributes?: Record<string, unknown>;
};

/** The block type this plugin adds. Part of the assembled FrontifyBlock union at the package root. */
export declare type QuoteBlock = {
    type: 'quote';
    children: FrontifyInlineNode[];
};

export declare const QuotePlugin: FondueRtePlugin;

export declare type RenderBlockProps = {
    /** The block node: type plus its declared attributes (children are rendered via `children`). */
    node: FrontifyBlockNode;
    /** The editable content slot; render it inside the returned element. Void blocks have none. */
    children: ReactNode;
    /** Editor-supplied props; spread them onto the returned root element. */
    attributes: Record<string, unknown>;
};

export declare type RenderInlineProps = {
    /** The inline node: type plus its declared attributes. */
    node: FrontifyInlineElementNode;
    /** Editor-supplied props; spread them onto the returned root element. */
    attributes: Record<string, unknown>;
};

export declare type RenderMarkProps = {
    /** The marked text; render it inside the returned element. */
    children: ReactNode;
    /** The mark's value for value-carrying marks (`{ href }` for links); empty object otherwise. */
    value: Record<string, unknown>;
};

export declare const RichTextEditor: ({ value, onChange, plugins }: RichTextEditorProps) => ReactNode;

export declare type RichTextEditorProps = {
    value?: FrontifyDocument;
    onChange?: (value: FrontifyDocument) => void;
    /** The plugins to mount, in toolbar order (e.g. `defaultPlugins`, extended or reduced as needed). */
    plugins?: FondueRtePlugin[];
};

export { }
