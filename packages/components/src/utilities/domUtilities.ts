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
 * setDialogMaxHeight(dialogElement);
 */
export function setDialogMaxHeight(dialog: HTMLElement, onResize?: () => void): void {
    // Delaying the execution to ensure the page layout has stabilized
    const timeout = () =>
        new Promise<void>((resolve) =>
            setTimeout(() => {
                const { top } = dialog.getBoundingClientRect();
                const spaceBelow = window.innerHeight - (top + 16); // Assuming a 16px margin
                dialog.style.maxHeight = `${spaceBelow}px`;
                resolve();
            }, 0),
        );

    timeout().then(
        () => {
            onResize && onResize();
        },
        () => {
            throw new Error('Failed to set dialog max height');
        },
    );
}
