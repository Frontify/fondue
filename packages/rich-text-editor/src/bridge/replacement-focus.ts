/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorRuntime } from '#/runtime/runtime';

/**
 * Gives focus back to a surface that lost it to nothing while a replacement held it not editable, once it is editable
 * again: with the selection the request set when the replacement succeeds, and the kept one when it fails, while focus
 * elsewhere never moves (SPEC-rich-text-persistence/AC-032, AC-036, AC-037).
 */
export const keepReplacementFocus = (runtime: EditorRuntime, surface: HTMLElement): (() => void) => {
    let lost = false;
    // Chromium blurs a focused element whose `contenteditable` turns false, and focus goes to the body.
    const onFocusOut = (event: FocusEvent) => {
        lost = event.relatedTarget === null && runtime.handle.getSummary().phase === 'transitioning';
    };
    // Both a replacement and a failed step leave `transitioning` by making the surface editable again.
    const observer = new MutationObserver(() => {
        if (!lost || surface.getAttribute('contenteditable') !== 'true') {
            return;
        }
        lost = false;
        const { activeElement, body } = surface.ownerDocument;
        if (activeElement === null || activeElement === body) {
            runtime.handle.focus();
        }
    });
    surface.addEventListener('focusout', onFocusOut);
    observer.observe(surface, { attributes: true, attributeFilter: ['contenteditable'] });
    return () => {
        surface.removeEventListener('focusout', onFocusOut);
        observer.disconnect();
    };
};
