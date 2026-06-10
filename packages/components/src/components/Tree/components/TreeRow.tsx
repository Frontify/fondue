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
import { type RowCheckedState } from '../utils/computeCheckedStates';

import { TreeRowCheckbox } from './TreeRowCheckbox';
import { TreeRowChevron } from './TreeRowChevron';
import { TreeRowRenameInput } from './TreeRowRenameInput';

type TreeRowProps = {
    item: ItemInstance<TreeItemData>;
    multiSelect: boolean;
    reorderable: boolean;
    hintId?: string;
    /**
     * Derived via `computeCheckedStates` in `TreeRoot` — not headless-tree's leaf-only
     * `getCheckedState`, which would render leafless folders and their ancestors unchecked.
     */
    checkedState: RowCheckedState;
};

export const TreeRow = ({ item, multiSelect, reorderable, hintId, checkedState }: TreeRowProps) => {
    const level = item.getItemMeta().level;
    const isFolder = item.isFolder();
    const isExpanded = item.isExpanded();
    const data = item.getItemData();

    // Toggle from the shared derived state, not headless-tree's `toggleCheckedState` —
    // its leaf-only derivation would make a checked group of leafless folders
    // un-uncheckable. Fire-and-forget: the sync data loader settles immediately.
    const handleCheckboxToggle = () => {
        if (checkedState === true) {
            item.setUnchecked().catch(() => {});
        } else {
            item.setChecked().catch(() => {});
        }
    };

    const checkboxProps = multiSelect
        ? {
              ...(item.getCheckboxProps() as {
                  onChange?: FormEventHandler<HTMLButtonElement>;
                  ref?: ForwardedRef<HTMLButtonElement>;
              }),
              onChange: handleCheckboxToggle,
          }
        : null;

    const headlessProps = item.getProps() as {
        onClick?: MouseEventHandler<HTMLDivElement>;
        onBlur?: FocusEventHandler<HTMLDivElement>;
        [key: string]: unknown;
    };

    // Disabled rows keep the headless click handler (focus and folder expansion stay
    // available) but drop the consumer's `onClick`; selection is blocked in the setters.
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        headlessProps.onClick?.(event);
        if (!data.isDisabled) {
            data.onClick?.(event);
        }
    };

    // Ending a rename via Enter/Escape refocuses the row programmatically; the browser
    // treats that as keyboard focus and would draw a focus ring the user never asked
    // for. Suppress it on the renaming→not-renaming transition (`data-show-focus-ring`
    // convention); blur clears the mark so real keyboard navigation rings again. The
    // timeout drops a stale mark when the rename ended by blur (no focus restore),
    // outlasting the restore's 500ms poll window.
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

    // The row is a div (nested interactive controls must stay valid HTML), so Enter and
    // Space re-implement button activation. The target check skips events bubbling from
    // nested controls, e.g. Space on the checkbox.
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

    // Keep action clicks from bubbling into the row's select/expand handler.
    const handleActionsClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        // `role="treeitem"`/`tabIndex` come from `headlessProps` (invisible to the lint
        // rule). `aria-selected` is overridden: VoiceOver announces a treeitem without
        // it as "selected", so every row needs an explicit "true"/"false".
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
                    // The group fills the remaining row space: the label truncates inside
                    // it while the decorator hugs the text; the rename input replaces the
                    // whole group, getting the full width up to the actions slot.
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
