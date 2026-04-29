/* (c) Copyright Frontify Ltd., all rights reserved. */

import { syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature } from '@headless-tree/core';
import { useTree } from '@headless-tree/react';
import { Children, isValidElement, useMemo, type ReactElement, type ReactNode } from 'react';

import styles from './styles/tree.module.scss';

type Item = {
    id: string;
    name: string;
    children?: string[];
    isFolder?: boolean;
    parentId?: string;
    isExpanded?: boolean;
    onExpandChange?: (isExpanded: boolean) => void;
    isSelected?: boolean;
    onSelectChange?: (isSelected: boolean) => void;
    isFocused?: boolean;
    onFocusChange?: (isFocused: boolean) => void;
};

const isTreeItemElement = (element: ReactElement): element is ReactElement<TreeItemProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Item';

const isTreeFolderElement = (element: ReactElement): element is ReactElement<TreeFolderProps> =>
    (element.type as { displayName?: string })?.displayName === 'Tree.Folder';

// Walks the JSX children of <Tree.Root> and produces a flat Item[] for headless-tree's dataLoader.
// Components are matched by displayName (not identity) so HMR component swaps don't break the tree.
const parseChildren = (children: ReactNode, parentId: string = 'root'): Item[] => {
    return Children.toArray(children).reduce<Item[]>((acc, child) => {
        if (!isValidElement(child)) {
            return acc;
        }
        if (isTreeItemElement(child)) {
            const { id, children: name, isSelected, onSelectChange, isFocused, onFocusChange } = child.props;
            acc.push({
                id,
                name: typeof name === 'string' ? name : '',
                isFolder: false,
                parentId,
                isSelected,
                onSelectChange,
                isFocused,
                onFocusChange,
            });
        }
        if (isTreeFolderElement(child)) {
            const {
                id,
                name,
                children: folderChildren,
                isExpanded,
                onExpandChange,
                isSelected,
                onSelectChange,
                isFocused,
                onFocusChange,
            } = child.props;
            const parsedChildren = parseChildren(folderChildren, id);
            acc.push({
                id,
                name,
                isFolder: true,
                children: parsedChildren.filter((item) => item.parentId === id).map((item) => item.id),
                parentId,
                isExpanded,
                onExpandChange,
                isSelected,
                onSelectChange,
                isFocused,
                onFocusChange,
            });
            for (const descendant of parsedChildren) {
                acc.push(descendant);
            }
        }
        return acc;
    }, []);
};

export type TreeChangeState = {
    expandedItems: string[];
    selectedItems: string[];
    focusedItem?: string;
};

export type TreeRootProps = {
    children: ReactNode;
    onChange?: (state: TreeChangeState) => void;
};

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

    // Derive controlled state from per-item props. Memoized so the reference is stable across
    // renders unless content changes — otherwise headless-tree sees "new state" every render
    // and triggers an infinite loop.
    const expandedItems = items.filter((item) => item.isExpanded).map((item) => item.id);
    const selectedItems = items.filter((item) => item.isSelected).map((item) => item.id);
    const focusedItem = items.find((item) => item.isFocused)?.id;
    const treeState = useMemo<TreeChangeState>(
        () => ({ expandedItems, selectedItems, focusedItem }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [expandedItems.join('|'), selectedItems.join('|'), focusedItem],
    );

    // Single setState handler passed to headless-tree. Resolves the partial update into a full
    // next-state, fires per-item callbacks for any diffs (expand/select/focus), and emits the global onChange.
    const setTreeState = (
        updater: Partial<TreeChangeState> | ((prev: TreeChangeState) => Partial<TreeChangeState>),
    ) => {
        const partial = typeof updater === 'function' ? updater(treeState) : updater;
        const next: TreeChangeState = {
            expandedItems: partial.expandedItems ?? treeState.expandedItems,
            selectedItems: partial.selectedItems ?? treeState.selectedItems,
            focusedItem: 'focusedItem' in partial ? partial.focusedItem : treeState.focusedItem,
        };

        const fireDiff = (
            prev: string[],
            current: string[],
            getHandler: (item: Item) => ((value: boolean) => void) | undefined,
        ) => {
            const prevSet = new Set(prev);
            const nextSet = new Set(current);
            for (const id of nextSet) {
                if (!prevSet.has(id)) {
                    const item = items.find((i) => i.id === id);
                    if (item) {
                        getHandler(item)?.(true);
                    }
                }
            }
            for (const id of prevSet) {
                if (!nextSet.has(id)) {
                    const item = items.find((i) => i.id === id);
                    if (item) {
                        getHandler(item)?.(false);
                    }
                }
            }
        };

        fireDiff(treeState.expandedItems, next.expandedItems, (item) => item.onExpandChange);
        fireDiff(treeState.selectedItems, next.selectedItems, (item) => item.onSelectChange);
        if (treeState.focusedItem !== next.focusedItem) {
            if (treeState.focusedItem) {
                items.find((i) => i.id === treeState.focusedItem)?.onFocusChange?.(false);
            }
            if (next.focusedItem) {
                items.find((i) => i.id === next.focusedItem)?.onFocusChange?.(true);
            }
        }

        onChange?.(next);
    };

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
    const tree = useTree<Item>({
        rootItemId: 'root',
        getItemName: (item) => item.getItemData().name,
        isItemFolder: (item) => Boolean(item.getItemData().isFolder),
        dataLoader: {
            getItem: (itemId) => items.find((item) => item.id === itemId) as Item,
            getChildren: (itemId) => items.find((item) => item.id === itemId)?.children ?? [],
        },
        state: treeState,
        setState: setTreeState as never,
        indent: 20,
        features: [syncDataLoaderFeature, selectionFeature, hotkeysCoreFeature],
    });

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
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
};
TreeRoot.displayName = 'TreeRoot';

export type TreeItemProps = {
    // eslint-disable-next-line @eslint-react/no-unused-props
    children: ReactNode;
    // eslint-disable-next-line @eslint-react/no-unused-props
    id: string;
    // eslint-disable-next-line @eslint-react/no-unused-props
    isSelected?: boolean;
    // eslint-disable-next-line @eslint-react/no-unused-props
    onSelectChange?: (isSelected: boolean) => void;
    // eslint-disable-next-line @eslint-react/no-unused-props
    isFocused?: boolean;
    // eslint-disable-next-line @eslint-react/no-unused-props
    onFocusChange?: (isFocused: boolean) => void;
};

export const TreeItem = (_props: TreeItemProps) => {
    return null;
};
TreeItem.displayName = 'Tree.Item';

export type TreeFolderProps = {
    // eslint-disable-next-line @eslint-react/no-unused-props
    children: ReactNode;
    // eslint-disable-next-line @eslint-react/no-unused-props
    id: string;
    // eslint-disable-next-line @eslint-react/no-unused-props
    name: string;
    // eslint-disable-next-line @eslint-react/no-unused-props
    isExpanded?: boolean;
    // eslint-disable-next-line @eslint-react/no-unused-props
    onExpandChange?: (isExpanded: boolean) => void;
    // eslint-disable-next-line @eslint-react/no-unused-props
    isSelected?: boolean;
    // eslint-disable-next-line @eslint-react/no-unused-props
    onSelectChange?: (isSelected: boolean) => void;
    // eslint-disable-next-line @eslint-react/no-unused-props
    isFocused?: boolean;
    // eslint-disable-next-line @eslint-react/no-unused-props
    onFocusChange?: (isFocused: boolean) => void;
};
export const TreeFolder = (_props: TreeFolderProps): null => null;
TreeFolder.displayName = 'Tree.Folder';

export const Tree = {
    Root: TreeRoot,
    Item: TreeItem,
    Folder: TreeFolder,
};
