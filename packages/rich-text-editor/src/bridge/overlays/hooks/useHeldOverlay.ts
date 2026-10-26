/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { type EditorPort } from '#/runtime/port';
import { engineOf } from '#/runtime/portEngine';

import { type AnchorTarget } from '../../pluginApi/plugin';
import { SessionContext } from '../../session';
import { useClientLayoutEffect } from '../../session/hooks/useClientLayoutEffect';
import { createSelectionAnchor } from '../helpers/anchor';
import { type EditorOverlay, type SelectionAnchor } from '../helpers/overlayContext';
import { TABBABLE } from '../helpers/tabbable';

import { useOverlays } from './useOverlays';

/** Whether `element` holds `node`, or is it. */
const holds = (element: HTMLElement | null, node: Node | null) => element !== null && element.contains(node);

/**
 * Lets Tab on an overlay's last control, or Shift+Tab on its first, move on past it, where the focus loop of a Radix
 * popover would wrap; a modal dialog's focus trap still holds focus.
 */
const leaveOnTab = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') {
        return;
    }

    const tabbables = (event.currentTarget as HTMLElement).querySelectorAll(TABBABLE);
    let edge = tabbables[tabbables.length - 1];
    if (event.shiftKey) {
        edge = tabbables[0];
    }

    if (edge !== undefined && event.target === edge) {
        event.stopPropagation();
    }
};

/**
 * Returns focus that a closed overlay left on `body` to `before`, by default the element that had it before the overlay
 * opened, such as the chrome button that opened a dialog, or, when that is the surface, `null` or gone, to the surface
 * at ProseMirror's selection, which it maps through every change made meanwhile.
 */
const refocus = (port: EditorPort, before: Element | null, panelControl: Element | null) => {
    const runtime = engineOf(port);
    const { view } = runtime;
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

    runtime.handle.focus();
};

/** `useEditorOverlay` with the anchor's `hold`, which chrome that stays beside the surface while it is hovered uses. */
export const useHeldOverlay = (
    open: boolean,
    setOpen: (open: boolean) => void,
    target?: AnchorTarget,
): EditorOverlay & { anchor: SelectionAnchor } => {
    const { container, scope, opener = null } = useOverlays();
    const runtime = useContext(SessionContext);
    const runtimeRef = useRef(runtime);
    const openerRef = useRef(opener);
    // A caller's inline `setOpen` is new on each render, which must not end and restart the open overlay's effect.
    const setOpenRef = useRef(setOpen);
    const targetRef = useRef(target);
    useClientLayoutEffect(() => {
        runtimeRef.current = runtime;
        setOpenRef.current = setOpen;
        targetRef.current = target;
        openerRef.current = opener;
    });
    const elementRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useCallback((element: HTMLDivElement | null) => {
        elementRef.current?.removeEventListener('keydown', leaveOnTab);
        elementRef.current = element;
        element?.addEventListener('keydown', leaveOnTab);
    }, []);
    const [anchor] = useState(() =>
        createSelectionAnchor(
            () => {
                const live = runtimeRef.current;
                if (live === undefined) {
                    return undefined;
                }

                return engineOf(live).view;
            },
            () => targetRef.current,
        ),
    );
    const onOpenChange = useCallback(
        (next: boolean) => {
            const { kind, target } = scope.last();
            if (!next && kind !== 'key' && scope.contains(target) && !holds(elementRef.current, target)) {
                return;
            }

            // A host dialog's focus trap may move focus to its container while a press inside this overlay is held.
            if (!next && kind === 'focus' && holds(elementRef.current, scope.pressed())) {
                return;
            }

            setOpenRef.current(next);
        },
        [scope],
    );
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
    }, [open, runtime, scope]);
    // Hides the content while its anchor is clipped; Floating UI's `hide` middleware would, but Fondue's `Flyout` and
    // `Dropdown` do not expose `hideWhenDetached`. A zero scale with no pointer input, not `visibility: hidden`, which
    // blurs a focused field, keeps focus and state inside and the content in the accessibility tree, since focus may be
    // there.
    useEffect(() => {
        if (!open) {
            return undefined;
        }

        let frame = 0;
        const track = () => {
            const element = elementRef.current;
            let transform = '';
            let pointerEvents = '';
            if (anchor.clipped()) {
                transform = 'scale(0)';
                pointerEvents = 'none';
            }

            if (element !== null && element.style.transform !== transform) {
                element.style.transform = transform;
                element.style.pointerEvents = pointerEvents;
            }

            frame = requestAnimationFrame(track);
        };

        frame = requestAnimationFrame(track);

        return () => cancelAnimationFrame(frame);
    }, [open, anchor]);

    return { container, contentRef, onOpenChange, anchor, returnFocusTo };
};
