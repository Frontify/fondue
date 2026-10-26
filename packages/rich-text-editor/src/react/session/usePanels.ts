/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RefObject, useMemo, useRef, useState } from 'react';

import { type MountCoordinator } from '#/bridge/session/helpers/mount';
import { type PanelController } from '#/ui/panels/context';

/** At most one panel. A panel that toggles closes on its own command; any other panel command replaces the open one. */
export const usePanels = (rootRef: RefObject<HTMLElement | null>, coordinator: MountCoordinator) => {
    const [openPanel, setOpenPanel] = useState<string>();
    // The runs of the open panel's own command, which a panel that stays open hears.
    const [panelRequests, setPanelRequests] = useState(0);
    const openPanelRef = useRef<string>(undefined);
    const panelActionsRef = useRef({
        open: (id: string) => {
            if (openPanelRef.current === id) {
                setPanelRequests((count) => count + 1);

                return;
            }

            openPanelRef.current = id;
            setOpenPanel(id);
        },
        // Focus in the editor goes to the surface before the panel that may hold it unmounts; focus the author
        // moved elsewhere stays there.
        close: () => {
            const root = rootRef.current;
            if (openPanelRef.current !== undefined && root?.contains(root.ownerDocument.activeElement) === true) {
                coordinator.runtime?.handle.focus();
            }

            openPanelRef.current = undefined;
            setOpenPanel(undefined);
        },
        toggle: (id: string) => {
            if (openPanelRef.current === id) {
                panelActionsRef.current.close();

                return;
            }

            panelActionsRef.current.open(id);
        },
    });
    const panelState = useMemo<PanelController>(
        () => ({
            id: openPanel,
            requested: panelRequests,
            close: () => panelActionsRef.current.close(),
        }),
        [openPanel, panelRequests],
    );

    return { openPanelRef, panelActionsRef, panelState };
};
