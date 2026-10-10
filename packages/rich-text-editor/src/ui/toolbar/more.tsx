/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, Tooltip } from '@frontify/fondue-components';
import { IconCheckMark, IconDotsHorizontal } from '@frontify/fondue-icons';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type AriaAttributes, type AriaRole, useContext, useId, useRef, useState } from 'react';

import { SessionContext, useCommandQuery } from '#/bridge/hooks';

import { Icon, returnFocus, runItem, type ToolbarItem, type ToolbarStrings, useShortcut } from './item';
import styles from './styles/toolbar.module.scss';

const MoreRow = ({
    item,
    strings,
    onRun,
}: {
    readonly item: ToolbarItem;
    readonly strings: ToolbarStrings;
    readonly onRun: (item: ToolbarItem) => Promise<void>;
}) => {
    const state = useCommandQuery(item.command, item.payload);
    const { shortcut, keyshortcuts } = useShortcut(item);
    const reasonId = useId();
    // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes through the spread.
    let semantics: { role: AriaRole } & Pick<AriaAttributes, 'aria-checked' | 'aria-disabled'>;
    if (item.toggle) {
        semantics = { role: 'menuitemcheckbox', 'aria-checked': state.active };
    } else {
        semantics = { role: 'menuitem' };
    }
    // An unavailable row stays focusable with its reason, as a toolbar item does (SPEC-rich-text-react/AC-038).
    let reason: string | undefined;
    let describedBy: string | undefined;
    if (!state.enabled) {
        reason = strings.reason(state.disabledReason ?? '');
        describedBy = reasonId;
        semantics['aria-disabled'] = true;
    }
    return (
        <Dropdown.Item
            {...semantics}
            aria-describedby={describedBy}
            aria-keyshortcuts={keyshortcuts}
            onSelect={async (event) => {
                if (reason !== undefined) {
                    event.preventDefault();
                    return;
                }
                await onRun(item);
            }}
        >
            <Dropdown.Slot name="left">
                <Icon name={item.icon} />
            </Dropdown.Slot>
            {item.label}
            {/* SPEC-rich-text-accessibility/AC-006: a check mark, not only a colour, shows a checked toggle. */}
            {item.toggle && state.active !== false && (
                <Dropdown.Slot name="right">
                    <IconCheckMark size={16} aria-hidden />
                </Dropdown.Slot>
            )}
            {shortcut !== undefined && <Dropdown.Shortcut>{shortcut}</Dropdown.Shortcut>}
            {reason !== undefined && (
                <span id={reasonId} aria-hidden className={styles.reason}>
                    {reason}
                </span>
            )}
        </Dropdown.Item>
    );
};

/** The items that do not fit move into More, from the end (SPEC-rich-text-react/AC-040). */
export const More = ({
    items,
    strings,
    disabled,
}: {
    readonly items: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    readonly disabled: boolean;
}) => {
    const runtime = useContext(SessionContext);
    // A row that ran its command sends focus to the surface rather than back to More (SPEC-rich-text-react, Overlay focus).
    const ranRef = useRef(false);
    const contentRef = useRef<HTMLDivElement>(null);
    // Radix opens a menu on pointer down; More opens on the click, so a press dragged away opens nothing (SPEC-rich-text-accessibility/AC-026).
    const [open, setOpen] = useState(false);
    const pointerRef = useRef(false);
    const openAtPressRef = useRef(false);
    const onRun = async (item: ToolbarItem) => {
        if (runtime === undefined) {
            return;
        }
        ranRef.current = true;
        await runItem(runtime, item);
        // The row sits in the menu's portal, outside the toolbar.
        returnFocus(runtime, [contentRef.current]);
    };
    return (
        <Dropdown.Root
            open={open}
            onOpenChange={(next) => {
                if (!next || !pointerRef.current) {
                    setOpen(next);
                }
            }}
        >
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <Dropdown.Trigger asChild>
                        <RadixToolbar.Button
                            type="button"
                            className={styles.item}
                            aria-label={strings.more}
                            disabled={disabled}
                            data-rte-toolbar-more=""
                            onPointerDown={() => {
                                pointerRef.current = true;
                                openAtPressRef.current = open;
                            }}
                            onKeyDown={() => {
                                pointerRef.current = false;
                            }}
                            // A click with no press before it, as browse mode, voice control and `click()` send, opens too.
                            onClick={() => {
                                if (!openAtPressRef.current) {
                                    setOpen(true);
                                }
                                pointerRef.current = false;
                                openAtPressRef.current = false;
                            }}
                        >
                            <IconDotsHorizontal size={20} aria-hidden />
                        </RadixToolbar.Button>
                    </Dropdown.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Content padding="compact">
                    <span data-rte-tooltip-label="">{strings.more}</span>
                </Tooltip.Content>
            </Tooltip.Root>
            <Dropdown.Content
                ref={contentRef}
                onCloseAutoFocus={(event) => {
                    if (ranRef.current) {
                        event.preventDefault();
                        ranRef.current = false;
                    }
                }}
            >
                {items.map((item) => (
                    <MoreRow key={item.key} item={item} strings={strings} onRun={onRun} />
                ))}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
