/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent } from 'react';

/** An element a user can type into; `contenteditable="false"` marks one that is not. */
const EDITABLE_ELEMENT = '[contenteditable]:not([contenteditable="false"])';

/** What takes text: a press on one must reach it, or it could never be focused. */
export const TEXT_CONTROL = `input, textarea, select, [role="combobox"], ${EDITABLE_ELEMENT}`;

/**
 * Stops a press inside the element from taking focus, and the selection with it, unless it lands on
 * something `except` matches.
 */
export const keepSelectionExcept = (event: MouseEvent<HTMLElement>, except: string): void => {
    const { target } = event;
    // An icon's SVG is an Element, not an HTMLElement, and a press on it still counts.
    if (!(target instanceof Element)) {
        return;
    }
    // A flyout's events arrive here through the component tree; they are not ours.
    if (!event.currentTarget.contains(target)) {
        return;
    }
    if (target.closest(except) === null) {
        event.preventDefault();
    }
};
