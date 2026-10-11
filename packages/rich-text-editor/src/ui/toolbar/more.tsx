/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, Tooltip } from '@frontify/fondue-components';
import { IconCheckMark, IconDotsHorizontal } from '@frontify/fondue-icons';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type AriaAttributes, type AriaRole, useContext, useId, useRef, useState } from 'react';

import { SessionContext, useCommandQuery } from '#/bridge/hooks';
import { useOverlayContainer } from '#/bridge/overlays';

import {
    Icon,
    keepFocus,
    returnFocus,
    runItem,
    tabStop,
    type ToolbarItem,
    type ToolbarStrings,
    useShortcut,
} from './item';
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
    // An unavailable row stays focusable with its reason, as a toolbar item does.
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
            {/* A check mark, not only a colour, shows a checked toggle. */}
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

/** The last More row, which switches between the fixed and the bubble toolbar. */
export interface ModeSwitch {
    readonly label: string;
    readonly onSelect: () => void;
}

/** Whether focus sits on an element, not on `body`, in the document or shadow root that holds `trigger`. */
const focusMoved = (trigger: HTMLElement | null) => {
    if (trigger === null) {
        return false;
    }
    const root = trigger.getRootNode() as Document | ShadowRoot;
    const { activeElement } = root;
    return activeElement !== null && activeElement !== trigger.ownerDocument.body;
};

/** The items that do not fit move into More, from the end, above the toolbar mode switch. */
export const More = ({
    items,
    strings,
    disabled,
    keepsFocus,
    outOfTabOrder,
    modeSwitch,
}: {
    readonly items: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    readonly disabled: boolean;
    /** A press leaves focus in the surface, as on the docked toolbar. */
    readonly keepsFocus: boolean;
    readonly outOfTabOrder: boolean;
    readonly modeSwitch: ModeSwitch;
}) => {
    const runtime = useContext(SessionContext);
    const container = useOverlayContainer();
    // A row that ran its command sends focus to the surface rather than back to More.
    const ranRef = useRef(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    // Radix opens a menu on pointer down; More opens on the click, so a press dragged away opens nothing.
    const [open, setOpen] = useState(false);
    // The row whose control opens once the menu has closed and returned focus to More, which the control then returns it to.
    const pendingRef = useRef<ToolbarItem | undefined>(undefined);
    const pointerRef = useRef(false);
    const openAtPressRef = useRef(false);
    const onRun = async (item: ToolbarItem) => {
        if (runtime === undefined) {
            return;
        }
        // A row that opens a control runs once the menu has closed, so the control does not open under the menu.
        if (item.opensControl === true) {
            pendingRef.current = item;
            return;
        }
        ranRef.current = true;
        await runItem(runtime, item, false);
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
                            {...tabStop(outOfTabOrder)}
                            ref={triggerRef}
                            type="button"
                            className={styles.item}
                            aria-label={strings.more}
                            disabled={disabled}
                            data-rte-toolbar-more=""
                            onPointerDown={() => {
                                pointerRef.current = true;
                                openAtPressRef.current = open;
                            }}
                            // WebKit sends no click for a touch whose `pointerdown` Radix prevented, so a touch released
                            // over More opens it here; one that slid off opens nothing.
                            onPointerUp={(event) => {
                                // Only a press that began on More opens it, never in a disabled editor.
                                const pressed = pointerRef.current;
                                pointerRef.current = false;
                                if (disabled || !pressed || event.pointerType === 'mouse' || openAtPressRef.current) {
                                    return;
                                }
                                const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
                                const { clientX, clientY } = event;
                                if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
                                    setOpen(true);
                                }
                            }}
                            onMouseDown={(event) => {
                                if (keepsFocus) {
                                    keepFocus(event);
                                }
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
                <Tooltip.Content padding="compact" container={container}>
                    <span data-rte-tooltip-label="">{strings.more}</span>
                </Tooltip.Content>
            </Tooltip.Root>
            <Dropdown.Content
                ref={contentRef}
                container={container}
                onCloseAutoFocus={(event) => {
                    const pending = pendingRef.current;
                    if (pending !== undefined) {
                        // Focus is on More when the control opens, so the control returns it there.
                        event.preventDefault();
                        pendingRef.current = undefined;
                        triggerRef.current?.focus();
                        runtime?.handle.execute(pending.command, pending.payload);
                        return;
                    }
                    if (ranRef.current) {
                        event.preventDefault();
                        ranRef.current = false;
                        return;
                    }
                    // Radix returns focus to More in a timeout, after which focus that already moved on stays there.
                    if (focusMoved(triggerRef.current)) {
                        event.preventDefault();
                    }
                }}
            >
                {/* The text style picker that does not fit offers its rows here. */}
                {items
                    .flatMap((item) => {
                        if (item.options === undefined) {
                            return [item];
                        }
                        return item.options.filter(({ offered }) => offered);
                    })
                    .map((item) => (
                        <MoreRow key={item.key} item={item} strings={strings} onRun={onRun} />
                    ))}
                <Dropdown.Item
                    onSelect={() => {
                        // The toolbar that held More unmounts, so focus goes to the surface.
                        ranRef.current = true;
                        modeSwitch.onSelect();
                        runtime?.handle.focus();
                    }}
                >
                    {modeSwitch.label}
                </Dropdown.Item>
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
