/* (c) Copyright Frontify Ltd., all rights reserved. */

export const findSurvivingNeighbour = (
    previousIds: readonly string[],
    focusedId: string | undefined,
    survivingIds: readonly string[],
): string | undefined => {
    if (focusedId === undefined) {
        return survivingIds[0];
    }
    const survivors = new Set(survivingIds);
    const previousIndex = previousIds.indexOf(focusedId);
    for (let index = previousIndex + 1; index < previousIds.length; index++) {
        const candidate = previousIds[index];
        if (candidate !== undefined && survivors.has(candidate)) {
            return candidate;
        }
    }
    for (let index = previousIndex - 1; index >= 0; index--) {
        const candidate = previousIds[index];
        if (candidate !== undefined && survivors.has(candidate)) {
            return candidate;
        }
    }
    return survivingIds[0];
};
