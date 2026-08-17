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
    type AttributeDefinition,
    type AttributeSpec,
    type AutocompleteContext,
    type AutocompleteKeyHandler,
    type BlockDefinition,
    type HtmlSpec,
    type InlineDefinition,
    type MarkDefinition,
    type ParseRule,
    type RteInputRule,
    type RtePlugin,
    type SchemaDefinition,
} from './plugin';
export {
    buildPluginRegistry,
    type PluginRegistry,
    parseRulesFor,
    unknownBlockType,
    unknownInlineType,
    unknownMarkType,
} from './registry';
export { ANY_LIST, DOCUMENT_VERSION, emptyDocument, PARAGRAPH } from './vocabulary';
