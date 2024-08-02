/* (c) Copyright Frontify Ltd., all rights reserved. */

export const MAX_HEIGHT_MARGIN = 16;

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
 * setElementMaxHeight(dialogElement);
 */
export function setElementMaxHeight(dialog: HTMLElement): void {
    if (!window) {
        throw new Error('Window object not found, this method should be used in a browser environment');
    }
    const { top } = dialog.getBoundingClientRect();
    const spaceBelow = window.innerHeight - (top + MAX_HEIGHT_MARGIN);
    dialog.style.maxHeight = `${spaceBelow}px`;
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
export function isElementVisible(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    const hasSize = rect.width > 0 && rect.height > 0;

    const style = window.getComputedStyle(element);
    const isVisibleStyle = style.display !== 'none' && style.visibility !== 'hidden' && parseFloat(style.opacity) !== 0;

    // Check if the element is within the viewport
    const isInViewport =
        rect.top < window.innerHeight && rect.left < window.innerWidth && rect.bottom > 0 && rect.right > 0;

    return hasSize && isVisibleStyle && isInViewport;
}
