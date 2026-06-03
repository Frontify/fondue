/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssistiveTreeDescription } from '@headless-tree/react';
import { Fragment, useId, useMemo, type ReactNode } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type TreeChangeState } from '../types';
import { isNoopDrop } from '../utils/isNoopDrop';
import { parseChildren } from '../utils/parseChildren';

import { TreeDragLine } from './TreeDragLine';
import { TreeLoadingRow } from './TreeLoadingRow';
import { TreeRow } from './TreeRow';

const ROOT_ID = 'root';

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
};

export const TreeRoot = ({ children, onChange, multiSelect = false, reorderable = false }: TreeRootProps) => {
    const { t } = useTranslation();
    const reorderHintId = useId();
    const { items, loadingByParent } = useMemo(() => parseChildren(children), [children]);
    const tree = useTreeController({ items, onChange, reorderable });

    const visibleItems = tree.getItems();

    // Loading rows are rendered as siblings of the folder's last visible descendant. For each
    // parent that has a loading marker we precompute the visible-item index after which the
    // placeholder should appear (the last descendant inside `parent`, or `parent` itself when
    // it's expanded but empty). Root-level loading rows are emitted at the very end.
    const loadingInsertions = useMemo(() => {
        const byIndex = new Map<number, Array<{ level: number; label?: string; key: string }>>();
        let rootLoading: Array<{ level: number; label?: string; key: string }> | null = null;

        for (const [parentId, entries] of loadingByParent) {
            const placeholders = entries.map((entry, i) => ({
                level: 0, // overwritten below
                label: entry.label,
                key: `${parentId}__loading_${i}`,
            }));

            if (parentId === ROOT_ID) {
                for (const placeholder of placeholders) {
                    placeholder.level = 0;
                }
                rootLoading = placeholders;
                continue;
            }

            const parentIndex = visibleItems.findIndex((item) => item.getId() === parentId);
            const parent = parentIndex === -1 ? undefined : visibleItems[parentIndex];
            if (!parent || !parent.isExpanded()) {
                continue;
            }
            const parentLevel = parent.getItemMeta().level;
            const childLevel = parentLevel + 1;
            let lastDescendantIndex = parentIndex;
            for (let i = parentIndex + 1; i < visibleItems.length; i++) {
                const candidate = visibleItems[i];
                if (candidate && candidate.getItemMeta().level > parentLevel) {
                    lastDescendantIndex = i;
                } else {
                    break;
                }
            }
            for (const placeholder of placeholders) {
                placeholder.level = childLevel;
            }
            byIndex.set(lastDescendantIndex, placeholders);
        }

        return { byIndex, rootLoading };
    }, [loadingByParent, visibleItems]);

    return (
        <div {...tree.getContainerProps()} className={styles.tree}>
            {reorderable && (
                <span id={reorderHintId} className={styles.srOnly}>
                    {t('Tree_reorderHint')}
                </span>
            )}
            <AssistiveTreeDescription tree={tree} />
            {visibleItems.map((item, index) => (
                <Fragment key={item.getId()}>
                    <TreeRow
                        item={item}
                        multiSelect={multiSelect}
                        reorderable={reorderable}
                        reorderHintId={reorderHintId}
                    />
                    {loadingInsertions.byIndex.get(index)?.map((placeholder) => (
                        <TreeLoadingRow key={placeholder.key} level={placeholder.level} label={placeholder.label} />
                    ))}
                </Fragment>
            ))}
            {loadingInsertions.rootLoading?.map((placeholder) => (
                <TreeLoadingRow key={placeholder.key} level={placeholder.level} label={placeholder.label} />
            ))}
            {reorderable && <TreeDragLine data={isNoopDrop(tree) ? null : tree.getDragLineData()} />}
        </div>
    );
};
TreeRoot.displayName = 'TreeRoot';
