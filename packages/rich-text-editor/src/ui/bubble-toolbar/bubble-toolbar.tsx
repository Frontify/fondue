/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Flyout } from '@frontify/fondue-components';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { type MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useClientLayoutEffect } from '#/bridge/client-layout-effect';
import { useEditorSelection, useSessionValue } from '#/bridge/hooks';
import { passEscape, useEditorOverlay, useScopedFocus } from '#/bridge/overlays';
import { type EditorRuntime } from '#/runtime/runtime';
import { type SelectionSummary } from '#/runtime/types';
import { ariaShortcut, useApplePlatform } from '#/ui/shortcuts';
import { Item, More, type ModeSwitch, type ToolbarItem, type ToolbarStrings } from '#/ui/toolbar/toolbar';

import styles from './styles/bubble-toolbar.module.scss';

// The bubble toolbar stays out of the Tab order; Alt+F10 reaches it (SPEC-rich-text-react/AC-042).
const OUT_OF_TAB_ORDER = -1;

/** The selection, which ProseMirror replaces with a new object for each change that sets or maps it. */
const selectionOf = (runtime: EditorRuntime | undefined) => {
    if (runtime === undefined) {
        return undefined;
    }
    return runtime.state.selection;
};
/** The selection the toolbar was closed or opened at, which a new selection replaces. */
type SelectionKey = ReturnType<typeof selectionOf> | null;

/** In bubble mode, the commands with no bubble item and the switch back to the fixed toolbar (SPEC-rich-text-react/AC-095). */
export interface BubbleMore {
    readonly items: readonly ToolbarItem[];
    readonly modeSwitch: ModeSwitch;
}

const holdsText = ({ kind, collapsed }: SelectionSummary) => (kind === 'text' || kind === 'all') && !collapsed;

/**
 * The bubble toolbar: Radix Toolbar in a Fondue `Flyout` above the selection, shown for a text selection while focus is
 * in the editor, out of focus until Alt+F10 (SPEC-rich-text-react/AC-042, AC-088). It closes on Escape and stays while
 * the pointer is over it or focus is in it, holding its place meanwhile (SPEC-rich-text-accessibility/AC-014, AC-041).
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
    /** The package key binding that moves focus here (SPEC-rich-text-react/AC-079). */
    readonly shortcut: string;
    readonly testId: string;
    /** The toolbar element while it shows, which Alt+F10 focuses (SPEC-rich-text-react/AC-069). */
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
    /** In bubble mode, opens the toolbar at any selection and focuses it, as Alt+F10 does when none shows. */
    readonly showRef: MutableRefObject<(() => void) | null> | undefined;
}) => {
    const apple = useApplePlatform();
    const key = useSessionValue(selectionOf, Object.is);
    const selected = useEditorSelection(holdsText);
    const focus = useScopedFocus();
    const [closedAt, setClosedAt] = useState<SelectionKey>(null);
    const [shownAt, setShownAt] = useState<SelectionKey>(null);
    const [hovered, setHovered] = useState(false);
    const keyRef = useRef(key);
    const focusOnOpenRef = useRef(false);
    useClientLayoutEffect(() => {
        keyRef.current = key;
    });
    const setOpen = useCallback((next: boolean) => {
        if (next) {
            return;
        }
        // A toolbar that closes under the pointer hears no pointer leave.
        setHovered(false);
        setShownAt(null);
        setClosedAt(keyRef.current);
    }, []);
    const held = hovered || (focus !== null && focus.closest('[data-rte-bubble-toolbar]') !== null);
    const shown = focus !== null && (selected || shownAt === key);
    const open = (shown || held) && closedAt !== key;
    const overlay = useEditorOverlay(open, setOpen);
    const { anchor } = overlay;
    useEffect(() => anchor.hold(held), [anchor, held]);
    useClientLayoutEffect(() => {
        if (showRef === undefined) {
            return undefined;
        }
        showRef.current = () => {
            focusOnOpenRef.current = true;
            setClosedAt(null);
            setShownAt(keyRef.current);
        };
        return () => {
            showRef.current = null;
        };
    }, [showRef]);
    return (
        <Flyout.Root open={open} onOpenChange={overlay.onOpenChange} virtualAnchor={anchor}>
            <Flyout.Content
                ref={overlay.contentRef}
                // Radix gives the content `role="dialog"`, which `Flyout` passes this name to (SPEC-rich-text-accessibility/AC-021).
                aria-label={label}
                container={overlay.container}
                side="top"
                align="center"
                padding="tight"
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
                    aria-label={label}
                    aria-keyshortcuts={ariaShortcut(shortcut, apple)}
                    tabIndex={OUT_OF_TAB_ORDER}
                    data-rte-bubble-toolbar=""
                    data-test-id={`${testId}-bubble-toolbar`}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                >
                    {items.map((item) => (
                        <Item key={item.key} item={item} disabled={false} strings={strings} keepsFocus outOfTabOrder />
                    ))}
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
