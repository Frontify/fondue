/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorRef } from '@udecode/plate-core';
import { floatingLinkActions, useFloatingLinkSelectors } from '@udecode/plate-link';
import { useCallback, useEffect, useState } from 'react';

import { FLOATING_MODAL_SELECTOR } from './components';

export const BlurObserver = ({
    hideExternalFloatingModals,
}: {
    hideExternalFloatingModals?: (editorId: string) => void;
}) => {
    const editorRef = useEditorRef();
    const isFloatingLinkModalOpen = useFloatingLinkSelectors().isOpen(editorRef.id);
    const [isBlurObserverActive, setIsBlurObserverActive] = useState(false);

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
        if (!isBlurObserverActive) {
            return;
        }

        const handleInteractWithOutside = (event: FocusEvent | MouseEvent) => {
            const richTextEditorSelector = `[data-editor-id='${editorRef.id}']`;
            const toolbarSelector = "[data-selector='toolbar-floating']";
            const modalSelector = '[data-is-underlay]';

            const targetElement = event.target as HTMLElement;

            const isInsidePortalledModal = targetElement.closest(modalSelector);
            const isInsideNonPortalledModal = targetElement.closest(FLOATING_MODAL_SELECTOR);
            const isInsideRichTextEditor = targetElement.closest(richTextEditorSelector);
            const isInsideRichTextEditorToolbar = targetElement.closest(toolbarSelector);

            if ((isInsideRichTextEditor && !isInsideNonPortalledModal) || isInsideRichTextEditorToolbar) {
                collapseFloatingModals();
            } else if (!isInsideRichTextEditor && !isInsideRichTextEditorToolbar && !isInsidePortalledModal) {
                collapseEverything();
                setIsBlurObserverActive(false);
            }
        };

        document.addEventListener('pointerdown', handleInteractWithOutside);
        document.addEventListener('focusin', handleInteractWithOutside);

        return () => {
            document.removeEventListener('focusin', handleInteractWithOutside);
            document.removeEventListener('pointerdown', handleInteractWithOutside);
        };
    }, [collapseEverything, collapseFloatingModals, editorRef.id, isBlurObserverActive]);

    /* Only activate blur observer when the user has focused the editor
     to limit the number of active document event listeners */
    useEffect(() => {
        const richTextEditor = document.querySelector(`[data-editor-id='${editorRef.id}']`);

        if (!richTextEditor) {
            return;
        }

        const setupBlurObserver = () => {
            setIsBlurObserverActive(true);
        };

        richTextEditor.addEventListener('focusin', setupBlurObserver);

        return () => {
            richTextEditor.removeEventListener('focusin', setupBlurObserver);
        };
    }, [editorRef.id]);

    return null;
};
