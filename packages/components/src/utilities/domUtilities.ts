/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent, type MouseEvent as ReactMouseEvent, type ForwardedRef, type RefObject } from 'react';

export const MAX_HEIGHT_MARGIN = 8;

/**
 * Sets the maximum height for a dialog element based on its position on the viewport.
 * The function calculates the space below the dialog up to the bottom of the viewport window,
 * subtracting a default margin, and sets this value as the max-height style of the dialog.
 *
 * @param {HTMLElement} dialog - The dialog element whose maximum height is to be set.
 *
 * @example
 * // Suppose you have a dialog element with id 'my-dialog'.
 * const dialogElement = myDialogRef.current || document.getElementById('my-dialog');
 * // Setting its max height relative to its current position and the viewport's dimensions.
 * setMaxHeightToAvailableSpace(dialogElement);
 */
export function setMaxHeightToAvailableSpace(dialog: HTMLElement) {
    if (!window) {
        throw new Error('Window object not found, this method should be used in a browser environment');
    }

    dialog.style.maxHeight = '';

    const { top, bottom } = dialog.getBoundingClientRect();
    if (top - MAX_HEIGHT_MARGIN < 0) {
        // if the dialog is overflowing to the top
        dialog.style.maxHeight = `${bottom - MAX_HEIGHT_MARGIN}px`;
    } else if (bottom + MAX_HEIGHT_MARGIN > window.innerHeight) {
        // if the dialog is overflowing to the bottom
        dialog.style.maxHeight = `${window.innerHeight - top - MAX_HEIGHT_MARGIN}px`;
    }
}

/**
 * Checks if a specified HTML element is visible within the viewport.
 * Visibility is determined by several factors:
 * - The element must have non-zero dimensions.
 * - The element's computed style must not be `display: none`, `visibility: hidden`, or `opacity: 0`.
 * - The element must be within the bounds of the current viewport.
 *
 * @param {HTMLElement} element - The HTML element to check for visibility.
 * @returns {boolean} Returns true if the element is visible according to the criteria specified, otherwise returns false.
 */
export function isElementVisible(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const hasSize = rect.width > 0 && rect.height > 0;

    const style = window.getComputedStyle(element);
    const isVisibleStyle = style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) !== 0;

    // Check if the element is within the viewport
    const isInViewport =
        rect.top < window.innerHeight && rect.left < window.innerWidth && rect.bottom > 0 && rect.right > 0;

    return hasSize && isVisibleStyle && isInViewport;
}

/**
 * Assigns a local DOM ref to a forwarded ref.
 *
 * @param {RefObject<HTMLDivElement>} localRef - The local React reference to an HTMLDivElement.
 * @param {ForwardedRef<HTMLDivElement>} forwardedRef - The ref forwarded from a parent component.
 */
export function syncRefs<TElement = HTMLElement>(localRef: RefObject<TElement>, forwardedRef: ForwardedRef<TElement>) {
    if (!forwardedRef) {
        return;
    }

    if (typeof forwardedRef === 'function') {
        forwardedRef(localRef.current);
    } else if (forwardedRef && 'current' in forwardedRef) {
        forwardedRef.current = localRef.current;
    }
}

/**
 * Sets the 'autoFocusVisible' data attribute to 'false' on the current target of a mouse event.
 * This function is typically used to indicate that an element has been interacted with via mouse,
 * which should prevent the focus ring from being displayed when the element receives focus.
 *
 * @param mouseEvent - The mouse event object.
 */
export function addAutoFocusAttribute(mouseEvent: ReactMouseEvent<HTMLButtonElement, MouseEvent>) {
    mouseEvent.currentTarget.dataset.autoFocusVisible = 'false';
}

/**
 * Manages the focus ring visibility based on the previous focus state and the current focus event.
 * This function sets the 'showFocusRing' data attribute on the target element and updates the
 * 'autoFocusVisible' data attribute on the previously focused element.
 *
 * ! This function should be used in conjunction with the 'addAutoFocusAttribute' function and the autoFocusVisible data autoFocusTrigger.
 *
 * @param event - The focus event object.
 */
export function addShowFocusRing(event: FocusEvent<HTMLDivElement, HTMLElement>) {
    const triggerElement = event.relatedTarget;

    if (!triggerElement?.dataset.autoFocusTrigger) {
        return;
    }

    if (triggerElement.dataset.autoFocusVisible === 'true') {
        event.target.dataset.showFocusRing = 'true';
    } else {
        event.target.dataset.showFocusRing = 'false';
    }

    triggerElement.dataset.autoFocusVisible = 'true';
}

/**
 * Detects the text direction (LTR/RTL) by traversing up the DOM tree.
 * Searches for the nearest parent element with a dir attribute, or falls back
 * to the computed direction style.
 *
 * @param {HTMLElement} element - The element to start searching from.
 * @returns {'ltr' | 'rtl'} The detected text direction.
 *
 * @example
 * const direction = getDirectionFromDOM(myElementRef.current);
 * console.log(direction); // 'ltr' or 'rtl'
 */
export function getDirectionFromDOM(element: HTMLElement): 'ltr' | 'rtl' {
    let currentElement: HTMLElement | null = element.parentElement;
    while (currentElement) {
        const dirAttribute = currentElement.getAttribute('dir');
        if (dirAttribute === 'rtl' || dirAttribute === 'ltr') {
            return dirAttribute;
        }
        currentElement = currentElement.parentElement;
    }

    const computedDir = window.getComputedStyle(element).direction;
    return computedDir === 'rtl' ? 'rtl' : 'ltr';
}
