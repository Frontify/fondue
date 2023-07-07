/* (c) Copyright Frontify Ltd., all rights reserved. */

import { floatingLinkActions, useEditorRef, useFloatingLinkSelectors } from '@udecode/plate';
import { useCallback, useEffect } from 'react';

export const BlurObserver = () => {
    const editorRef = useEditorRef();
    const isFloatingModalOpen = useFloatingLinkSelectors().isOpen(editorRef.id);

    const collapseEverything = useCallback(() => {
        editorRef.collapse();
        if (isFloatingModalOpen) {
            floatingLinkActions.hide();
        }
    }, [editorRef, isFloatingModalOpen]);

    useEffect(() => {
        const handleInteractWithOutside = (event: FocusEvent | MouseEvent) => {
            const richTextEditorSelector = `[data-editor-id='${editorRef.id}']`;
            const toolbarSelector = "[data-selector='toolbar-floating']";
            const richTextEditorWrapper = document.querySelector<HTMLDivElement>(richTextEditorSelector);
            const toolbarWrapper = document.querySelector<HTMLDivElement>(toolbarSelector);
            const targetElement = event.target as HTMLElement;

            const isTargetInsideRichTextEditor = richTextEditorWrapper && richTextEditorWrapper.contains(targetElement);
            const isTargetInsideRichTextEditorToolbar = toolbarWrapper && toolbarWrapper.contains(targetElement);

            if (!isTargetInsideRichTextEditor && !isTargetInsideRichTextEditorToolbar) {
                collapseEverything();
            }
        };

        document.addEventListener('mousedown', handleInteractWithOutside);
        document.addEventListener('focusin', handleInteractWithOutside);
        return () => {
            document.removeEventListener('focusin', handleInteractWithOutside);
            document.removeEventListener('mousedown', handleInteractWithOutside);
        };
    }, [collapseEverything, editorRef.id]);

    return null;
};
