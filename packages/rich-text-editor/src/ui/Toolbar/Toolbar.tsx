/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject } from 'react';

import { useApplePlatform } from '#/bridge/session/hooks/useApplePlatform';
import { More, type ModeSwitch } from '#/ui/components/More';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';
import { ariaShortcut } from '#/ui/helpers/shortcuts';
import styles from '#/ui/styles/toolbar.module.scss';

import { FixedToolbarItems } from './components/FixedToolbarItems';
import { useDockedToolbar } from './hooks/useDockedToolbar';
import { useFitting } from './hooks/useFitting';

type FixedToolbarProps = {
    items: readonly ToolbarItem[];
    /** The rows that only More holds, below the items that do not fit. */
    menu: readonly ToolbarItem[];
    strings: ToolbarStrings;
    /** The editor is `disabled`: every item is disabled and the toolbar leaves the Tab order. */
    disabled: boolean;
    surfaceId: string;
    /** The package key binding that moves focus here. */
    shortcut: string;
    testId: string;
    /** The toolbar element, which Alt+F10 focuses. */
    toolbarRef: MutableRefObject<HTMLDivElement | null>;
    /** The More row that switches to the bubble toolbar. */
    modeSwitch: ModeSwitch;
    /** The bottom inset of the on-screen keyboard while the toolbar docks above it, else `undefined`. */
    docked: number | undefined;
};

/**
 * The fixed toolbar on Radix Toolbar: one Tab stop whose items arrow, Home and End move between, in visual order under
 * `rtl`.
 */
export const FixedToolbar = ({
    items,
    menu,
    strings,
    disabled,
    surfaceId,
    shortcut,
    testId,
    toolbarRef,
    modeSwitch,
    docked,
}: FixedToolbarProps) => {
    const { dir } = useFondueTheme();
    const apple = useApplePlatform();
    const itemsKey = items.map(({ key }) => key).join(' ');
    const shown = useFitting(toolbarRef, items.length, itemsKey);
    // On the docked toolbar a press leaves focus in the surface.
    const keepsFocus = docked !== undefined;
    useDockedToolbar(toolbarRef, docked);
    let className = styles.root;
    if (keepsFocus) {
        className = `${styles.root} ${styles.docked}`;
    }

    return (
        <RadixToolbar.Root
            ref={toolbarRef}
            className={className}
            dir={dir}
            aria-label={strings.label}
            aria-controls={surfaceId}
            aria-keyshortcuts={ariaShortcut(shortcut, apple)}
            data-test-id={`${testId}-toolbar`}
        >
            <FixedToolbarItems
                items={items.slice(0, shown)}
                disabled={disabled}
                strings={strings}
                keepsFocus={keepsFocus}
            />
            <More
                items={[...items.slice(shown), ...menu]}
                strings={strings}
                disabled={disabled}
                keepsFocus={keepsFocus}
                outOfTabOrder={false}
                modeSwitch={modeSwitch}
            />
        </RadixToolbar.Root>
    );
};

FixedToolbar.displayName = 'FixedToolbar';
