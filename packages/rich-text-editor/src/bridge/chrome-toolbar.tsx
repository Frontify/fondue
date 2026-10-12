/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, useFondueTheme } from '@frontify/fondue-components';
import * as Toolbar from '@radix-ui/react-toolbar';
import { type ReactNode, useCallback, useRef, useState } from 'react';

import { useOverlayContainer } from './overlays';
import styles from './styles/chrome-toolbar.module.scss';

// Node chrome sits inside the surface, so its controls take no Tab stop of their own; Alt+F10 reaches them.
const OUT_OF_TAB_ORDER = -1;

/** The node chrome toolbar: one Alt+F10 stop with arrow-key movement between its buttons. */
export const NodeChromeToolbar = ({
    'aria-label': label,
    children,
}: {
    readonly 'aria-label': string;
    readonly children: ReactNode;
}) => {
    // Radix writes `ltr` unless told, so the arrows follow the theme's visual order.
    const { dir } = useFondueTheme();
    return (
        <Toolbar.Root aria-label={label} dir={dir} tabIndex={OUT_OF_TAB_ORDER} data-rte-node-chrome="">
            {children}
        </Toolbar.Root>
    );
};
NodeChromeToolbar.displayName = 'NodeChromeToolbar';

export const NodeChromeButton = ({
    label,
    icon,
    pressed,
    disabled,
    describedBy,
    onClick,
}: {
    readonly label: string;
    readonly icon?: ReactNode;
    readonly pressed?: boolean;
    readonly disabled?: boolean;
    /** The `id` of the text that describes the button, such as a prompt shown beside the chrome. */
    readonly describedBy?: string;
    readonly onClick: () => void;
}) => (
    <Toolbar.Button
        type="button"
        className={styles.button}
        aria-label={label}
        aria-describedby={describedBy}
        aria-pressed={pressed}
        disabled={disabled}
        tabIndex={OUT_OF_TAB_ORDER}
        onClick={onClick}
    >
        {icon ?? label}
    </Toolbar.Button>
);
NodeChromeButton.displayName = 'NodeChromeButton';

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
    readonly label: string;
    readonly text: string;
    /** The command its items run, which the button names in `data-rte-command`, as a drag's alternative does. */
    readonly command?: string;
    /** Runs as the closed menu returns focus, which `event.preventDefault()` keeps where an item sent it. */
    readonly onCloseAutoFocus?: (event: Event) => void;
    readonly children: ReactNode;
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
