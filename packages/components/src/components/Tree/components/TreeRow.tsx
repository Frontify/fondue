/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconGrabHandle } from '@frontify/fondue-icons';
import { type ItemInstance } from '@headless-tree/core';
import {
    useEffect,
    useLayoutEffect,
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
    /** Called when the row unmounts while it, or a control portalled out of it, holds focus. */
    onFocusLost: () => void;
    /**
     * Derived via `computeCheckedStates` in `TreeRoot` — not headless-tree's leaf-only
     * `getCheckedState`, which would render leafless folders and their ancestors unchecked.
     */
    checkedState: RowCheckedState;
};

export const TreeRow = ({ item, multiSelect, reorderable, hintId, onFocusLost, checkedState }: TreeRowProps) => {
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
    // In single-select, the first click on a folder only selects it — headless-tree would
    // also toggle it — and clicking the already-selected folder toggles it.
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        if (!multiSelect && isFolder && !data.isDisabled && !item.isSelected()) {
            item.setFocused();
            item.getTree().setSelectedItems([item.getId()]);
        } else {
            headlessProps.onClick?.(event);
        }
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

    // The last element that took focus on the row or in a control portalled out of it. Checked against the
    // live active element at removal, so focus that has since moved anywhere else is never pulled back.
    const lastFocusTargetRef = useRef<Element | null>(null);
    // Cleanup runs before the DOM node is removed, so a focused control is still the active element.
    useLayoutEffect(
        () => () => {
            if (lastFocusTargetRef.current?.contains(document.activeElement)) {
                onFocusLost();
            }
        },
        [onFocusLost],
    );

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

    // The chevron toggles without touching selection, so it must not reach the row handler.
    const handleChevronClick = (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        item.setFocused();
        if (isExpanded) {
            item.collapse();
        } else {
            item.expand();
        }
    };

    // Keep decorator and action clicks from bubbling into the row's select/expand handler.
    // React bubbles through portals, so this also covers flyouts opened from them. A
    // decorator can opt out via `propagateClicks` for passive content.
    const stopClickPropagation = (event: MouseEvent<HTMLElement>) => {
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
            onFocus={(event) => {
                lastFocusTargetRef.current = event.target;
                item.setFocused();
            }}
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
                <TreeRowChevron
                    isFolder={isFolder}
                    isExpanded={isExpanded}
                    onClick={isFolder ? handleChevronClick : undefined}
                />
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
                            // eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions
                            <span
                                className={styles.decorator}
                                onClick={data.decoratorPropagatesClicks ? undefined : stopClickPropagation}
                            >
                                {data.decorator}
                            </span>
                        )}
                    </span>
                )}
                {data.actions !== undefined && data.actions !== null ? (
                    // eslint-disable-next-line jsx-a11y-x/click-events-have-key-events, jsx-a11y-x/no-static-element-interactions
                    <div className={styles.actions} onClick={stopClickPropagation}>
                        {data.actions}
                    </div>
                ) : null}
            </div>
        </div>
    );
};
