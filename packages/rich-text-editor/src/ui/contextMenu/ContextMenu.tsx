/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dropdown } from '@frontify/fondue-components';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { OptionItem } from '#/bridge/chromeToolbar';
import { useEditorOverlay } from '#/bridge/overlays';
import { type OverlayAnchor } from '#/bridge/plugin';
import { SessionContext } from '#/bridge/session';
import { TurnIntoContext, turnIntoChoices, type TurnIntoEntry } from '#/bridge/turnInto';
import { atomPositionAt, selectedNodePosition, surfaceElement } from '#/runtime/port';
import { pressesBinding } from '#/ui/shortcuts';
import { offeredRows, type ToolbarItem, type ToolbarStrings, useOfferedRows } from '#/ui/toolbar/item';
import { MoreRow, useRowRuns } from '#/ui/toolbar/More';

const preventDefault = (event: Event) => event.preventDefault();

const rowOf = ({ key, command, payload, label }: TurnIntoEntry): ToolbarItem => ({
    key,
    command,
    payload,
    toggle: false,
    label,
    icon: '',
    bindings: [],
    groupStart: false,
    bubble: false,
});

// Fondue's group heading is a labelled span that axe rejects inside a menu, so the group takes the name instead.
const labelGroup = (label: string) => (group: HTMLDivElement | null) => {
    group?.setAttribute('aria-label', label);
    group?.querySelector('span[aria-label]')?.setAttribute('aria-hidden', 'true');
};

/** The Turn into group: the conversions the selected node takes, none for a node that takes no other type. */
const TurnInto = ({ label, runs }: { readonly label: string; readonly runs: ReturnType<typeof useRowRuns> }) => {
    const runtime = useContext(SessionContext);
    const entries = useContext(TurnIntoContext);
    if (runtime === undefined) {
        return null;
    }
    const choices = turnIntoChoices(entries, (command, payload) => runtime.handle.query(command, payload));
    if (choices.every(({ current }) => current)) {
        return null;
    }
    return (
        // Fondue's sub-content takes no `container`, so a group keeps the items inside the editor's overlay root.
        <Dropdown.Group heading={label} ref={labelGroup(label)}>
            {choices.map(({ entry, current }) => (
                <OptionItem
                    key={entry.key}
                    checked={current}
                    onSelect={async () => {
                        // The current type changes nothing, as a toggle command would turn it off.
                        if (current) {
                            runs.ran();
                            runtime.handle.focus();
                            return;
                        }
                        await runs.onRun(rowOf(entry));
                    }}
                >
                    {entry.label}
                </OptionItem>
            ))}
        </Dropdown.Group>
    );
};

/**
 * The package context menu: a Fondue `Dropdown` for a node selection or a right click inside an atom node view, at the
 * pointer, or at the selected node when Shift+F10 or the context-menu key opens it. Its rows are the More rows below
 * the toolbar items. Anywhere else the browser's own menu opens.
 */
export const ContextMenu = ({
    items,
    label,
    turnIntoLabel,
    strings,
    disabled,
}: {
    readonly items: readonly ToolbarItem[];
    readonly label: string;
    readonly turnIntoLabel: string;
    readonly strings: ToolbarStrings;
    readonly disabled: boolean;
}) => {
    const runtime = useContext(SessionContext);
    const rows = useOfferedRows(items);
    // The pointer the menu opened at, or `undefined` for the selected node.
    const [opened, setOpened] = useState<{ readonly at: OverlayAnchor | undefined } | undefined>(undefined);
    const open = opened !== undefined;
    // Every close request, a press in the editor included, as the browser's menu closes on one.
    const setOpen = useCallback((next: boolean) => {
        if (!next) {
            setOpened(undefined);
        }
    }, []);
    const overlay = useEditorOverlay(open, setOpen);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const { contentRef: overlayRef } = overlay;
    const setContent = useCallback(
        (element: HTMLDivElement | null) => {
            // Chromium on Windows sends the contextmenu of a key on its keyup, to the row that took focus meanwhile.
            contentRef.current?.removeEventListener('contextmenu', preventDefault);
            contentRef.current = element;
            element?.addEventListener('contextmenu', preventDefault);
            overlayRef(element);
        },
        [overlayRef],
    );
    // A row's control opens from the surface, which it then returns focus to.
    const runs = useRowRuns(contentRef, () => runtime?.handle.focus());
    const surface = surfaceElement(runtime);
    useEffect(() => {
        if (runtime === undefined || surface === undefined || disabled) {
            return undefined;
        }
        const selectedNode = () => selectedNodePosition(runtime);
        // With no row to run, the browser's own menu is the better one.
        const runnable = () =>
            offeredRows(items, runtime).some(({ command, payload }) => runtime.handle.query(command, payload).enabled);
        const onContextMenu = (event: MouseEvent) => {
            if (open) {
                event.preventDefault();
                return;
            }
            // A node of an iframe's document is no `Node` of this window.
            const target = event.target as Node | null;
            let atom: number | undefined;
            if (target !== null) {
                atom = atomPositionAt(runtime, target);
            }
            if (atom === undefined && selectedNode() === undefined) {
                return;
            }
            // The rows act on the selection, so a right click on an atom selects it first, as a press on an image does.
            if (atom !== undefined && selectedNode() !== atom) {
                runtime.select({ node: atom });
            }
            if (!runnable()) {
                return;
            }
            event.preventDefault();
            const { clientX, clientY } = event;
            setOpened({ at: { getBoundingClientRect: () => new DOMRect(clientX, clientY, 0, 0) } });
        };
        const onKeyDown = (event: KeyboardEvent) => {
            const key = pressesBinding(event, 'Shift-F10') || pressesBinding(event, 'ContextMenu');
            if (!key || selectedNode() === undefined || !runnable()) {
                return;
            }
            event.preventDefault();
            setOpened({ at: undefined });
        };
        surface.addEventListener('contextmenu', onContextMenu);
        surface.addEventListener('keydown', onKeyDown);
        return () => {
            surface.removeEventListener('contextmenu', onContextMenu);
            surface.removeEventListener('keydown', onKeyDown);
        };
    }, [runtime, surface, disabled, open, items]);
    // Radix focuses the first item only for a menu a key opened, and the content for one a pointer opened.
    useEffect(() => {
        if (!open) {
            return undefined;
        }
        const frame = requestAnimationFrame(() => {
            const item = contentRef.current?.querySelector<HTMLElement>('[role^="menuitem"]');
            item?.focus();
        });
        return () => cancelAnimationFrame(frame);
    }, [open]);
    // A closed menu renders nothing, not even Fondue's virtual trigger, so the server and the surface's markup hold none.
    if (!open || rows.length === 0) {
        return null;
    }
    let anchor: OverlayAnchor = overlay.anchor;
    if (opened?.at !== undefined) {
        anchor = opened.at;
    }
    return (
        <Dropdown.Root open={open} onOpenChange={setOpen} virtualAnchor={anchor}>
            <Dropdown.Content
                ref={setContent}
                aria-label={label}
                container={overlay.container}
                onCloseAutoFocus={runs.onCloseAutoFocus}
            >
                {rows.map((item) => (
                    <MoreRow key={item.key} item={item} strings={strings} onRun={runs.onRun} />
                ))}
                <TurnInto label={turnIntoLabel} runs={runs} />
            </Dropdown.Content>
        </Dropdown.Root>
    );
};
