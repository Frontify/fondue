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

import { keepSelectionExcept, TEXT_CONTROL } from '../helpers/keepSelection';
import { SLOT_ATTRIBUTE } from '../helpers/toolbarMarkers';

export type UseToolbarRovingParams = {
    toolbarRef: RefObject<HTMLElement | null>;
    /** Read and cleared after every render: when set, the stop the toolbar is entered at takes focus. */
    focusRequestRef: MutableRefObject<boolean>;
    /** Escape on a control, unless that control's own menu is open. */
    onEscape: () => void;
};

export type ToolbarRoving = {
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    onFocus: (event: FocusEvent<HTMLElement>) => void;
    onMouseDown: (event: MouseEvent<HTMLElement>) => void;
};

/**
 * The toolbar pattern's keyboard model over whatever controls a toolbar holds:
 * the toolbar is one tab stop, the arrow keys (and Home/End) move between its
 * controls, Escape is `onEscape`'s. The controls are whatever the plugins
 * render, so the stops are found in the DOM and their `tabIndex` set there
 * after every render. Spread the handlers onto the toolbar element.
 */
export const useToolbarRoving = ({ toolbarRef, focusRequestRef, onEscape }: UseToolbarRovingParams): ToolbarRoving => {
    // The stop the toolbar is entered at: the control used last. Kept by element
    // and by slot, so a control redrawn elsewhere in the row stays the entry point.
    const currentRef = useRef<Stop>({ element: null, slot: null, index: 0 });

    const currentIndex = (stops: HTMLElement[]): number => {
        const { element, slot, index } = currentRef.current;
        if (element !== null) {
            const same = stops.indexOf(element);
            if (same !== -1) {
                return same;
            }
        }
        const inSlot = stops.findIndex((stop) => slot !== null && slotOf(stop) === slot);
        if (inSlot !== -1) {
            return inSlot;
        }
        return Math.min(index, Math.max(stops.length - 1, 0));
    };

    const remember = (stops: HTMLElement[], index: number): void => {
        const element = stops[index] ?? null;
        currentRef.current = { element, slot: slotOf(element), index };
    };

    useLayoutEffect(() => {
        const toolbar = toolbarRef.current;
        if (!toolbar) {
            return;
        }
        const stops = controlsIn(toolbar);
        const current = currentIndex(stops);
        remember(stops, current);
        for (const [index, stop] of stops.entries()) {
            if (index === current) {
                stop.tabIndex = 0;
            } else {
                stop.tabIndex = -1;
            }
        }
        if (focusRequestRef.current) {
            focusRequestRef.current = false;
            stops[current]?.focus();
        }
    });

    const moveTo = (stops: HTMLElement[], index: number): void => {
        const next = stops[index];
        if (!next) {
            return;
        }
        currentRef.current.element?.setAttribute('tabindex', '-1');
        next.tabIndex = 0;
        remember(stops, index);
        next.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
        const { target } = event;
        if (!(target instanceof HTMLElement)) {
            return;
        }
        // Keys from a flyout a control opened arrive here through the
        // component tree; they belong to that flyout.
        if (!event.currentTarget.contains(target)) {
            return;
        }
        // A layer that took Escape (an open tooltip) prevented it, and the first
        // Escape is its alone; so is a control's own open menu's.
        if (event.key === 'Escape' && !event.defaultPrevented && target.getAttribute('aria-expanded') !== 'true') {
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
        let nextStop = index + 1;
        if (index >= last) {
            nextStop = 0;
        }
        let previousStop = index - 1;
        if (index <= 0) {
            previousStop = last;
        }
        const next = {
            ArrowRight: nextStop,
            ArrowLeft: previousStop,
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
        if (index !== -1 && stops[index] !== currentRef.current.element) {
            currentRef.current.element?.setAttribute('tabindex', '-1');
            stops[index]?.setAttribute('tabindex', '0');
            remember(stops, index);
        }
    };

    return { onKeyDown, onFocus, onMouseDown: keepSelection };
};

/** A stop, and the slot it is drawn in; More and Turn into are in none. */
type Stop = { element: HTMLElement | null; slot: string | null; index: number };

const slotOf = (element: HTMLElement | null): string | null => {
    const slot = element?.closest(`[${SLOT_ATTRIBUTE}]`);
    if (slot === null || slot === undefined) {
        return null;
    }
    return slot.getAttribute(SLOT_ATTRIBUTE);
};

/** A click on the toolbar that misses a control would move focus, and the selection with it. */
const keepSelection = (event: MouseEvent<HTMLElement>): void => keepSelectionExcept(event, PRESSABLE);

/** What a press on the toolbar may land on without taking the selection: a button keeps it itself, a text control takes focus. */
const PRESSABLE = `button, ${TEXT_CONTROL}`;

/** Every element in the toolbar a keyboard can land on. Disabled controls are passed over. */
const CONTROLS = 'button, input, select, textarea, a[href], [role="combobox"]';

/** Controls inside a subtree hidden from the accessibility tree are not stops. */
const HIDDEN_SUBTREE = '[aria-hidden="true"]';

const DISABLED = ':disabled';

const controlsIn = (toolbar: HTMLElement): HTMLElement[] =>
    [...toolbar.querySelectorAll<HTMLElement>(CONTROLS)].filter(
        (control) => !control.matches(DISABLED) && control.closest(HIDDEN_SUBTREE) === null,
    );

/** A text field keeps the arrow keys for its own caret. */
const keepsArrowKeys = (target: HTMLElement): boolean =>
    target instanceof HTMLTextAreaElement ||
    (target instanceof HTMLInputElement && !['button', 'checkbox', 'radio'].includes(target.type));
