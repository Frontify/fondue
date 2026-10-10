/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type IdSource } from './environment';
import { type Diagnostic, type RichTextDocument } from './format';
import { type HrefResult } from './href';

export type JsonValue = null | boolean | number | string | readonly JsonValue[] | { readonly [key: string]: JsonValue };
export type JsonObject = { readonly [key: string]: JsonValue };

export interface ModelRef {
    readonly id: string;
    readonly version: number;
}
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
export type AttributeDeclarations = Readonly<Record<string, AttributeDeclaration>>;
export type OptionDeclarations = Readonly<Record<string, ValueDeclaration & { readonly default: JsonValue }>>;
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
export type AttrsOf<A> = Simplify<{ readonly [K in keyof A]?: MaybeNull<A[K]> }>;
export type OptionsOf<O> = Simplify<{ readonly [K in keyof O]?: MaybeNull<O[K]> }>;
type FieldsOf<F> = Simplify<
    { readonly [K in keyof F as F[K] extends { readonly optional: true } ? never : K]: MaybeNull<F[K]> } & {
        readonly [K in keyof F as F[K] extends { readonly optional: true } ? K : never]?: MaybeNull<F[K]>;
    }
>;
type ExactlyOneOf<F, K extends string> = {
    [X in K]: Simplify<{ readonly [P in X & keyof F]: MaybeNull<F[P]> } & FieldsOf<Omit<F, K>>>;
}[K];
/** `exactlyOne` becomes a union of one-field objects, so one payload type exists per command. */
export type PayloadOf<P> = P extends { readonly fields: infer F }
    ?
          | (P extends { readonly exactlyOne: readonly (infer K extends string)[] } ? ExactlyOneOf<F, K> : FieldsOf<F>)
          | (P extends { readonly nullable: true } ? null : never)
    : undefined;

/** Reads a feature option inside its own declaration, as `{ attr }` reads an attribute. */
export interface OptionRef {
    readonly option: string;
}
/** Compilation keeps the guarded command, key or toolbar entry only when the option has this value. */
export interface OptionGuard {
    readonly option: string;
    readonly equals: JsonValue;
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
export type ParseRule =
    | { readonly tag: string; readonly attrs?: Readonly<Record<string, ParseAttributeSource>> }
    | { readonly style: string; readonly value: string };

export interface NodeDeclaration {
    readonly group?: 'block' | 'inline' | 'section';
    /** Content expression in the package grammar. */
    readonly content?: string;
    readonly atom?: boolean;
    /** Mark names the node's inline content accepts; omitted means every installed mark, empty means none. */
    readonly marks?: readonly string[];
    /** `pre` keeps spaces, tabs and newlines exactly and turns off input rules inside. */
    readonly whitespace?: 'normal' | 'pre';
    readonly attrs: AttributeDeclarations;
    /** Attributes of which exactly one is non-null. */
    readonly exactlyOne?: readonly string[];
    readonly html: HtmlSpec;
    readonly parse: readonly ParseRule[];
    /** Markdown output for a block: a line prefix such as `> `, or a fence. */
    readonly markdown?: { readonly prefix: string } | { readonly fence: string };
}
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
export type FormatSupport = 'lossless' | 'lossy' | 'unsupported';
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

export type CapabilityName =
    | 'toggleMark'
    | 'setMark'
    | 'removeMark'
    | 'setBlock'
    | 'wrapIn'
    | 'lift'
    | 'toggleList'
    | 'indentItem'
    | 'outdentItem'
    | 'toggleTask'
    | 'insertNode'
    | 'insertText'
    | 'block'
    | 'setAttributes'
    | 'indentLines'
    | 'table'
    | 'openControl'
    | 'upload'
    | 'reapplyMark'
    | 'history'
    | 'pastePlainText'
    | 'embed'
    | 'stepAttribute'
    | 'firstOf';
declare const commandBrand: unique symbol;
/** A named capability with data arguments and a payload declaration; no command carries a validator function. */
export interface CommandDefinition<Payload = undefined> {
    readonly [commandBrand]: Payload;
    readonly capability: CapabilityName;
    /** Data arguments; an argument may be an `OptionRef` where a boolean or string is expected. */
    readonly args: JsonObject;
    readonly payload?: PayloadDeclaration;
    /** Compiled in only when the option has this value; its keys and toolbar entries go with it. */
    readonly when?: OptionGuard;
}

/**
 * `Mod`, `Ctrl`, `Alt` and `Shift`, then the key, joined by `-`, such as `Mod-Shift-x`. A binding that starts
 * with `mac:` or `other:` applies only on Apple platforms or only on the others.
 */
export type KeyBinding = string;
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
    /** Code features only, from `textRule`; a manifest cannot hold a `RegExp` (DR-081). */
    | { readonly id: string; readonly kind: 'text-rule'; readonly match: RegExp; readonly replace: string };
/** A command ID, or a command with the payload a route passes, such as `{ command: 'heading.set', payload: { level: 1 } }`. */
export type CommandRef =
    | string
    | {
          readonly command: string;
          readonly payload?: JsonValue;
          readonly labelKey?: string;
          readonly when?: OptionGuard;
      };
export type ToolbarEntry =
    | {
          readonly kind: 'toggle' | 'button';
          readonly command: string;
          readonly payload?: JsonValue;
          readonly labelKey: string;
          /** A data manifest's translations, by language tag, which its entry carries in place of `labelKey`. */
          readonly label?: Readonly<Record<string, string>>;
          readonly icon: string;
          readonly when?: OptionGuard;
      }
    | {
          readonly kind: 'menu';
          readonly command: string;
          readonly labelKey: string;
          readonly icon: string;
          readonly items: readonly CommandRef[];
          readonly when?: OptionGuard;
      };
/** New `nodeId`s in a migrated document come from `ids` only. */
export interface MigrationContext {
    readonly ids: IdSource;
}
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

export interface FeatureDeclaration {
    readonly id: string;
    readonly version: number;
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
    readonly commands?: Readonly<Record<string, CommandDefinition<unknown>>>;
    readonly keys?: Readonly<Record<KeyBinding, CommandRef>>;
    readonly inputRules?: readonly InputRule[];
    readonly toolbar?: readonly ToolbarEntry[];
}
declare const featureBrand: unique symbol;
/** A feature carries its command payloads and its node and mark attributes as types. */
export interface Feature<
    Commands extends object = object,
    Nodes extends object = object,
    Marks extends object = object,
> {
    readonly [featureBrand]: { readonly commands: Commands; readonly nodes: Nodes; readonly marks: Marks };
    readonly id: string;
    readonly version: number;
}
export type CommandsOfDeclaration<D> = D extends { readonly commands: infer C }
    ? { readonly [K in keyof C]: C[K] extends CommandDefinition<infer P> ? P : never }
    : object;
export type NodesOfDeclaration<D> = D extends { readonly nodes: infer N }
    ? { readonly [K in keyof N]: N[K] extends { readonly attrs: infer A } ? AttrsOf<A> : never }
    : object;
export type MarksOfDeclaration<D> = D extends { readonly marks: infer M }
    ? { readonly [K in keyof M]: M[K] extends { readonly attrs: infer A } ? AttrsOf<A> : never }
    : object;
/** Every feature is a factory, called even with no options. */
export type FeatureFactory<
    Options extends object,
    Commands extends object,
    Nodes extends object,
    Marks extends object,
> = (options?: Options) => Feature<Commands, Nodes, Marks>;

/** A toolbar entry whose label carries its own translations, an `en-US` entry included, in place of `labelKey`. */
type ManifestToolbarEntry<E = ToolbarEntry> = E extends ToolbarEntry
    ? Omit<E, 'labelKey'> & { readonly label: Readonly<Record<string, string>> }
    : never;
/** A feature declared as JSON: no function, regular expression, component, script-capable markup or CSS text. */
export interface FeatureManifest {
    readonly id: string;
    readonly version: number;
    readonly requires?: readonly { readonly id: string; readonly version: number }[];
    readonly options?: OptionDeclarations;
    readonly nodes?: Readonly<Record<string, NodeDeclaration>>;
    readonly marks?: Readonly<Record<string, MarkDeclaration>>;
    /** Shared attributes whose `html` and `parse` bind only `{ attr }` with a manifest attribute. */
    readonly attributes?: Readonly<Record<string, SharedAttributeDeclaration>>;
    readonly formats?: FeatureFormats;
    readonly commands?: Readonly<
        Record<
            string,
            {
                readonly capability: CapabilityName;
                readonly payload?: PayloadDeclaration;
                readonly when?: OptionGuard;
            } & JsonObject
        >
    >;
    readonly keys?: Readonly<Record<KeyBinding, CommandRef>>;
    readonly inputRules?: readonly InputRule[];
    readonly toolbar?: readonly ManifestToolbarEntry[];
}

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
    /** Feature IDs, versions, options, node and mark order, the capability plugin order as plugin IDs, command IDs, keys. */
    readonly manifest: JsonObject;
    readonly fingerprint: string;
}

export interface TranslationStrings {
    readonly [key: `RichTextEditor_${string}`]: string;
}
/**
 * The package's locale: its strings and language. Not Fondue's `LocaleConfig`, whose `dateLocale` is a
 * date-fns `Locale`: the editor formats no dates (DR-012). `enUS` is the fallback.
 */
export interface RichTextLocale {
    readonly translationStrings: TranslationStrings;
    readonly lang?: string;
}
export type ReferenceResolution =
    | { readonly status: 'current'; readonly label: string }
    | { readonly status: 'unavailable'; readonly code: 'deleted' | 'forbidden' }
    | { readonly status: 'unknown' };
