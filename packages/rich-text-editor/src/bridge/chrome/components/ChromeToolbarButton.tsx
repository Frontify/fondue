/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button as FondueButton, Tooltip } from '@frontify/fondue-components';
import * as Toolbar from '@radix-ui/react-toolbar';
import { type ReactNode } from 'react';

import { useOverlayContainer } from '../../overlays/hooks/useOverlayContainer';
import { keepFocus, OUT_OF_TAB_ORDER } from '../helpers/keepFocus';
import styles from '../styles/chromeToolbar.module.scss';

export type ChromeToolbarButtonProps = {
    /** The accessible name and the tooltip. */
    label: string;
    icon: ReactNode;
    /** The `id` of the text that describes the button. */
    describedBy?: string;
    onPress: (control: HTMLElement) => void;
};

/** The Fondue-button item for chrome toolbars with few buttons; `NodeChromeButton` stays plain for node chrome's mount cost. */
export const ChromeToolbarButton = ({ label, icon, describedBy, onPress }: ChromeToolbarButtonProps) => {
    const container = useOverlayContainer();

    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Toolbar.Button
                    asChild
                    tabIndex={OUT_OF_TAB_ORDER}
                    className={styles.fondueButton}
                    aria-label={label}
                    aria-describedby={describedBy}
                    onMouseDown={keepFocus}
                    onClick={(event) => {
                        onPress(event.currentTarget);
                    }}
                >
                    <FondueButton size="small" aspect="square" emphasis="weak">
                        {icon}
                    </FondueButton>
                </Toolbar.Button>
            </Tooltip.Trigger>
            <Tooltip.Content padding="compact" container={container}>
                {label}
            </Tooltip.Content>
        </Tooltip.Root>
    );
};

ChromeToolbarButton.displayName = 'ChromeToolbarButton';
