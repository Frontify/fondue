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
export function setDialogMaxHeight(dialog: HTMLElement, onResize?: (spaceBelow: number) => void): void {
    // Move the max height calculation to the end of the event loop to ensure the dialog has been rendered
    const timeout = () =>
        new Promise<number>((resolve, reject) =>
            setTimeout(() => {
                try {
                    const { top } = dialog.getBoundingClientRect();
                    const spaceBelow = window.innerHeight - (top + MAX_HEIGHT_MARGIN);
                    dialog.style.maxHeight = `${spaceBelow}px`;
                    resolve(spaceBelow);
                } catch (error) {
                    reject(error);
                }
            }, 0),
        );

    // This way we don't have to await this function, making it more conventient when adding it to resize event listeners
    timeout().then(
        (spaceBelow) => onResize && onResize(spaceBelow),
        (error) => {
            throw new Error(`Failed to set dialog max height:${error}`);
        },
    );
}
