/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { PanelContext, type PanelController } from '#/ui/helpers/panelContext';

/** The panel slot's controller, or `null` outside the editor. */
export const usePanelController = (): PanelController | null => useContext(PanelContext);
