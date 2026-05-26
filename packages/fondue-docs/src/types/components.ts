/* (c) Copyright Frontify Ltd., all rights reserved. */

/** A documented prop on a Fondue component. */
export interface ComponentProp {
    name: string;
    type: string;
    required: boolean;
    defaultValue: string | null;
    description: string;
    deprecated: boolean;
    deprecationMessage: string;
}

/** A sub-component (e.g. `Dialog.Header`) and its prop surface. */
export interface ComponentSubComponent {
    name: string;
    props: readonly ComponentProp[];
}

/** A code example for a component, sourced from its stories. */
export interface ComponentExample {
    name: string;
    description: string;
    code: string;
    /** Whether this example represents the canonical/recommended usage. */
    isCanonical: boolean;
}

/** Underlying raw data for a component — what `ComponentNode.toJSON()` returns. */
export interface ComponentDetails {
    name: string;
    description: string;
    status: string;
    category: string;
    tags: readonly string[];
    subComponentNames: readonly string[];
    relatedComponents: readonly string[];
    importStatement: string;
    instructions: string;
    props: readonly ComponentProp[];
    subComponents: readonly ComponentSubComponent[];
    examples: readonly ComponentExample[];
    typeDefinitions: Readonly<Record<string, string>>;
}

/** Filter options for `components.where(...)`. All clauses are AND-combined. */
export interface ComponentFilter {
    /** Only include components whose category equals one of the given values. */
    category?: string | readonly string[];
    /** Only include components whose status equals one of the given values. */
    status?: string | readonly string[];
    /** Only include components carrying at least one of the given tags. */
    tag?: string | readonly string[];
    /** Free-text match against name, description, tags, and category (case-insensitive). */
    text?: string;
}

// ─── Graph nodes ────────────────────────────────────────────────────────────

/** A Fondue component. Scalar fields are the data; methods walk the graph. */
export interface ComponentNode {
    readonly name: string;
    readonly description: string;
    readonly importStatement: string;
    readonly instructions: string;
    readonly props: readonly ComponentProp[];
    readonly subComponents: readonly ComponentSubComponent[];
    readonly examples: readonly ComponentExample[];
    readonly typeDefinitions: Readonly<Record<string, string>>;

    category(): ComponentFacetNode;
    status(): ComponentFacetNode;
    tags(): readonly ComponentFacetNode[];
    /** Components cross-referenced via `relatedComponents`. Unknown names are skipped. */
    related(): readonly ComponentNode[];

    toJSON(): ComponentDetails;
}

/**
 * A grouping of components — categories, statuses, and tags all share this shape.
 * The query surface mirrors the top-level `components` API but is scoped to
 * this facet's members.
 */
export interface ComponentFacetNode {
    readonly name: string;
    list(): readonly ComponentNode[];
    get(name: string): ComponentNode | undefined;
    has(name: string): boolean;
    where(filter: ComponentFilter): readonly ComponentNode[];
    readonly size: number;
}
