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
export {
    attributeEntries,
    contentElementOf,
    type HtmlAttributes,
    type HtmlSpec,
    safeStyleEntries,
    type StyleMap,
} from './htmlSpec';
export { fondueToken, fondueTokenValues, type FondueTokenName } from './fondueTokens';
export { CHILD_SPACING_ATTRIBUTE, DOCUMENT_GAP_VARIABLES, OWN_MARGINS_ATTRIBUTE } from './documentContract';
export {
    LOOK_MARGIN_FALLBACKS,
    lookProperties,
    lookStyle,
    lookVariableName,
    styleOfClass,
    type TextLook,
} from './look';
export {
    type BlockAttributeDefinition,
    type BlockComponentProps,
    type BlockDefinition,
    type ChildSpacing,
    type ContentModel,
    type ContentStyles,
    type DefaultStyle,
    defineBlock,
    defineContent,
    defineInline,
    defineMark,
    definePlugin,
    type EditProps,
    type HotkeyHandler,
    type InlineDefinition,
    type MarkClearRule,
    type MarkDefinition,
    type MarkParseRule,
    onlyTypeOf,
    type ParseRule,
    type PasteHandler,
    type RteBlockCommand,
    type RteContent,
    type RteContentDefinition,
    type RteDelimiterRule,
    type RteEditView,
    type RteIcon,
    type RteInputRule,
    type RtePlugin,
    type RtePluginDefinition,
    type RteToolbarEntry,
    RTE_TOOLBAR_GROUPS,
    type RteToolbarGroup,
    type SelectedNode,
    type StyleParseRule,
    type ToolbarItemProps,
} from './plugin';
export {
    blockAttributeStyle,
    blockHtml,
    blockValueOf,
    buildPluginRegistry,
    childSpacingAttributes,
    childSpacingOf,
    DEFAULT_CHILD_SPACING,
    controlOf,
    isOwnActive,
    type OwnControl,
    type OwnType,
    ownTypeOf,
    type PluginRegistry,
    type ToolbarEntry,
    toggleOwn,
} from './registry';
export {
    ANY_LIST,
    DOCUMENT_VERSION,
    emptyDocument,
    INLINE_PLACEHOLDER,
    newerVersionOf,
    PARAGRAPH,
    WORD_START_CONTEXT,
} from './vocabulary';
