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
    // Leaving `transitioning` drops `aria-busy`, so this runs then even when the host made the surface readonly meanwhile.
    const observer = new MutationObserver(() => {
        if (!lost || runtime.handle.getSummary().phase === 'transitioning') {
            return;
        }
        lost = false;
        const { activeElement, body } = surface.ownerDocument;
        const editable = surface.getAttribute('contenteditable') === 'true';
        if (editable && (activeElement === null || activeElement === body)) {
            runtime.handle.focus();
        }
    });
    surface.addEventListener('focusout', onFocusOut);
    observer.observe(surface, { attributes: true, attributeFilter: ['contenteditable', 'aria-busy'] });
    return () => {
        surface.removeEventListener('focusout', onFocusOut);
        observer.disconnect();
    };
};
