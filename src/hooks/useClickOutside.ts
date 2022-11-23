/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect } from 'react';

export const useClickOutside = (
    reference: HTMLElement | null,
    callback: () => void,
    ignoredElements?: HTMLElement[],
): void => {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                !reference?.contains(event.target as Node) &&
                !ignoredElements?.find(
                    (element) => element && (event.target === element || element.contains(event.target as Node)),
                )
            ) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback, reference, ignoredElements]);
};
