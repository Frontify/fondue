/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntime } from '#/runtime/runtime';

/**
 * Gives focus back to a surface that lost it to nothing while a replacement held it not editable, so focus stays in
 * the editor with the selection the request set, and focus elsewhere never moves (SPEC-rich-text-persistence/AC-036, AC-037).
 */
export const keepReplacementFocus = (runtime: EditorRuntime, surface: HTMLElement): (() => void) => {
    let lost = false;
    // Chromium blurs a focused element whose `contenteditable` turns false, and focus goes to the body.
    const onFocusOut = (event: FocusEvent) => {
        lost = event.relatedTarget === null && runtime.handle.getSummary().phase === 'transitioning';
    };
    const unsubscribe = runtime.handle.subscribe('replaced', () => {
        const { activeElement, body } = surface.ownerDocument;
        if (lost && (activeElement === null || activeElement === body)) {
            runtime.handle.focus();
        }
        lost = false;
    });
    surface.addEventListener('focusout', onFocusOut);
    return () => {
        surface.removeEventListener('focusout', onFocusOut);
        unsubscribe();
    };
};
