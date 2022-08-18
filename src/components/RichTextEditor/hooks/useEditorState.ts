/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';
import { TNode, usePlateEditorState } from '@udecode/plate';
import { EMPTY_RICH_TEXT_VALUE } from '../utils/parseRawValue';

export const useEditorState = (editorId: string, clear = false) => {
    const localValue = useRef<TNode[] | null>(null);
    const editor = usePlateEditorState(editorId);

    useEffect(() => {
        if (clear && editor) {
            const point = { path: [0, 0], offset: 0 };
            editor.selection = { anchor: point, focus: point };
            editor.history = { redos: [], undos: [] };
            editor.children = EMPTY_RICH_TEXT_VALUE;
            localValue.current = EMPTY_RICH_TEXT_VALUE;
        }
    }, [clear, editor]);

    return { localValue };
};
