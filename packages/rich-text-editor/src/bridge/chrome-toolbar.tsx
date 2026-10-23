/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown, Tooltip, useFondueTheme } from '@frontify/fondue-components';
import { IconCheckMark } from '@frontify/fondue-icons';
import * as Toolbar from '@radix-ui/react-toolbar';
import { type ReactNode } from 'react';

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

/**
 * A button of `NodeChromeToolbar`; `label` is its accessible name, and its content when it has no `icon`, else its
 * tooltip.
 */
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
}) => {
    const container = useOverlayContainer();
    const button = (
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
    if (icon === undefined) {
        return button;
    }
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
            <Tooltip.Content padding="compact" container={container}>
                {label}
            </Tooltip.Content>
        </Tooltip.Root>
    );
};
NodeChromeButton.displayName = 'NodeChromeButton';

/** The check mark of a checked menu row, so its state shows by more than colour. */
export const CheckedSlot = () => (
    <Dropdown.Slot name="right">
        <IconCheckMark size={16} aria-hidden />
    </Dropdown.Slot>
);

/**
 * A press that keeps focus and the on-screen keyboard in the surface. It
 * prevents the `mousedown` that moves focus, since WebKit drops the click of a touch whose `pointerdown` was prevented.
 */
export const keepFocus = (event: { preventDefault(): void }): void => event.preventDefault();
