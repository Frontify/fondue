/* (c) Copyright Frontify Ltd., all rights reserved. */

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
