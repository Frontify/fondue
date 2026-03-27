/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    getTokenCategoryMap,
    getTokenList,
    getTokenMap,
    getUtilityList,
} from "./resolve.ts";
import { applyLimit, matchesQuery } from "./search.ts";
import {
    type CategoryFilter,
    type SearchOptions,
    type Token,
    type Utility,
} from "./types.ts";

/**
 * Returns all distinct token category names.
 */
export function listTokenCategories(): string[] {
    return [...getTokenCategoryMap().keys()];
}

/**
 * Returns a token by its exact id.
 */
export function getToken(id: string): Token | undefined {
    return getTokenMap().get(id);
}

/**
 * Returns all tokens in a given category.
 */
export function getTokensByCategory(options: CategoryFilter): Token[] {
    const tokens = getTokenCategoryMap().get(options.category) ?? [];
    return applyLimit(tokens, options.limit);
}

/**
 * Searches tokens by query string, matching against id, cssVariable, tailwindClass, and category.
 */
export function searchTokens(options: SearchOptions): Token[] {
    const results = getTokenList().filter((t) =>
        matchesQuery(
            options.query,
            t.id,
            t.cssVariable,
            t.tailwindClass,
            t.category,
        ),
    );
    return applyLimit(results, options.limit);
}

/**
 * Searches utilities by query string, matching against id and tailwindClass.
 */
export function searchUtilities(options: SearchOptions): Utility[] {
    const results = getUtilityList().filter((u) =>
        matchesQuery(options.query, u.id, u.tailwindClass),
    );
    return applyLimit(results, options.limit);
}

/**
 * Returns all utilities.
 */
export function listUtilities(): Utility[] {
    return getUtilityList();
}
