/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useRef, useState } from 'react';
import { debounce } from '@utilities/debounce';

export const useEditorResize = () => {
    const [editorWidth, setEditorWidth] = useState<number | undefined>();

    const debounceRef = useRef(debounce((value: number) => setEditorWidth(value)));

    const editorRef = useCallback((node) => {
        if (!node) {
            return;
        }

        const observer = new ResizeObserver((entries) => {
            if (entries.length > 0) {
                debounceRef.current(entries[0].target.clientWidth);
            }
        });

        observer.observe(node);
        return observer;
    }, []);

    return { editorRef, editorWidth };
};
