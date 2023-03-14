/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Modifier } from '@dnd-kit/core';
import { getEventCoordinates } from '@dnd-kit/utilities';

export const snapToHandle: Modifier = ({ activatorEvent, draggingNodeRect, transform }) => {
    if (draggingNodeRect && activatorEvent) {
        const activatorCoordinates = getEventCoordinates(activatorEvent);

        if (!activatorCoordinates) {
            return transform;
        }

        const offsetX = activatorCoordinates.x - draggingNodeRect.left - 32;
        const offsetY = activatorCoordinates.y - draggingNodeRect.top;

        return {
            ...transform,
            x: transform.x + offsetX,
            y: transform.y + offsetY - draggingNodeRect.height / 2,
        };
    }

    return transform;
};
