/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor, useEditorRef } from '@udecode/plate-core';
import { type Value, insertNodes } from '@udecode/slate';
import { useEffect } from 'react';

const clearEditor = ({ children, apply }: PlateEditor): void => {
    for (const node of children) {
        apply({ type: 'remove_node', path: [0], node });
    }
};

export const ContentReplacement = ({ value }: { value: Value }) => {
    const editorRef = useEditorRef();

    useEffect(() => {
        if (value) {
            clearEditor(editorRef);
            insertNodes(editorRef, value);
        }
    }, [editorRef, value]);

    return null;
};
