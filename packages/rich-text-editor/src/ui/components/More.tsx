/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dropdown, Tooltip } from '@frontify/fondue-components';
import { IconDotsHorizontal } from '@frontify/fondue-icons';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { useContext, useRef, useState } from 'react';

import { keepFocus } from '#/bridge/chrome/helpers/keepFocus';
import { useOverlayContainer } from '#/bridge/overlays/hooks/useOverlayContainer';
import { lazyPart } from '#/bridge/session/helpers/lazyPart';
import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { useSessionValue } from '#/bridge/session/hooks/useSessionValue';
import { blockTypeOf } from '#/ui/helpers/blockTypeOf';
import { tabStop, type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';
import { useOfferedRows } from '#/ui/hooks/useOfferedRows';
import { useRowRuns } from '#/ui/hooks/useRowRuns';
import styles from '#/ui/styles/toolbar.module.scss';

const MoreContent = lazyPart(() => import('./MoreContent').then((loaded) => loaded.MoreContent));

/** The last More row, which switches between the fixed and the bubble toolbar. */
export type ModeSwitch = {
    label: string;
    onSelect: () => void;
};

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
    items: readonly ToolbarItem[];
    strings: ToolbarStrings;
    disabled: boolean;
    /** A press leaves focus in the surface, as on the docked toolbar. */
    keepsFocus: boolean;
    outOfTabOrder: boolean;
    modeSwitch: ModeSwitch;
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
            <MoreContent
                contentRef={contentRef}
                container={container}
                items={offered}
                strings={strings}
                blockType={blockType}
                modeLabel={modeSwitch.label}
                onRun={rows.onRun}
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
                onModeSwitch={() => {
                    // The toolbar that held More unmounts, so focus goes to the surface.
                    rows.ran();
                    modeSwitch.onSelect();
                    runtime?.handle.focus();
                }}
            />
        </Dropdown.Root>
    );
};
