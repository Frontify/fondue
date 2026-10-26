/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { PanelContext } from '#/ui/helpers/panelContext';

/** The open panel id, or none when the part is outside the editor or no panel is open. */
export const useOpenPanel = (): string | undefined => useContext(PanelContext)?.id;
