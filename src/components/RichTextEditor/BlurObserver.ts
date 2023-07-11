/* (c) Copyright Frontify Ltd., all rights reserved. */

import { floatingLinkActions, useEditorRef, useFloatingLinkSelectors } from '@udecode/plate';
import { useCallback, useEffect } from 'react';

export const BlurObserver = ({
    hideExternalFloatingModals,
}: {
    hideExternalFloatingModals?: (editorId: string) => void;
}) => {
    const editorRef = useEditorRef();
    const isFloatingLinkModalOpen = useFloatingLinkSelectors().isOpen(editorRef.id);

    const collapseFloatingModals = useCallback(() => {
        if (isFloatingLinkModalOpen) {
            floatingLinkActions.reset();
        }
        if (hideExternalFloatingModals) {
            hideExternalFloatingModals(editorRef.id);
        }
    }, [isFloatingLinkModalOpen, hideExternalFloatingModals, editorRef]);

    const collapseEverything = useCallback(() => {
        editorRef.collapse();
        collapseFloatingModals();
    }, [editorRef, collapseFloatingModals]);

    useEffect(() => {
        const handleInteractWithOutside = (event: FocusEvent | MouseEvent) => {
            const richTextEditorSelector = `[data-editor-id='${editorRef.id}']`;
            const toolbarSelector = "[data-selector='toolbar-floating']";
            const modalSelector = '[data-is-underlay]';
            const richTextEditorWrapper = document.querySelector<HTMLDivElement>(richTextEditorSelector);
            const toolbarWrapper = document.querySelector<HTMLDivElement>(toolbarSelector);
            const modalWrapper = document.querySelector<HTMLDivElement>(modalSelector);
            const targetElement = event.target as HTMLElement;

            const isTargetInsideModal = modalWrapper && modalWrapper.contains(targetElement);
            const isTargetInsideRichTextEditor = richTextEditorWrapper && richTextEditorWrapper.contains(targetElement);
            const isTargetInsideRichTextEditorToolbar = toolbarWrapper && toolbarWrapper.contains(targetElement);

            if (isTargetInsideRichTextEditorToolbar) {
                collapseFloatingModals();
            }

            if (!isTargetInsideRichTextEditor && !isTargetInsideRichTextEditorToolbar && !isTargetInsideModal) {
                collapseEverything();
            }
        };

        document.addEventListener('pointerdown', handleInteractWithOutside);
        document.addEventListener('focusin', handleInteractWithOutside);
        return () => {
            document.removeEventListener('focusin', handleInteractWithOutside);
            document.removeEventListener('pointerdown', handleInteractWithOutside);
        };
    }, [collapseEverything, collapseFloatingModals, editorRef.id]);

    return null;
};
