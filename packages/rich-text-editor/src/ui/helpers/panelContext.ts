/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

/** The one open panel; `close` clears it. */
export type PanelController = {
    id: string | undefined;
    /** Counts the `open` calls for the panel that is already open, which that panel hears to move focus. */
    requested: number;
    close(): void;
};

export const PanelContext = createContext<PanelController | null>(null);
PanelContext.displayName = 'RichTextEditorPanelContext';
