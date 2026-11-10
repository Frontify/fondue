/* (c) Copyright Frontify Ltd., all rights reserved. */

// The shared language: document shape, plugin contract, commands, registry.
// Imports from no other layer; plugins, renderer and editor all import here.

export {
    type EditorControlApi,
    REDO_HOTKEY,
    type RteMarkState,
    type RteSelectionSnapshot,
    UNDO_HOTKEY,
} from './commands';
export {
    type ParagraphBlock,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineElementNode,
    type RteInlineNode,
    type RteTextNode,
    type StoredMarkValue,
} from './document';
export { isEmpty, toPlainText, type ToPlainTextOptions } from './documentText';
export { attributeEntries, type HtmlAttributes, type HtmlSpec, safeStyleEntries, type StyleMap } from './htmlSpec';
export {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type ContentModel,
    defineBlock,
    defineInline,
    defineMark,
    type EditProps,
    type HotkeyHandler,
    type InlineDefinition,
    type MarkDefinition,
    type ParseRule,
    type PasteHandler,
    type RteBlockCommand,
    type RteInputRule,
    type RtePlugin,
    RTE_TOOLBAR_GROUPS,
    type RteToolbarGroup,
    type SelectedNode,
    type ToolbarItemProps,
} from './plugin';
export {
    blockAttributeStyle,
    blockHtml,
    blockValueOf,
    buildPluginRegistry,
    type OwnType,
    ownTypeOf,
    type PluginRegistry,
    type ToolbarEntry,
} from './registry';
export { ANY_LIST, DOCUMENT_VERSION, emptyDocument, newerVersionOf, PARAGRAPH } from './vocabulary';
