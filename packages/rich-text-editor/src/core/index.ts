/* (c) Copyright Frontify Ltd., all rights reserved. */

// The shared language: document shape, plugin contract, commands, registry.
// Imports from no other layer; plugins, renderer and editor all import here.

export {
    type ClearMarksOptions,
    type ClearMarksScope,
    EDITOR_SHORTCUTS,
    type EditorControlApi,
    type EditorShortcut,
    type InsertTextOptions,
    type InsertTextUndo,
    REDO_HOTKEY,
    type RteMarkState,
    type RteSelectionSnapshot,
    UNDO_HOTKEY,
} from './commands';
export {
    blockAttributeStyle,
    blockHtml,
    blockValueOf,
    buildContentRegistry,
    type ContentRegistry,
} from './contentRegistry';
export { toStoredColor } from './cssColor';
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
    type HotkeyEvent,
    type HotkeyModifier,
    isApplePlatform,
    matchesHotkey,
    type ParsedHotkey,
    parseHotkey,
} from './hotkeys';
export { attributeEntries, type HtmlAttributes, type HtmlSpec, safeStyleEntries, type StyleMap } from './htmlSpec';
export {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type ContentModel,
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
    type MarkIgnoreRule,
    type MarkParseRule,
    onlyTypeOf,
    type ParsePrecedence,
    type ParseReader,
    type ParseRule,
    type Paste,
    type PasteHandler,
    type PasteSource,
    type PasteTransform,
    type PasteTransformContext,
    type RteBlockCommand,
    type RteContent,
    type RteContentDefinition,
    type RteDelimiterRule,
    type RteEditView,
    type RteHotkey,
    type RteIcon,
    type RteInputRule,
    type RteMarkPatternTrim,
    type RtePlugin,
    type RtePluginDefinition,
    type RteToolbarEntry,
    type RteToolbarGroup,
    type SelectedNode,
    type StyleParseRule,
    type ToolbarItemProps,
} from './plugin';
export { parseReaderOf, readTagRule, type TagRule, type TagRuleReading } from './parseReader';
export {
    buildPluginRegistry,
    controlOf,
    isClaimedBy,
    isOwnActive,
    type OwnControl,
    type OwnType,
    ownTypeOf,
    type PluginRegistry,
    type RteShortcut,
    type RteShortcutOwner,
    type ToolbarEntry,
    type ToolbarEntryGroup,
    toggleOwn,
    toolbarGroupsOf,
} from './registry';
export {
    decodeStoredColor,
    encodeStoredColor,
    isSafeCssColor,
    isStoredColor,
    MAX_CHANNEL,
    OPAQUE_ALPHA,
    readHexDigits,
    type Rgba,
    toShortestAlpha,
} from './storedColor';
export {
    ANY_LIST,
    DOCUMENT_VERSION,
    emptyDocument,
    INLINE_PLACEHOLDER,
    newerVersionOf,
    OFFICE_LIST_ATTRIBUTES,
    PARAGRAPH,
    removeOfficeListData,
    WORD_START_CONTEXT,
} from './vocabulary';
export { warnOnce } from './warnings';
