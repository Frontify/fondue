/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FocusEvent,
    type KeyboardEvent,
    type MouseEvent,
    type MutableRefObject,
    type RefObject,
    useLayoutEffect,
    useRef,
} from 'react';

/**
 * The toolbar pattern's keyboard model over whatever controls a toolbar holds:
 * the toolbar is one tab stop, the arrow keys (and Home/End) move between its
 * controls, Escape is `onEscape`'s. The controls are whatever the plugins
 * render, so the stops are found in the DOM and their `tabIndex` set there
 * after every render. Spread the handlers onto the toolbar element.
 */
export const useToolbarRoving = ({
    toolbarRef,
    focusRequestRef,
    onEscape,
}: {
    toolbarRef: RefObject<HTMLElement | null>;
    /** Read and cleared after every render: when set, the stop the toolbar is entered at takes focus. */
    focusRequestRef: MutableRefObject<boolean>;
    /** Escape on a control, unless that control's own menu is open. */
    onEscape: () => void;
}): {
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    onFocus: (event: FocusEvent<HTMLElement>) => void;
    onMouseDown: (event: MouseEvent<HTMLElement>) => void;
} => {
    // The stop the toolbar is entered at: the control used last.
    const currentRef = useRef(0);

    useLayoutEffect(() => {
        const toolbar = toolbarRef.current;
        if (!toolbar) {
            return;
        }
        const stops = controlsIn(toolbar);
        currentRef.current = Math.min(currentRef.current, Math.max(stops.length - 1, 0));
        for (const [index, stop] of stops.entries()) {
            stop.tabIndex = index === currentRef.current ? 0 : -1;
        }
        if (focusRequestRef.current) {
            focusRequestRef.current = false;
            stops[currentRef.current]?.focus();
        }
    });

    const moveTo = (stops: HTMLElement[], index: number): void => {
        const next = stops[index];
        if (!next) {
            return;
        }
        stops[currentRef.current]?.setAttribute('tabindex', '-1');
        next.tabIndex = 0;
        currentRef.current = index;
        next.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
        const target = event.target as HTMLElement;
        // Keys from a flyout a control opened arrive here through the
        // component tree; they belong to that flyout.
        if (!event.currentTarget.contains(target)) {
            return;
        }
        // An open tooltip prevents Escape too, yet leaving the toolbar closes it;
        // only a control's own open menu keeps the key.
        if (event.key === 'Escape' && target.getAttribute('aria-expanded') !== 'true') {
            event.preventDefault();
            onEscape();
            return;
        }
        if (event.defaultPrevented) {
            return;
        }
        if (keepsArrowKeys(target)) {
            return;
        }
        const stops = controlsIn(event.currentTarget);
        const index = stops.findIndex((stop) => stop === target || stop.contains(target));
        const last = stops.length - 1;
        const next = {
            ArrowRight: index >= last ? 0 : index + 1,
            ArrowLeft: index <= 0 ? last : index - 1,
            Home: 0,
            End: last,
        }[event.key];
        if (next === undefined) {
            return;
        }
        event.preventDefault();
        moveTo(stops, next);
    };

    // A control focused by any means — a click, a flyout handing focus back —
    // becomes the one the toolbar is entered at.
    const onFocus = (event: FocusEvent<HTMLElement>): void => {
        const stops = controlsIn(event.currentTarget);
        const index = stops.findIndex((stop) => stop === event.target || stop.contains(event.target));
        if (index !== -1 && index !== currentRef.current) {
            stops[currentRef.current]?.setAttribute('tabindex', '-1');
            stops[index]?.setAttribute('tabindex', '0');
            currentRef.current = index;
        }
    };

    return { onKeyDown, onFocus, onMouseDown: keepSelection };
};

/** A click on the toolbar that misses a control would move focus, and the selection with it. */
const keepSelection = (event: MouseEvent<HTMLElement>): void => {
    const target = event.target as HTMLElement;
    // A flyout's events arrive here through the component tree; they are not ours.
    if (!event.currentTarget.contains(target)) {
        return;
    }
    if (!target.closest('button, input, [role="combobox"]')) {
        event.preventDefault();
    }
};

/** Every element in the toolbar a keyboard can land on. Disabled controls are passed over. */
const CONTROLS = 'button, input, select, textarea, a[href], [role="combobox"]';

const controlsIn = (toolbar: HTMLElement): HTMLElement[] =>
    [...toolbar.querySelectorAll<HTMLElement>(CONTROLS)].filter(
        (control) => !control.matches(':disabled') && control.closest('[aria-hidden="true"]') === null,
    );

/** A text field keeps the arrow keys for its own caret. */
const keepsArrowKeys = (target: HTMLElement): boolean =>
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLInputElement && !['button', 'checkbox', 'radio'].includes(target.type));
