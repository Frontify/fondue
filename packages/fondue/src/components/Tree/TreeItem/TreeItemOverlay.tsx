/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Children, type ReactNode } from 'react';

import IconGrabHandle12 from '@foundation/Icon/Generated/IconGrabHandle12';
import { merge } from '@utilities/merge';

import { INDENTATION_WIDTH } from '../helpers';
import { type DragHandlerPosition } from '../types';

export type Overlay = {
    id: string;
    label?: string;
    level?: number;
    children: ReactNode;
    contentComponent?: ReactNode;
    isSelected?: boolean;
    dragHandlerPosition?: DragHandlerPosition;
    showContentWhileDragging: boolean;
};

export const TreeItemOverlay = ({
    id,
    label,
    level = 0,
    children,
    contentComponent,
    isSelected,
    dragHandlerPosition = 'left',
    showContentWhileDragging = false,
}: Overlay) => {
    const hasChildren = Children.count(children) > 0;

    const indentation = level * INDENTATION_WIDTH;

    const liStyle = { marginLeft: indentation };

    const dragHandler = (
        <button tabIndex={-1} className="tw-p-1 tw-touch-none">
            <IconGrabHandle12 />
        </button>
    );

    return (
        <li
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="treeitem"
            style={liStyle}
            id={id.toString()}
            aria-label={label}
            aria-level={level + 1}
            aria-selected={isSelected}
            data-test-id="fondue-tree-item-overlay"
            className={merge([
                'tw-pointer-events-none tw-bg-white tw-flex tw-items-center tw-gap-x-1 tw-p-2 tw-no-underline tw-leading-5 tw-box-border tw-w-fit tw-drop-shadow-xl tw-rounded',
                showContentWhileDragging ? 'tw-opacity-90' : '',
            ])}
        >
            {dragHandlerPosition === 'left' && dragHandler}

            {hasChildren && (
                <button tabIndex={-1} data-test-id="tree-item-toggle" className="tw-p-1">
                    <div
                        className={merge([
                            'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                            isSelected && 'tw-text-box-selected-strong-inverse',
                        ])}
                    />
                </button>
            )}

            {label !== undefined && <span>{label}</span>}

            {contentComponent}

            {dragHandlerPosition === 'right' && dragHandler}
        </li>
    );
};

TreeItemOverlay.displayName = 'FondueTreeItemOverlay';
