/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonValue } from './types';

export type { CapabilityRef, JsonObject, JsonValue, ModelRef } from './types';

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
export type PayloadDeclaration = {
    fields: Readonly<Record<string, ValueDeclaration & { optional?: boolean }>>;
    /** The whole payload may be `null`, such as "remove the colour". */
    nullable?: boolean;
    /** Fields of which exactly one is set, such as `tokenId` and `value`. */
    exactlyOne?: readonly string[];
};

/**
 * The whole numbers from `Min` to `Max` when both are literals, at most 12 values from 0 to 63 apart; `number`
 * otherwise. Walks a counter tuple, since the type system has no arithmetic.
 */
type IntegerRange<
    Min extends number,
    Max extends number,
    Counter extends unknown[] = [],
    Taken extends number[] = [],
> = Taken['length'] extends 13
    ? number
    : Counter['length'] extends 64
      ? number
      : (
              Taken extends []
                  ? Counter['length'] extends Min
                      ? [Counter['length']]
                      : []
                  : [...Taken, Counter['length']]
          ) extends infer Next extends number[]
        ? Counter['length'] extends Max
            ? Next extends []
                ? number
                : Next['length'] extends 13
                  ? number
                  : Next[number]
            : IntegerRange<Min, Max, [...Counter, unknown], Next>
        : never;
type IntegerOf<D> = D extends { min: infer Min extends number; max: infer Max extends number }
    ? number extends Min | Max
        ? number
        : IntegerRange<Min, Max>
    : number;

/** The TypeScript type a value declaration stands for. */
export type ValueOf<D> = D extends { type: 'string' | 'url' | 'id' | 'color' | 'language' }
    ? string
    : D extends { type: 'integer' | 'number' }
      ? number
      : D extends { type: 'boolean' }
        ? boolean
        : D extends { type: 'enum'; values: readonly (infer V)[] }
          ? V
          : D extends { type: 'list'; items: infer I }
            ? readonly ValueOf<I>[]
            : JsonValue;
type MaybeNull<D> = D extends { nullable: true } ? ValueOf<D> | null : ValueOf<D>;
/** An attribute's integer range is a literal union when small, so `level` reads as `1 | 2 | 3 | 4 | 5 | 6`. */
type AttributeValueOf<D> = D extends { type: 'integer' }
    ? D extends { nullable: true }
        ? IntegerOf<D> | null
        : IntegerOf<D>
    : MaybeNull<D>;
type Simplify<T> = { readonly [K in keyof T]: T[K] };
type RequiredKeys<A> = { [K in keyof A]: A[K] extends { required: true } ? K : never }[keyof A];
/** The attribute values a set of attribute declarations allows: `required` ones must be present, the rest may be left out. */
export type AttrsOf<A> = Simplify<
    { readonly [K in RequiredKeys<A>]: AttributeValueOf<A[K]> } & {
        readonly [K in Exclude<keyof A, RequiredKeys<A>>]?: AttributeValueOf<A[K]>;
    }
>;
/** The option values a set of option declarations allows, all optional. */
export type OptionsOf<O> = Simplify<{ readonly [K in keyof O]?: MaybeNull<O[K]> }>;
type FieldsOf<F> = Simplify<
    { readonly [K in keyof F as F[K] extends { optional: true } ? never : K]: MaybeNull<F[K]> } & {
        readonly [K in keyof F as F[K] extends { optional: true } ? K : never]?: MaybeNull<F[K]>;
    }
>;
type ExactlyOneOf<F, K extends string> = {
    [X in K]: Simplify<{ readonly [P in X & keyof F]: MaybeNull<F[P]> } & FieldsOf<Omit<F, K>>>;
}[K];
/**
 * `exactlyOne` becomes a union of one-field objects, so one payload type exists per command; a payload whose fields are
 * all optional may be left out.
 */
export type PayloadOf<P> = P extends { fields: infer F }
    ?
          | (P extends { exactlyOne: readonly (infer K extends string)[] } ? ExactlyOneOf<F, K> : FieldsOf<F>)
          | (P extends { nullable: true } ? null : never)
          | (P extends { exactlyOne: readonly string[] }
                ? never
                : Partial<FieldsOf<F>> extends FieldsOf<F>
                  ? undefined
                  : never)
    : undefined;
