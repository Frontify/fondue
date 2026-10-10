/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type KeyboardEvent } from 'react';

import { nodeChromeAt } from '#/bridge/chrome-view';
import { type EditorRuntime } from '#/runtime/runtime';
import { pressesBinding } from '#/ui/shortcuts';

interface ChromeFocus {
    readonly runtime: EditorRuntime | undefined;
    /** The fixed toolbar, unless none renders or the editor is disabled. */
    readonly toolbar: HTMLElement | null;
    /** The package key binding that moves focus between the toolbars (SPEC-rich-text-react/AC-079). */
    readonly shortcut: string;
}

/**
 * Alt+F10 moves to the most specific toolbar present, node chrome before the fixed toolbar, and on to the next one,
 * wrapping around; Escape in one returns to the surface with its selection (SPEC-rich-text-react/AC-034, AC-035, AC-069).
 */
export const moveChromeFocus = (event: KeyboardEvent<HTMLElement>, { runtime, toolbar, shortcut }: ChromeFocus) => {
    const toToolbars = pressesBinding(event.nativeEvent, shortcut);
    if (!toToolbars && event.key !== 'Escape') {
        return;
    }
    // A tooltip or menu that closed on this Escape keeps focus where it is.
    if (event.defaultPrevented || event.nativeEvent.isComposing || runtime === undefined) {
        return;
    }
    const { view } = runtime;
    if (view === undefined) {
        return;
    }
    const stops: HTMLElement[] = [];
    const nodeChrome = nodeChromeAt(view);
    if (nodeChrome !== null) {
        stops.push(nodeChrome);
    }
    if (toolbar !== null) {
        stops.push(toolbar);
    }
    const target = event.target as Node;
    const inside = stops.findIndex((stop) => stop.contains(target));
    if (toToolbars) {
        const next = stops[(inside + 1) % stops.length];
        if (next === undefined) {
            return;
        }
        event.preventDefault();
        // Node chrome opens on its first enabled control; Radix Toolbar sends focus to the last focused item.
        const first = next.querySelector<HTMLElement>('button:not([disabled])');
        if (next === nodeChrome && first !== null) {
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
