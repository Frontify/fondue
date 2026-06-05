/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDocument, IconFolder, IconGrabHandle } from '@frontify/fondue-icons';
import { CheckedState, type ItemInstance } from '@headless-tree/core';
import {
    type CSSProperties,
    type FormEventHandler,
    type ForwardedRef,
    type KeyboardEvent,
    type MouseEvent,
    type MouseEventHandler,
} from 'react';

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
    const data = item.getItemData();
    const isActive = Boolean(data.isActive);

    const checkboxProps = multiSelect
        ? (item.getCheckboxProps() as {
              onChange?: FormEventHandler<HTMLButtonElement>;
              ref?: ForwardedRef<HTMLButtonElement>;
          })
        : null;

    const { onClick: headlessOnClick, ...headlessRest } = item.getProps() as {
        onClick?: MouseEventHandler<HTMLDivElement>;
        [key: string]: unknown;
    };
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        headlessOnClick?.(event);
        data.onClick?.(event);
    };

    // The row is a div (not a button) so nested interactive controls — checkbox today,
    // overflow menu / inline actions tomorrow — remain valid HTML and stay keyboard
    // accessible. We re-implement native button activation here: Enter and Space on the
    // row fire the same click handler so primaryAction (focus + expand) still runs.
    // `event.target !== event.currentTarget` skips events that bubbled from nested
    // controls, e.g. Space on the checkbox.
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) {
            return;
        }
        if (event.key !== 'Enter' && event.key !== ' ') {
            return;
        }
        event.preventDefault();
        event.currentTarget.click();
    };

    return (
        <div
            {...headlessRest}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            // Tabbing into a row moves DOM focus but doesn't tell headless-tree which item
            // is active, so the next arrow-key press would navigate from the row that was
            // focused *before* tabbing. Syncing on focus keeps internal state aligned.
            onFocus={() => item.setFocused()}
            // Override headless-tree's roving tabindex: every row is part of the document tab
            // sequence so Tab walks row → checkbox → next row → next checkbox. Arrow-key
            // navigation between rows still works via headless-tree's hotkeys.
            tabIndex={0}
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
        </div>
    );
};
