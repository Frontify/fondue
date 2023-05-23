/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MouseEvent } from 'react';

export type ItemElementType = 'a' | 'button' | 'span';

export const getItemElementType = (link?: string, onClick?: (event: MouseEvent<HTMLButtonElement>) => void) => {
    if (link) {
        return 'a';
    } else if (onClick) {
        return 'button';
    }

    return 'span';
};

export const checkIfContainInteractiveElements = (node: HTMLElement | null) => {
    if (node) {
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableChildren = node.querySelectorAll(focusableElements) ?? [];
        return focusableChildren.length > 0;
    }
    return false;
};
