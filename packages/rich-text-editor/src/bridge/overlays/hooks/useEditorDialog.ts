/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { useAnnounce } from '../../announcer';
import { type EditorOverlay } from '../helpers/overlayContext';

import { useEditorOverlay } from './useEditorOverlay';

/** What a dialog body drives: where the close returns focus, and the editor's live region. */
export type EditorDialogControl = {
    open: boolean;
    overlay: EditorOverlay;
    /** Closes the dialog and returns focus to the control that opened it, or to the surface. */
    finish: (focus: 'opener' | 'surface') => void;
    /** Speaks in the editor's polite live region, which Radix leaves out of the `aria-hidden` it sets on a modal's siblings. */
    announce: (message: string) => void;
    onOpenChange: (open: boolean) => void;
};

/** The open state, overlay wiring, focus return and announcements of a modal dialog that `opener` opened. */
export const useEditorDialog = (opener: Element | null, onClose: () => void): EditorDialogControl => {
    const [open, setOpen] = useState(true);
    const announce = useAnnounce();
    const close = () => {
        setOpen(false);
        onClose();
    };

    const overlay = useEditorOverlay(open, (next) => {
        if (!next) {
            close();
        }
    });
    const finish = (focus: 'opener' | 'surface') => {
        if (focus === 'opener') {
            overlay.returnFocusTo(opener);
        } else {
            overlay.returnFocusTo(null);
        }

        close();
    };

    // Escape and an outside press return focus to the opener, like Cancel.
    const onOpenChange = (next: boolean) => {
        if (!next) {
            overlay.returnFocusTo(opener);
        }

        overlay.onOpenChange(next);
    };

    return { open, overlay, finish, announce, onOpenChange };
};
