/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MouseEvent } from 'react';

const EDITABLE_ELEMENT = '[contenteditable]:not([contenteditable="false"])';

/** What takes text: a press on one must reach it, or it could never be focused. */
export const TEXT_CONTROL = `input, textarea, select, [role="combobox"], ${EDITABLE_ELEMENT}`;

/** A press moves focus, and the selection with it, unless its default is prevented. */
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
