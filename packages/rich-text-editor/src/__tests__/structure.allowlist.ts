/* (c) Copyright Frontify Ltd., all rights reserved. */

// Ratchet tables for structure.spec.ts. Entries record today's value and only shrink.

export const FILES_OVER_600_LINES: Record<string, number> = {};

// Data tables exempt from the 600 line limit; each must still exist.
export const DATA_TABLES: Record<string, string> = {
    'src/plugins/CodeBlock/languages.ts': 'Flat list of code language ids and labels, no logic.',
};

export const FILES_OVER_400_LINES: Record<string, number> = {};

export const FUNCTIONS_OVER_150_LINES: Record<string, number> = {};

export const FUNCTIONS_OVER_6_LETS: Record<string, number> = {};

export const SPECS_OVER_1000_LINES: Record<string, number> = {};

export const KNOWN_CYCLES: string[] = [];

export const SPEC_REFERENCES: Record<string, number> = {};

export const AS_UNKNOWN_AS_MAX = 10;

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
        site: 'src/model/feature.ts:26',
        why: 'createFeature freezes the feature value, so a write throws.',
        types: ['src/model/types.ts#Feature', 'src/model/feature.ts#FeatureValue'],
    },
    {
        site: 'src/model/feature.ts:58',
        why: 'attachToFeature freezes the declaration copy and its attachments, so a write throws.',
        types: ['src/model/feature.ts#{ [ATTACHED] }'],
    },
    {
        site: 'src/model/feature.ts:81',
        why: 'defineFeature snapshots the declaration, deep-freezing every JSON member it can reach, so a write throws.',
        deep: [
            'src/model/declarations.ts#FeatureDeclaration',
            'src/model/contentRules.ts#FeatureContentDeclaration',
            'src/model/contentRules.ts#ReferenceDeclaration',
            'src/model/declarationValues.ts#AttributeDeclaration',
            'src/model/declarationValues.ts#OptionDeclarations',
            'src/model/declarationValues.ts#ValueDeclaration',
            'src/model/declarations.ts#FeatureFormats',
            'src/model/declarations.ts#HtmlAttributeValue',
            'src/model/declarations.ts#HtmlTag',
            'src/model/declarations.ts#MarkDeclaration',
            'src/model/declarations.ts#NodeDeclaration',
            'src/model/declarations.ts#OptionRef',
            'src/model/declarations.ts#ParseAttributeSource',
            'src/model/declarations.ts#ParseRule',
            'src/model/declarations.ts#SharedAttributeDeclaration',
        ],
    },
    {
        site: 'src/model/feature.ts:97',
        why: 'defineFeature freezes each function parse rule, so a write throws.',
        types: ['src/model/declarations.ts#FunctionParseRule'],
    },
    {
        site: 'src/model/compile.ts:70',
        why: 'compileContentModel freezes the model, so a write throws.',
        types: ['src/model/declarations.ts#ContentModel'],
    },
    {
        site: 'src/model/format.ts:172',
        why: 'defaultLimits is frozen, so a write throws.',
        types: ['src/model/format.ts#ResourceLimits'],
    },
    {
        site: 'src/runtime/session/shown.ts:146',
        why: 'The snapshot is a deep-frozen copy, and the stored blocks inside it are frozen by src/runtime/session/encode.ts:40, so a write throws.',
        deep: [
            'src/runtime/types.ts#Snapshot',
            'src/runtime/types.ts#DocumentStamp',
            'src/runtime/types.ts#SessionToken',
            'src/model/format.ts#RichTextDocument',
            'src/model/format.ts#ContentNodeJSON',
            'src/model/format.ts#MarkJSON',
            'src/model/types.ts#ModelRef',
            'src/model/types.ts#CapabilityRef',
        ],
    },
    {
        site: 'src/runtime/session/encode.ts:40',
        why: 'The typed views of the same stored blocks that the snapshot deep-freezes, so a write throws.',
        deep: ['src/model/format.ts#DocumentOf', 'src/model/format.ts#NodeOf', 'src/model/format.ts#MarkOf'],
    },
    {
        site: 'src/bridge/nodeViews.ts:56',
        why: 'Node and mark attributes reach plugins, decorations and the manifest as deep-frozen JSON (also src/runtime/decorations.ts:78, src/runtime/api/shared.ts:82, src/model/compile.ts:55), so a write throws.',
        deep: ['src/model/types.ts#JsonObject', 'src/model/types.ts#JsonValue'],
    },
    {
        site: 'src/bridge/plugin.ts:355',
        why: 'defineEditorPart freezes the editor part, so a write throws.',
        types: [
            'src/bridge/plugin.ts#EditorPartSpec',
            'src/bridge/plugin.ts#EditorPart',
            'src/bridge/plugin.ts#{ feature }',
            'src/bridge/plugin.ts#{ [OPTION_PARTS] }',
        ],
    },
    {
        site: 'src/bridge/definePlugin.ts:54',
        why: 'definePlugin and extendPlugin freeze the unit, and extendEditor freezes its editor part, so a write throws.',
        types: ['src/bridge/definePlugin.ts#RichTextPlugin', 'src/bridge/definePlugin.ts#{ [OPTION_PARTS] }'],
    },
    {
        site: 'src/runtime/metrics.ts:14',
        why: 'operationMetric freezes each metric, so a write throws.',
        types: ['src/runtime/types.ts#OperationMetric'],
    },
    {
        site: 'src/runtime/saves.ts:53',
        why: 'The save status is frozen (also src/persistence/transport.ts:104 and :342), so a write throws.',
        types: ['src/runtime/types.ts#SaveStatus'],
    },
    {
        site: 'src/persistence/transport.ts:226',
        why: 'The save request is frozen, so a write throws.',
        types: ['src/persistence/types.ts#SaveRequest'],
    },
    {
        site: 'src/runtime/async.ts:120',
        why: 'A registered operation is frozen, so a write throws.',
        types: ['src/runtime/async.ts#AsyncOperation'],
    },
    {
        site: 'src/react/compileEditor.ts:388',
        why: 'compileEditor freezes the definition, so a write throws.',
        types: ['src/react/types.ts#EditorDefinitionInfo', 'src/react/types.ts#CompiledEditorDefinition'],
    },
    {
        site: 'src/runtime/session/targets.ts:98',
        why: 'A selection handle is frozen, so a write throws.',
        types: ['src/runtime/types.ts#SelectionHandle'],
    },
    {
        site: 'src/runtime/api/shared.ts:32',
        why: 'A range is a frozen opaque object, so a write throws.',
        types: ['src/runtime/documentApi.ts#EditorRange'],
    },
    {
        site: 'src/model/__tests__/compileDeclarations.spec.ts:488',
        why: 'The type assertion compares the readonly members that OptionsOf yields.',
        types: ['src/model/__tests__/compileDeclarations.spec.ts#{ defaultLevel }'],
    },
];
