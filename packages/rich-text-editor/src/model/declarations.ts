/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FeatureContentDeclaration } from './content-rules';
import { type CapabilityMigration, type ModelMigration } from './declaration-editing';
import {
    type AttributeDeclaration,
    type AttributeDeclarations,
    type AttrsOf,
    type CapabilityRef,
    type JsonObject,
    type JsonValue,
    type ModelRef,
    type OptionDeclarations,
} from './declaration-values';
import { type HrefResult } from './href';

export type {
    BlockDecoration,
    BlockDecorationSource,
    CapabilityMigration,
    CommandRef,
    DecoratedBlock,
    InputRule,
    KeyBinding,
    MigrationContext,
    MigrationStepResult,
    ModelMigration,
    SuggestionPage,
    SuggestionResult,
    SuggestionRules,
} from './declaration-editing';
export type {
    AttributeDeclaration,
    AttributeDeclarations,
    AttrsOf,
    CapabilityRef,
    JsonObject,
    JsonValue,
    ModelRef,
    OptionDeclarations,
    OptionsOf,
    PayloadDeclaration,
    PayloadOf,
    ValueDeclaration,
    ValueOf,
} from './declaration-values';

/** Reads a feature option inside its own declaration, as `{ attr }` reads an attribute. */
export interface OptionRef {
    readonly option: string;
}
/** An HTML attribute value is a literal, a node attribute or an option, read by name. */
export type HtmlAttributeValue = string | { readonly attr: string } | OptionRef;
/** A literal tag, or one chosen by an attribute value, such as `h1` to `h6` from `level`. */
export type HtmlTag = string | { readonly attr: string; readonly tags: Readonly<Record<string, string>> };
/**
 * The package's own HTML spec over attributes: `[tag, attrs?, 0]`, where `0` is the content hole. A URL-valued
 * HTML attribute binds only a `url` attribute or a literal that passes `checkHref`.
 */
export type HtmlSpec =
    | readonly [tag: HtmlTag, content?: 0 | HtmlSpec]
    | readonly [tag: HtmlTag, attrs: Readonly<Record<string, HtmlAttributeValue>>, content?: 0 | HtmlSpec];
/** Where a parse rule reads one attribute; values convert by the attribute's declaration. */
export type ParseAttributeSource =
    | { readonly from: string; readonly equals?: string; readonly child?: string }
    | { readonly fromStyle: string }
    | { readonly value: JsonValue };
/** How the HTML reader recognises a node or mark: by tag, with attributes read from it, or by an inline style. */
export type ParseRule =
    | { readonly tag: string; readonly attrs?: Readonly<Record<string, ParseAttributeSource>> }
    | { readonly style: string; readonly value: string };
/**
 * Code features only. A parse rule over each pasted or imported element that `tag` selects, ahead of the data rules:
 * `value` gives the attributes of the feature's own mark or node, or `null` when the element is not one, so no data
 * rule of that mark or node reads it as one.
 */
export type FunctionParseRule =
    | { readonly tag: string; readonly mark: string; readonly value: (element: HTMLElement) => JsonObject | null }
    | { readonly tag: string; readonly node: string; readonly value: (element: HTMLElement) => JsonObject | null };

/** The declaration of a node type: its attributes, content, HTML mapping and behavior. */
export interface NodeDeclaration {
    /**
     * `block` for a node that stands in a document or container; `inline` for one inside text. A `block` node whose
     * content takes only blocks, such as `block+`, is a container: Enter in its empty last paragraph leaves it, with
     * no key handler of the node's own. `section` is for a node that only a `section` term takes, such as columns,
     * which the document's `section+` takes and a quote's `block+` does not: a `section` term takes every `block` node
     * and every `section` one.
     */
    readonly group?: 'block' | 'inline' | 'section';
    /**
     * Content expression in the package grammar: node names or the groups `block`, `inline` and `section`, joined in a
     * sequence by spaces or as alternatives by `|`, with parentheses and the quantifiers `?`, `*`, `+` and `{n}`,
     * `{n,}` or `{n,m}`, such as `paragraph block*` or `list_item+`.
     */
    readonly content?: string;
    readonly atom?: boolean;
    /** Mark names the node's inline content accepts; omitted means every installed mark, empty means none. */
    readonly marks?: readonly string[];
    /** `pre` keeps spaces, tabs and newlines exactly and turns off input rules inside. */
    readonly whitespace?: 'normal' | 'pre';
    /**
     * A node gets a `nodeId` by declaring that attribute, `{ type: 'string', required: true }`: the editor then gives
     * each node of the type an ID where one is missing or repeated. `NodeViewState.nodeId`, `EditorApi.nodeState` and
     * a write target `{ nodeId }` need it; without one, chrome acts on the node's live position and
     * `NodeViewState.nodeId` is `null`.
     */
    readonly attrs: AttributeDeclarations;
    /** Attributes of which exactly one is non-null. */
    readonly exactlyOne?: readonly string[];
    readonly html: HtmlSpec;
    readonly parse: readonly ParseRule[];
    /** Markdown output for a block: a line prefix such as `> `, or a fence. */
    readonly markdown?: { readonly prefix: string } | { readonly fence: string };
}
/** The declaration of a mark type: its attributes, HTML mapping and how it behaves at its edges. */
export interface MarkDeclaration {
    readonly attrs: AttributeDeclarations;
    readonly exactlyOne?: readonly string[];
    readonly html: HtmlSpec;
    readonly parse: readonly ParseRule[];
    readonly markdown?: { readonly open: string; readonly close: string };
    /** Mark names this mark removes; an empty list excludes nothing, not even the mark itself. */
    readonly excludes?: readonly string[];
    /** Nesting rank, lowest outermost: `link` -2, colours -1, others 0. */
    readonly rank?: number;
    /** `link` and `code` are non-inclusive: typing at their end does not extend them. */
    readonly inclusive?: boolean;
}
/** How well a format holds a feature: without loss, with loss, or not at all. */
export type FormatSupport = 'lossless' | 'lossy' | 'unsupported';
/** How well each export format (HTML, text, Markdown) holds the content of a feature. */
export interface FeatureFormats {
    readonly html: 'lossless' | 'lossy';
    readonly text: FormatSupport;
    readonly markdown: FormatSupport;
}

/** The host's URL for an asset at an optional width, or `null` when it has none. */
export type ResolveAssetUrl = (assetId: string, options: { readonly width?: number }) => string | null;
/** What a codec override may call: asset URLs from the host, the URL check and the output locale. */
export interface CodecContext {
    readonly resolveAssetUrl?: ResolveAssetUrl;
    readonly checkHref: (input: string) => HrefResult;
    /** The output locale (`enUS` by default) and its `${var}` interpolation, so overrides render localized text with no hook or context. */
    readonly locale: RichTextLocale;
    readonly t: (key: keyof TranslationStrings, vars?: Readonly<Record<string, string | number>>) => string;
}
/** What a reader override and node chrome read: plain data and functions, never a React context. */
export interface ReaderContext extends CodecContext {
    readonly resolveReference: (resourceType: string, resourceId: string) => ReferenceResolution;
}
/** Code features only, for structure the data forms cannot express, such as tables, task lists and media. */
export interface CodecOverrides {
    readonly markdown?: {
        readonly marks?: Readonly<Record<string, (inner: string, attrs: JsonObject, context: CodecContext) => string>>;
        readonly nodes?: Readonly<Record<string, (inner: string, attrs: JsonObject, context: CodecContext) => string>>;
    };
    readonly text?: {
        readonly marks?: Readonly<Record<string, (inner: string, attrs: JsonObject) => string>>;
        readonly nodes?: Readonly<Record<string, (inner: string, attrs: JsonObject, context: CodecContext) => string>>;
    };
    /** Node markup that needs a resolved asset URL; the result's URL-valued attributes still pass `checkHref`. */
    readonly html?: {
        readonly nodes?: Readonly<Record<string, (attrs: JsonObject, context: CodecContext) => HtmlSpec>>;
    };
}

/** An attribute one feature adds to other features' nodes, such as `align` on `paragraph` and `heading`. */
export interface SharedAttributeDeclaration {
    readonly on: readonly string[] | 'textblocks';
    readonly value: AttributeDeclaration;
    readonly html?: { readonly attr: string } | { readonly style: string };
    readonly parse?: { readonly attr: string } | { readonly style: string };
}

/** The declaration a feature is made from: its id, version, nodes, marks, commands, options and formats. */
export interface FeatureDeclaration extends FeatureContentDeclaration {
    /** The capability ID: documents record it in `requiredCapabilities`, and a policy, an editor part and the options are keyed by it, such as `marks.bold`. */
    readonly id: string;
    /** The capability version, raised when the stored shape of the feature's content changes, with a migration from the old one. */
    readonly version: number;
    /**
     * Capabilities that must be installed at exactly these versions; compilation refuses one that is missing, at
     * another version, or in a cycle. A feature builds on `core`'s document and paragraph, so it lists
     * `{ id: 'core', version: 1 }`.
     */
    readonly requires?: readonly { readonly id: string; readonly version: number }[];
    /** Upgrades of this feature's stored content between its capability versions. */
    readonly migrations?: readonly CapabilityMigration[];
    /** Serializable options with defaults; the declaration reads them as `{ option }`. */
    readonly options?: OptionDeclarations;
    readonly nodes?: Readonly<Record<string, NodeDeclaration>>;
    readonly marks?: Readonly<Record<string, MarkDeclaration>>;
    /** Attributes this feature adds to other features' nodes. */
    readonly attributes?: Readonly<Record<string, SharedAttributeDeclaration>>;
    readonly formats?: FeatureFormats;
    readonly codecs?: CodecOverrides;
    readonly parseRules?: readonly FunctionParseRule[];
}
declare const featureBrand: unique symbol;
/** A feature carries its ID, its command payloads and its node and mark attributes as types. */
export interface Feature<
    Commands extends object = object,
    Nodes extends object = object,
    Marks extends object = object,
    Id extends string = string,
> {
    readonly [featureBrand]: {
        readonly commands: Commands;
        readonly nodes: Nodes;
        readonly marks: Marks;
        readonly id: Id;
    };
    readonly id: string;
    readonly version: number;
}
/** The node attribute types a feature declaration defines, keyed by node name. */
export type NodesOfDeclaration<D> = D extends { readonly nodes: infer N }
    ? { readonly [K in keyof N]: N[K] extends { readonly attrs: infer A } ? AttrsOf<A> : never }
    : object;
/** The mark attribute types a feature declaration defines, keyed by mark name. */
export type MarksOfDeclaration<D> = D extends { readonly marks: infer M }
    ? { readonly [K in keyof M]: M[K] extends { readonly attrs: infer A } ? AttrsOf<A> : never }
    : object;
/** Every feature is a factory, called even with no options. */
export type FeatureFactory<
    Options extends object,
    Commands extends object,
    Nodes extends object,
    Marks extends object,
    Id extends string = string,
> = (options?: Options) => Feature<Commands, Nodes, Marks, Id>;

/** The id, version and migrations that name and version a content model when it is compiled. */
export interface ContentModelOptions {
    readonly id: string;
    readonly version: number;
    readonly migrations?: readonly ModelMigration[];
}
declare const contentModelBrand: unique symbol;
/** The compiled model that the editor, the reader and every codec take. */
export interface ContentModel<Features extends readonly Feature[] = readonly Feature[]> {
    readonly [contentModelBrand]: Features;
    readonly ref: ModelRef;
    readonly capabilities: readonly CapabilityRef[];
    /** The model ID and version, feature IDs, versions and options, and node and mark order. */
    readonly manifest: JsonObject;
    readonly fingerprint: string;
}

/** A map of translation keys, each starting with `RichTextEditor_`, to their text. */
export interface TranslationStrings {
    readonly [key: `RichTextEditor_${string}`]: string;
}
/**
 * The package's locale: its strings and language. Not Fondue's `LocaleConfig`, whose `dateLocale` is a
 * date-fns `Locale`: the editor formats no dates. `enUS` is the fallback.
 */
export interface RichTextLocale {
    readonly translationStrings: TranslationStrings;
    readonly lang?: string;
}
/** List markers by nesting depth, for lists whose `marker` is null; CSS `list-style-type` values. */
export interface ListLevels {
    readonly ordered: readonly { readonly counterType: string; readonly color?: string }[];
    readonly bullet: readonly { readonly shape: string; readonly color?: string; readonly size?: string }[];
}
/** What a host answers for a stored reference: its current label, that it is unavailable, or that it is unknown. */
export type ReferenceResolution =
    | { readonly status: 'current'; readonly label: string }
    | { readonly status: 'unavailable'; readonly code: 'deleted' | 'forbidden' }
    | { readonly status: 'unknown' };
