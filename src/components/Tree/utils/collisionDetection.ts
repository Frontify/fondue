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

    /* 
    The following mutation updates the 'position' property of the 'data' object
    for the closest collision in the 'closestCornersCollisions' array.
    
    This mutation is done for performance reasons, to avoid iterating over the array
    to find the closest collision again after calculating the position. Without this
    mutation, the function would need to loop through the array again to update the
    position of the closest collision, which could be a performance bottleneck for
    large arrays.
  */
    closest.data['position'] = position;

    return closestCornersCollisions;
};
