/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useCallback, useLayoutEffect } from 'react';

import { isElementVisible, setMaxHeightToSpaceAvailable } from '#/utilities/domUtilities';

/**
 * Custom hook to dynamically adjust the maximum height of an HTMLElement
 * based on the window's resize events. This function provides an object
 * containing the `triggerMaxHeightDefinition` method to manually trigger
 * the maximum height adjustment if needed.
 *
 * ! Note: Components utilizing this hook should have tests in place to verify
 * ! that in each scenario, the height is correctly adjusted accodrding to the
 * ! requirements of the component and the viewport.
 *
 * @param {RefObject<HTMLElement | null>} ref - A reference to the HTMLElement.
 * @returns {Object} An object containing `triggerMaxHeightDefinition` method.
 */
export function usePreventDialogOverflow(ref: RefObject<HTMLElement | null>) {
    const triggerMaxHeightDefinition = useCallback(() => {
        requestAnimationFrame(() => {
            if (ref.current && isElementVisible(ref.current)) {
                setMaxHeightToSpaceAvailable(ref.current);
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
