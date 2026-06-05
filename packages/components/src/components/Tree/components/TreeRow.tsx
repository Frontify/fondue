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
    hintId?: string;
};

export const TreeRow = ({ item, multiSelect, reorderable, hintId }: TreeRowProps) => {
    const level = item.getItemMeta().level;
    const isFolder = item.isFolder();
    const isExpanded = item.isExpanded();
    const checkedState = item.getCheckedState();
    const data = item.getItemData();

    const checkboxProps = multiSelect
        ? (item.getCheckboxProps() as {
              onChange?: FormEventHandler<HTMLButtonElement>;
              ref?: ForwardedRef<HTMLButtonElement>;
          })
        : null;

    // Strip headless-tree's default `aria-selected` out of the spread so we can drive it
    // from `data.isSelected` below. Every row needs an explicit value: a treeitem with no
    // `aria-selected` (or `"true"`) is announced as "selected" by VoiceOver, so unselected
    // and non-selectable rows both need an explicit `"false"`.
    const {
        onClick: headlessOnClick,
        'aria-selected': _ariaSelected,
        ...headlessRest
    } = item.getProps() as {
        onClick?: MouseEventHandler<HTMLDivElement>;
        'aria-selected'?: string;
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

    console.log('headlessRest', headlessRest);

    return (
        // `role="treeitem"` and `tabIndex` come from `headlessRest` (provided by headless-tree)
        // — the lint rule can't see them statically.
        // eslint-disable-next-line jsx-a11y-x/no-static-element-interactions
        <div
            {...headlessRest}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={styles.row}
            aria-describedby={hintId}
            aria-selected={data.isSelected ? 'true' : 'false'}
            aria-checked={
                multiSelect
                    ? checkedState === CheckedState.Checked
                        ? 'true'
                        : checkedState === CheckedState.Indeterminate
                          ? 'mixed'
                          : 'false'
                    : undefined
            }
            // aria-current={isActive ? 'page' : undefined}
            // aria-describedby={reorderable ? reorderHintId : undefined}
            // aria-checked={
            //     multiSelect
            //         ? checkedState === CheckedState.Checked
            //             ? 'true'
            //             : checkedState === CheckedState.Indeterminate
            //               ? 'mixed'
            //               : 'false'
            //         : undefined
            // }
        >
            <div
                className={styles.item}
                style={{ '--tree-row-level': Math.max(0, level) } as CSSProperties}
                aria-checked="false"
                aria-selected="false"
                // data-focused={item.isFocused()}
                // data-expanded={isExpanded}
                // // data-selected={checkedState === CheckedState.Checked}
                // data-folder={isFolder}
                // data-drop={reorderable && item.isDragTarget()}
                // data-active={isActive}
            >
                {reorderable && (
                    <span className={styles.handle} aria-hidden>
                        <IconGrabHandle size={16} />
                    </span>
                )}
                {checkboxProps && (
                    <TreeRowCheckbox
                        checkedState={checkedState}
                        isFocused={item.isFocused()}
                        headlessProps={checkboxProps}
                    />
                )}
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
