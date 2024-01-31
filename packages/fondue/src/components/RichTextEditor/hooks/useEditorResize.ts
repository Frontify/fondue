/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useRef, useState } from 'react';
import { debounce } from '@utilities/debounce';

export const useEditorResize = () => {
    const [editorWidth, setEditorWidth] = useState<number>(0);

    const debounceRef = useRef(debounce((value: number) => setEditorWidth(value)));

    const editorRef = useCallback((node: HTMLDivElement) => {
        if (!node) {
            return;
        }
        setEditorWidth(node.clientWidth);

        const observer = new ResizeObserver((entries) => {
            if (entries.length === 0) {
                return;
            }
            const width = entries[0].target.clientWidth;
            if (width > 0) {
                debounceRef.current(width);
            }
        });

        setTimeout(() => {
            observer.observe(node);
        }, 0);
        return observer;
    }, []);

    return { editorRef, editorWidth };
};
