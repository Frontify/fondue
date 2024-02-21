/* (c) Copyright Frontify Ltd., all rights reserved. */

type VerticalPosition = 'top' | 'bottom';

export const getVerticalPositioning = <T extends HTMLElement>(
    triggerRef: T | null,
    overlayHeight: number,
    offset: number,
    bottomMargin: number,
): { position: VerticalPosition; maxHeight: number } => {
    let position: VerticalPosition = 'bottom';
    let maxHeight = Infinity;

    if (!triggerRef || !overlayHeight) {
        return { position, maxHeight };
    }

    const { top: triggerTop, bottom: triggerBottom } = triggerRef.getBoundingClientRect();
    const viewportHeight = window.visualViewport?.height ?? 0;
    const spaceBelow = viewportHeight - triggerBottom - offset - bottomMargin;
    const spaceAbove = triggerTop - offset;

    if (spaceBelow < overlayHeight) {
        position = spaceBelow < spaceAbove ? 'top' : 'bottom';
    }

    maxHeight = position === 'top' ? spaceAbove : spaceBelow;

    return { position, maxHeight };
};
