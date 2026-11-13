/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, type ReactNode, useCallback, useRef, useState, useSyncExternalStore } from 'react';

import {
    type EditorControlApi,
    type RteBlockCommand,
    RTE_TOOLBAR_GROUPS,
    type RteToolbarGroup,
    type ToolbarEntry,
    type ToolbarItemProps,
} from '#/core';
import { ToolbarButton } from '#/ui/ToolbarButton/ToolbarButton';
import { TOOLBAR_ICON_SIZE } from '#/ui/toolbarIconSize';

import { turnIntoCommands } from '../helpers/blockCommands';
import { type GroupSplit, type SlotGroup, splitGroups } from '../helpers/toolbarFit';
import { toolbarItemProps } from '../helpers/toolbarItem';
import { GROUP_ATTRIBUTE, SLOT_ATTRIBUTE } from '../helpers/toolbarMarkers';
import { type EditorStateStore } from '../hooks/useEditorHandle';
import { type ToolbarFit, useToolbarFit } from '../hooks/useToolbarFit';
import { useToolbarRoving } from '../hooks/useToolbarRoving';
import { type RichTextEditorLabels } from '../labels';
import styles from '../richTextEditor.module.scss';

import { ToolbarMore, ToolbarMoreProbe } from './ToolbarMore';
import { TurnInto } from './TurnInto';

/**
 * Where the plugins' toolbar is drawn. A host choice for the whole editor, not
 * part of the plugin contract: a plugin never learns where its controls end up.
 *
 * - `'floating'` — a detached bar hovering over the selection.
 * - `'top'` — a row above the text.
 */
export type ToolbarPlacement = 'floating' | 'top';

type ToolbarProps = {
    /** The registry's toolbar entries, in mount order. The floating bar keeps the inline ones. */
    items: readonly ToolbarEntry[];
    /**
     * Floating bar only: every block command, for its "Turn into" menu.
     * @default []
     */
    commands?: readonly RteBlockCommand[];
    api: EditorControlApi;
    editorState: EditorStateStore;
    /** The row above the text sits flush with it; a floating bar is a surface of its own, inset. */
    placement: ToolbarPlacement;
    /** The editor's words: the toolbar's accessible name, and Turn into's. */
    labels: RichTextEditorLabels;
    /** The id of the editable element the controls act on. */
    controls: string;
    /**
     * Set by the editor when the toolbar should take focus (Alt+F10): read
     * and cleared once the toolbar has rendered, which for a floating bar is
     * the first render after it was asked for.
     */
    focusRequestRef: MutableRefObject<boolean>;
};

/**
 * The plugins' toolbar UI in groups, mount order kept inside each; nothing
 * when no plugin has any.
 *
 * Subscribes to the editor state itself, so a keystroke re-renders the toolbar
 * rather than the editor around it.
 *
 * Keyboard use follows the toolbar pattern (`useToolbarRoving`): Escape
 * returns to the text with the selection intact.
 *
 * The top row is one line: the plugins' controls that do not fit move behind a
 * More button at its end.
 */
export const Toolbar = ({
    items: allItems,
    commands = [],
    api,
    editorState,
    placement,
    labels,
    controls,
    focusRequestRef,
}: ToolbarProps): ReactNode => {
    const getSelection = useCallback(() => api.selection.get(), [api]);
    const selection = useSyncExternalStore(editorState.subscribe, getSelection, getSelection);
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const [panel, setPanel] = useState<HTMLElement | null>(null);

    const floating = placement === 'floating';
    const items = floating ? allItems.filter((item) => item.floating === 'inline') : allItems;
    const turnInto = floating ? turnIntoCommands(commands) : [];
    // The built-in Text alone is nothing to turn into.
    const showTurnInto = turnInto.length > 1;
    const groups = groupsOf(items);
    // Before the roving focus, whose layout effect then honours a refocus the refit asked for.
    const fit = useToolbarFit({ toolbarRef, panel, groups, fits: !floating, focusRequestRef });
    const roving = useToolbarRoving({ toolbarRef, focusRequestRef, onEscape: () => api.focus() });
    const { row, overflow, more } = layoutOf(groups, fit);

    const drawGroups = (drawn: readonly SlotGroup<ToolbarEntry>[]): ReactNode =>
        drawn.map((group) => (
            <div key={group.key} className={styles.group} {...{ [GROUP_ATTRIBUTE]: '' }}>
                {group.items.map((item) => (
                    // An element per slot, so the row can measure what each plugin drew.
                    <div key={item.key} className={styles.slot} {...{ [SLOT_ATTRIBUTE]: item.key }}>
                        <ToolbarItemSlot item={item} itemProps={toolbarItemProps(item, api, selection)} />
                    </div>
                ))}
            </div>
        ));

    let moreNode: ReactNode = null;
    if (more && panel === null && fit.kind === 'measuring') {
        // Nothing has overflowed yet: More's width is all the measuring needs.
        moreNode = <ToolbarMoreProbe label={labels.more} />;
    } else if (more) {
        moreNode = (
            <ToolbarMore label={labels.more} onPanel={setPanel}>
                {drawGroups(overflow)}
            </ToolbarMore>
        );
    }

    return (
        <div
            ref={toolbarRef}
            role="toolbar"
            // Focusable in code only: the keyboard moves between the controls inside.
            tabIndex={-1}
            aria-label={labels.toolbar}
            aria-controls={controls}
            aria-orientation="horizontal"
            onMouseDown={roving.onMouseDown}
            onKeyDown={roving.onKeyDown}
            onFocus={roving.onFocus}
            className={styles.toolbar}
            // Where the bar ended up, for the stylesheet to read.
            data-placement={placement}
        >
            {showTurnInto ? <TurnInto api={api} commands={turnInto} selection={selection} labels={labels} /> : null}
            {drawGroups(row)}
            {moreNode}
        </div>
    );
};

const UNGROUPED_GROUP_KEY = 'ungrouped';

/** The items by group in drawing order, those with no group or an unknown one last; empty groups are left out. */
const groupsOf = (items: readonly ToolbarEntry[]): SlotGroup<ToolbarEntry>[] => {
    const known: readonly (RteToolbarGroup | undefined)[] = RTE_TOOLBAR_GROUPS;
    const groups = [
        ...RTE_TOOLBAR_GROUPS.map((group) => ({
            key: group,
            items: items.filter((item) => item.group === group),
        })),
        // A plugin cast past the type can name a group that is not drawn; it still gets its control.
        { key: UNGROUPED_GROUP_KEY, items: items.filter((item) => !known.includes(item.group)) },
    ];
    return groups.filter((group) => group.items.length > 0);
};

type ToolbarLayout = GroupSplit<ToolbarEntry> & { more: boolean };

/** What the row draws and what goes behind More; while measuring, every slot and More, so each has a size to read. */
const layoutOf = (groups: SlotGroup<ToolbarEntry>[], fit: ToolbarFit): ToolbarLayout => {
    switch (fit.kind) {
        case 'measuring':
            return { row: groups, overflow: [], more: true };
        case 'fitted': {
            const { row, overflow } = splitGroups(groups, fit.shown);
            return { row, overflow, more: overflow.length > 0 };
        }
    }
};

type ToolbarItemSlotProps = {
    item: ToolbarEntry;
    itemProps: ToolbarItemProps;
};

/**
 * One toolbar control: the entry's own `render`, else a button drawn from its data.
 * `render` is called in this component, so its hooks keep their state when another plugin is added or removed.
 */
const ToolbarItemSlot = ({ item, itemProps }: ToolbarItemSlotProps): ReactNode => {
    switch (item.control) {
        case 'custom':
            // Called, not mounted as an element: a factory-built control changes identity on every host render.
            return item.render(itemProps);
        case 'button': {
            const { icon: Icon } = item;
            return (
                <ToolbarButton
                    title={item.label}
                    shortcut={item.shortcut}
                    active={item.pressable ? itemProps.isActive : undefined}
                    onClick={() => itemProps.toggle()}
                >
                    <Icon size={TOOLBAR_ICON_SIZE} />
                </ToolbarButton>
            );
        }
    }
};
