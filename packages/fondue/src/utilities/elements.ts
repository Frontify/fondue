/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent } from 'react';

/**
 * @deprecated Use a custom function instead.
 */
export type ItemElementType = 'a' | 'button' | 'span';

/**
 * @deprecated Please use a custom function instead.
 */
export const TABBABLE_ELEMENTS = [
    'input:not([disabled]):not([type=hidden])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'a[href]',
    'area[href]',
    'summary',
    'iframe',
    'object',
    'embed',
    'audio[controls]',
    'video[controls]',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"]):not([disabled])',
].join(':not([hidden]):not([tabindex="-1"]),');

/**
 * @deprecated Use a custom function instead.
 */
export const getItemElementType = (link?: string, onClick?: (event: MouseEvent<HTMLButtonElement>) => void) => {
    if (link) {
        return 'a';
    } else if (onClick) {
        return 'button';
    }

    return 'span';
};

/**
 * @deprecated Use a custom function instead.
 */
export const checkIfContainInteractiveElements = (node: HTMLElement | null) => {
    if (node) {
        const focusableChildren = node.querySelectorAll(TABBABLE_ELEMENTS) ?? [];
        return focusableChildren.length > 0;
    }
    return false;
};
