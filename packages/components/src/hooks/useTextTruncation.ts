/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, type RefObject } from 'react';

/**
 * A custom React hook that automatically manages text truncation and tooltips.
 * It observes the element's size and adds a title attribute with the full text
 * when the content is truncated.
 *
 * @param {RefObject<HTMLElement>} ref - Reference to the HTML element to observe for truncation.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const textRef = useRef<HTMLDivElement>(null);
 *   useTextTruncation(textRef);
 *
 *   return <div ref={textRef} className="truncate">Long text content...</div>;
 * });
 * ```
 */
export const useTextTruncation = (ref: RefObject<HTMLElement>) => {
    useEffect(() => {
        if (!ref.current) {
            return;
        }

        const element = ref.current;
        const observer = new ResizeObserver(() => {
            const isTruncated = element.scrollWidth > element.clientWidth;
            element.title = isTruncated ? element.textContent || '' : '';
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [ref]);
};
