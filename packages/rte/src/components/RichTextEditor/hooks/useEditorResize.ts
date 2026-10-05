/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { debounce } from '@utilities/debounce';

export const useEditorResize = () => {
    const [editorWidth, setEditorWidth] = useState<number>(0);

    const debounceRef = useRef(debounce((value: number) => setEditorWidth(value)));
    const observerRef = useRef<ResizeObserver | null>(null);

    const editorRef = useCallback((node: HTMLDivElement | null) => {
        observerRef.current?.disconnect();
        observerRef.current = null;

        if (!node) {
            return;
        }

        let hasInitialWidth = false;
        const observer = new ResizeObserver((entries) => {
            const width = entries[0]?.contentRect.width ?? 0;
            if (width <= 0) {
                return;
            }
            if (hasInitialWidth) {
                debounceRef.current(width);
                return;
            }
            hasInitialWidth = true;
            // eslint-disable-next-line @eslint-react/dom-no-flush-sync
            flushSync(() => setEditorWidth(width));
        });

        observer.observe(node);
        observerRef.current = observer;
    }, []);

    return { editorRef, editorWidth };
};
