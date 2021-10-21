/* (c) Copyright Frontify Ltd., all rights reserved. */

export const getParentWithPositionRelative = (elementToCheck: HTMLElement): HTMLElement | null => {
    const parentToCheck = elementToCheck.offsetParent;
    if (!parentToCheck || parentToCheck?.tagName === "HTML") {
        return null;
    }
    return getComputedStyle(parentToCheck).position !== "relative"
        ? getParentWithPositionRelative(parentToCheck as HTMLElement)
        : (parentToCheck as HTMLElement);
};
