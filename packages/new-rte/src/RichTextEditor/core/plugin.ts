/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type FrontifyBlockNode, type FrontifyInlineElementNode } from './document';
import { type EditorControlApi } from './editor-api';

/**
 * A feature described in engine-agnostic terms. A plugin is a plain object:
 * it declares what exists (schema), how it looks (render, styles), and how
 * to interact with it (toolbar, hotkeys) — and never executes anything
 * itself; runtime effects go through the EditorControlApi it is handed.
 */
export type FondueRtePlugin = {
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

/** Declaration of one piece of data a block, inline, or mark carries. */
export type AttributeSpec = {
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

export type RenderBlockProps = {
    /** The block node: type plus its declared attributes (children are rendered via `children`). */
    node: FrontifyBlockNode;
    /** The editable content slot; render it inside the returned element. Void blocks have none. */
    children: ReactNode;
    /** Editor-supplied props; spread them onto the returned root element. */
    attributes: Record<string, unknown>;
};

export type InlineSpec = {
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

export type RenderInlineProps = {
    /** The inline node: type plus its declared attributes. */
    node: FrontifyInlineElementNode;
    /** Editor-supplied props; spread them onto the returned root element. */
    attributes: Record<string, unknown>;
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
     * How the mark looks: a React render function wrapping `children` in a
     * single element. The element it renders is also recognized when parsing
     * pasted HTML.
     */
    render: (props: RenderMarkProps) => ReactNode;
    /** Additional rules for recognizing pasted HTML as this mark, e.g. `[{ tag: 'b' }]` for bold. */
    parseRules?: readonly ParseRule[];
};

export type RenderMarkProps = {
    /** The marked text; render it inside the returned element. */
    children: ReactNode;
    /** The mark's value for value-carrying marks (`{ href }` for links); empty object otherwise. */
    value: Record<string, unknown>;
};
