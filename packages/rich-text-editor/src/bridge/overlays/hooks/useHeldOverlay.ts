/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useCallback, useContext, useRef, useState } from 'react';

import { viewOf } from '#/runtime/dom/viewBridge';

import { type AnchorTarget } from '../../pluginApi/plugin';
import { SessionContext } from '../../session/helpers/sessionContext';
import { useClientLayoutEffect } from '../../session/hooks/useClientLayoutEffect';
import { createSelectionAnchor } from '../helpers/anchor';
import { type EditorOverlay, type SelectionAnchor } from '../helpers/overlayContext';
import { TABBABLE } from '../helpers/tabbable';

import { useHideWhenClipped } from './useHideWhenClipped';
import { useOverlays } from './useOverlays';
import { useReturnFocus } from './useReturnFocus';

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

                return viewOf(live);
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

    const returnFocusTo = useReturnFocus(open, runtime, scope, openerRef, setOpenRef);

    useHideWhenClipped(open, anchor, elementRef);

    return { container, contentRef, onOpenChange, anchor, returnFocusTo };
};
