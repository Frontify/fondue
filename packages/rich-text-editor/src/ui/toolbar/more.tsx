/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dropdown, Tooltip } from '@frontify/fondue-components';
import { IconDotsHorizontal } from '@frontify/fondue-icons';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type AriaAttributes, type AriaRole, type RefObject, useContext, useId, useRef, useState } from 'react';

import { CheckedSlot, keepFocus } from '#/bridge/chrome-toolbar';
import { useCommandQuery } from '#/bridge/hooks';
import { useOverlayContainer } from '#/bridge/overlays';
import { ChromeBoundary, NO_ATTRS } from '#/bridge/portal-host';
import { SessionContext, useSessionValue } from '#/bridge/session';
import { useOpenPanel } from '#/ui/panels/context';

import {
    Icon,
    returnFocus,
    runItem,
    tabStop,
    type ToolbarItem,
    type ToolbarStrings,
    useOfferedRows,
    useShortcut,
} from './item';
import styles from './styles/toolbar.module.scss';
import { blockTypeOf } from './text-style';

export const MoreRow = ({
    item,
    strings,
    onRun,
}: {
    readonly item: ToolbarItem;
    readonly strings: ToolbarStrings;
    readonly onRun: (item: ToolbarItem) => Promise<void>;
}) => {
    const state = useCommandQuery(item.command, item.payload);
    const openPanel = useOpenPanel();
    const { shortcut, keyshortcuts } = useShortcut(item);
    const reasonId = useId();
    // Fondue's `Dropdown.Item` types no menu item role or state, which Radix still takes through the spread.
    let semantics: { role: AriaRole } & Pick<AriaAttributes, 'aria-checked' | 'aria-disabled'>;
    // A brand style row is one of the block's styles, as in the text style picker.
    const radio = item.brand !== undefined;
    let shown = state.active;
    if (item.toggle && item.control !== undefined && item.control === openPanel) {
        shown = true;
    }
    const checked = radio ? shown === true : shown !== false;
    if (radio) {
        semantics = { role: 'menuitemradio', 'aria-checked': checked };
    } else if (item.toggle) {
        semantics = { role: 'menuitemcheckbox', 'aria-checked': shown };
    } else {
        semantics = { role: 'menuitem' };
    }
    // An unavailable row stays focusable with its reason, as a toolbar item does; a checked style is already set.
    let reason: string | undefined;
    let describedBy: string | undefined;
    if (!state.enabled && !(radio && checked)) {
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
            <span>{item.label}</span>
            {item.toggle && checked && <CheckedSlot />}
            {shortcut !== undefined && <Dropdown.Shortcut>{shortcut}</Dropdown.Shortcut>}
            {reason !== undefined && (
                <span id={reasonId} aria-hidden className={styles.reason}>
                    {reason}
                </span>
            )}
        </Dropdown.Item>
    );
};

/**
 * How a menu of More rows runs them: a row runs its command and sends focus to the surface; a row that opens a control
 * runs once the menu has closed, after `focusOpener` focused what the control then returns focus to.
 */
export const useRowRuns = (content: RefObject<HTMLDivElement | null>, focusOpener: () => void) => {
    const runtime = useContext(SessionContext);
    // A row that ran its command sends focus to the surface rather than back to the opener.
    const ranRef = useRef(false);
    const pendingRef = useRef<ToolbarItem | undefined>(undefined);
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
        returnFocus(runtime, [content.current]);
    };
    const onCloseAutoFocus = (event: Event) => {
        const pending = pendingRef.current;
        if (pending !== undefined) {
            event.preventDefault();
            pendingRef.current = undefined;
            focusOpener();
            runtime?.handle.execute(pending.command, pending.payload);
            return;
        }
        if (ranRef.current) {
            event.preventDefault();
            ranRef.current = false;
        }
    };
    /** Marks a row that ran outside `onRun`, as the toolbar mode switch does. */
    const ran = () => {
        ranRef.current = true;
    };
    return { onRun, onCloseAutoFocus, ran };
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
    const blockType = useSessionValue(blockTypeOf, Object.is);
    const offered = useOfferedRows(items);
    const contentRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    // Radix opens a menu on pointer down; More opens on the click, so a press dragged away opens nothing.
    const [open, setOpen] = useState(false);
    // Radix can drop the tooltip's close in the frame a hover opened it, which would leave the tooltip over the menu.
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const setMenu = (next: boolean) => {
        setOpen(next);
        setTooltipOpen(false);
    };
    // Focus is on More when a row's control opens, so the control returns it there.
    const rows = useRowRuns(contentRef, () => triggerRef.current?.focus());
    const pointerRef = useRef(false);
    const openAtPressRef = useRef(false);
    return (
        <Dropdown.Root
            open={open}
            onOpenChange={(next) => {
                if (!next || !pointerRef.current) {
                    setMenu(next);
                }
            }}
        >
            <Tooltip.Root open={tooltipOpen && !open} onOpenChange={setTooltipOpen}>
                <Tooltip.Trigger asChild>
                    <Dropdown.Trigger asChild>
                        <RadixToolbar.Button
                            asChild
                            {...tabStop(outOfTabOrder)}
                            ref={triggerRef}
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
                                    setMenu(true);
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
                                    setMenu(true);
                                }
                                pointerRef.current = false;
                                openAtPressRef.current = false;
                            }}
                        >
                            <Button size="small" aspect="square" emphasis="weak">
                                <IconDotsHorizontal size={20} aria-hidden />
                            </Button>
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
                    rows.onCloseAutoFocus(event);
                    if (event.defaultPrevented) {
                        return;
                    }
                    // Radix returns focus to More in a timeout, after which focus that already moved on stays there.
                    if (focusMoved(triggerRef.current)) {
                        event.preventDefault();
                    }
                }}
            >
                {/* The text style picker that does not fit offers its rows here. */}
                {offered
                    .flatMap((item) => {
                        if (item.options === undefined) {
                            return [item];
                        }
                        // A brand style row applies only to the block types its style names.
                        return item.options.filter(
                            ({ offered, brand }) =>
                                offered && (brand === undefined || brand.appliesTo.includes(blockType)),
                        );
                    })
                    .map((item) => (
                        // A row that throws leaves only its own place empty.
                        <ChromeBoundary key={item.key} message="" attrs={NO_ATTRS}>
                            <MoreRow item={item} strings={strings} onRun={rows.onRun} />
                        </ChromeBoundary>
                    ))}
                <Dropdown.Item
                    onSelect={() => {
                        // The toolbar that held More unmounts, so focus goes to the surface.
                        rows.ran();
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
