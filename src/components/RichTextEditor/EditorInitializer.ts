/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, Value, useEditorRef } from '@udecode/plate';
import { useEffect } from 'react';

export const EditorInitializer = ({ onInitialized }: { onInitialized: (editorRef: PlateEditor<Value>) => void }) => {
    const editorRef = useEditorRef();

    useEffect(() => {
        if (editorRef) {
            onInitialized(editorRef);
        }
    }, [onInitialized, editorRef]);

    return null;
};
