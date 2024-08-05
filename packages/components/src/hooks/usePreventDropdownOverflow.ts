/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useCallback, useLayoutEffect } from 'react';

import { isElementVisible, setMaxHeightToAvailableSpace } from '#/utilities/domUtilities';

/**
 * Custom hook to dynamically adjust the maximum height of an HTMLElement
 * based on the window's resize events. This function provides an object
 * containing the `setMaxHeight` method to manually trigger
 * the maximum height adjustment if needed.
 *
 * ! Note: Components utilizing this hook should have tests in place to verify
 * ! that in each scenario, the height is correctly adjusted accodrding to the
 * ! requirements of the component and the viewport.
 *
 * @param {RefObject<HTMLElement | null>} ref - A reference to the HTMLElement.
 * @returns {Object} An object containing `setMaxHeight` method.
 */
export function usePreventDropdownOverflow(ref: RefObject<HTMLElement | null>) {
    const setMaxHeight = useCallback(() => {
        requestAnimationFrame(() => {
            if (ref.current && isElementVisible(ref.current)) {
                setMaxHeightToAvailableSpace(ref.current);
            }
        });
    }, [ref]);

    useLayoutEffect(() => {
        setMaxHeight();
        window.addEventListener('resize', setMaxHeight);
        return () => {
            window.removeEventListener('resize', setMaxHeight);
        };
    }, [setMaxHeight]);

    return {
        setMaxHeight,
    };
}
