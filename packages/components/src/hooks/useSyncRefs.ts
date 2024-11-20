/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, useEffect, type RefObject } from 'react';

import { syncRefs } from '#/utilities/domUtilities';

/**
 * A custom React hook that synchronizes a local ref with a forwarded ref.
 * This is useful when you need to maintain both an internal reference to a DOM element
 * and allow external access through a forwarded ref.
 *
 * @template TElement - The type of the DOM element being referenced. Defaults to HTMLElement.
 * @param {RefObject<TElement>} localRef - The local ref object used internally by the component.
 * @param {ForwardedRef<TElement>} forwardedRef - The ref forwarded from a parent component.
 *
 * @example
 * ```tsx
 * const MyComponent = forwardRef<HTMLDivElement>((props, ref) => {
 *   const localRef = useRef<HTMLDivElement>(null);
 *   useSyncRefs(localRef, ref);
 *
 *   return <div ref={localRef}>Content</div>;
 * });
 * ```
 */
export const useSyncRefs = <TElement = HTMLElement>(
    localRef: RefObject<TElement>,
    forwardedRef: ForwardedRef<TElement>,
) => {
    useEffect(() => {
        syncRefs<TElement>(localRef, forwardedRef);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localRef]);
};
