/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Token,
    type TokenFacetNode,
    type TokenFilter,
    type TokenNode,
    type TokenUtility,
    type TokenUtilityFilter,
    type TokenUtilityNode,
    type TokenValueType,
} from '../types/tokens';
import { pushToMultiMap, sortedByName } from '../utils/collections';
import { matchesKeyPathPrefix, textIncludes, toArray } from '../utils/filters';
import { makeFacet } from '../utils/makeFacet';

export interface TokensApi {
    list(): readonly TokenNode[];
    get(id: string): TokenNode | undefined;
    has(id: string): boolean;
    where(filter: TokenFilter): readonly TokenNode[];
    readonly size: number;

    categories(): readonly TokenFacetNode[];
    category(name: string): TokenFacetNode | undefined;
    types(): readonly TokenFacetNode[];
    type(name: TokenValueType): TokenFacetNode | undefined;

    utilities: TokenUtilitiesApi;
}

export interface TokenUtilitiesApi {
    list(): readonly TokenUtilityNode[];
    get(id: string): TokenUtilityNode | undefined;
    has(id: string): boolean;
    where(filter: TokenUtilityFilter): readonly TokenUtilityNode[];
    readonly size: number;
    classes(): readonly string[];
}

const matches = (raw: Token, filter: TokenFilter): boolean => {
    const categories = toArray(filter.category);
    const types = toArray(filter.type);
    if (categories && !categories.includes(raw.category)) {
        return false;
    }
    if (types && !types.includes(raw.type)) {
        return false;
    }
    if (filter.themeable !== undefined && raw.themeable !== filter.themeable) {
        return false;
    }
    if (!matchesKeyPathPrefix(raw.keyPath, filter.keyPathStartsWith)) {
        return false;
    }
    if (filter.text && !textIncludes(filter.text, [raw.id, raw.tailwindClass, raw.keyPath.join('.')])) {
        return false;
    }
    return true;
};

const matchesUtility = (raw: TokenUtility, filter: TokenUtilityFilter): boolean => {
    if (filter.themeable !== undefined && raw.themeable !== filter.themeable) {
        return false;
    }
    if (!matchesKeyPathPrefix(raw.keyPath, filter.keyPathStartsWith)) {
        return false;
    }
    if (filter.text && !textIncludes(filter.text, [raw.id, raw.tailwindClass, raw.keyPath.join('.')])) {
        return false;
    }
    return true;
};

export const buildTokensApi = (raws: readonly Token[], rawUtilities: readonly TokenUtility[]): TokensApi => {
    const categoryMembers = new Map<string, string[]>();
    const typeMembers = new Map<TokenValueType, string[]>();
    for (const raw of raws) {
        pushToMultiMap(categoryMembers, raw.category, raw.id);
        pushToMultiMap(typeMembers, raw.type, raw.id);
    }

    const nodes = new Map<string, TokenNode>();
    const resolve = (id: string): TokenNode | undefined => nodes.get(id);
    const matchNode = (node: TokenNode, f: TokenFilter): boolean => matches(node.toJSON(), f);

    const categories = new Map<string, TokenFacetNode>(
        Array.from(categoryMembers, ([name, ids]) => [name, makeFacet(name, ids, resolve, matchNode)]),
    );
    const types = new Map<TokenValueType, TokenFacetNode>(
        Array.from(typeMembers, ([name, ids]) => [name, makeFacet(name, ids, resolve, matchNode)]),
    );

    for (const raw of raws) {
        nodes.set(raw.id, {
            id: raw.id,
            value: raw.value,
            cssVariable: raw.cssVariable,
            tailwindClass: raw.tailwindClass,
            themeable: raw.themeable,
            keyPath: raw.keyPath,
            category: () => {
                const node = categories.get(raw.category);
                if (!node) {
                    throw new Error(`Unknown category "${raw.category}" on token "${raw.id}"`);
                }
                return node;
            },
            type: () => {
                const node = types.get(raw.type);
                if (!node) {
                    throw new Error(`Unknown type "${raw.type}" on token "${raw.id}"`);
                }
                return node;
            },
            toJSON: () => raw,
        });
    }

    const utilityNodes = new Map<string, TokenUtilityNode>(
        rawUtilities.map((raw) => [
            raw.id,
            {
                id: raw.id,
                tailwindClass: raw.tailwindClass,
                themeable: raw.themeable,
                keyPath: raw.keyPath,
                properties: raw.properties,
                toJSON: () => raw,
            },
        ]),
    );

    const allTokens = Array.from(nodes.values());
    const allUtilities = Array.from(utilityNodes.values());

    return {
        list: () => allTokens,
        get: (id) => nodes.get(id),
        has: (id) => nodes.has(id),
        where: (f) => allTokens.filter((n) => matchNode(n, f)),
        get size() {
            return allTokens.length;
        },
        categories: () => sortedByName(categories.values()),
        category: (name) => categories.get(name),
        types: () => sortedByName(types.values()),
        type: (name) => types.get(name),
        utilities: {
            list: () => allUtilities,
            get: (id) => utilityNodes.get(id),
            has: (id) => utilityNodes.has(id),
            where: (f) => allUtilities.filter((n) => matchesUtility(n.toJSON(), f)),
            get size() {
                return allUtilities.length;
            },
            classes: () =>
                Array.from(new Set(allUtilities.map((n) => n.tailwindClass).filter(Boolean))).sort((a, b) =>
                    a.localeCompare(b),
                ),
        },
    };
};
