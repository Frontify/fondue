/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Generic facet builder used by both the components and tokens graph.
 *
 * A facet keeps a list of member ids and resolves them lazily, which is what
 * lets entity nodes reference their facets while facets reference back into
 * the same entity map — the resolver closes over the in-progress map.
 */

interface FacetShape<TName extends string, TNode, TFilter> {
    readonly name: TName;
    list(): readonly TNode[];
    get(id: string): TNode | undefined;
    has(id: string): boolean;
    where(filter: TFilter): readonly TNode[];
    readonly size: number;
}

export const makeFacet = <TName extends string, TNode, TFilter>(
    name: TName,
    memberIds: readonly string[],
    resolveNode: (id: string) => TNode | undefined,
    matchesFilter: (node: TNode, filter: TFilter) => boolean,
): FacetShape<TName, TNode, TFilter> => {
    const memberSet = new Set(memberIds);
    const list = (): readonly TNode[] => memberIds.map(resolveNode).filter((n): n is TNode => n !== undefined);

    return {
        name,
        list,
        get: (id) => (memberSet.has(id) ? resolveNode(id) : undefined),
        has: (id) => memberSet.has(id),
        where: (filter) => list().filter((node) => matchesFilter(node, filter)),
        get size() {
            return memberIds.length;
        },
    };
};
