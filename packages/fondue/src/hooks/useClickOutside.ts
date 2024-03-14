/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
    callback: () => void,
    ignoredElements?: HTMLElement[],
) => {
    const dismissibleElementRef = useRef<T>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (
                !dismissibleElementRef.current?.contains(event.target as Node) &&
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
    }, [callback, ignoredElements]);

    return { dismissibleElementRef };
};
