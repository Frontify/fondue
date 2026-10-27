/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

import { escapePassed } from '#/bridge/overlays/helpers/escape';
import { hasSurface, nodeChromeOf, passesToBrowser, type EditorPort } from '#/runtime/port';
import { pressesBinding } from '#/ui/helpers/shortcuts';

type ChromeFocus = {
    runtime: EditorPort | undefined;
    /** The fixed toolbar, unless none renders or the editor is disabled. */
    toolbar: HTMLElement | null;
    /** The toolbar of a plugin's standing overlay while it shows, such as a bubble at the caret. */
    overlayToolbar: HTMLElement | null;
    /** The bubble toolbar while it shows. */
    bubble: HTMLElement | null;
    /** In bubble mode, opens the bubble toolbar at the selection and focuses it. */
    showBubble: (() => void) | null;
    /** The package key binding that moves focus between the toolbars. */
    shortcut: string;
};

/** A toolbar Alt+F10 focuses, or the opener of the bubble toolbar that bubble mode has not shown yet. */
type Stop = HTMLElement | (() => void);

/**
 * Alt+F10 moves to the most specific toolbar present, a standing overlay's, node chrome, then the bubble toolbar, then
 * the fixed toolbar, and on to the next one, wrapping around; Escape in one returns to the surface with its selection.
 */
export const moveChromeFocus = (
    event: KeyboardEvent<HTMLElement>,
    { runtime, toolbar, overlayToolbar, bubble, showBubble, shortcut }: ChromeFocus,
) => {
    const toToolbars = pressesBinding(event.nativeEvent, shortcut);
    if (!toToolbars && event.key !== 'Escape') {
        return;
    }

    // A tooltip or menu that closed on this Escape keeps focus where it is; the bubble toolbar hands it on.
    const taken = event.defaultPrevented && !escapePassed(event.nativeEvent);
    if (taken || passesToBrowser(event.nativeEvent) || runtime === undefined) {
        return;
    }

    if (!hasSurface(runtime)) {
        return;
    }

    const stops: Stop[] = [];
    if (overlayToolbar !== null) {
        stops.push(overlayToolbar);
    }

    const nodeChrome = nodeChromeOf(runtime);
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

        // A standing overlay, node chrome and the bubble toolbar open on their first enabled control; Radix Toolbar sends focus to the last focused item.
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

    // Node chrome away from the selection is not a stop, yet Escape leaves it too.
    if (inside >= 0 || leavesToSurface(target, toolbar, event.currentTarget)) {
        event.preventDefault();
        runtime.handle.focus();
    }
};

/** Whether `target` is in the fixed toolbar or in node chrome of the editor at `root`, which Escape leaves for the surface. */
export const leavesToSurface = (
    target: EventTarget | null | undefined,
    toolbar: HTMLElement | null,
    root: HTMLElement,
) => {
    // A node of an iframe's document is no `Element` of this window.
    if (target === null || target === undefined || !('closest' in target)) {
        return false;
    }

    const element = target as Element;
    if (toolbar !== null && toolbar.contains(element)) {
        return true;
    }

    return root.contains(element) && element.closest('[data-rte-node-chrome]') !== null;
};
