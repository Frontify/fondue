/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Dispatch, SetStateAction, isValidElement } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

import { TreeActive, TreeAnnouncements, TreeOver, TreeState } from '../types';

type AnnouncementItem = {
    level: number;
    id: string;
    parentId?: string;
};

type AnnouncementArgs = {
    eventName: string;
    activeId: string;
    activeTitle: string;
    overId?: string;
    overTitle?: string;
    treeState: TreeState;
    currentPosition: Nullable<{ overId: string; parentId: Nullable<string> }>;
    setCurrentPosition: Dispatch<
        SetStateAction<
            Nullable<{
                overId: string;
                parentId: Nullable<string>;
            }>
        >
    >;
};

export const getAnnouncements = (
    treeState: TreeState,
    currentPosition: AnnouncementArgs['currentPosition'],
    setCurrentPosition: AnnouncementArgs['setCurrentPosition'],
): TreeAnnouncements => {
    const getActiveTitle = (active: TreeActive) => {
        let title: string = active.id;

        const activeNode = treeState.nodes.find((node) => node.props.id === active.id);

        if (activeNode && isValidElement(activeNode.props.contentComponent)) {
            title = activeNode.props.contentComponent.props.title;
        } else if (activeNode && activeNode.props.label) {
            title = activeNode.props.label;
        }

        return title;
    };

    const getOverTitle = (over: TreeOver | null) => {
        let title = over?.id;

        const overNode = treeState.nodes.find((node) => node.props.id === over?.id);

        if (overNode && isValidElement(overNode.props.contentComponent)) {
            title = overNode.props.contentComponent.props.title;
        } else if (overNode && overNode.props.label) {
            title = overNode.props.label;
        }

        return title;
    };

    return {
        onDragStart({ active }) {
            return `Picked up ${getActiveTitle(active) || active.id}.`;
        },
        onDragMove({ active, over }) {
            return getMovementAnnouncement({
                eventName: 'onDragMove',
                activeId: active.id,
                activeTitle: getActiveTitle(active),
                overId: over?.id,
                overTitle: getOverTitle(over),
                treeState,
                setCurrentPosition,
                currentPosition,
            });
        },
        onDragOver({ active, over }) {
            return getMovementAnnouncement({
                eventName: 'onDragOver',
                activeId: active.id,
                activeTitle: getActiveTitle(active),
                overId: over?.id,
                overTitle: getOverTitle(over),
                treeState,
                setCurrentPosition,
                currentPosition,
            });
        },
        onDragEnd({ active, over }) {
            return getMovementAnnouncement({
                eventName: 'onDragEnd',
                activeId: active.id,
                activeTitle: getActiveTitle(active),
                overId: over?.id,
                overTitle: getOverTitle(over),
                treeState,
                setCurrentPosition,
                currentPosition,
            });
        },
        onDragCancel({ active }) {
            const title = getActiveTitle(active);

            return `Moving was cancelled. ${title} was dropped in its original position.`;
        },
    };
};

const getMovementAnnouncement = ({
    eventName,
    activeId,
    activeTitle,
    overId,
    overTitle,
    treeState,
    currentPosition,
    setCurrentPosition,
}: AnnouncementArgs) => {
    const projected = treeState.projection;

    if (overId && projected) {
        if (eventName !== 'onDragEnd') {
            if (
                currentPosition &&
                projected.parentId === currentPosition.parentId &&
                overId === currentPosition.overId
            ) {
                return;
            } else {
                setCurrentPosition({
                    parentId: projected.parentId,
                    overId,
                });
            }
        }

        const announcementNodes: AnnouncementItem[] = treeState.nodes.map(({ props }) => ({
            id: props.id,
            level: props.level ?? 0,
            parentId: props.parentId,
        }));

        const overIndex = announcementNodes.findIndex(({ id }) => id === overId);
        const activeIndex = announcementNodes.findIndex(({ id }) => id === activeId);
        const sortedItems = arrayMove(announcementNodes, activeIndex, overIndex);

        const previousItem = sortedItems[overIndex - 1];

        let announcement;
        const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved';
        const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested';

        if (!previousItem) {
            const nextItem = sortedItems[overIndex + 1];
            announcement = `${activeTitle} was ${movedVerb} before ${overTitle || nextItem.id}.`;
        } else {
            if (projected.depth > previousItem.level) {
                announcement = `${activeTitle} was ${nestedVerb} under ${overTitle || previousItem.id}.`;
            } else {
                let previousSibling: AnnouncementItem | undefined = previousItem;
                while (previousSibling && projected.depth < previousSibling.level) {
                    const parentId: string | undefined = previousSibling.parentId;
                    previousSibling = sortedItems.find(({ id }) => id === parentId);
                }

                if (previousSibling) {
                    announcement = `${activeTitle} was ${movedVerb} after ${overTitle || previousSibling.id}.`;
                }
            }
        }

        return announcement;
    }

    return;
};
