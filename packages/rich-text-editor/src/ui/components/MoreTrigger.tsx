/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Dropdown, Tooltip } from '@frontify/fondue-components';
import { IconDotsHorizontal } from '@frontify/fondue-icons';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject, type RefObject, useRef } from 'react';

import { keepFocus } from '#/bridge/chrome/helpers/keepFocus';
import { tabStop, type ToolbarStrings } from '#/ui/helpers/items';
import styles from '#/ui/styles/toolbar.module.scss';

type MoreTriggerProps = {
    strings: ToolbarStrings;
    disabled: boolean;
    /** A press leaves focus in the surface, as on the docked toolbar. */
    keepsFocus: boolean;
    outOfTabOrder: boolean;
    container: HTMLElement | null;
    open: boolean;
    tooltipOpen: boolean;
    setTooltipOpen: (open: boolean) => void;
    setMenu: (next: boolean) => void;
    triggerRef: RefObject<HTMLButtonElement>;
    /** Set while a pointer press on More is in progress, so a press dragged away opens nothing. */
    pointerRef: MutableRefObject<boolean>;
};

/** The More button: it opens on click, and on a touch that ends over it, never on pointer down. */
export const MoreTrigger = ({
    strings,
    disabled,
    keepsFocus,
    outOfTabOrder,
    container,
    open,
    tooltipOpen,
    setTooltipOpen,
    setMenu,
    triggerRef,
    pointerRef,
}: MoreTriggerProps) => {
    const openAtPressRef = useRef(false);

    return (
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
    );
};

MoreTrigger.displayName = 'MoreTrigger';
