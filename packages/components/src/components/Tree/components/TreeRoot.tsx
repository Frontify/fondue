/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useTreeController } from '../hooks/useTreeController';
import styles from '../styles/tree.module.scss';
import { type Item, type TreeRootProps } from '../types';
import { parseChildren } from '../utils/parseChildren';

// Top-level tree component. Parses its JSX children into items, drives headless-tree's state,
// and emits change events both per-item (onExpandChange / onSelectChange / onFocusChange) and globally (onChange).
export const TreeRoot = ({ children, onChange }: TreeRootProps) => {
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

    const tree = useTreeController({ items, onChange });

    return (
        <div {...tree.getContainerProps()} className={styles.tree}>
            {tree.getItems().map((item) => (
                <button
                    key={item.getId()}
                    type="button"
                    {...item.getProps()}
                    style={{ paddingLeft: `${item.getItemMeta().level * 20}px` }}
                >
                    <div
                        className={styles.treeitem}
                        data-focused={item.isFocused()}
                        data-expanded={item.isExpanded()}
                        data-selected={item.isSelected()}
                        data-folder={item.isFolder()}
                    >
                        {item.getItemName()}
                    </div>
                </button>
            ))}
        </div>
    );
};
TreeRoot.displayName = 'TreeRoot';
