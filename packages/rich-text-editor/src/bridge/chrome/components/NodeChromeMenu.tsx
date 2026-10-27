/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import * as Toolbar from '@radix-ui/react-toolbar';
import { type ReactNode, useCallback, useRef, useState } from 'react';

import { useOverlayContainer } from '../../overlays/hooks/useOverlayContainer';
import { OUT_OF_TAB_ORDER } from '../helpers/keepFocus';
import styles from '../styles/chromeToolbar.module.scss';

/**
 * A node chrome button that opens a Fondue `Dropdown` of `children`, its items, with focus on the checked item, else
 * the first; Radix returns focus to the button when the menu closes. `label` is the button's accessible name and
 * holds its visible `text`.
 */
export const NodeChromeMenu = ({
    label,
    text,
    command,
    onCloseAutoFocus,
    children,
}: {
    /** The button's accessible name. */
    label: string;
    /** The button's visible text. */
    text: string;
    /** The command its items run, which the button names in `data-rte-command`, as a drag's alternative does. */
    command?: string;
    /** Runs as the closed menu returns focus, which `event.preventDefault()` keeps where an item sent it. */
    onCloseAutoFocus?: (event: Event) => void;
    /** The menu's items, such as `OptionItem`s. */
    children: ReactNode;
}) => {
    const container = useOverlayContainer();
    const [open, setOpen] = useState(false);
    // A touch toggles the menu on its release over the button, so a press that becomes a scroll changes nothing.
    const touchRef = useRef(false);
    const openAtPressRef = useRef(false);
    // Radix focuses the first item as the menu opens, so the checked one takes focus a frame later.
    const focusChecked = useCallback((content: HTMLDivElement | null) => {
        if (content === null) {
            return;
        }

        requestAnimationFrame(() =>
            content.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]')?.focus(),
        );
    }, []);

    return (
        <Dropdown.Root
            open={open}
            onOpenChange={(next) => {
                if (!touchRef.current) {
                    setOpen(next);
                }
            }}
        >
            <Dropdown.Trigger asChild>
                <Toolbar.Button
                    type="button"
                    className={styles.button}
                    aria-label={label}
                    tabIndex={OUT_OF_TAB_ORDER}
                    data-rte-command={command}
                    onPointerDown={(event) => {
                        touchRef.current = event.pointerType !== 'mouse';
                        openAtPressRef.current = open;
                    }}
                    onPointerCancel={() => {
                        touchRef.current = false;
                    }}
                    onPointerUp={(event) => {
                        const touched = touchRef.current;
                        touchRef.current = false;
                        if (!touched) {
                            return;
                        }

                        const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
                        const { clientX, clientY } = event;
                        if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
                            setOpen(!openAtPressRef.current);
                        }
                    }}
                >
                    {text}
                </Toolbar.Button>
            </Dropdown.Trigger>
            <Dropdown.Content
                ref={focusChecked}
                container={container}
                {...(onCloseAutoFocus === undefined ? {} : { onCloseAutoFocus })}
            >
                {children}
            </Dropdown.Content>
        </Dropdown.Root>
    );
};

NodeChromeMenu.displayName = 'NodeChromeMenu';
