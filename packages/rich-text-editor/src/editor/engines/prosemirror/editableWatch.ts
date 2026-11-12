/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Plugin as PmPlugin } from 'prosemirror-state';

/**
 * Calls `onChange` when the view turns editable or read-only. Changing that
 * prop is no transaction, so nothing else tells the edit views to redraw.
 */
export const editableWatchPlugin = (onChange: () => void): PmPlugin =>
    new PmPlugin({
        view: (initialView) => {
            let wasEditable = initialView.editable;
            return {
                update(view) {
                    if (view.editable === wasEditable) {
                        return;
                    }
                    wasEditable = view.editable;
                    onChange();
                },
            };
        },
    });
