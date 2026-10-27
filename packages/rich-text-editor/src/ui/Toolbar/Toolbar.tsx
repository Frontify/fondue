/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFondueTheme } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject } from 'react';

import { ChromeBoundary } from '#/bridge/nodeViews/components/ChromeBoundary';
import { NO_ATTRS } from '#/bridge/nodeViews/helpers/noAttrs';
import { useApplePlatform } from '#/bridge/session/hooks/useApplePlatform';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { Item } from '#/ui/components/Item';
import { More, type ModeSwitch } from '#/ui/components/More';
import { TextStyle } from '#/ui/components/TextStyle';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';
import { ariaShortcut } from '#/ui/helpers/shortcuts';
import styles from '#/ui/styles/toolbar.module.scss';

import { useFitting } from './hooks/useFitting';

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
}: {
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
}) => {
    const { dir } = useFondueTheme();
    const apple = useApplePlatform();
    const itemsKey = items.map(({ key }) => key).join(' ');
    const shown = useFitting(toolbarRef, items.length, itemsKey);
    // On the docked toolbar a press leaves focus in the surface.
    const keepsFocus = docked !== undefined;
    let className = styles.root;
    if (keepsFocus) {
        className = `${styles.root} ${styles.docked}`;
    }

    // A transformed ancestor, as a host dialog's, moves the origin of fixed positioning, so it is measured first, as
    // Fondue's `Dropdown` places its virtual trigger.
    useClientLayoutEffect(() => {
        const element = toolbarRef.current;
        const view = element?.ownerDocument.defaultView;
        if (element === null || view === null || view === undefined || docked === undefined) {
            return undefined;
        }

        element.style.insetBlockStart = '0px';
        const { top, height } = element.getBoundingClientRect();
        element.style.insetBlockStart = `${view.innerHeight - docked - height - top}px`;

        return () => {
            element.style.insetBlockStart = '';
        };
    }, [toolbarRef, docked]);

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
            {items.slice(0, shown).map((item) => {
                let content = (
                    <Item
                        item={item}
                        disabled={disabled}
                        strings={strings}
                        keepsFocus={keepsFocus}
                        outOfTabOrder={false}
                    />
                );
                if (item.options !== undefined) {
                    content = (
                        <TextStyle item={item} disabled={disabled} keepsFocus={keepsFocus} outOfTabOrder={false} />
                    );
                }

                // An item that throws leaves only its own place empty, with no message to read between the items.
                return (
                    <ChromeBoundary key={item.key} message="" attrs={NO_ATTRS}>
                        {content}
                    </ChromeBoundary>
                );
            })}
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
