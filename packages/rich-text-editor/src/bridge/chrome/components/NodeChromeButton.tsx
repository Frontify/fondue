/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Tooltip } from '@frontify/fondue-components';
import * as Toolbar from '@radix-ui/react-toolbar';
import { type ReactNode } from 'react';

import { useOverlayContainer } from '../../overlays/hooks/useOverlayContainer';
import { OUT_OF_TAB_ORDER } from '../helpers/keepFocus';
import styles from '../styles/chromeToolbar.module.scss';

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
    /** The accessible name. */
    label: string;
    /** The content in place of `label`, which then shows as a tooltip. */
    icon?: ReactNode;
    /** Sets `aria-pressed`, for a toggle. */
    pressed?: boolean;
    disabled?: boolean;
    /** The `id` of the text that describes the button, such as a prompt shown beside the chrome. */
    describedBy?: string;
    /** Runs on a click, which does not move focus off the button's own target. */
    onClick: () => void;
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
