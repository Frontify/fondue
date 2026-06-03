/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconCaretDown, IconCaretRight, IconDocument, IconFolder, IconGrabHandle } from '@frontify/fondue-icons';
import { CheckedState } from '@headless-tree/core';
import { AssistiveTreeDescription } from '@headless-tree/react';
import { useId, type FormEventHandler, type ForwardedRef } from 'react';

import { Checkbox } from '#/components/Checkbox/Checkbox';

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type Item, type TreeRootProps } from '../types';
import { parseChildren } from '../utils/parseChildren';

export const TreeRoot = ({ children, onChange, multiSelect = false, reorderable = false }: TreeRootProps) => {
    const reorderHintId = useId();
    const parsedChildren = parseChildren(children, 'root');
    const items: Item[] = [
        {
            id: 'root',
            name: 'Root',
            children: parsedChildren.filter((item) => item.parentId === 'root').map((item) => item.id),
            isFolder: true,
        },
        ...parsedChildren,
    ];

    const tree = useTreeController({
        items,
        onChange: (state) => {
            onChange?.(state);
        },
        reorderable,
    });

    return (
        <div {...tree.getContainerProps()} className={styles.tree}>
            {reorderable && (
                <span id={reorderHintId} className={styles.srOnly}>
                    To reorder, press Control plus Shift plus D to start moving this item, then arrow up or down to
                    position it, Enter to drop, or Escape to cancel.
                </span>
            )}
            <AssistiveTreeDescription tree={tree} />
            {tree.getItems().map((item) => {
                const level = item.getItemMeta().level;
                const isFolder = item.isFolder();
                const isExpanded = item.isExpanded();
                const checkedState = item.getCheckedState();
                const checkboxValue: boolean | 'indeterminate' =
                    checkedState === CheckedState.Indeterminate
                        ? 'indeterminate'
                        : checkedState === CheckedState.Checked;
                const isActive = Boolean(item.getItemData().isActive);

                const checkboxProps = multiSelect ? item.getCheckboxProps() : {};
                const headlessCheckboxOnChange = checkboxProps.onChange as
                    | FormEventHandler<HTMLButtonElement>
                    | undefined;

                return (
                    <button
                        key={item.getId()}
                        type="button"
                        {...item.getProps()}
                        className={styles.row}
                        aria-current={isActive ? 'page' : undefined}
                        aria-describedby={reorderable ? reorderHintId : undefined}
                    >
                        <div
                            className={styles.item}
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
                            {multiSelect && (
                                <Checkbox
                                    value={checkboxValue}
                                    onChange={(event) => {
                                        event.stopPropagation();
                                        headlessCheckboxOnChange?.(event);
                                    }}
                                    ref={checkboxProps.ref as ForwardedRef<HTMLButtonElement>}
                                />
                            )}
                            {level > 1 && (
                                <span className={styles.guides} aria-hidden>
                                    {Array.from({ length: level - 1 }).map((_, i) => (
                                        <span key={i} className={styles.guide} />
                                    ))}
                                </span>
                            )}
                            <span className={styles.chevron} aria-hidden>
                                {isFolder ? (
                                    isExpanded ? (
                                        <IconCaretDown size={12} />
                                    ) : (
                                        <IconCaretRight size={12} />
                                    )
                                ) : null}
                            </span>
                            <span className={styles.icon} aria-hidden>
                                {isFolder ? <IconFolder size={16} /> : <IconDocument size={16} />}
                            </span>
                            <span className={styles.label}>{item.getItemName()}</span>
                        </div>
                    </button>
                );
            })}
            {reorderable && <div style={tree.getDragLineStyle()} className={styles.dragline} />}
        </div>
    );
};
TreeRoot.displayName = 'TreeRoot';
