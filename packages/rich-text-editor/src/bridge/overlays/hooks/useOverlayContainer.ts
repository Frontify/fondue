/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { OverlayContext } from '../helpers/overlayContext';

/** The portal container of the editor around the caller. */
export const useOverlayContainer = (): HTMLElement | null => {
    const overlays = useContext(OverlayContext);
    if (overlays === null) {
        return null;
    }

    return overlays.container;
};
