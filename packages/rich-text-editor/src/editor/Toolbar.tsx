/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type FocusEvent,
    type KeyboardEvent,
    memo,
    type MouseEvent,
    type MutableRefObject,
    type ReactNode,
    useCallback,
    useLayoutEffect,
    useRef,
    useSyncExternalStore,
} from 'react';

import {
    type EditorControlApi,
    type RteBlockCommand,
    type RteSelectionSnapshot,
    type ToolbarEntry,
    type ToolbarItemProps,
} from '#/core';

import { turnIntoCommands } from './blockCommands';
import { MoreControls, TurnInto } from './BubbleControls';
import { type EditorStateStore } from './hooks/useEditorHandle';
import styles from './richTextEditor.module.scss';
import { toolbarItemProps } from './toolbarItem';

/**
 * Where the plugins' toolbar is drawn. A host choice for the whole editor, not
 * part of the plugin contract: a plugin never learns where its controls end up.
 *
 * - `'floating'` — a detached bar hovering over the selection.
 * - `'top'` — a strip inside the editor's frame, above the text.
 */
export type ToolbarPlacement = 'floating' | 'top';

/**
 * The plugins' toolbar UI, in mount order; nothing when no plugin has any.
 *
 * Subscribes to the editor state itself, so a keystroke re-renders the toolbar
 * (and only the items whose props changed) rather than the editor around it.
 *
 * Keyboard use follows the toolbar pattern: the bar is one tab stop, the arrow
 * keys (and Home/End) move between its controls, Escape returns to the text
 * with the selection intact. The controls are whatever the plugins render, so
 * the stops are found in the DOM and their `tabIndex` set there after every
 * render.
 */
export const Toolbar = ({
    items: allItems,
    commands = [],
    api,
    editorState,
    placement,
    label,
    controls,
    focusRequestRef,
}: {
    /** The registry's toolbar entries, in mount order. The floating bar sorts them by where each asked to go. */
    items: readonly ToolbarEntry[];
    /** Floating bar only: every block command, for its "Turn into" menu. */
    commands?: readonly RteBlockCommand[];
    api: EditorControlApi;
    editorState: EditorStateStore;
    /** Only the strip inside the frame is drawn as one — a floating bar is a surface of its own. */
    placement: ToolbarPlacement;
    /** The toolbar's accessible name. */
    label: string;
    /** The id of the editable element the controls act on. */
    controls: string;
    /**
     * Set by the editor when the toolbar should take focus (Alt+F10): read
     * and cleared once the toolbar has rendered, which for a floating bar is
     * the first render after it was asked for.
     */
    focusRequestRef: MutableRefObject<boolean>;
}): ReactNode => {
    const getSelection = useCallback(() => api.selection.get(), [api]);
    const selection = useSyncExternalStore(editorState.subscribe, getSelection, getSelection);
    const toolbarRef = useRef<HTMLDivElement | null>(null);
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

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
        const target = event.target as HTMLElement;
        // Keys from a flyout a control opened arrive here through the
        // component tree; they belong to that flyout.
        if (event.defaultPrevented || !event.currentTarget.contains(target)) {
            return;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            api.focus();
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
    const onFocus = (event: FocusEvent<HTMLDivElement>): void => {
        const stops = controlsIn(event.currentTarget);
        const index = stops.findIndex((stop) => stop === event.target || stop.contains(event.target));
        if (index !== -1 && index !== currentRef.current) {
            stops[currentRef.current]?.setAttribute('tabindex', '-1');
            stops[index]?.setAttribute('tabindex', '0');
            currentRef.current = index;
        }
    };

    const floating = placement === 'floating';
    const items = floating ? allItems.filter((item) => item.floating === 'inline') : allItems;
    const overflowItems = floating ? allItems.filter((item) => item.floating === 'overflow') : [];
    const turnInto = floating ? turnIntoCommands(commands) : [];
    // The built-in Text alone is nothing to turn into.
    const showTurnInto = turnInto.length > 1;
    const showMore = floating && overflowItems.length > 0;
    if (items.length === 0 && !showTurnInto && !showMore) {
        return null;
    }

    return (
        <div
            ref={toolbarRef}
            role="toolbar"
            // Focusable in code only: the keyboard moves between the controls inside.
            tabIndex={-1}
            aria-label={label}
            aria-controls={controls}
            aria-orientation="horizontal"
            onMouseDown={keepSelection}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            className={styles.toolbar}
            // Where the bar ended up, for the stylesheet to read.
            data-placement={placement}
        >
            {showTurnInto ? <TurnInto api={api} commands={turnInto} selection={selection} /> : null}
            {items.map((item) => (
                <ToolbarItemSlot
                    key={item.id}
                    render={item.render}
                    itemProps={toolbarItemProps(item.own, api, selection)}
                />
            ))}
            {showMore ? (
                <MoreControls api={api}>
                    {overflowItems.map((item) => (
                        <ToolbarItemSlot
                            key={item.id}
                            render={item.render}
                            itemProps={toolbarItemProps(item.own, api, selection)}
                        />
                    ))}
                </MoreControls>
            ) : null}
        </div>
    );
};

/** A click on the toolbar that misses a control would move focus, and the selection with it. */
const keepSelection = (event: MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    // A flyout's events arrive here through the component tree; they are not ours.
    if (!event.currentTarget.contains(target)) {
        return;
    }
    if (!target.closest('button, input, [role="combobox"]')) {
        event.preventDefault();
    }
};

/** Structural equality for the JSON-shaped data a toolbar item is handed, rebuilt on every editor state change. */
const sameData = (a: unknown, b: unknown): boolean => {
    if (Object.is(a, b)) {
        return true;
    }
    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
        return false;
    }
    if (Array.isArray(a) !== Array.isArray(b)) {
        return false;
    }
    const aEntries = Object.entries(a);
    const bRecord = b as Record<string, unknown>;
    return (
        aEntries.length === Object.keys(b).length &&
        aEntries.every(([key, value]) => key in bRecord && sameData(value, bRecord[key]))
    );
};

/**
 * Equality of selections as a control sees them, ignoring `text`: it can be the
 * whole document (select-all) and no control draws from it. `isCollapsed` still
 * tells whether there is any.
 */
const sameSelection = (a: RteSelectionSnapshot, b: RteSelectionSnapshot): boolean => {
    const { text: _a, ...restA } = a;
    const { text: _b, ...restB } = b;
    return sameData(restA, restB);
};

type ToolbarItemSlotProps = {
    render: ToolbarEntry['render'];
    itemProps: ToolbarItemProps;
};

/**
 * One plugin's control as a component of its own, so the hooks it calls keep
 * their state when another plugin is added or removed.
 *
 * Re-rendered only when what it is handed changed: typing moves the editor
 * state on every keystroke but rarely anything a control shows. Data is
 * compared by value (selection without its text, see `sameSelection`); the
 * commands are left out because they derive from the same data.
 */
const ToolbarItemSlot = memo(
    ({ render, itemProps }: ToolbarItemSlotProps): ReactNode => render(itemProps),
    (previous, next) =>
        previous.render === next.render &&
        previous.itemProps.api === next.itemProps.api &&
        previous.itemProps.isActive === next.itemProps.isActive &&
        sameData(previous.itemProps.selectedNode, next.itemProps.selectedNode) &&
        sameSelection(previous.itemProps.selection, next.itemProps.selection),
);

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
