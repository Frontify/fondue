/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

import { nodeChromeAt } from '#/bridge/chrome-view';
import { escapePassed } from '#/bridge/overlays';
import { type EditorRuntime } from '#/runtime/runtime';
import { pressesBinding } from '#/ui/shortcuts';

interface ChromeFocus {
    readonly runtime: EditorRuntime | undefined;
    /** The fixed toolbar, unless none renders or the editor is disabled. */
    readonly toolbar: HTMLElement | null;
    /** The bubble toolbar while it shows. */
    readonly bubble: HTMLElement | null;
    /** In bubble mode, opens the bubble toolbar at the selection and focuses it. */
    readonly showBubble: (() => void) | null;
    /** The package key binding that moves focus between the toolbars (SPEC-rich-text-react/AC-079). */
    readonly shortcut: string;
}

/** A toolbar Alt+F10 focuses, or the opener of the bubble toolbar that bubble mode has not shown yet. */
type Stop = HTMLElement | (() => void);

/**
 * Alt+F10 moves to the most specific toolbar present, node chrome, then the bubble toolbar, then the fixed toolbar,
 * and on to the next one, wrapping around; Escape in one returns to the surface with its selection
 * (SPEC-rich-text-react/AC-034, AC-035, AC-069).
 */
export const moveChromeFocus = (
    event: KeyboardEvent<HTMLElement>,
    { runtime, toolbar, bubble, showBubble, shortcut }: ChromeFocus,
) => {
    const toToolbars = pressesBinding(event.nativeEvent, shortcut);
    if (!toToolbars && event.key !== 'Escape') {
        return;
    }
    // A tooltip or menu that closed on this Escape keeps focus where it is; the bubble toolbar hands it on.
    const taken = event.defaultPrevented && !escapePassed(event.nativeEvent);
    if (taken || event.nativeEvent.isComposing || runtime === undefined) {
        return;
    }
    const { view } = runtime;
    if (view === undefined) {
        return;
    }
    const stops: Stop[] = [];
    const nodeChrome = nodeChromeAt(view);
    if (nodeChrome !== null) {
        stops.push(nodeChrome);
    }
    if (bubble !== null) {
        stops.push(bubble);
    } else if (showBubble !== null) {
        stops.push(showBubble);
    }
    if (toolbar !== null) {
        stops.push(toolbar);
    }
    const target = event.target as Node;
    const inside = stops.findIndex((stop) => typeof stop !== 'function' && stop.contains(target));
    if (toToolbars) {
        const next = stops[(inside + 1) % stops.length];
        if (next === undefined) {
            return;
        }
        event.preventDefault();
        if (typeof next === 'function') {
            next();
            return;
        }
        // Node chrome and the bubble toolbar open on their first enabled control; Radix Toolbar sends focus to the last focused item.
        const first = next.querySelector<HTMLElement>('button:not([disabled])');
        if (next !== toolbar && first !== null) {
            // WebKit's focus scroll ignores `scroll-margin`, which `scrollIntoView` keeps clear of the sticky toolbar.
            first.focus({ preventScroll: true });
            first.scrollIntoView({ block: 'nearest' });
            return;
        }
        next.focus();
        return;
    }
    // Node chrome away from the selection is not a stop, yet Escape leaves it too (SPEC-rich-text-react, Overlay focus).
    const inNodeChrome = target instanceof Element && target.closest('[data-rte-node-chrome]') !== null;
    if (inside >= 0 || inNodeChrome) {
        event.preventDefault();
        runtime.handle.focus();
    }
};

/**
 * Whether an Escape leaves the fixed toolbar or this editor's node chrome for the surface ahead of any page layer, which
 * holds while no editor overlay, a tooltip included, is open, since an open one takes the Escape first.
 */
export const escapesToSurface = (
    event: globalThis.KeyboardEvent,
    root: HTMLElement,
    toolbar: HTMLElement | null,
    overlays: HTMLElement | null,
): boolean => {
    if (event.key !== 'Escape' || event.isComposing || (overlays !== null && overlays.childElementCount > 0)) {
        return false;
    }
    const [target] = event.composedPath();
    // A node of an iframe's document is no `Node` of this window.
    if (target === undefined || !('closest' in target)) {
        return false;
    }
    const element = target as Element;
    if (toolbar !== null && toolbar.contains(element)) {
        return true;
    }
    return root.contains(element) && element.closest('[data-rte-node-chrome]') !== null;
};
