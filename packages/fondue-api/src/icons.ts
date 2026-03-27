/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    getIconExportNameMap,
    getIconList,
    getIconNameMap,
} from "./resolve.ts";
import { applyLimit, matchesQuery } from "./search.ts";
import { type Icon, type SearchOptions } from "./types.ts";

/**
 * Returns all icons.
 */
export function listIcons(options?: { limit?: number }): Icon[] {
    return applyLimit(getIconList(), options?.limit);
}

/**
 * Returns an icon by its kebab-case name (case-insensitive).
 */
export function getIcon(name: string): Icon | undefined {
    return getIconNameMap().get(name.toLowerCase());
}

/**
 * Returns an icon by its export name, e.g. "IconAdobeCreativeCloud" (case-insensitive).
 */
export function getIconByExportName(exportName: string): Icon | undefined {
    return getIconExportNameMap().get(exportName.toLowerCase());
}

/**
 * Searches icons by query string, matching against name, componentName, exportName, and keywords.
 */
export function searchIcons(options: SearchOptions): Icon[] {
    const results = getIconList().filter((i) =>
        matchesQuery(
            options.query,
            i.name,
            i.componentName,
            i.exportName,
            i.keywords,
        ),
    );
    return applyLimit(results, options.limit);
}
