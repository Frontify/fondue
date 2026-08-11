/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Every contract the editor is built on, all engine-agnostic: the document
 * format (`document.ts`), what a plugin declares (`schema.ts`, `plugin.ts`),
 * and the API plugins act through (`api.ts`). The `prosemirror/` folder is the
 * only place these are translated into engine terms.
 */

export { type EditorControlApi } from './api';
export {
    type ParagraphBlock,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineElementNode,
    type RteInlineNode,
    type RteTextNode,
} from './document';
export {
    type FloatingAnchor,
    type FloatingContext,
    type FloatingKeyHandler,
    type FloatingSpec,
    type RteInputRule,
    type RtePlugin,
} from './plugin';
export {
    type AttributeSpec,
    type BlockAttributeSpec,
    type BlockSpec,
    type InlineSpec,
    type MarkSpec,
    type ParseRule,
} from './schema';
