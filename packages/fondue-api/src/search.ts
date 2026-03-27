/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Case-insensitive substring match across one or more fields.
 * Fields can be strings, arrays of strings, or undefined (skipped).
 */
export function matchesQuery(
    query: string,
    ...fields: (string | string[] | undefined)[]
): boolean {
    if (query === "") {
        return true;
    }

    const lowerQuery = query.toLowerCase();

    for (const field of fields) {
        if (field === undefined) {
            continue;
        }

        if (typeof field === "string") {
            if (field.toLowerCase().includes(lowerQuery)) {
                return true;
            }
        } else {
            for (const item of field) {
                if (item.toLowerCase().includes(lowerQuery)) {
                    return true;
                }
            }
        }
    }

    return false;
}

export function applyLimit<T>(items: T[], limit?: number): T[] {
    if (limit === undefined || limit <= 0) {
        return items;
    }
    return items.slice(0, limit);
}
