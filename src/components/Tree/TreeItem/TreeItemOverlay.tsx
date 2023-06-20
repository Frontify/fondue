/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children, ReactNode } from 'react';

import { merge } from '@utilities/merge';
import { IconGrabHandle12 } from '@foundation/Icon';

import { INDENTATION_WIDTH } from '../helpers';

export type Overlay = {
    id: string;
    label?: string;
    level?: number;
    children: ReactNode;
    contentComponent?: ReactNode;
    isSelected?: boolean;
};

export const TreeItemOverlay = ({ id, label, level = 0, children, contentComponent, isSelected }: Overlay) => {
    const hasChildren = Children.count(children) > 0;

    const indentation = level * INDENTATION_WIDTH;

    const liStyle = { marginLeft: indentation };

    return (
        <li
            role="treeitem"
            style={liStyle}
            id={id.toString()}
            aria-label={label}
            aria-level={level + 1}
            aria-selected={isSelected}
            data-test-id="fondue-tree-item-overlay"
            className="tw-pointer-events-none tw-bg-white tw-flex tw-items-center tw-gap-x-1 tw-py-2 tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10 tw-box-border tw-w-fit tw-drop-shadow-xl tw-rounded"
        >
            <button tabIndex={-1} className="tw-p-1 tw-ml-2">
                <IconGrabHandle12 />
            </button>
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
        </li>
    );
};

TreeItemOverlay.displayName = 'FondueTreeItemOverlay';
