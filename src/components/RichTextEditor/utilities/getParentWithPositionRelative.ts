export const getParentWithPositionRelative = (elementToCheck: HTMLElement): HTMLElement | boolean => {
    const parentToCheck = elementToCheck.offsetParent;
    if (!parentToCheck || parentToCheck?.tagName === "HTML") {
        return false;
    }
    return getComputedStyle(parentToCheck).position !== "relative"
        ? getParentWithPositionRelative(parentToCheck as HTMLElement)
        : (parentToCheck as HTMLElement);
};
