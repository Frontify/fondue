/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconGrabHandle } from '@frontify/fondue-icons';
import { type ItemInstance } from '@headless-tree/core';
import {
    useEffect,
    useRef,
    type CSSProperties,
    type FocusEvent,
    type FocusEventHandler,
    type FormEventHandler,
    type ForwardedRef,
    type KeyboardEvent,
    type MouseEvent,
    type MouseEventHandler,
} from 'react';

import styles from '../styles/tree.module.scss';
import { type TreeItemData } from '../types';
import { ariaCheckedFor } from '../utils/ariaCheckedFor';

import { TreeRowCheckbox } from './TreeRowCheckbox';
import { TreeRowChevron } from './TreeRowChevron';
import { TreeRowRenameInput } from './TreeRowRenameInput';

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

    const headlessProps = item.getProps() as {
        onClick?: MouseEventHandler<HTMLDivElement>;
        onBlur?: FocusEventHandler<HTMLDivElement>;
        [key: string]: unknown;
    };

    // Disabled rows keep the headless click handler — it carries focus and folder
    // expansion, which stay available — but drop the consumer's `onClick`. Selection is
    // blocked separately in the controller's setters, so this is the only gate needed here.
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        headlessProps.onClick?.(event);
        if (!data.isDisabled) {
            data.onClick?.(event);
        }
    };

    // When a rename ends via Enter/Escape, the renaming feature programmatically
    // refocuses the row. The browser treats that focus as keyboard-driven (it follows
    // the keypress), so `:focus-visible` would draw the row's focus ring even though the
    // user never navigated to the row. Mark the row on the renaming→not-renaming
    // transition to suppress that one ring (same `data-show-focus-ring` convention as
    // `focusStyle` / `TextInput`); the mark is cleared on blur so real keyboard
    // navigation back to the row shows the ring again. Renames ended by blur never get
    // the focus restore (see `TreeRowRenameInput`), leaving the mark on a row that is
    // not focused — the timeout (outlasting the restore's 500ms poll window) drops it so
    // it cannot eat a later genuine focus ring.
    const isRenaming = item.isRenaming();
    const wasRenamingRef = useRef(isRenaming);
    useEffect(() => {
        const wasRenaming = wasRenamingRef.current;
        wasRenamingRef.current = isRenaming;
        const element = item.getElement();
        if (!wasRenaming || isRenaming || !element) {
            return;
        }
        element.setAttribute('data-show-focus-ring', 'false');
        const timer = window.setTimeout(() => {
            if (document.activeElement !== element) {
                element.removeAttribute('data-show-focus-ring');
            }
        }, 600);
        return () => window.clearTimeout(timer);
    }, [isRenaming, item]);

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            event.currentTarget.removeAttribute('data-show-focus-ring');
        }
        headlessProps.onBlur?.(event);
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

    // Stop clicks inside the actions slot from bubbling to the row's click handler;
    // otherwise pressing an action button would also select / expand the row.
    const handleActionsClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        // `role="treeitem"` and `tabIndex` come from `headlessProps` (provided by headless-tree)
        // — the lint rule can't see them statically. We also override headless-tree's default
        // `aria-selected` below: a treeitem with no `aria-selected` (or `"true"`) is announced
        // as "selected" by VoiceOver, so every row needs an explicit "true"/"false".
        // eslint-disable-next-line jsx-a11y-x/no-static-element-interactions
        <div
            {...headlessProps}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={styles.row}
            aria-describedby={hintId}
            aria-selected={data.isSelected === true ? 'true' : 'false'}
            aria-checked={multiSelect ? ariaCheckedFor(checkedState) : undefined}
            aria-disabled={data.isDisabled ? 'true' : undefined}
        >
            <div
                className={styles.item}
                style={{ '--tree-row-level': Math.max(0, level) } as CSSProperties}
                data-folder={isFolder}
                data-selected={!multiSelect && data.isSelected === true ? 'true' : undefined}
                data-drop={reorderable && item.isDragTarget()}
                data-disabled={data.isDisabled ? 'true' : undefined}
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
                        isDisabled={data.isDisabled}
                        headlessProps={checkboxProps}
                    />
                )}
                <span className={styles.indent} aria-hidden />
                <TreeRowChevron isFolder={isFolder} isExpanded={isExpanded} />
                {data.icon !== undefined && data.icon !== null && (
                    <span className={styles.icon} aria-hidden>
                        {data.icon}
                    </span>
                )}
                {item.isRenaming() ? (
                    <TreeRowRenameInput item={item} />
                ) : (
                    // The group (not the label) fills the remaining row space: the label
                    // shrinks/truncates inside it while the decorator hugs the text, and
                    // the rename input swaps in for the whole group so it always gets the
                    // full width up to the actions slot.
                    <span className={styles.labelGroup}>
                        <span className={styles.label}>{item.getItemName()}</span>
                        {data.decorator !== undefined && data.decorator !== null && (
                            <span className={styles.decorator}>{data.decorator}</span>
                        )}
                    </span>
                )}
                {data.actions !== undefined && data.actions !== null ? (
                    // eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions
                    <div className={styles.actions} onClick={handleActionsClick}>
                        {data.actions}
                    </div>
                ) : null}
            </div>
        </div>
    );
};
