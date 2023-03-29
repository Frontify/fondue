/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    DroppableContainer,
    KeyboardCode,
    KeyboardCoordinateGetter,
    closestCorners,
    getFirstCollision,
} from '@dnd-kit/core';

import { getProjection } from '../helpers';
import { INDENTATION_WIDTH } from '../Tree';
import type { SensorContext } from '../types';

const directions: string[] = [KeyboardCode.Down, KeyboardCode.Right, KeyboardCode.Up, KeyboardCode.Left];

const horizontal: string[] = [KeyboardCode.Left, KeyboardCode.Right];

export const sortableTreeKeyboardCoordinates: (context: SensorContext) => KeyboardCoordinateGetter =
    (context) =>
    (event, { currentCoordinates, context: { active, over, collisionRect, droppableRects, droppableContainers } }) => {
        if (directions.includes(event.code)) {
            if (!active || !collisionRect) {
                return;
            }

            event.preventDefault();

            const {
                current: { nodes, offset },
            } = context;

            if (horizontal.includes(event.code) && over?.id) {
                const { depth, maxDepth, minDepth } = getProjection({
                    nodes,
                    activeId: active.id,
                    overId: over.id,
                    dragOffset: offset,
                });

                switch (event.code) {
                    case KeyboardCode.Left:
                        if (depth > minDepth) {
                            return {
                                ...currentCoordinates,
                                x: currentCoordinates.x - INDENTATION_WIDTH,
                            };
                        }
                        break;
                    case KeyboardCode.Right:
                        if (depth < maxDepth) {
                            return {
                                ...currentCoordinates,
                                x: currentCoordinates.x + INDENTATION_WIDTH,
                            };
                        }
                        break;
                }

                return undefined;
            }

            const containers: DroppableContainer[] = [];

            for (const [containerId, container] of droppableContainers) {
                if (container?.disabled || containerId === over?.id) {
                    continue;
                }

                const rect = droppableRects.get(containerId);

                if (!rect) {
                    continue;
                }

                switch (event.code) {
                    case KeyboardCode.Down:
                        if (collisionRect.top < rect.top) {
                            containers.push(container);
                        }
                        break;
                    case KeyboardCode.Up:
                        if (collisionRect.top > rect.top) {
                            containers.push(container);
                        }
                        break;
                }
            }

            const collisions = closestCorners({
                active,
                collisionRect,
                pointerCoordinates: null,
                droppableRects,
                droppableContainers: containers,
            });

            let closestId = getFirstCollision(collisions, 'id');

            if (closestId === over?.id && collisions.length > 1) {
                closestId = collisions[1].id;
            }

            if (closestId && over?.id) {
                const activeRect = droppableRects.get(active.id);
                const newRect = droppableRects.get(closestId);
                const newDroppable = droppableContainers.get(closestId);

                if (activeRect && newRect && newDroppable) {
                    const newIndex = nodes.findIndex(({ props }) => props.id === closestId);
                    const newNode = nodes[newIndex];
                    const activeIndex = nodes.findIndex(({ props }) => props.id === active.id);
                    const activeNode = nodes[activeIndex];

                    const dragOffset = (newNode.props.level - activeNode.props.level) * INDENTATION_WIDTH;

                    if (newNode && activeNode) {
                        const { depth } = getProjection({
                            nodes,
                            activeId: active.id,
                            overId: closestId,
                            dragOffset,
                        });

                        const isBelow = newIndex > activeIndex;
                        const modifier = isBelow ? 1 : -1;
                        const offset = (collisionRect.height - activeRect.height) / 2;

                        const newCoordinates = {
                            x: newRect.left + depth * INDENTATION_WIDTH,
                            y: newRect.top + modifier * offset,
                        };

                        return newCoordinates;
                    }
                }
            }
        }

        return undefined;
    };
