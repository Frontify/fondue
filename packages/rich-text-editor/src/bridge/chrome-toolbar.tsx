/* (c) Copyright Frontify Ltd., all rights reserved. */

import * as Toolbar from '@radix-ui/react-toolbar';
import { type ReactNode } from 'react';

// Node chrome sits inside the surface, so its controls take no Tab stop of their own; Alt+F10 reaches them (SPEC-rich-text-react/AC-068).
const OUT_OF_TAB_ORDER = -1;

/** The node chrome toolbar: one Alt+F10 stop with arrow-key movement between its buttons (SPEC-rich-text-react, Overlay focus). */
export const NodeChromeToolbar = ({
    'aria-label': label,
    children,
}: {
    readonly 'aria-label': string;
    readonly children: ReactNode;
}) => (
    <Toolbar.Root aria-label={label} tabIndex={OUT_OF_TAB_ORDER} data-rte-node-chrome="">
        {children}
    </Toolbar.Root>
);
NodeChromeToolbar.displayName = 'NodeChromeToolbar';

export const NodeChromeButton = ({
    label,
    icon,
    pressed,
    disabled,
    onClick,
}: {
    readonly label: string;
    readonly icon?: ReactNode;
    readonly pressed?: boolean;
    readonly disabled?: boolean;
    readonly onClick: () => void;
}) => (
    <Toolbar.Button
        type="button"
        aria-label={label}
        aria-pressed={pressed}
        disabled={disabled}
        tabIndex={OUT_OF_TAB_ORDER}
        onClick={onClick}
    >
        {icon ?? label}
    </Toolbar.Button>
);
NodeChromeButton.displayName = 'NodeChromeButton';
