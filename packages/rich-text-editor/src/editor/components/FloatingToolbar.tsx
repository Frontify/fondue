/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import { type ReactNode, type RefObject, useRef } from 'react';

import { type EditorStateStore } from '../hooks/useEditorHandle';
import { useSelectionAnchor } from '../hooks/useSelectionAnchor';
import { type EditorHandle } from '../port';

/**
 * The bar hung over the selected text, shown while there is a selection. The
 * Flyout places it above the selection (below where there is no room) and
 * follows it while the page scrolls.
 *
 * Focus stays in the text when it appears; Escape from inside the bar goes
 * back to the text.
 */
export const FloatingToolbar = ({
    handle,
    editorState,
    editableRef,
    children,
}: {
    handle: EditorHandle;
    editorState: EditorStateStore;
    editableRef: RefObject<HTMLElement | null>;
    children: ReactNode;
}): ReactNode => {
    const anchor = useSelectionAnchor({ handle, editorState, editableRef });
    const contentRef = useRef<HTMLDivElement | null>(null);

    if (handle.api.selection.get().isCollapsed) {
        return null;
    }
    return (
        <Flyout.Root open>
            <Flyout.Anchor virtualRef={anchor} />
            <Flyout.Content
                ref={contentRef}
                side="top"
                align="center"
                padding="none"
                maxWidth="calc(100vw - 32px)"
                onOpenAutoFocus={(event) => event.preventDefault()}
                onEscapeKeyDown={(event) => {
                    if (contentRef.current?.contains(event.target as Node)) {
                        event.preventDefault();
                        handle.api.focus();
                    }
                }}
            >
                {children}
            </Flyout.Content>
        </Flyout.Root>
    );
};
