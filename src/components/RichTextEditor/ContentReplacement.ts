/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, insertNodes, usePlateEditorRef } from '@udecode/plate';
import { useEffect } from 'react';

const clearEditor = ({ children, apply }: PlateEditor): void => {
    for (const node of children) {
        apply({ type: 'remove_node', path: [0], node });
    }
};

export const ContentReplacement = ({ value }: { value: Value }) => {
    const editorRef = usePlateEditorRef();

    useEffect(() => {
        if (value) {
            clearEditor(editorRef);
            insertNodes(editorRef, value);
        }
    }, [editorRef, value]);

    return null;
};
