/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useCallback, useLayoutEffect } from 'react';

import { isElementVisible, setMaxHeightToSpaceBelow } from '#/utilities/domUtilities';

/**
 * Custom hook to dynamically adjust the maximum height of an HTMLElement
 * based on the window's resize events. This function provides an object
 * containing the `triggerMaxHeightDefinition` method to manually trigger
 * the maximum height adjustment if needed.
 *
 * @param {RefObject<HTMLElement | null>} ref - A reference to the HTMLElement.
 * @returns {Object} An object containing `triggerMaxHeightDefinition` method.
 */
export function useMaxHeight(ref: RefObject<HTMLElement | null>) {
    const triggerMaxHeightDefinition = useCallback(() => {
        setTimeout(() => {
            if (ref.current && isElementVisible(ref.current)) {
                setMaxHeightToSpaceBelow(ref.current);
            }
        });
    }, [ref]);

    useLayoutEffect(() => {
        triggerMaxHeightDefinition();
        window.addEventListener('resize', triggerMaxHeightDefinition);
        return () => {
            window.removeEventListener('resize', triggerMaxHeightDefinition);
        };
    }, [triggerMaxHeightDefinition]);

    return {
        triggerMaxHeightDefinition,
    };
}
