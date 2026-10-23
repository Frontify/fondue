/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext, useContext } from 'react';

/** The one open panel; `close` clears it. */
export interface PanelController {
    readonly id: string | undefined;
    /** Counts the `open` calls for the panel that is already open, which that panel hears to move focus. */
    readonly requested: number;
    close(): void;
}

export const PanelContext = createContext<PanelController | null>(null);
PanelContext.displayName = 'RichTextEditorPanelContext';

/** The open panel id, or none when the part is outside the editor or no panel is open. */
export const useOpenPanel = (): string | undefined => useContext(PanelContext)?.id;

/** The panel slot's controller, or `null` outside the editor. */
export const usePanelController = (): PanelController | null => useContext(PanelContext);
