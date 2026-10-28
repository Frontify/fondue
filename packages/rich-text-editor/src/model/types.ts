/* (c) Copyright Frontify Ltd., all rights reserved. */

/** Any value JSON can hold. */
export type JsonValue = null | boolean | number | string | readonly JsonValue[] | { readonly [key: string]: JsonValue };
/** A JSON object, such as the attributes of a node or mark. */
export type JsonObject = { readonly [key: string]: JsonValue };

/** The id and version of a content model. */
export type ModelRef = {
    readonly id: string;
    readonly version: number;
};
/** The id and version of a feature, as a document records it in the capabilities it requires. */
export type CapabilityRef = {
    readonly id: string;
    readonly version: number;
};

export type Letter =
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z';
export type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
/** A BCP 47 tag that passes `Intl.getCanonicalLocales`: it starts with a two-letter or longer language subtag. */
export type LanguageTag = `${Letter | Uppercase<Letter>}${Letter | Uppercase<Letter>}${string}`;
/** Stored IDs (`styleId`, `tokenId`, `languageId`, `resourceType`) match `^[a-z0-9][a-z0-9._:-]{0,127}$`. */
export type StoredId = `${Letter | Digit}${string}`;
declare const featureBrand: unique symbol;
/**
 * A feature carries its ID, its command payloads and its node and mark attributes as types. A bare `Feature` means
 * any feature, so each map defaults to `object`, which every map is assignable to, and `FeatureId` to `string`.
 */
export type Feature<
    Commands extends object = object,
    Nodes extends object = object,
    Marks extends object = object,
    FeatureId extends string = string,
> = {
    readonly [featureBrand]: {
        commands: Commands;
        nodes: Nodes;
        marks: Marks;
        id: FeatureId;
    };
    readonly id: string;
    readonly version: number;
};
