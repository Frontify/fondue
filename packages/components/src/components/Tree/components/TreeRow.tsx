/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDocument, IconFolder, IconGrabHandle } from '@frontify/fondue-icons';
import { CheckedState, type ItemInstance } from '@headless-tree/core';
import { type CSSProperties, type FormEventHandler, type ForwardedRef } from 'react';

import styles from '../styles/tree.module.scss';
import { type TreeItemData } from '../types';

import { TreeRowCheckbox } from './TreeRowCheckbox';
import { TreeRowChevron } from './TreeRowChevron';

type TreeRowProps = {
    item: ItemInstance<TreeItemData>;
    multiSelect: boolean;
    reorderable: boolean;
    reorderHintId: string;
};

export const TreeRow = ({ item, multiSelect, reorderable, reorderHintId }: TreeRowProps) => {
    const level = item.getItemMeta().level;
    const isFolder = item.isFolder();
    const isExpanded = item.isExpanded();
    const checkedState = item.getCheckedState();
    const isActive = Boolean(item.getItemData().isActive);

    const checkboxProps = multiSelect
        ? (item.getCheckboxProps() as {
              onChange?: FormEventHandler<HTMLButtonElement>;
              ref?: ForwardedRef<HTMLButtonElement>;
          })
        : null;

    return (
        <button
            type="button"
            {...item.getProps()}
            className={styles.row}
            aria-current={isActive ? 'page' : undefined}
            aria-describedby={reorderable ? reorderHintId : undefined}
        >
            <div
                className={styles.item}
                style={{ '--tree-row-level': Math.max(0, level) } as CSSProperties}
                data-focused={item.isFocused()}
                data-expanded={isExpanded}
                data-selected={checkedState === CheckedState.Checked}
                data-folder={isFolder}
                data-drop={reorderable && item.isDragTarget()}
                data-active={isActive}
            >
                {reorderable && (
                    <span className={styles.handle} aria-hidden>
                        <IconGrabHandle size={16} />
                    </span>
                )}
                {checkboxProps && <TreeRowCheckbox checkedState={checkedState} headlessProps={checkboxProps} />}
                <span className={styles.indent} aria-hidden />
                <TreeRowChevron isFolder={isFolder} isExpanded={isExpanded} />
                <span className={styles.icon} aria-hidden>
                    {isFolder ? <IconFolder size={16} /> : <IconDocument size={16} />}
                </span>
                <span className={styles.label}>{item.getItemName()}</span>
            </div>
        </button>
    );
};
