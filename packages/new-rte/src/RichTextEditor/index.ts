/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The editor's surface: the component, the plugin contract, and the structural
 * document types. This is everything a plugin may import (enforced by ESLint),
 * and it is the same set the package root re-exports — so anything a shipped
 * plugin does, an external plugin author can do too.
 *
 * The spec types (BlockSpec, MarkSpec, InlineSpec, AttributeSpec, ParseRule)
 * stay unexported on purpose: they are only ever written inside an RtePlugin
 * literal, where they are contextually typed.
 */

export { RichTextEditor, type RichTextEditorProps } from './RichTextEditor';
export {
    type EditorControlApi,
    type ParagraphBlock,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type RtePlugin,
} from './types';
