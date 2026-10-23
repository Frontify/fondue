/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { useContext, useRef } from 'react';

import { CheckedSlot, keepFocus } from '#/bridge/chrome-toolbar';
import { useOverlayContainer } from '#/bridge/overlays';
import { SessionContext, useSessionValue } from '#/bridge/session';
import { type EditorRuntime } from '#/runtime/runtime';

import { returnFocus, runItem, tabStop, type ToolbarItem } from './item';
import styles from './styles/toolbar.module.scss';

type Row = NonNullable<ToolbarItem['options']>[number];

/** The index in `rows` of the row whose command is active, preferring one other than `fallback`, or -1. */
const activeIn = (session: EditorRuntime | undefined, rows: readonly Row[], fallback: (row: Row) => boolean) => {
    if (session === undefined) {
        return -1;
    }
    const held = rows.filter(({ command, payload }) => session.handle.query(command, payload).active === true);
    const named = held.find((row) => !fallback(row)) ?? held[0];
    if (named === undefined) {
        return -1;
    }
    return rows.indexOf(named);
};

/**
 * The text style picker: its trigger names the active block type, a stored heading level the policy cannot create
 * included, and its rows set the block types the author may create.
 */
export const TextStyle = ({
    item,
    disabled,
    keepsFocus,
    outOfTabOrder,
}: {
    readonly item: ToolbarItem;
    readonly disabled: boolean;
    readonly keepsFocus: boolean;
    readonly outOfTabOrder: boolean;
}) => {
    const runtime = useContext(SessionContext);
    const container = useOverlayContainer();
    const contentRef = useRef<HTMLDivElement>(null);
    // A row that ran its command sends focus to the surface rather than back to the trigger.
    const ranRef = useRef(false);
    const options = item.options ?? [];
    // A paragraph inside a quote shows Quote, the type it holds the paragraph in.
    const active = useSessionValue(
        (session) => activeIn(session, options, ({ command }) => command === 'paragraph.set'),
        Object.is,
    );
    let label = item.label;
    const shown = options[active];
    if (shown !== undefined) {
        label = shown.label;
    }
    let onMouseDown: typeof keepFocus | undefined;
    if (keepsFocus) {
        onMouseDown = keepFocus;
    }
    const row = (option: Row, checked: boolean) => (
        <Dropdown.Item
            key={option.key}
            // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes.
            {...{ role: 'menuitemradio', 'aria-checked': checked }}
            onSelect={async () => {
                if (runtime === undefined) {
                    return;
                }
                ranRef.current = true;
                await runItem(runtime, option, false);
                returnFocus(runtime, [contentRef.current]);
            }}
        >
            {option.label}
            {checked && <CheckedSlot />}
        </Dropdown.Item>
    );
    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <RadixToolbar.Button
                    {...tabStop(outOfTabOrder)}
                    type="button"
                    className={`${styles.item} ${styles.picker}`}
                    disabled={disabled}
                    data-rte-toolbar-item=""
                    data-group-start={item.groupStart || undefined}
                    onMouseDown={onMouseDown}
                >
                    {label}
                </RadixToolbar.Button>
            </Dropdown.Trigger>
            <Dropdown.Content
                ref={contentRef}
                container={container}
                onCloseAutoFocus={(event) => {
                    if (ranRef.current) {
                        event.preventDefault();
                        ranRef.current = false;
                    }
                }}
            >
                {options.filter(({ offered }) => offered).map((option) => row(option, option === shown))}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
