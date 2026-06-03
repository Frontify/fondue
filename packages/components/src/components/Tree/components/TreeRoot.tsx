/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssistiveTreeDescription } from '@headless-tree/react';
import { useId, useMemo, type ReactNode } from 'react';

import { useTranslation } from '#/hooks/useTranslation';

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type TreeChangeState } from '../types';
import { isNoopDrop } from '../utils/isNoopDrop';
import { parseChildren } from '../utils/parseChildren';

import { TreeDragLine } from './TreeDragLine';
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
};

export const TreeRoot = ({ children, onChange, multiSelect = false, reorderable = false }: TreeRootProps) => {
    const { t } = useTranslation();
    const reorderHintId = useId();
    const items = useMemo(() => parseChildren(children), [children]);
    const tree = useTreeController({ items, onChange, reorderable });

    return (
        <div {...tree.getContainerProps()} className={styles.tree}>
            {reorderable && (
                <span id={reorderHintId} className={styles.srOnly}>
                    {t('Tree_reorderHint')}
                </span>
            )}
            <AssistiveTreeDescription tree={tree} />
            {tree.getItems().map((item) => (
                <TreeRow
                    key={item.getId()}
                    item={item}
                    multiSelect={multiSelect}
                    reorderable={reorderable}
                    reorderHintId={reorderHintId}
                />
            ))}
            {reorderable && <TreeDragLine data={isNoopDrop(tree) ? null : tree.getDragLineData()} />}
        </div>
    );
};
TreeRoot.displayName = 'TreeRoot';
