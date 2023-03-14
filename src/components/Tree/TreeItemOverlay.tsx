/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { Children } from 'react';
import { IconGrabHandle12 } from '@foundation/Icon';

import { merge } from '@utilities/merge';

import { TreeItemProps } from './types';
import { useTreeContext } from './TreeContext';

export type Overlay = Pick<TreeItemProps, 'id' | 'label' | 'contentComponent' | 'children'>;

export const TreeItemOverlay = () => {
    const { treeState } = useTreeContext();

    if (!treeState.overlay) {
        return null;
    }

    const treeItemState = treeState.items.get(treeState.overlay.id);
    const isSelected = treeState.selectedIds.has(treeState.overlay.id);

    const hasChildren = Children.count(treeState.overlay.children) > 0;

    return (
        <li
            role="treeitem"
            data-test-id="tree-item-overlay"
            aria-level={treeItemState?.level}
            id={treeState.overlay.id.toString()}
            aria-label={treeState.overlay.label}
            className="tw-pointer-events-none tw-bg-white tw-flex tw-items-center tw-gap-x-1 tw-py-2 tw-px-2.5 tw-no-underline tw-leading-5 tw-h-10 tw-box-border tw-w-fit tw-drop-shadow-xl tw-rounded"
        >
            <button className="tw-p-1 tw-ml-2">
                <IconGrabHandle12 />
            </button>
            {hasChildren && (
                <button data-test-id="tree-item-toggle" className="tw-p-1">
                    <div
                        className={merge([
                            'tw-transition-transform tw-w-0 tw-h-0 tw-text-black-100 tw-text-opacity-40 tw-font-normal tw-border-t-4 tw-border-t-transparent tw-border-b-4 tw-border-b-transparent tw-border-l-4 tw-border-l-x-strong',
                            isSelected && 'tw-text-box-selected-strong-inverse',
                        ])}
                    />
                </button>
            )}

            {treeState.overlay.label !== undefined && <span>{treeState.overlay.label}</span>}

            {treeState.overlay.contentComponent?.({ selected: isSelected })}
        </li>
    );
};

TreeItemOverlay.displayName = 'FondueTreeItemOverlay';
