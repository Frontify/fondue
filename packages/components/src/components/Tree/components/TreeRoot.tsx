/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, useId, useMemo, type ReactNode } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type TreeChangeState, type TreeDropCandidate } from '../types';
import { computeLoadingInsertions } from '../utils/computeLoadingInsertions';
import { isNoopDrop } from '../utils/isNoopDrop';
import { parseChildren } from '../utils/parseChildren';

import { TreeDragLine } from './TreeDragLine';
import { TreeLoadingRow } from './TreeLoadingRow';
import { TreeRow } from './TreeRow';

export type TreeRootProps = {
    children: ReactNode;
    onChange?: (state: TreeChangeState) => void;
    /**
     * Renders a checkbox in each row for multi-selection. Folder checkboxes show an
     * indeterminate state when some descendants are checked and cascade-toggle their
     * descendants on click.
     * @default false
     */
    multiSelect?: boolean;
    /**
     * Enables drag-and-drop reordering of items. When false, items are static and
     * no drag handle is rendered.
     * @default false
     */
    reorderable?: boolean;
    /**
     * Predicate gating drops onto the top level of the tree. Same semantics as
     * `accepts` on `<Tree.Folder>`: return `false` to suppress the drop indicator,
     * show the "no-drop" cursor, and prevent `onMove` / `onChange` from firing.
     * When omitted, the root accepts anything.
     */
    accepts?: (items: TreeDropCandidate[]) => boolean;
};

export const TreeRoot = ({ children, onChange, multiSelect = false, reorderable = false, accepts }: TreeRootProps) => {
    const { t } = useTranslation();
    const rowHintId = useId();
    const { items, parentIsLoading: rootIsLoading } = useMemo(() => parseChildren(children), [children]);
    const tree = useTreeController({ items, onChange, reorderable, rootAccepts: accepts });

    const visibleItems = tree.getItems();
    const loadingInsertions = useMemo(
        () => computeLoadingInsertions(visibleItems, rootIsLoading),
        [visibleItems, rootIsLoading],
    );

    const rowHint = [multiSelect && t('Tree_checkboxHint'), reorderable && t('Tree_reorderHint')]
        .filter(Boolean)
        .join(' ');

    return (
        <div {...tree.getContainerProps()} className={styles.tree}>
            {rowHint && (
                <span id={rowHintId} className={styles.srOnly}>
                    {rowHint}
                </span>
            )}
            {visibleItems.map((item, index) => {
                const loadingPlaceholder = loadingInsertions.byIndex.get(index);
                return (
                    <Fragment key={item.getId()}>
                        <TreeRow
                            item={item}
                            multiSelect={multiSelect}
                            reorderable={reorderable}
                            hintId={rowHint ? rowHintId : undefined}
                        />
                        {loadingPlaceholder && (
                            <TreeLoadingRow
                                level={loadingPlaceholder.level}
                                multiSelect={multiSelect}
                                reorderable={reorderable}
                            />
                        )}
                    </Fragment>
                );
            })}
            {loadingInsertions.rootLoading && (
                <TreeLoadingRow
                    level={loadingInsertions.rootLoading.level}
                    multiSelect={multiSelect}
                    reorderable={reorderable}
                />
            )}
            {reorderable && <TreeDragLine data={isNoopDrop(tree) ? null : tree.getDragLineData()} />}
        </div>
    );
};
TreeRoot.displayName = 'TreeRoot';
