/* (c) Copyright Frontify Ltd., all rights reserved. */

// The model exports that the package's own code uses and the public `./model` entry does not.
export { ASSET_IMAGE, FIGURE, IMAGE_FEATURE, imageSource, leavesOutUnresolved } from './content/assets';
export {
    BASE_KEYS_PLUGIN,
    BLOCK_DECORATIONS_PLUGIN,
    CLIPBOARD_PLUGIN,
    CONTAINER_KEYS_PLUGIN,
    CONTENT_CHECKS_FEATURE,
    CONTENT_ISSUES_PLUGIN,
    DROP_CURSOR_PLUGIN,
    GAP_CURSOR_PLUGIN,
    HISTORY_PLUGIN,
    INPUT_RULES_PLUGIN,
    LAST_MARK_PLUGIN,
    NODE_IDS_PLUGIN,
    type PluginContribution,
    type PluginDescriptor,
    SUGGESTIONS_PLUGIN,
    declaresNodeIds,
    hasNodeId,
    keyHandlersPlugin,
    keymapPlugin,
    orderPlugins,
} from './compile/capabilities';
export { CONTENT_REPAIRS, DOCUMENT_RULES, type LocatedIssue, locateContentIssues } from './compile/checks';
export {
    type CompiledFeature,
    type CompiledParseRule,
    type SharedAttribute,
    attributesOf,
    compiledModel,
    markHrefPolicy,
} from './compile/compile';
export {
    ISLAND_BLOCK,
    ISLAND_INLINE,
    ISLAND_MARK,
    type TreeMark,
    type TreeNode,
    type Vocabulary,
    isIsland,
    vocabularyOf,
} from './content/content';
export {
    type BlockDecorationSource,
    type DecoratedBlock,
    type ReaderContext,
    type ResolveAssetUrl,
    type SuggestionPage,
    type SuggestionRules,
} from './vocabulary/declarations';
export { decodeToTree, limitsOf } from './document/decode';
export { encodeTree, writeMark, writeNode } from './document/encode';
export { findMisshapenCapabilities, isRoot } from './document/envelope';
export { pointer } from './vocabulary/errors';
export { attachToFeature, attachedTo, featureInternals } from './vocabulary/feature';
export { diagnostic } from './vocabulary/format';
export { canonicalJson } from './helpers/hash';
export {
    type DirectedRun,
    type HtmlTemplate,
    islandText,
    passageDirection,
    resolveHtmlSpec,
    treeRuns,
    withAutoDirection,
} from './output/htmlSpec';
export { packageVersionOf } from './document/migrate';
export {
    COLOR_PROPERTIES,
    COLUMN_BREAK,
    type ColumnLayout,
    type Item,
    type ListDepths,
    MIN_COLUMN_WIDTH,
    type MarkPlan,
    type NodePlan,
    type OutputStyles,
    type Plan,
    type Spacing,
    VOID_TAGS,
    attrsOf,
    buildPlan,
    codecContext,
    columnLayout,
    contentClasses,
    failedFallback,
    groupRun,
    islandFallback,
    islandLabel,
    itemsOf,
    listDepths,
    listLevelStyle,
    markPath,
    spaced,
    styleOfNode,
    textOf,
    unknownStyle,
    withActiveBreak,
    withColor,
    withListLevel,
    withStyle,
    withStyleId,
    writesAttribute,
} from './output/output';
export { isApple, isPlatformBinding, keyOn, modOn } from './helpers/platform';
export { randomId } from './document/randomId';
export { exceedsBytes } from './document/read';
export {
    type ResolveReference,
    holdsControls,
    resolvingSafely,
    shownLabel,
    withoutBidiControls,
} from './compile/references';
export { appliesToOf, colorOf, cssValue } from './styling/styles';
export { type LanguageTag, type StoredId } from './types';
export {
    OBJECT_REPLACEMENT,
    acceptedPayload,
    findUnsafeJson,
    isStoredId,
    isStyleAttribute,
    isUnknownArray,
    isValidValue,
    requiredAt,
    ownValue,
    parsedAttributes,
    snapshot,
} from './helpers/values';
