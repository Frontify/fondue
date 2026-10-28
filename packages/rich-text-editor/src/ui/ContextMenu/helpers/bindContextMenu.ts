/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Dispatch, type SetStateAction } from 'react';

import { type OverlayAnchor } from '#/bridge/pluginApi/plugin';
import { atomPositionAt, type EditorPort, selectedNodePosition } from '#/runtime/port';
import { offeredRows, type ToolbarItem } from '#/ui/helpers/items';
import { pressesBinding } from '#/ui/helpers/shortcuts';

type OpenedAt = { at: OverlayAnchor | undefined };

type ContextMenuBinding = {
    runtime: EditorPort;
    surface: HTMLElement;
    items: readonly ToolbarItem[];
    open: boolean;
    setOpened: Dispatch<SetStateAction<OpenedAt | undefined>>;
};

/** Listens for the context menu and Shift+F10 on the surface; returns the removal. */
export const bindContextMenu = ({ runtime, surface, items, open, setOpened }: ContextMenuBinding): (() => void) => {
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
};
