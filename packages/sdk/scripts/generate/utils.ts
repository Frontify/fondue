/* (c) Copyright Frontify Ltd., all rights reserved. */

export const duplicateErrors = (kind: string, ids: readonly string[]): string[] => {
    const errors: string[] = [];
    const seen = new Set<string>();
    for (const id of ids) {
        if (seen.has(id)) {
            errors.push(`duplicate ${kind} "${id}"`);
        }
        seen.add(id);
    }
    return errors;
};
