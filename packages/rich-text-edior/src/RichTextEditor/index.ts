/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The editor's surface: the component, the plugin contract, and the structural
 * document types. This is everything a plugin may import (enforced by ESLint),
 * and it is the same set the package root re-exports — so anything a shipped
 * plugin does, an external plugin author can do too.
 *
 * A plugin is a function returning an `RtePlugin`, so the literal it writes is
 * contextually typed and the schema spec types (BlockSpec, MarkSpec, InlineSpec,
 * AttributeSpec, ParseRule) need no annotation — which is why they stay
 * unexported.
 *
 * The two floating types are exported because floating UI outgrows the literal:
 * its content is a component of its own (`FloatingContext` types the props), and
 * a reusable piece of it is a function returning a `FloatingSpec` — which is
 * exactly what `comboboxFloating` is.
 */

export { RichTextEditor, type RichTextEditorProps } from './RichTextEditor';
export {
    type EditorControlApi,
    type FloatingContext,
    type FloatingSpec,
    type ParagraphBlock,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type RtePlugin,
} from './types';
