/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useLayoutEffect, useState } from 'react';

import { SLOT_ATTRIBUTE } from '../helpers/toolbarMarkers';

export type UseEmptySlotsParams = {
    toolbarRef: RefObject<HTMLElement | null>;
    /** The panel behind More, which holds slots too; null while there is no More. */
    panel: HTMLElement | null;
};

const NO_SLOTS: ReadonlySet<string> = new Set();

/** Whether both sets hold the same keys. */
const sameKeys = (first: ReadonlySet<string>, second: ReadonlySet<string>): boolean => {
    if (first.size !== second.size) {
        return false;
    }
    for (const key of first) {
        if (!second.has(key)) {
            return false;
        }
    }
    return true;
};

/**
 * The keys of the toolbar slots that drew nothing, such as a control that shows
 * only in some selections. Read after every render, because what a control
 * draws follows the selection. Until the first read every slot counts as drawing.
 */
export const useEmptySlots = ({ toolbarRef, panel }: UseEmptySlotsParams): ReadonlySet<string> => {
    const [empty, setEmpty] = useState<ReadonlySet<string>>(NO_SLOTS);

    // No dependency array: a control's output changes without its props or the toolbar's items changing.
    // eslint-disable-next-line @eslint-react/exhaustive-deps
    useLayoutEffect(() => {
        const toolbar = toolbarRef.current;
        if (toolbar === null) {
            return;
        }
        const slots = [...toolbar.querySelectorAll<HTMLElement>(`[${SLOT_ATTRIBUTE}]`)];
        if (panel !== null) {
            slots.push(...panel.querySelectorAll<HTMLElement>(`[${SLOT_ATTRIBUTE}]`));
        }
        const next = new Set<string>();
        for (const slot of slots) {
            if (!slot.hasChildNodes()) {
                next.add(slot.getAttribute(SLOT_ATTRIBUTE) ?? '');
            }
        }

        // Which slots drew is only known from the DOM, so the layout effect sets it before paint.
        // eslint-disable-next-line @eslint-react/set-state-in-effect
        setEmpty((previous) => {
            if (sameKeys(previous, next)) {
                return previous;
            }
            return next;
        });
    });

    return empty;
};
