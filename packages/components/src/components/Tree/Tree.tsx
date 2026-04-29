/* (c) Copyright Frontify Ltd., all rights reserved. */

import { syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { Children, createContext, forwardRef, isValidElement, useMemo, useState, type ReactNode } from 'react';

import styles from './styles/tree.module.scss';

type Item = {
    id: string;
    name: string;
    children?: string[];
    isFolder?: boolean;
    isRed?: boolean;
    parentId?: string;
};

export type TreeContextProps = {
    setTreeItems: (treeItems: (prev: Item[]) => Item[]) => void;
};
const TreeContext = createContext<TreeContextProps>({} as TreeContextProps);
TreeContext.displayName = 'TreeContext';

const parseChildren = (children: ReactNode, parentId: string = 'root') => {
    return Children.toArray(children).reduce((acc, child) => {
        if (isValidElement(child)) {
            if (child.type === TreeItem) {
                acc.push({
                    id: child.props.id,
                    name: child.props.children as string,
                    isFolder: false,
                    parentId,
                });
            }
            if (child.type === TreeFolder) {
                const parsedChildren = parseChildren(child.props.children, child.props.id);
                acc.push({
                    id: child.props.id,
                    name: child.props.name,
                    isFolder: true,
                    children: parsedChildren.filter((item) => item.parentId === child.props.id).map((item) => item.id),
                    parentId,
                });
                for (const child of parsedChildren) {
                    acc.push(child);
                }
            }
        }
        return acc;
    }, [] as Item[]);
};

export type TreeRootProps = {
    children: ReactNode;
};

export const TreeRoot = ({ children }: TreeRootProps) => {
    const parsedChildren = parseChildren(children, 'root');
    console.log('parsedChildren', parsedChildren);
    const items = [
        {
            id: 'root',
            name: 'Root',
            children: parsedChildren.filter((item) => item.parentId === 'root').map((item) => item.id),
            isFolder: true,
        },
        ...parsedChildren,
    ];
    const [treeItems, setTreeItems] = useState<Item[]>([]);

    const tree = useTree<Item>({
        rootItemId: 'root',
        getItemName: (item) => item.getItemData().name,
        isItemFolder: (item) => Boolean(item.getItemData().isFolder),
        dataLoader: {
            
            getItem: (itemId) => items.find((item) => item.id === itemId) as Item,
            getChildren: (itemId) => items.find((item) => item.id === itemId)?.children ?? [],
        },
        indent: 20,
        features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
    });

    return (
        <TreeContext.Provider value={useMemo(() => ({ setTreeItems }), [setTreeItems])}>
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
        </TreeContext.Provider>
    );
};
TreeRoot.displayName = 'TreeRoot';

export type TreeItemProps = {
    children: ReactNode;
    id: string;
};

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(({ children, id }, ref) => {
    return null;
});
TreeItem.displayName = 'TreeItem';

export type TreeFolderProps = {
    children: ReactNode;
    id: string;
    name: string;
};

export const TreeFolder = forwardRef<HTMLDivElement, TreeFolderProps>(({ children, id, name }, ref) => {
    return (
        <div ref={ref} className={styles.treeFolder}>
            {children}
        </div>
    );
});
TreeFolder.displayName = 'TreeFolder';

export const Tree = {
    Root: forwardRef<HTMLDivElement, TreeRootProps>(TreeRoot),
    Item: TreeItem,
    Folder: TreeFolder,
};
