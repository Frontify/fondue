/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DroppableContainer,
    KeyboardCode,
    KeyboardCoordinateGetter,
    closestCorners,
    getFirstCollision,
    getScrollableAncestors,
} from '@dnd-kit/core';
import { hasSortableData } from '@dnd-kit/sortable';
import { subtract } from '@dnd-kit/utilities';

import { fondueCollisionDetection } from './collisionDetection';

const directions: string[] = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

export const sortableTreeKeyboardCoordinates: KeyboardCoordinateGetter = (
    event,
    { context: { active, collisionRect, droppableRects, droppableContainers, over, scrollableAncestors, collisions } },
) => {
    if (directions.includes(event.code)) {
        event.preventDefault();

        if (!active || !collisionRect) {
            return;
        }

        const filteredContainers: DroppableContainer[] = [];

        for (const entry of droppableContainers.getEnabled()) {
            if (!entry || entry?.disabled) {
                continue;
            }

            const rect = droppableRects.get(entry.id);

            if (!rect) {
                continue;
            }

            switch (event.code) {
                case KeyboardCode.Down:
                    if (collisionRect.top < rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Up:
                    if (collisionRect.top > rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                // case KeyboardCode.Left:
                //     if (collisionRect.left > rect.left) {
                //         filteredContainers.push(entry);
                //     }
                //     break;
                // case KeyboardCode.Right:
                //     if (collisionRect.left < rect.left) {
                //         filteredContainers.push(entry);
                //     }
                //     break;
            }
        }

        // console.log('🚀 ~ filteredContainers:', filteredContainers);

        const collisions = fondueCollisionDetection({
            active,
            collisionRect,
            droppableRects,
            droppableContainers: filteredContainers,
            pointerCoordinates: null,
        });
        console.table(collisions);

        let closest = getFirstCollision(collisions);

        if (closest && closest.id === over?.id && collisions.length > 1) {
            closest = collisions[1];
        }

        if (closest && (closest.id !== undefined || closest.id !== null)) {
            const activeDroppable = droppableContainers.get(active.id);
            const newDroppable = droppableContainers.get(closest.id);
            const newRect = newDroppable ? droppableRects.get(newDroppable.id) : null;
            const newNode = newDroppable?.node.current;

            if (newNode && newRect && activeDroppable && newDroppable) {
                const newScrollAncestors = getScrollableAncestors(newNode);
                const hasDifferentScrollAncestors = newScrollAncestors.some(
                    (element, index) => scrollableAncestors[index] !== element,
                );
                const hasSameContainer = isSameContainer(activeDroppable, newDroppable);
                const isAfterActive = isAfter(activeDroppable, newDroppable);

                const offset =
                    hasDifferentScrollAncestors || !hasSameContainer
                        ? {
                              x: 0,
                              y: 0,
                          }
                        : {
                              x: isAfterActive ? collisionRect.width - newRect.width : 0,
                              y: isAfterActive ? collisionRect.height - newRect.height : 0,
                          };

                let y = newRect.top;

                if (active?.id !== over?.id && closest?.data?.position === 'before') {
                    console.log('closest BEFORE');
                    y -= newRect.height / 2;
                } else if (active?.id !== over?.id && closest?.data?.position === 'after') {
                    console.log('closest AFTER');
                    y += 10;
                }

                const rectCoordinates = {
                    x: newRect.left + 10,
                    y,
                };

                // const newCoordinates = offset.x && offset.y ? rectCoordinates : subtract(rectCoordinates, offset);

                return rectCoordinates;
            }
        }
    }

    return undefined;
};

function isSameContainer(a: DroppableContainer, b: DroppableContainer) {
    if (!hasSortableData(a) || !hasSortableData(b)) {
        return false;
    }

    return a.data.current.sortable.containerId === b.data.current.sortable.containerId;
}

function isAfter(a: DroppableContainer, b: DroppableContainer) {
    if (!hasSortableData(a) || !hasSortableData(b)) {
        return false;
    }

    if (!isSameContainer(a, b)) {
        return false;
    }

    return a.data.current.sortable.index < b.data.current.sortable.index;
}

export const multipleContainersKeyboardCoordinates: KeyboardCoordinateGetter = (
    event,
    { context: { active, droppableRects, droppableContainers, collisionRect } },
) => {
    if (directions.includes(event.code)) {
        event.preventDefault();

        if (!active || !collisionRect) {
            return;
        }

        const filteredContainers: DroppableContainer[] = [];

        for (const entry of droppableContainers.getEnabled()) {
            if (!entry || entry?.disabled) {
                continue;
            }

            const rect = droppableRects.get(entry.id);

            if (!rect) {
                continue;
            }

            const data = entry.data.current;

            if (data) {
                const { type, children } = data;

                if (type === 'container' && children?.length > 0) {
                    if (active.data.current?.type !== 'container') {
                        continue;
                    }
                }
            }

            switch (event.code) {
                case KeyboardCode.Down:
                    if (collisionRect.top < rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Up:
                    if (collisionRect.top > rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Left:
                    if (collisionRect.left >= rect.left + rect.width) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Right:
                    if (collisionRect.left + collisionRect.width <= rect.left) {
                        filteredContainers.push(entry);
                    }
                    break;
            }
        }

        const collisions = closestCorners({
            active,
            collisionRect,
            droppableRects,
            droppableContainers: filteredContainers,
            pointerCoordinates: null,
        });
        const closestId = getFirstCollision(collisions, 'id');

        if (closestId !== null && closestId !== undefined) {
            const newDroppable = droppableContainers.get(closestId);
            const newNode = newDroppable?.node.current;
            const newRect = newDroppable?.rect.current;

            if (newNode && newRect) {
                if (newDroppable.id === 'placeholder') {
                    return {
                        x: newRect.left + (newRect.width - collisionRect.width) / 2,
                        y: newRect.top + (newRect.height - collisionRect.height) / 2,
                    };
                }

                if (newDroppable.data.current?.type === 'container') {
                    return {
                        x: newRect.left + 20,
                        y: newRect.top + 74,
                    };
                }

                return {
                    x: newRect.left,
                    y: newRect.top,
                };
            }
        }
    }

    return undefined;
};
