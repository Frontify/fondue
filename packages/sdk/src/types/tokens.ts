/* (c) Copyright Frontify Ltd., all rights reserved. */

/** The set of underlying primitive types a token value may have. */
export type TokenValueType = 'color' | 'float' | 'shadow' | 'string';

/** A single design token. Underlying raw data — what `TokenNode.toJSON()` returns. */
export interface Token {
    /** Logical token id, e.g. "color-charts-primary-default". */
    readonly id: string;
    readonly category: string;
    readonly type: TokenValueType;
    /** Hierarchical path matching the source token tree, e.g. ["colors","charts","primary","default"]. */
    readonly keyPath: readonly string[];
    /** Raw token value (often a `var(--token)` reference or a literal). */
    readonly value: string;
    /** Inline form of the css variable reference, e.g. "var(--color-charts-primary-default)". */
    readonly cssVariable: string;
    /** Tailwind utility class that produces this token, when applicable. */
    readonly tailwindClass: string;
    /** Whether the token participates in theme switching. */
    readonly themeable: boolean;
}

/** A composed utility (e.g. a typography utility class) made up of multiple token properties. */
export interface TokenUtility {
    readonly id: string;
    readonly keyPath: readonly string[];
    readonly properties: readonly TokenUtilityProperty[];
    readonly tailwindClass: string;
    readonly themeable: boolean;
}

/** A single property inside a token utility. */
export interface TokenUtilityProperty {
    readonly id: string;
    readonly type: TokenValueType;
    readonly value: string;
    readonly cssVariable: string;
}

/** Filter options for `tokens.where(...)`. All clauses are AND-combined. */
export interface TokenFilter {
    category?: string | readonly string[];
    type?: TokenValueType | readonly TokenValueType[];
    themeable?: boolean;
    /** Match against the start of the dot-joined keyPath, e.g. "colors.charts". */
    keyPathStartsWith?: string;
    /** Free-text match against id, tailwindClass, and keyPath (case-insensitive). */
    text?: string;
}

/** Filter options for `tokens.utilities.where(...)`. */
export interface TokenUtilityFilter {
    themeable?: boolean;
    keyPathStartsWith?: string;
    text?: string;
}

// ─── Graph nodes ────────────────────────────────────────────────────────────

/** A design token. Scalar fields are the data; methods walk the graph. */
export interface TokenNode {
    readonly id: string;
    readonly value: string;
    readonly cssVariable: string;
    readonly tailwindClass: string;
    readonly themeable: boolean;
    readonly keyPath: readonly string[];

    category(): TokenFacetNode;
    type(): TokenFacetNode;

    toJSON(): Token;
}

/** A grouping of tokens — categories and types share this shape. */
export interface TokenFacetNode {
    readonly name: string;
    list(): readonly TokenNode[];
    get(id: string): TokenNode | undefined;
    has(id: string): boolean;
    where(filter: TokenFilter): readonly TokenNode[];
    readonly size: number;
}

/** A composed utility (typography classes etc.). Leaf node — no facets. */
export interface TokenUtilityNode {
    readonly id: string;
    readonly tailwindClass: string;
    readonly themeable: boolean;
    readonly keyPath: readonly string[];
    readonly properties: readonly TokenUtilityProperty[];

    toJSON(): TokenUtility;
}
