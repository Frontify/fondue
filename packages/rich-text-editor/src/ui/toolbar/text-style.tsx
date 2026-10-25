/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dropdown } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { useContext, useRef } from 'react';

import { CheckedSlot, keepFocus } from '#/bridge/chrome-toolbar';
import { useOverlayContainer } from '#/bridge/overlays';
import { SessionContext, useSessionValue } from '#/bridge/session';
import { isRecord } from '#/model/values';
import { type EditorPort, selectionBlockName } from '#/runtime/port';

import { returnFocus, runItem, tabStop, type ToolbarItem } from './item';
import styles from './styles/toolbar.module.scss';

type Row = NonNullable<ToolbarItem['options']>[number];

/** The type of the block that holds the selection's start, which the brand style rows apply to. */
export const blockTypeOf = (session: EditorPort | undefined): string => selectionBlockName(session);

/** The index in `rows` of the row whose command is active, preferring one other than `fallback`, or -1. */
const activeIn = (session: EditorPort | undefined, rows: readonly Row[], fallback: (row: Row) => boolean) => {
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
 * included, and its rows set the block types the author may create, then the brand styles that apply to the block
 * type at the selection, each previewing its font.
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
    const types = options.filter(({ brand }) => brand === undefined);
    const blockType = useSessionValue(blockTypeOf, Object.is);
    const brands = options.filter(({ brand }) => brand !== undefined && brand.appliesTo.includes(blockType));
    // A paragraph inside a quote shows Quote, the type it holds the paragraph in.
    const active = useSessionValue(
        (session) => activeIn(session, types, ({ command }) => command === 'paragraph.set'),
        Object.is,
    );
    // A block with a brand style checks its row over the default style's.
    const brandActive = useSessionValue(
        (session) => activeIn(session, brands, ({ payload }) => isRecord(payload) && payload.styleId === null),
        Object.is,
    );
    let label = item.label;
    const shown = types[active];
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
            {/* An element, since Fondue's `Dropdown.Item` wraps text beside another child in an unkeyed span. */}
            {option.brand === undefined ? (
                <span>{option.label}</span>
            ) : (
                <span style={option.brand.preview} data-rte-style-preview="">
                    {option.label}
                </span>
            )}
            {checked && <CheckedSlot />}
        </Dropdown.Item>
    );
    return (
        <Dropdown.Root>
            <Dropdown.Trigger asChild>
                <RadixToolbar.Button
                    asChild
                    {...tabStop(outOfTabOrder)}
                    className={`${styles.item} ${styles.picker}`}
                    disabled={disabled}
                    data-rte-toolbar-item=""
                    data-group-start={item.groupStart || undefined}
                    onMouseDown={onMouseDown}
                >
                    <Button size="small" emphasis="weak">
                        {label}
                    </Button>
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
                {types.filter(({ offered }) => offered).map((option) => row(option, option === shown))}
                {brands.length > 0 && (
                    <Dropdown.Group heading={item.groupLabel ?? ''}>
                        {brands.map((option, index) => row(option, index === brandActive))}
                    </Dropdown.Group>
                )}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
