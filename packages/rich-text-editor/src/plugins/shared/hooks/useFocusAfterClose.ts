/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useRef } from 'react';

import { type EditorControlApi } from '#/core';

/**
 * Where focus goes when a toolbar flyout closes. By default the flyout focuses
 * its trigger, taking the caret from the text; here focus returns to the text
 * when the user ended the flyout from inside (Save, Cancel, Escape) and stays
 * put when they clicked or tabbed away.
 *
 * `Flyout.Content` forwards `onCloseAutoFocus` without declaring it, hence the
 * props object to spread.
 */
export const useFocusAfterClose = (
    api: EditorControlApi,
): {
    /** Call as the flyout is closed from inside: focus returns to the text once it has. */
    returnToText: () => void;
    /** Spread onto `Flyout.Content`. */
    contentProps: object;
} => {
    const wantedRef = useRef(false);
    return {
        returnToText: () => {
            wantedRef.current = true;
        },
        contentProps: {
            onCloseAutoFocus: (event: Event) => {
                event.preventDefault();
                if (wantedRef.current) {
                    wantedRef.current = false;
                    api.focus();
                }
            },
        },
    };
};
