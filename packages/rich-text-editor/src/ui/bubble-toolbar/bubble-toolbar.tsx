/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout, useFondueTheme } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { selectionRect } from '#/bridge/anchor';
import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { useEditorSelection } from '#/bridge/hooks';
import { passEscape, useHeldOverlay, useScopedFocus } from '#/bridge/overlays';
import { useApplePlatform } from '#/bridge/platform';
import { SessionContext, useSessionValue } from '#/bridge/session';
import { type EditorRuntime } from '#/runtime/runtime';
import { type SelectionSummary } from '#/runtime/types';
import { ariaShortcut } from '#/ui/shortcuts';
import { TextStyle } from '#/ui/toolbar/text-style';
import { Item, More, type ModeSwitch, type ToolbarItem, type ToolbarStrings } from '#/ui/toolbar/toolbar';

import styles from './styles/bubble-toolbar.module.scss';

// The bubble toolbar stays out of the Tab order; Alt+F10 reaches it.
const OUT_OF_TAB_ORDER = -1;

/** Where the selection is, so a command that only maps it, as Mod+B does, leaves the toolbar as it was. */
const selectionOf = (runtime: EditorRuntime | undefined): string => {
    if (runtime === undefined) {
        return '';
    }
    const { anchor, head } = runtime.state.selection;
    return `${anchor} ${head}`;
};

// A closed or requested range keys the value too: the store compares to its last notification, not the rendered value.
const renderKeyOf = (runtime: EditorRuntime | undefined, closedAt: string | null, shownAt: string | null): string => {
    if (runtime === undefined || runtime.view === undefined) {
        return 'none';
    }
    const key = selectionOf(runtime);
    let rect = 'none';
    if (!runtime.state.selection.empty || shownAt === key) {
        const { left, top, width, height } = selectionRect(runtime.view);
        rect = `${left} ${top} ${width} ${height}`;
    }
    if (closedAt !== null || shownAt !== null) {
        return `${rect} ${key}`;
    }
    return rect;
};

/** In bubble mode, the commands with no bubble item and the switch back to the fixed toolbar. */
export interface BubbleMore {
    readonly items: readonly ToolbarItem[];
    readonly modeSwitch: ModeSwitch;
}

const holdsText = ({ kind, collapsed }: SelectionSummary) => (kind === 'text' || kind === 'all') && !collapsed;

/**
 * The bubble toolbar: Radix Toolbar in a Fondue `Flyout` above the selection, shown for a text selection while focus is
 * in the editor, out of focus until Alt+F10. It closes on Escape and stays while
 * the pointer is over it or focus is in it, holding its place meanwhile.
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
}: {
    readonly items: readonly ToolbarItem[];
    readonly more: BubbleMore | undefined;
    readonly label: string;
    readonly strings: ToolbarStrings;
    /** The package key binding that moves focus here. */
    readonly shortcut: string;
    readonly testId: string;
    /** The toolbar element while it shows, which Alt+F10 focuses. */
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
    /** In bubble mode, opens the toolbar at any selection and focuses it, as Alt+F10 does when none shows. */
    readonly showRef: MutableRefObject<(() => void) | null> | undefined;
}) => {
    const apple = useApplePlatform();
    const { dir } = useFondueTheme();
    const runtime = useContext(SessionContext);
    const key = selectionOf(runtime);
    const selected = useEditorSelection(holdsText);
    const focus = useScopedFocus();
    const [closedAt, setClosedAt] = useState<string | null>(null);
    const [shownAt, setShownAt] = useState<string | null>(null);
    useSessionValue((current) => renderKeyOf(current, closedAt, shownAt), Object.is);
    // A move away ends both, so a later return to the same range shows the toolbar for its text again.
    if (closedAt !== null && closedAt !== key) {
        setClosedAt(null);
    }
    if (shownAt !== null && shownAt !== key) {
        setShownAt(null);
    }
    const [hovered, setHovered] = useState(false);
    const runtimeRef = useRef(runtime);
    const focusOnOpenRef = useRef(false);
    useClientLayoutEffect(() => {
        runtimeRef.current = runtime;
    });
    const setOpen = useCallback((next: boolean) => {
        if (next) {
            return;
        }
        // A toolbar that closes under the pointer hears no pointer leave.
        setHovered(false);
        setShownAt(null);
        setClosedAt(selectionOf(runtimeRef.current));
    }, []);
    const held = hovered || (focus !== null && focus.closest('[data-rte-bubble-toolbar]') !== null);
    const shown = focus !== null && (selected || shownAt === key);
    const open = (shown || held) && closedAt !== key;
    const overlay = useHeldOverlay(open, setOpen);
    const { anchor } = overlay;
    useEffect(() => anchor.hold(held), [anchor, held]);
    useClientLayoutEffect(() => {
        if (showRef === undefined) {
            return undefined;
        }
        showRef.current = () => {
            focusOnOpenRef.current = true;
            setClosedAt(null);
            setShownAt(selectionOf(runtimeRef.current));
        };
        return () => {
            showRef.current = null;
        };
    }, [showRef]);
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={anchor}>
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
                onOpenAutoFocus={(event) => {
                    event.preventDefault();
                    if (!focusOnOpenRef.current) {
                        return;
                    }
                    focusOnOpenRef.current = false;
                    const first = toolbarRef.current?.querySelector<HTMLElement>('button:not([disabled])');
                    if (first !== null && first !== undefined) {
                        first.focus();
                    }
                }}
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
                    {items.map((item) => {
                        if (item.options !== undefined) {
                            return <TextStyle key={item.key} item={item} disabled={false} keepsFocus outOfTabOrder />;
                        }
                        return (
                            <Item
                                key={item.key}
                                item={item}
                                disabled={false}
                                strings={strings}
                                keepsFocus
                                outOfTabOrder
                            />
                        );
                    })}
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
