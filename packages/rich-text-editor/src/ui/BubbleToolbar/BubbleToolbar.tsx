/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject } from 'react';

import { passEscape } from '#/bridge/overlays/helpers/escape';
import { More, type ModeSwitch } from '#/ui/components/More';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';
import { ariaShortcut } from '#/ui/helpers/shortcuts';

import { BubbleToolbarItems } from './components/BubbleToolbarItems';
import { useBubbleToolbar } from './hooks/useBubbleToolbar';
import styles from './styles/bubbleToolbar.module.scss';

// The bubble toolbar stays out of the Tab order; Alt+F10 reaches it.
const OUT_OF_TAB_ORDER = -1;

/** In bubble mode, the commands with no bubble item and the switch back to the fixed toolbar. */
export type BubbleMore = {
    items: readonly ToolbarItem[];
    modeSwitch: ModeSwitch;
};

type BubbleToolbarProps = {
    items: readonly ToolbarItem[];
    more: BubbleMore | undefined;
    label: string;
    strings: ToolbarStrings;
    /** The package key binding that moves focus here. */
    shortcut: string;
    testId: string;
    /** The toolbar element while it shows, which Alt+F10 focuses. */
    toolbarRef: MutableRefObject<HTMLDivElement | null>;
    /** In bubble mode, opens the toolbar at any selection and focuses it, as Alt+F10 does when none shows. */
    showRef: MutableRefObject<(() => void) | null> | undefined;
};

/**
 * The bubble toolbar: Radix Toolbar in a Fondue `Flyout` above the selection, shown for a text selection while focus is
 * in the editor, out of the Tab order until Alt+F10. It closes on Escape and stays while the pointer is over it or
 * focus is in it, holding its place meanwhile.
 */
export const BubbleToolbar = ({
    items,
    more,
    label,
    strings,
    shortcut,
    testId,
    toolbarRef,
    showRef,
}: BubbleToolbarProps) => {
    const { apple, dir, open, overlay, setHovered, onOpenAutoFocus } = useBubbleToolbar(showRef, toolbarRef);

    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={overlay.anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                // Radix gives the content `role="dialog"`, which `Flyout` passes this name to.
                aria-label={label}
                container={overlay.container}
                side="top"
                align="center"
                padding="tight"
                // Flyout caps its width at 360px, narrower than the bubble's items; cap at the room on screen instead.
                maxWidth="var(--radix-popover-content-available-width)"
                onOpenAutoFocus={onOpenAutoFocus}
                onEscapeKeyDown={passEscape}
            >
                <RadixToolbar.Root
                    ref={toolbarRef}
                    className={styles.root}
                    // Radix writes `ltr` unless told, so the arrows follow the theme's visual order.
                    dir={dir}
                    aria-label={label}
                    aria-keyshortcuts={ariaShortcut(shortcut, apple)}
                    tabIndex={OUT_OF_TAB_ORDER}
                    data-rte-bubble-toolbar=""
                    data-test-id={`${testId}-bubble-toolbar`}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                >
                    <BubbleToolbarItems items={items} strings={strings} />
                    {more !== undefined && (
                        <More
                            items={more.items}
                            strings={strings}
                            disabled={false}
                            keepsFocus
                            outOfTabOrder
                            modeSwitch={more.modeSwitch}
                        />
                    )}
                </RadixToolbar.Root>
            </Flyout.Content>
        </Flyout.Root>
    );
};

BubbleToolbar.displayName = 'BubbleToolbar';
