/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CollisionDetection, closestCorners, getFirstCollision } from '@dnd-kit/core';

import { CollisionPosition } from '../types';

export const calculatePosition = (draggableRect: DOMRect, droppableRect: DOMRect): CollisionPosition => {
    let position: CollisionPosition;

    if (draggableRect.bottom < droppableRect.top + droppableRect.height / 2) {
        position = 'before';
    } else if (draggableRect.bottom > droppableRect.top + droppableRect.height) {
        position = 'after';
    } else {
        position = 'within';
    }

    return position;
};

export const fondueCollisionDetection: CollisionDetection = (args) => {
    const closestCornersCollisions = closestCorners(args);

    const closest = getFirstCollision(closestCornersCollisions);

    if (!closest || !closest.data) {
        return closestCornersCollisions;
    }

    const droppableRect: Nullable<DOMRect> = closest.data.droppableContainer.rect.current;

    const { initial, translated } = args.active.rect.current;

    const draggableRect = translated ?? initial;

    if (!draggableRect || !droppableRect) {
        return closestCornersCollisions;
    }

    const position = calculatePosition(draggableRect as DOMRect, droppableRect);

    /* mutation - for performance reasons (avoiding iterations) */
    closest.data['position'] = position;

    return closestCornersCollisions;
};
