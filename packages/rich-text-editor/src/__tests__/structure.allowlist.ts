/* (c) Copyright Frontify Ltd., all rights reserved. */

// Ratchet tables for structure.spec.ts. Entries record today's value and only shrink.

export const FILES_OVER_600_LINES: Record<string, number> = {};

// Data tables exempt from the 600 line limit; each must still exist.
export const DATA_TABLES: Record<string, string> = {
    'src/plugins/CodeBlock/helpers/languages.ts': 'Flat list of code language ids and labels, no logic.',
};

export const FILES_OVER_400_LINES: Record<string, number> = {};

export const FUNCTIONS_OVER_140_LINES: Record<string, number> = {};

export const FUNCTIONS_OVER_6_LETS: Record<string, number> = {};

export const SPECS_OVER_1000_LINES: Record<string, number> = {};

export const KNOWN_CYCLES: string[] = [];

export const SPEC_REFERENCES: Record<string, number> = {};

export const AS_UNKNOWN_AS_MAX = 10;

// One exported name, declared again in exactly these modules, where the copies cannot be one binding.
export const DUPLICATE_BINDINGS: { name: string; files: string[]; why: string }[] = [
    {
        name: 'afterFailure',
        files: ['src/plugins/Mention/helpers/results.ts', 'src/runtime/capabilities/suggestions/references.ts'],
        why: 'The plugin imports only the plugin API (`#/bridge/pluginApi/*` and `#/model`), so it keeps its own copy of the suggestion list helpers.',
    },
    {
        name: 'afterPage',
        files: ['src/plugins/Mention/helpers/results.ts', 'src/runtime/capabilities/suggestions/references.ts'],
        why: 'The plugin imports only the plugin API (`#/bridge/pluginApi/*` and `#/model`), so it keeps its own copy of the suggestion list helpers.',
    },
    {
        name: 'AltTextDialog',
        files: ['src/plugins/Image/components/AltTextDialog.tsx', 'src/plugins/Image/helpers/lazyParts.ts'],
        why: 'The loader is a dynamic import of the component, so the component binding and the loader binding cannot be one.',
    },
    {
        name: 'createTransport',
        files: ['src/persistence/transport.ts', 'src/runtime/capabilities/media/uploads/transport.ts'],
        why: 'Each state machine module exports the same interface, and the machines do not import one another.',
    },
    {
        name: 'Draft',
        files: ['src/persistence/saveState.ts', 'src/runtime/async/asyncState.ts'],
        why: 'Each state machine module exports the same interface, and the machines do not import one another.',
    },
    {
        name: 'Effect',
        files: ['src/persistence/saveState.ts', 'src/runtime/capabilities/media/uploads/machine.ts'],
        why: 'Each state machine module exports the same interface, and the machines do not import one another.',
    },
    {
        name: 'initial',
        files: ['src/persistence/saveMachine.ts', 'src/runtime/async/asyncState.ts'],
        why: 'Each state machine module exports the same interface, and the machines do not import one another.',
    },
    {
        name: 'isEmptyDocument',
        files: ['src/codecs/toHtml.ts', 'src/runtime/port.ts'],
        why: 'The codec reads a stored tree and the port reads a session, and neither module imports the other.',
    },
    {
        name: 'listOption',
        files: ['src/plugins/Mention/helpers/results.ts', 'src/ui/LazySuggestionList/helpers/suggestionOptions.ts'],
        why: 'The plugin imports only the plugin API (`#/bridge/pluginApi/*` and `#/model`), so it keeps its own copy of the suggestion list helpers.',
    },
    {
        name: 'mediaOf',
        files: ['src/runtime/port.ts', 'src/runtime/session/lifecycle/uploadsWiring.ts'],
        why: 'The port takes an editor port and the wiring takes the runtime, so the port wraps the wiring instead of sharing its binding.',
    },
    {
        name: 'next',
        files: [
            'src/persistence/saveMachine.ts',
            'src/runtime/async/asyncMachine.ts',
            'src/runtime/capabilities/media/uploads/machine.ts',
        ],
        why: 'Each state machine module exports the same interface, and the machines do not import one another.',
    },
    {
        name: 'readerFeature',
        files: [
            'src/plugins/CheckList/reader.tsx',
            'src/plugins/Image/reader.tsx',
            'src/plugins/Link/reader.tsx',
            'src/plugins/Mention/reader.tsx',
        ],
        why: 'Each reader module exports its own feature id, so the four constants cannot be one binding.',
    },
    {
        name: 'ReaderOverrides',
        files: ['src/bridge/pluginApi/definePlugin.ts', 'src/reader/helpers/plan.ts'],
        why: 'The bridge cannot import the reader, so it declares the override map itself.',
    },
    {
        name: 'referenceListStrings',
        files: ['src/plugins/Mention/helpers/results.ts', 'src/ui/LazySuggestionList/helpers/referenceStrings.ts'],
        why: 'The plugin imports only the plugin API (`#/bridge/pluginApi/*` and `#/model`), so it keeps its own copy of the suggestion list helpers.',
    },
    {
        name: 'ReferenceListStrings',
        files: ['src/plugins/Mention/helpers/results.ts', 'src/ui/LazySuggestionList/helpers/referenceStrings.ts'],
        why: 'The plugin imports only the plugin API (`#/bridge/pluginApi/*` and `#/model`), so it keeps its own copy of the suggestion list helpers.',
    },
    {
        name: 'resultsOf',
        files: ['src/plugins/Mention/helpers/results.ts', 'src/runtime/capabilities/suggestions/references.ts'],
        why: 'The plugin imports only the plugin API (`#/bridge/pluginApi/*` and `#/model`), so it keeps its own copy of the suggestion list helpers.',
    },
    {
        name: 'returnFocus',
        files: ['src/plugins/Link/helpers/linkBubbleModel.ts', 'src/ui/helpers/items.ts'],
        why: 'A plugin helper imports only the plugin API, so it cannot call the toolbar focus helper.',
    },
    {
        name: 'shipped',
        files: [
            'src/react/profiles/brandDocument.ts',
            'src/react/profiles/comment.ts',
            'src/react/profiles/document.ts',
            'src/react/profiles/inline.ts',
        ],
        why: 'Each profile module exports its own compiled bundle, so the four functions cannot be one binding.',
    },
    {
        name: 'spokenOption',
        files: ['src/plugins/Mention/helpers/results.ts', 'src/ui/LazySuggestionList/helpers/suggestionOptions.ts'],
        why: 'The plugin imports only the plugin API (`#/bridge/pluginApi/*` and `#/model`), so it keeps its own copy of the suggestion list helpers.',
    },
    {
        name: 'statusOf',
        files: ['src/persistence/saveState.ts', 'src/runtime/capabilities/media/uploads/machine.ts'],
        why: 'Each state machine module exports the same interface, and the machines do not import one another.',
    },
    {
        name: 'Step',
        files: ['src/persistence/saveState.ts', 'src/runtime/capabilities/media/uploads/machine.ts'],
        why: 'Each state machine module exports the same interface, and the machines do not import one another.',
    },
    {
        name: 'Transport',
        files: ['src/persistence/transport.ts', 'src/runtime/capabilities/media/uploads/transport.ts'],
        why: 'Each state machine module exports the same interface, and the machines do not import one another.',
    },
    {
        name: 'UploadControls',
        files: ['src/plugins/Image/components/UploadControls.tsx', 'src/plugins/Image/helpers/lazyParts.ts'],
        why: 'The loader is a dynamic import of the component, so the component binding and the loader binding cannot be one.',
    },
    {
        name: 'UploadSlot',
        files: ['src/plugins/Image/components/UploadSlot.tsx', 'src/plugins/Image/helpers/lazyParts.ts'],
        why: 'The loader is a dynamic import of the component, so the component binding and the loader binding cannot be one.',
    },
    {
        name: 'WidthDialog',
        files: ['src/plugins/Image/components/WidthDialog.tsx', 'src/plugins/Image/helpers/lazyParts.ts'],
        why: 'The loader is a dynamic import of the component, so the component binding and the loader binding cannot be one.',
    },
];

// Where `readonly` stays on a property or index signature: each entry names a freeze site, or a type assertion, and
// the types whose own members keep it. A `types` name is `file#Type` for its direct members, or `file#{ members }` for
// an inline literal; a `deep` type also covers the members of literals nested in it, as its frozen copy is frozen all through.
export type ReadonlyMembers = {
    site: string;
    why: string;
    types?: string[];
    deep?: string[];
};

export const READONLY_MEMBERS: ReadonlyMembers[] = [
    {
        site: 'src/model/vocabulary/feature.ts#createFeature',
        why: 'createFeature freezes the feature value, so a write throws.',
        types: ['src/model/types.ts#Feature', 'src/model/vocabulary/feature.ts#FeatureValue'],
    },
    {
        site: 'src/model/vocabulary/feature.ts#attachToFeature',
        why: 'attachToFeature freezes the declaration copy and its attachments, so a write throws.',
        types: ['src/model/vocabulary/feature.ts#{ [ATTACHED] }'],
    },
    {
        site: 'src/model/vocabulary/feature.ts#defineFeature',
        why: 'defineFeature snapshots the declaration, deep-freezing every JSON member it can reach, so a write throws.',
        deep: [
            'src/model/vocabulary/declarations.ts#FeatureDeclaration',
            'src/model/vocabulary/contentRules.ts#FeatureContentDeclaration',
            'src/model/vocabulary/contentRules.ts#ReferenceDeclaration',
            'src/model/vocabulary/declarationValues.ts#AttributeDeclaration',
            'src/model/vocabulary/declarationValues.ts#OptionDeclarations',
            'src/model/vocabulary/declarationValues.ts#ValueDeclaration',
            'src/model/vocabulary/declarations.ts#FeatureFormats',
            'src/model/vocabulary/declarations.ts#HtmlAttributeValue',
            'src/model/vocabulary/declarations.ts#HtmlTag',
            'src/model/vocabulary/declarations.ts#MarkDeclaration',
            'src/model/vocabulary/declarations.ts#NodeDeclaration',
            'src/model/vocabulary/declarations.ts#OptionRef',
            'src/model/vocabulary/declarations.ts#ParseAttributeSource',
            'src/model/vocabulary/declarations.ts#ParseRule',
            'src/model/vocabulary/declarations.ts#SharedAttributeDeclaration',
        ],
    },
    {
        site: 'src/model/vocabulary/feature.ts#defineFeature',
        why: 'defineFeature freezes each function parse rule, so a write throws.',
        types: ['src/model/vocabulary/declarations.ts#FunctionParseRule'],
    },
    {
        site: 'src/model/compile/compile.ts#freezeModel',
        why: 'compileContentModel freezes the model, so a write throws.',
        types: ['src/model/vocabulary/declarations.ts#ContentModel'],
    },
    {
        site: 'src/model/vocabulary/format.ts#defaultLimits',
        why: 'defaultLimits is frozen, so a write throws.',
        types: ['src/model/vocabulary/format.ts#ResourceLimits'],
    },
    {
        site: 'src/runtime/session/state/shown.ts#createShown',
        why: 'The snapshot is a deep-frozen copy, and the stored blocks inside it are frozen by src/runtime/session/state/encode.ts:40, so a write throws.',
        deep: [
            'src/runtime/types.ts#Snapshot',
            'src/runtime/types.ts#DocumentStamp',
            'src/runtime/types.ts#SessionToken',
            'src/model/vocabulary/format.ts#RichTextDocument',
            'src/model/vocabulary/format.ts#ContentNodeJSON',
            'src/model/vocabulary/format.ts#MarkJSON',
            'src/model/types.ts#ModelRef',
            'src/model/types.ts#CapabilityRef',
        ],
    },
    {
        site: 'src/runtime/session/state/encode.ts#encodeByBlock',
        why: 'The typed views of the same stored blocks that the snapshot deep-freezes, so a write throws.',
        deep: [
            'src/model/vocabulary/format.ts#DocumentOf',
            'src/model/vocabulary/format.ts#NodeOf',
            'src/model/vocabulary/format.ts#MarkOf',
        ],
    },
    {
        site: 'src/bridge/nodeViews/nodeViews.ts#stateOf',
        why: 'Node and mark attributes reach plugins, decorations and the manifest as deep-frozen JSON (also src/runtime/statePlugins/decorations.ts:78, src/runtime/api/shared.ts:82, src/model/compile/compile.ts:55), so a write throws.',
        deep: ['src/model/types.ts#JsonObject', 'src/model/types.ts#JsonValue'],
    },
    {
        site: 'src/bridge/pluginApi/plugin.ts#defineEditorPart',
        why: 'defineEditorPart freezes the editor part, so a write throws.',
        types: [
            'src/bridge/pluginApi/plugin.ts#EditorPartSpec',
            'src/bridge/pluginApi/plugin.ts#EditorPart',
            'src/bridge/pluginApi/plugin.ts#{ feature }',
            'src/bridge/pluginApi/plugin.ts#{ [OPTION_PARTS] }',
        ],
    },
    {
        site: 'src/bridge/pluginApi/definePlugin.ts#definePlugin',
        why: 'definePlugin and extendPlugin freeze the plugin, and extendEditor freezes its editor part, so a write throws.',
        types: [
            'src/bridge/pluginApi/definePlugin.ts#RichTextPlugin',
            'src/bridge/pluginApi/definePlugin.ts#{ [OPTION_PARTS] }',
        ],
    },
    {
        site: 'src/runtime/reporting/metrics.ts#operationMetric',
        why: 'operationMetric freezes each metric, so a write throws.',
        types: ['src/runtime/types.ts#OperationMetric'],
    },
    {
        site: 'src/runtime/reporting/saves.ts#createUnmanagedStatus',
        why: 'The save status is frozen (also src/persistence/transport.ts:104 and :342), so a write throws.',
        types: ['src/runtime/types.ts#SaveStatus'],
    },
    {
        site: 'src/persistence/transport.ts#prepare',
        why: 'The save request is frozen, so a write throws.',
        types: ['src/persistence/types.ts#SaveRequest'],
    },
    {
        site: 'src/runtime/async/asyncRun.ts#buildOperation',
        why: 'A registered operation is frozen, so a write throws.',
        types: ['src/runtime/async/async.ts#AsyncOperation'],
    },
    {
        site: 'src/react/compile/compileEditor.ts#compileEditor',
        why: 'compileEditor freezes the definition, so a write throws.',
        types: ['src/react/types.ts#EditorDefinitionInfo', 'src/react/types.ts#CompiledEditorDefinition'],
    },
    {
        site: 'src/runtime/session/lifecycle/targets.ts#handleOf',
        why: 'A selection handle is frozen, so a write throws.',
        types: ['src/runtime/types.ts#SelectionHandle'],
    },
    {
        site: 'src/runtime/api/shared.ts#rangeOf',
        why: 'A range is a frozen opaque object, so a write throws.',
        types: ['src/runtime/api/documentApi.ts#EditorRange'],
    },
];
