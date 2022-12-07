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
            const width = entries[0].target.clientWidth;
            if (entries.length > 0 && width > 0) {
                debounceRef.current(width);
            }
        });

        observer.observe(node);
        return observer;
    }, []);

    return { editorRef, editorWidth };
};
