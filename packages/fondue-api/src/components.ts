/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    getComponentDetailMap,
    getComponentSummaries,
    getComponentSummaryMap,
} from "./resolve.ts";
import { applyLimit, matchesQuery } from "./search.ts";
import {
    type CategoryFilter,
    type ComponentDetail,
    type ComponentSummary,
    type SearchOptions,
} from "./types.ts";

/**
 * Returns all component summaries (lightweight, from the index manifest).
 */
export function listComponents(): ComponentSummary[] {
    return getComponentSummaries();
}

/**
 * Returns the full detail for a component by name (case-insensitive).
 * Returns undefined if the component does not exist.
 */
export function getComponent(name: string): ComponentDetail | undefined {
    return getComponentDetailMap().get(name.toLowerCase());
}

/**
 * Searches components by query string, matching against name, description, tags, and category.
 * Returns summaries (lightweight).
 */
export function searchComponents(options: SearchOptions): ComponentSummary[] {
    const results = getComponentSummaries().filter((c) =>
        matchesQuery(options.query, c.name, c.description, c.tags, c.category),
    );
    return applyLimit(results, options.limit);
}

/**
 * Returns all components in a given category.
 */
export function getComponentsByCategory(
    options: CategoryFilter,
): ComponentSummary[] {
    const lowerCategory = options.category.toLowerCase();
    const results = getComponentSummaries().filter(
        (c) => c.category.toLowerCase() === lowerCategory,
    );
    return applyLimit(results, options.limit);
}

/**
 * Returns the summary for a component by name (case-insensitive).
 * Cheaper than getComponent() — does not load the full detail manifest.
 */
export function getComponentSummary(
    name: string,
): ComponentSummary | undefined {
    return getComponentSummaryMap().get(name.toLowerCase());
}
