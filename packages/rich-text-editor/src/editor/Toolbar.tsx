/* (c) Copyright Frontify Ltd., all rights reserved. */

import { memo, type MouseEvent, type ReactNode, useCallback, useSyncExternalStore } from 'react';

import { type EditorControlApi, type ToolbarEntry, type ToolbarItemProps } from '#/core';

import { type EditorStateStore } from './hooks/useEditorHandle';
import styles from './richTextEditor.module.scss';
import { toolbarItemProps } from './toolbarItem';

/**
 * Where the plugins' toolbar is drawn. A presentation choice the host makes for
 * the whole editor, so it is a prop rather than part of the plugin contract: a
 * plugin contributes controls and never learns where they end up.
 *
 * - `'floating'` — a detached bar hovering above the editor, overlaying whatever is
 *   up there rather than taking a row of the page for itself.
 * - `'top'` — a strip inside the editor's frame, above the text.
 */
export type ToolbarPlacement = 'floating' | 'top';

/**
 * A click landing on the toolbar but missing a control would still move focus,
 * and with it the selection every control is about to act on. The controls keep
 * their own clicks.
 */
const keepSelection = (event: MouseEvent<HTMLDivElement>): void => {
    if (!(event.target as HTMLElement).closest('button, input, [role="combobox"]')) {
        event.preventDefault();
    }
};

/**
 * Structural equality for the plain data a toolbar item is handed — the
 * selection snapshot and the plugin's own node are JSON-shaped, rebuilt as new
 * objects on every editor state change whether or not anything in them moved.
 */
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

type ToolbarItemSlotProps = {
    render: ToolbarEntry['render'];
    itemProps: ToolbarItemProps;
};

/**
 * One plugin's control, as a component of its own: the hooks a `toolbarItem`
 * calls live in this fiber, so each item keeps its own state, and adding or
 * removing a plugin does not shift another item's hooks.
 *
 * Re-rendered only when what it is handed changed. Typing moves the editor
 * state on every keystroke, but rarely anything a control shows: the data is
 * compared by value, and the commands are left out of the comparison because
 * they are derived from the same data (`toggle` and `remove` read `isActive`,
 * the rest only the api and the plugin's type).
 */
const ToolbarItemSlot = memo(
    ({ render, itemProps }: ToolbarItemSlotProps): ReactNode => render(itemProps),
    (previous, next) =>
        previous.render === next.render &&
        previous.itemProps.api === next.itemProps.api &&
        previous.itemProps.isActive === next.itemProps.isActive &&
        sameData(previous.itemProps.selectedNode, next.itemProps.selectedNode) &&
        sameData(previous.itemProps.selection, next.itemProps.selection),
);

/**
 * The plugins' toolbar UI, in mount order. Nothing at all when no plugin has
 * any.
 *
 * Follows the editor state itself, through the selection snapshot (one object
 * per editor state), so a keystroke re-renders the toolbar rather than the
 * editor around it — and of the toolbar only the items whose props changed.
 */
export const Toolbar = ({
    items,
    api,
    editorState,
    placement,
}: {
    /** The registry's toolbar entries, in mount order. */
    items: readonly ToolbarEntry[];
    api: EditorControlApi;
    editorState: EditorStateStore;
    /** Only the strip inside the frame is drawn as one — a floating bar is a surface of its own. */
    placement: ToolbarPlacement;
}): ReactNode => {
    const getSelection = useCallback(() => api.selection.get(), [api]);
    const selection = useSyncExternalStore(editorState.subscribe, getSelection, getSelection);

    if (items.length === 0) {
        return null;
    }

    return (
        <div
            role="toolbar"
            // Reachable only in code, never by tabbing: a keyboard moves
            // between the controls inside, not to the strip holding them.
            tabIndex={-1}
            onMouseDown={keepSelection}
            className={styles.toolbar}
            // Where the bar ended up, for the stylesheet to read.
            data-placement={placement}
        >
            {items.map((item) => (
                <ToolbarItemSlot
                    key={item.id}
                    render={item.render}
                    itemProps={toolbarItemProps(item.own, api, selection)}
                />
            ))}
        </div>
    );
};
