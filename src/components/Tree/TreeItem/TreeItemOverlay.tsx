/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children } from 'react';

import { merge } from '@utilities/merge';
import { IconGrabHandle12 } from '@foundation/Icon';

import { INDENTATION_WIDTH } from '../Tree';
import type { TreeItemProps } from '../types';
import { useTreeContext } from '../TreeContext';

export type Overlay = Pick<TreeItemProps, 'id' | 'label' | 'contentComponent' | 'children' | 'level'>;

export const TreeItemOverlay = () => {
    const { treeState } = useTreeContext();

    if (!treeState.overlay) {
        return null;
    }

    const { id, children, label, level = 0, contentComponent } = treeState.overlay;

    const isSelected = treeState.selectedIds.has(id);

    const hasChildren = Children.count(children) > 0;

    const indentation = level * INDENTATION_WIDTH;

    const liStyle = { marginLeft: indentation };

    return (
        <li
            role="treeitem"
            style={liStyle}
            aria-level={level + 1}
            id={id.toString()}
            aria-label={label}
            aria-selected={isSelected}
            data-test-id="tree-item-overlay"
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
