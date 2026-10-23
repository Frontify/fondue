/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type RichTextDocument } from './format';
import { type HrefResult } from './href';

/** Any value JSON can hold. */
export type JsonValue = null | boolean | number | string | readonly JsonValue[] | { readonly [key: string]: JsonValue };
/** A JSON object, such as the attributes of a node or mark. */
export type JsonObject = { readonly [key: string]: JsonValue };

/** The id and version of a content model. */
export interface ModelRef {
    readonly id: string;
    readonly version: number;
}
/** The id and version of a feature, as a document records it in the capabilities it requires. */
export interface CapabilityRef {
    readonly id: string;
    readonly version: number;
}

/** Value declarations type attributes, command payloads and feature options alike. */
export type ValueDeclaration = (
    | {
          readonly type: 'string';
          readonly default?: string | null;
          readonly nullable?: boolean;
          readonly minLength?: number;
          readonly maxLength?: number;
      }
    | { readonly type: 'url'; readonly default?: string | null; readonly nullable?: boolean }
    /** Matches the `StoredId` pattern. */
    | { readonly type: 'id'; readonly default?: string | null; readonly nullable?: boolean }
    /** Matches `^#[0-9a-f]{6}([0-9a-f]{2})?$`. */
    | { readonly type: 'color'; readonly default?: string | null; readonly nullable?: boolean }
    /** A BCP 47 tag that passes `Intl.getCanonicalLocales`. */
    | { readonly type: 'language'; readonly default?: string | null; readonly nullable?: boolean }
    | {
          readonly type: 'integer' | 'number';
          readonly default?: number | null;
          readonly nullable?: boolean;
          readonly min?: number;
          readonly max?: number;
      }
    | { readonly type: 'boolean'; readonly default?: boolean | null; readonly nullable?: boolean }
    | {
          readonly type: 'enum';
          readonly values: readonly string[];
          readonly default?: string | null;
          readonly nullable?: boolean;
      }
    | {
          readonly type: 'list';
          readonly items: ValueDeclaration;
          readonly default?: readonly JsonValue[] | null;
          readonly nullable?: boolean;
          readonly maxItems?: number;
      }
    | { readonly type: 'json'; readonly default?: JsonValue; readonly nullable?: boolean }
) & { readonly required?: true };
/** An attribute carries a default, or is required with none, such as `heading.level`. */
export type AttributeDeclaration = ValueDeclaration & ({ readonly default: JsonValue } | { readonly required: true });
/** The attributes of a node or mark, keyed by name. */
export type AttributeDeclarations = Readonly<Record<string, AttributeDeclaration>>;
/** The options of a feature, keyed by name, each with a default. */
export type OptionDeclarations = Readonly<Record<string, ValueDeclaration & { readonly default: JsonValue }>>;
/** The shape of the payload a command takes: its fields and whether it may be null. */
export interface PayloadDeclaration {
    readonly fields: Readonly<Record<string, ValueDeclaration & { readonly optional?: boolean }>>;
    /** The whole payload may be `null`, such as "remove the colour". */
    readonly nullable?: boolean;
    /** Fields of which exactly one is set, such as `tokenId` and `value`. */
    readonly exactlyOne?: readonly string[];
}

/** The TypeScript type a value declaration stands for. */
export type ValueOf<D> = D extends { readonly type: 'string' | 'url' | 'id' | 'color' | 'language' }
    ? string
    : D extends { readonly type: 'integer' | 'number' }
      ? number
      : D extends { readonly type: 'boolean' }
        ? boolean
        : D extends { readonly type: 'enum'; readonly values: readonly (infer V)[] }
          ? V
          : D extends { readonly type: 'list'; readonly items: infer I }
            ? readonly ValueOf<I>[]
            : JsonValue;
type MaybeNull<D> = D extends { readonly nullable: true } ? ValueOf<D> | null : ValueOf<D>;
type Simplify<T> = { readonly [K in keyof T]: T[K] };
/** The attribute values a set of attribute declarations allows, all optional. */
export type AttrsOf<A> = Simplify<{ readonly [K in keyof A]?: MaybeNull<A[K]> }>;
/** The option values a set of option declarations allows, all optional. */
export type OptionsOf<O> = Simplify<{ readonly [K in keyof O]?: MaybeNull<O[K]> }>;
type FieldsOf<F> = Simplify<
    { readonly [K in keyof F as F[K] extends { readonly optional: true } ? never : K]: MaybeNull<F[K]> } & {
        readonly [K in keyof F as F[K] extends { readonly optional: true } ? K : never]?: MaybeNull<F[K]>;
    }
>;
type ExactlyOneOf<F, K extends string> = {
    [X in K]: Simplify<{ readonly [P in X & keyof F]: MaybeNull<F[P]> } & FieldsOf<Omit<F, K>>>;
}[K];
/**
 * `exactlyOne` becomes a union of one-field objects, so one payload type exists per command; a payload whose fields are
 * all optional may be left out.
 */
export type PayloadOf<P> = P extends { readonly fields: infer F }
    ?
          | (P extends { readonly exactlyOne: readonly (infer K extends string)[] } ? ExactlyOneOf<F, K> : FieldsOf<F>)
          | (P extends { readonly nullable: true } ? null : never)
          | (P extends { readonly exactlyOne: readonly string[] }
                ? never
                : Partial<FieldsOf<F>> extends FieldsOf<F>
                  ? undefined
                  : never)
    : undefined;

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

/**
 * `Mod`, `Ctrl`, `Alt` and `Shift`, then the key, joined by `-`, such as `Mod-Shift-x`. A binding that starts
 * with `mac:` or `other:` applies only on Apple platforms or only on the others.
 */
export type KeyBinding = string;
/** A typing rule that turns text such as `# ` or `**x**` into structure as the user types. */
export type InputRule =
    | {
          readonly id: string;
          readonly kind: 'line-start';
          readonly command: string;
          readonly markers: readonly (string | { readonly marker: string; readonly payload: JsonValue })[];
      }
    | {
          readonly id: string;
          readonly kind: 'mark-delimiter';
          readonly open: string;
          readonly close: string;
          readonly mark: string;
      }
    | {
          readonly id: string;
          readonly kind: 'text-replace';
          readonly find: string;
          readonly replace: string;
          readonly boundary?: 'word';
      }
    | { readonly id: string; readonly kind: 'quotes'; readonly marker: '"' | "'" }
    /** From `textRule`. */
    | { readonly id: string; readonly kind: 'text-rule'; readonly match: RegExp; readonly replace: string }
    /** Code features only, from `blockRule`; named groups fill the command's payload fields. */
    | { readonly id: string; readonly kind: 'block-rule'; readonly match: RegExp; readonly command: string }
    /** Code features only, from `markRule`; named groups fill the mark's attributes. */
    | {
          readonly id: string;
          readonly kind: 'mark-rule';
          readonly match: RegExp;
          readonly mark: string;
          readonly on: readonly ('input' | 'enter')[];
      };
/** A command ID, or a command with the payload a route passes, such as `{ command: 'heading.set', payload: { level: 1 } }`. */
export type CommandRef =
    | string
    | {
          readonly command: string;
          readonly payload?: JsonValue;
          readonly labelKey?: string;
      };
/** One textblock as a decoration source reads it. */
export interface DecoratedBlock {
    readonly nodeId: string | null;
    readonly attrs: JsonObject;
    /** Its text, in which each inline leaf, such as a hard break or a mention, counts as one U+FFFC. */
    readonly text: string;
}
/** A stretch of a block's text, by character offsets, drawn with a class or attributes. */
export interface BlockDecoration {
    readonly from: number;
    readonly to: number;
    readonly className?: string;
    readonly attributes?: Readonly<Record<string, string>>;
}
/** Decorations over each textblock of `nodes`, derived again only for a block that a change touched. */
export interface BlockDecorationSource {
    readonly id: string;
    readonly nodes: readonly string[];
    /** The ranges of `block`, or a promise of them while what the source reads still loads. */
    derive(block: DecoratedBlock): readonly BlockDecoration[] | Promise<readonly BlockDecoration[]>;
}
/** Where a trigger opens a list and what query it takes. */
export interface SuggestionRules {
    /** A word starts at the block start, after white space or a hard break, and with this, after punctuation too; a plain list uses `false`. */
    readonly afterPunctuation: boolean;
    /** The longest query; a longer one closes the list. A plain list uses `32`. */
    readonly maxQuery: number;
    /** Whether the query may hold spaces; a line break always ends it. A plain list uses `false`. */
    readonly spaces: boolean;
    /** The letters the query starts with before the list opens, so a time such as `12:30` opens none. A plain list uses `0`. */
    readonly leadingLetters: number;
}
/** One option a suggestion search finds; accepting it runs the list's command with `payload`. */
export interface SuggestionResult {
    /** Unique within one result list, and not empty. */
    readonly key: string;
    readonly label: string;
    /** What the option shows before its label, such as the emoji itself; none for an option with no such text. */
    readonly glyph?: string | null;
    readonly payload: JsonObject;
    /** What the option shows after its label, such as a mention's resource type. */
    readonly detail?: string;
    /** An avatar, which the list shows only as an absolute `https:` URL that passes `checkHref`. */
    readonly imageUrl?: string;
    /** Mention art only: the icon, a person, a group or everyone, that an option with no glyph and no image shows. */
    readonly kind?: 'user' | 'group' | 'everyone';
}
/** One page of a suggestion search: its options, and the cursor of the next page, `null` after the last. */
export interface SuggestionPage {
    readonly items: readonly SuggestionResult[];
    readonly nextCursor: string | null;
}
/** New `nodeId`s in a migrated document come from `generateId` only. */
export interface MigrationContext {
    readonly generateId: () => string;
}
/** What one migration step returns: the migrated document, or a request for review when content cannot be mapped. */
export type MigrationStepResult =
    | { readonly status: 'migrated'; readonly document: RichTextDocument }
    /**
     * Content the step cannot map without choosing meaning stays as stored, so decode keeps it as
     * islands, except the root, which blocks; `unsupported` means no document of the target version
     * exists for this input. One diagnostic per unmapped node, with its path into the step's output, which
     * names a node position.
     */
    | {
          readonly status: 'requires-review' | 'unsupported';
          readonly document: RichTextDocument;
          readonly diagnostics: readonly Diagnostic[];
      };
/**
 * A pure, synchronous, DOM-free step that upgrades a document from one model version to the next;
 * `id` appears in `MigrationManifest.steps`. It leaves nodes, marks and attributes its source version
 * does not declare unchanged, so it is a no-op on content a newer version wrote.
 */
export interface ModelMigration {
    readonly id: string;
    readonly from: number;
    /** Receives unchecked content: a value in a node or mark position may be any JSON value, `null` included. */
    readonly migrate: (document: RichTextDocument, context: MigrationContext) => MigrationStepResult;
}
/**
 * Code features only. The same kind of step for the content one feature owns, from capability version
 * `from` to `from + 1`. `compileContentModel` installs it in every model that installs the feature, so
 * profile and host models register nothing; decode runs it for a document whose `requiredCapabilities`
 * record an older version of that capability.
 */
export interface CapabilityMigration {
    readonly id: string;
    readonly from: number;
    /** Receives unchecked content: a value in a node or mark position may be any JSON value, `null` included. */
    readonly migrate: (document: RichTextDocument, context: MigrationContext) => MigrationStepResult;
}
/** An attribute one feature adds to other features' nodes, such as `align` on `paragraph` and `heading`. */
export interface SharedAttributeDeclaration {
    readonly on: readonly string[] | 'textblocks';
    readonly value: AttributeDeclaration;
    readonly html?: { readonly attr: string } | { readonly style: string };
    readonly parse?: { readonly attr: string } | { readonly style: string };
}

/** The declaration a feature is made from: its id, version, nodes, marks, commands, options and formats. */
export interface FeatureDeclaration {
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
