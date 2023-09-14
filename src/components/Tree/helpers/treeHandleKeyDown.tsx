/* (c) Copyright Frontify Ltd., all rights reserved. */

import { KeyboardEvent } from 'react';
import { KeyboardCode } from '@dnd-kit/core';
import { TreeState } from '../types';
import { ROOT_ID } from '.';

export const handleKeyDownEvent = (
    event: KeyboardEvent<HTMLUListElement>,
    expandedIds: TreeState['expandedIds'],
    nodes: TreeState['nodes'],
    handleSelect: (id: string) => void,
    handleShrink: (id: string) => void,
    handleExpand: (id: string) => void,
) => {
    const activeElement = document.activeElement;

    if (
        !activeElement?.parentElement ||
        activeElement.getAttribute('role') !== 'treeitem' ||
        !(activeElement instanceof HTMLLIElement)
    ) {
        return;
    }

    const items = Array.from(activeElement.parentElement.children).filter(
        (child) => child.nodeName === 'LI',
    ) as HTMLLIElement[];

    const currentIndex = items.indexOf(activeElement);

    const node = nodes[currentIndex];

    const id: string = node.props.id;
    const isExpanded = expandedIds.has(id);
    const parentId: string | undefined = node.props.parentId;
    const hasChildren = activeElement.getAttribute('data-has-children') === 'true';

    const { code } = event;

    const toggleSelect = () => {
        event.preventDefault();

        handleSelect(id);
    };

    const expandItem = () => {
        event.preventDefault();

        handleExpand(id);
    };

    const shrinkItem = () => {
        event.preventDefault();

        handleShrink(id);
    };

    const focusPrevious = () => {
        const previousIndex = (currentIndex + items.length - 1) % items.length;
        items[previousIndex].focus();
    };

    const focusNext = () => {
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].focus();
    };

    switch (code) {
        case KeyboardCode.Enter:
            toggleSelect();

            break;

        case KeyboardCode.Space:
            hasChildren ? expandItem() : toggleSelect();

            break;

        case KeyboardCode.Right:
            if (!hasChildren) {
                break;
            }

            isExpanded ? focusNext() : expandItem();

            break;

        case KeyboardCode.Left:
            if (hasChildren && isExpanded) {
                shrinkItem();
            } else if (parentId && parentId !== ROOT_ID) {
                const parentIndex = nodes.findIndex((node) => node.props.id === parentId);

                items[parentIndex].focus();
            }
            break;

        case KeyboardCode.Up:
            event.preventDefault();
            focusPrevious();

            break;

        case KeyboardCode.Down:
            event.preventDefault();
            focusNext();

            break;

        default:
            break;
    }
};
