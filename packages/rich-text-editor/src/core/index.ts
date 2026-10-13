/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * The shared language: document shape, plugin contract, commands, registry.
 * Imports from no other layer. Plugins, renderer and editor all import here.
 */

export { type EditorControlApi, type RteSelectionSnapshot } from './commands';
export {
    type ParagraphBlock,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineElementNode,
    type RteInlineNode,
    type RteTextNode,
    type StoredMarkValue,
} from './document';
export {
    attributeEntries,
    cssText,
    type HtmlAttributes,
    type HtmlSpec,
    type StyleMap,
    withRootStyle,
} from './htmlSpec';
export {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type ContentModel,
    defineBlock,
    defineInline,
    defineMark,
    type EditProps,
    type InlineDefinition,
    type MarkDefinition,
    type ParseRule,
    type RteInputRule,
    type RtePlugin,
    type SelectedNode,
    type ToolbarItemProps,
} from './plugin';
export {
    blockAttributeStyle,
    blockHtml,
    blockValueOf,
    buildPluginRegistry,
    type PluginRegistry,
    unknownBlockType,
    unknownInlineType,
    unknownMarkType,
} from './registry';
export { ANY_LIST, DOCUMENT_VERSION, emptyDocument, PARAGRAPH } from './vocabulary';
