/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The rich text editor's public surface: the component, the plugin
 * contract, and the structural document types. This is everything a plugin
 * is allowed to import (enforced by ESLint) — the editor itself knows
 * nothing about any concrete plugin.
 */

// The component
export { RichTextEditor, type RichTextEditorProps } from './react';

// The plugin contract
export {
    type AttributeSpec,
    type BlockSpec,
    type FondueRtePlugin,
    type InlineSpec,
    type MarkSpec,
    type ParseRule,
    type RenderBlockProps,
    type RenderInlineProps,
    type RenderMarkProps,
} from './core/plugin';
export { type EditorControlApi } from './core/editor-api';

// The document skeleton (what the editor internals operate on)
export {
    type FrontifyDocument,
    type FrontifyBlockNode,
    type FrontifyInlineNode,
    type FrontifyInlineElementNode,
    type FrontifyTextNode,
    type FrontifySelection,
    type FrontifyPoint,
    type ParagraphBlock,
} from './core/document';
