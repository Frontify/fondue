/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { viewOf } from '#/runtime/dom/viewBridge';
import { type EditorPort } from '#/runtime/port';

import { type InteractionScope } from '../helpers/interactionScope';

/**
 * Returns focus that a closed overlay left on `body` to `before`, by default the element that had it before the overlay
 * opened, such as the chrome button that opened a dialog, or, when that is the surface, `null` or gone, to the surface
 * at ProseMirror's selection, which it maps through every change made meanwhile.
 */
const refocus = (port: EditorPort, before: Element | null, panelControl: Element | null) => {
    const view = viewOf(port);
    if (view === undefined) {
        return;
    }

    const { activeElement, body } = view.dom.ownerDocument;
    // A control a panel opened, such as from an issues panel repair, hands focus back to it after a change too.
    if (
        panelControl instanceof HTMLElement &&
        panelControl.isConnected &&
        (activeElement === body || activeElement === null || activeElement === view.dom)
    ) {
        panelControl.focus();

        return;
    }

    if (activeElement !== body && activeElement !== null) {
        return;
    }

    // An element of an iframe's document is no `HTMLElement` of this window.
    if (before !== null && before !== view.dom && before.isConnected && 'focus' in before) {
        (before as HTMLElement).focus();

        return;
    }

    port.handle.focus();
};

/**
 * Where a close returns focus that it leaves on `body`. While the overlay is open it holds the scope, closes when the
 * document is replaced, and refocuses.
 */
export const useReturnFocus = (
    open: boolean,
    runtime: EditorPort | undefined,
    scope: InteractionScope,
    openerRef: MutableRefObject<Element | null>,
    setOpenRef: MutableRefObject<(open: boolean) => void>,
): ((target: Element | null) => void) => {
    const returnRef = useRef<{ target: Element | null } | undefined>(undefined);
    const returnFocusTo = useCallback((target: Element | null) => {
        returnRef.current = { target };
    }, []);

    useEffect(() => {
        if (!open || runtime === undefined) {
            return undefined;
        }

        const before = scope.active();
        // The control's own opener, read when it opened, since the overlay may move focus before this effect runs.
        let panelControl: Element | null = null;
        for (const candidate of [openerRef.current, before]) {
            if (panelControl === null && candidate !== null && candidate.closest('[data-rte-panel]') !== null) {
                panelControl = candidate;
            }
        }

        const unsubscribe = runtime.handle.subscribe('replaced', () => setOpenRef.current(false));
        // An open overlay keeps the scope listening, whether or not focus is inside, so an outside press still closes it.
        const release = scope.hold();

        // Runs when the overlay closes and when it unmounts open, as the chrome of a deleted node does.
        return () => {
            unsubscribe();
            release();
            let target = before;
            if (returnRef.current !== undefined) {
                target = returnRef.current.target;
            }

            returnRef.current = undefined;
            queueMicrotask(() => refocus(runtime, target, panelControl));
        };
    }, [open, runtime, scope, openerRef, setOpenRef]);

    return returnFocusTo;
};
