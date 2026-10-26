/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { OverlayContext, type Overlays } from '../helpers/overlayContext';

export const useOverlays = (): Overlays => {
    const overlays = useContext(OverlayContext);
    if (overlays === null) {
        throw new Error('An editor overlay must be rendered inside RichTextEditor.Root.');
    }

    return overlays;
};
