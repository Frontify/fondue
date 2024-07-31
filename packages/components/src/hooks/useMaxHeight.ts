/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useCallback, useEffect } from 'react';

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
 * setMaxHeight(dialogElement);
 */
function setMaxHeight(dialog: HTMLElement, onResize?: (spaceBelow: number) => void): void {
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

    if (!window) {
        throw new Error('Window object not found, this method should be used in a browser environment');
    }

    // This way we don't have to await this function, making it more conventient when adding it to resize event listeners
    timeout().then(
        (spaceBelow) => onResize && onResize(spaceBelow),
        (error) => {
            throw new Error(`Failed to set dialog max height:${error}`);
        },
    );
}

/**
 * Custom hook to dynamically adjust the maximum height of an HTMLElement
 * based on the window's resize events. This function provides an object
 * containing the `triggerMaxHeightDefinition` method to manually trigger
 * the maximum height adjustment if needed.
 *
 * ! Note: Components utilizing this hook should have tests in place to verify
 * ! that the maximum height adjustments work correctly across different screen
 * ! sizes and during window resizing events.
 *
 * @param {RefObject<HTMLElement | null>} ref - A reference to the HTMLElement.
 * @returns {Object} An object containing `triggerMaxHeightDefinition` method.
 */
export function useMaxHeight(ref: RefObject<HTMLElement | null>) {
    const triggerMaxHeightDefinition = useCallback(() => {
        if (ref.current) {
            setMaxHeight(ref.current);
        }
    }, [ref]);

    useEffect(() => {
        window.addEventListener('resize', triggerMaxHeightDefinition);
        return () => {
            window.removeEventListener('resize', triggerMaxHeightDefinition);
        };
    }, [triggerMaxHeightDefinition]);

    return {
        triggerMaxHeightDefinition,
    };
}
