/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDotsHorizontal, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useCallback, useState, type ReactNode } from 'react';
import { action } from 'storybook/actions';

import { Button } from '#/index';

import { Tree, TreeFolder, TreeItem, TreeItemAction, TreeLoading, type TreeRoot, type TreeChangeState } from './Tree';

type Story = StoryObj<typeof TreeRoot>;

const meta: Meta<typeof TreeRoot> = {
    title: 'Components/Tree',
    component: Tree.Root,
    subcomponents: {
        'Tree.Item': TreeItem,
        'Tree.Folder': TreeFolder,
        'Tree.ItemAction': TreeItemAction,
        'Tree.Loading': TreeLoading,
    },
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        onChange: action('onChange'),
    },
};
export default meta;

const renderNodes = (nodes: TreeChangeState): ReactNode =>
    nodes.map((node) =>
        node.isFolder ? (
            <Tree.Folder
                key={node.id}
                id={node.id}
                label={node.name}
                isExpanded={node.isExpanded}
                isSelected={node.isSelected}
                isActive={node.isActive}
            >
                {renderNodes(node.children ?? [])}
            </Tree.Folder>
        ) : (
            <Tree.Item
                key={node.id}
                id={node.id}
                label={node.name}
                isSelected={node.isSelected}
                isActive={node.isActive}
            />
        ),
    );

const defaultNodes: TreeChangeState = [
    { id: '1', name: 'Item 1', isFolder: false },
    {
        id: 'a',
        name: 'Folder a',
        isFolder: true,
        isExpanded: true,
        children: [
            { id: 'a1', name: 'Item a1', isFolder: false },
            { id: 'a2', name: 'Item a2', isFolder: false },
        ],
    },
    {
        id: 'b',
        name: 'Folder b',
        isFolder: true,
        isExpanded: false,
        children: [
            { id: 'b1', name: 'Item b1', isFolder: false },
            { id: 'b2', name: 'Item b2', isFolder: false },
        ],
    },
];

export const Default: Story = {
    parameters: {
        manifest: {
            canonical: true,
        },
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(defaultNodes);
        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {renderNodes(nodes)}
            </Tree.Root>
        );
    },
};

const flatNodes: TreeChangeState = [
    { id: '1', name: 'Item 1', isFolder: false },
    { id: '2', name: 'Item 2', isFolder: false },
    { id: '3', name: 'Item 3', isFolder: false },
    { id: '4', name: 'Item 4', isFolder: false },
];

export const FlatList: Story = {
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(flatNodes);
        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {renderNodes(nodes)}
            </Tree.Root>
        );
    },
};

const nestedFolderNodes: TreeChangeState = [
    {
        id: 'src',
        name: 'src',
        isFolder: true,
        isExpanded: true,
        children: [
            {
                id: 'src/components',
                name: 'components',
                isFolder: true,
                isExpanded: true,
                children: [
                    {
                        id: 'src/components/Tree',
                        name: 'Tree',
                        isFolder: true,
                        isExpanded: true,
                        children: [
                            { id: 'src/components/Tree/index.ts', name: 'index.ts', isFolder: false },
                            { id: 'src/components/Tree/Tree.tsx', name: 'Tree.tsx', isFolder: false },
                            { id: 'src/components/Tree/types.ts', name: 'types.ts', isFolder: false },
                        ],
                    },
                    { id: 'src/components/Button.tsx', name: 'Button.tsx', isFolder: false },
                ],
            },
            { id: 'src/index.ts', name: 'index.ts', isFolder: false },
        ],
    },
    { id: 'package.json', name: 'package.json', isFolder: false },
    { id: 'README.md', name: 'README.md', isFolder: false },
];

export const NestedFolders: Story = {
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(nestedFolderNodes);
        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {renderNodes(nodes)}
            </Tree.Root>
        );
    },
};

const multiSelectNodes: TreeChangeState = [
    {
        id: 'a',
        name: 'Folder a',
        isFolder: true,
        isExpanded: true,
        children: [
            { id: 'a1', name: 'Item a1', isFolder: false, isSelected: true },
            { id: 'a2', name: 'Item a2', isFolder: false, isSelected: true },
        ],
    },
    {
        id: 'b',
        name: 'Folder b',
        isFolder: true,
        isExpanded: true,
        children: [
            { id: 'b1', name: 'Item b1', isFolder: false, isSelected: true },
            { id: 'b2', name: 'Item b2', isFolder: false },
            { id: 'b3', name: 'Item b3', isFolder: false },
        ],
    },
    { id: 'c', name: 'Item c', isFolder: false },
];

export const MultiSelect: Story = {
    args: {
        multiSelect: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(multiSelectNodes);
        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {renderNodes(nodes)}
            </Tree.Root>
        );
    },
};

const reorderableNodes: TreeChangeState = [
    { id: '1', name: 'Item 1', isFolder: false },
    { id: '2', name: 'Item 2', isFolder: false },
    {
        id: 'a',
        name: 'Folder a',
        isFolder: true,
        isExpanded: true,
        children: [
            { id: 'a1', name: 'Item a1', isFolder: false },
            { id: 'a2', name: 'Item a2', isFolder: false },
        ],
    },
    {
        id: 'b',
        name: 'Folder b',
        isFolder: true,
        isExpanded: true,
        children: [
            { id: 'b1', name: 'Item b1', isFolder: false },
            { id: 'b2', name: 'Item b2', isFolder: false },
        ],
    },
];

export const Reorderable: Story = {
    args: {
        reorderable: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(reorderableNodes);
        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {renderNodes(nodes)}
            </Tree.Root>
        );
    },
};

const multiSelectReorderableNodes: TreeChangeState = [
    { id: '1', name: 'Item 1', isFolder: false },
    {
        id: 'a',
        name: 'Folder a',
        isFolder: true,
        isExpanded: true,
        children: [
            { id: 'a1', name: 'Item a1', isFolder: false, isSelected: true },
            { id: 'a2', name: 'Item a2', isFolder: false },
        ],
    },
    {
        id: 'b',
        name: 'Folder b',
        isFolder: true,
        isExpanded: false,
        children: [
            { id: 'b1', name: 'Item b1', isFolder: false, isSelected: true },
            { id: 'b2', name: 'Item b2', isFolder: false },
            {
                id: 'b3',
                name: 'Folder b3',
                isFolder: true,
                isExpanded: false,
                children: [
                    { id: 'b31', name: 'Item b31', isFolder: false },
                    { id: 'b32', name: 'Item b32', isFolder: false, isSelected: true },
                    { id: 'b33', name: 'Item b33', isFolder: false },
                ],
            },
        ],
    },
];

export const MultiSelectAndReorderable: Story = {
    args: {
        multiSelect: true,
        reorderable: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(multiSelectReorderableNodes);
        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {renderNodes(nodes)}
            </Tree.Root>
        );
    },
};

const navigationNodes: TreeChangeState = [
    { id: 'home', name: 'Home', isFolder: false },
    {
        id: 'projects',
        name: 'Projects',
        isFolder: true,
        isExpanded: true,
        children: [
            { id: 'projects/alpha', name: 'Alpha', isFolder: false },
            { id: 'projects/beta', name: 'Beta', isFolder: false },
            { id: 'projects/gamma', name: 'Gamma', isFolder: false },
        ],
    },
    { id: 'settings', name: 'Settings', isFolder: false },
];

const renderNavigationNodes = (nodes: TreeChangeState, activeId: string, onSelect: (id: string) => void): ReactNode =>
    nodes.map((node) =>
        node.isFolder ? (
            <Tree.Folder
                key={node.id}
                id={node.id}
                label={node.name}
                isExpanded={node.isExpanded}
                isActive={node.id === activeId}
                onClick={() => onSelect(node.id)}
            >
                {renderNavigationNodes(node.children ?? [], activeId, onSelect)}
            </Tree.Folder>
        ) : (
            <Tree.Item
                key={node.id}
                id={node.id}
                label={node.name}
                isActive={node.id === activeId}
                onClick={() => onSelect(node.id)}
            />
        ),
    );

export const AsNavigation: Story = {
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(navigationNodes);
        const [activeId, setActiveId] = useState<string>('projects/alpha');

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {renderNavigationNodes(nodes, activeId, setActiveId)}
            </Tree.Root>
        );
    },
};

export const WithPerItemHandlers: Story = {
    args: {
        multiSelect: true,
        reorderable: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(multiSelectReorderableNodes);
        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                <Tree.Item
                    id="1"
                    label="Item 1"
                    isSelected={nodes.find((node) => node.id === '1')?.isSelected}
                    onClick={action('Item 1 onClick')}
                    onSelectChange={action('Item 1 onSelectChange')}
                    onMove={action('Item 1 onMove')}
                />
                <Tree.Folder
                    id="a"
                    label="Folder a"
                    isExpanded={nodes.find((node) => node.id === 'a')?.isExpanded}
                    isSelected={nodes.find((node) => node.id === 'a')?.isSelected}
                    onClick={action('Folder a onClick')}
                    onExpandChange={action('Folder a onExpandChange')}
                    onSelectChange={action('Folder a onSelectChange')}
                    onMove={action('Folder a onMove')}
                >
                    {(nodes.find((node) => node.id === 'a')?.children ?? []).map((child) => (
                        <Tree.Item
                            key={child.id}
                            id={child.id}
                            label={child.name}
                            isSelected={child.isSelected}
                            onClick={action(`${child.name} onClick`)}
                            onSelectChange={action(`${child.name} onSelectChange`)}
                            onMove={action(`${child.name} onMove`)}
                        />
                    ))}
                </Tree.Folder>
            </Tree.Root>
        );
    },
};

type LazyChildren =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'loaded'; children: Array<{ id: string; name: string; isFolder: boolean }> };

const lazyRootNodes: Array<{ id: string; name: string; isFolder: boolean }> = [
    { id: 'documents', name: 'Documents', isFolder: true },
    { id: 'pictures', name: 'Pictures', isFolder: true },
    { id: 'downloads', name: 'Downloads', isFolder: true },
    { id: 'README.md', name: 'README.md', isFolder: false },
];

const lazyChildrenByParent: Record<string, Array<{ id: string; name: string; isFolder: boolean }>> = {
    documents: [
        { id: 'documents/reports', name: 'reports', isFolder: true },
        { id: 'documents/invoice.pdf', name: 'invoice.pdf', isFolder: false },
        { id: 'documents/notes.txt', name: 'notes.txt', isFolder: false },
    ],
    pictures: [
        { id: 'pictures/vacation', name: 'vacation', isFolder: true },
        { id: 'pictures/avatar.png', name: 'avatar.png', isFolder: false },
    ],
    downloads: [
        { id: 'downloads/installer.dmg', name: 'installer.dmg', isFolder: false },
        { id: 'downloads/archive.zip', name: 'archive.zip', isFolder: false },
    ],
    'documents/reports': [
        { id: 'documents/reports/q1.pdf', name: 'q1.pdf', isFolder: false },
        { id: 'documents/reports/q2.pdf', name: 'q2.pdf', isFolder: false },
    ],
    'pictures/vacation': [
        { id: 'pictures/vacation/beach.jpg', name: 'beach.jpg', isFolder: false },
        { id: 'pictures/vacation/sunset.jpg', name: 'sunset.jpg', isFolder: false },
    ],
};

const fetchLazyChildren = (parentId: string): Promise<Array<{ id: string; name: string; isFolder: boolean }>> =>
    new Promise((resolve) => {
        setTimeout(() => resolve(lazyChildrenByParent[parentId] ?? []), 600);
    });

export const LazyLoading: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Children of a folder can be fetched on demand: keep the folder rendered with no children initially, ' +
                    'and on `onExpandChange` fetch the data and re-render with the new children. Render `<Tree.Loading />` ' +
                    'as the only child while the request is in flight — it shows a non-interactive placeholder row that sits ' +
                    'outside drag-and-drop, multi-select counts, and keyboard navigation. Once loaded, children are cached so ' +
                    'subsequent collapse/expand cycles do not refetch.',
            },
        },
    },
    render: (args) => {
        const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
        const [childrenByParent, setChildrenByParent] = useState<Record<string, LazyChildren>>({});

        const loadChildren = useCallback(async (parentId: string) => {
            setChildrenByParent((prev) => ({ ...prev, [parentId]: { status: 'loading' } }));
            const children = await fetchLazyChildren(parentId);
            setChildrenByParent((prev) => ({ ...prev, [parentId]: { status: 'loaded', children } }));
        }, []);

        const handleExpandChange = useCallback(
            (id: string, isExpanded: boolean) => {
                setExpandedIds((prev) => {
                    const next = new Set(prev);
                    if (isExpanded) {
                        next.add(id);
                    } else {
                        next.delete(id);
                    }
                    return next;
                });
                if (isExpanded && !childrenByParent[id]) {
                    loadChildren(id).catch(() => {});
                }
            },
            [childrenByParent, loadChildren],
        );

        const renderLazyNodes = (nodes: Array<{ id: string; name: string; isFolder: boolean }>): ReactNode =>
            nodes.map((node) => {
                if (!node.isFolder) {
                    return <Tree.Item key={node.id} id={node.id} label={node.name} />;
                }
                const entry = childrenByParent[node.id];
                return (
                    <Tree.Folder
                        key={node.id}
                        id={node.id}
                        label={node.name}
                        isExpanded={expandedIds.has(node.id)}
                        onExpandChange={(isExpanded) => handleExpandChange(node.id, isExpanded)}
                    >
                        {entry?.status === 'loading' && <Tree.Loading />}
                        {entry?.status === 'loaded' && renderLazyNodes(entry.children)}
                    </Tree.Folder>
                );
            });

        return <Tree.Root {...args}>{renderLazyNodes(lazyRootNodes)}</Tree.Root>;
    },
};

export const WithItemActions: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Render trailing controls on any row by nesting `<Tree.ItemAction>` inside a ' +
                    '`<Tree.Item>` or `<Tree.Folder>`. Clicks inside the action slot do not bubble to ' +
                    "the row, so the action button can fire without also triggering the row's " +
                    '`onClick` or expand-toggle.',
            },
        },
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(defaultNodes);
        const renderActionNodes = (treeNodes: TreeChangeState): ReactNode =>
            treeNodes.map((node) =>
                node.isFolder ? (
                    <Tree.Folder
                        key={node.id}
                        id={node.id}
                        label={node.name}
                        isExpanded={node.isExpanded}
                        isSelected={node.isSelected}
                        isActive={node.isActive}
                    >
                        <Tree.ItemAction>
                            <Button aspect="square" emphasis="default" size="small" onPress={action('Folder action')}>
                                <IconDotsHorizontal size={16} />
                            </Button>
                        </Tree.ItemAction>
                        {renderActionNodes(node.children ?? [])}
                    </Tree.Folder>
                ) : (
                    <Tree.Item
                        key={node.id}
                        id={node.id}
                        label={node.name}
                        isSelected={node.isSelected}
                        isActive={node.isActive}
                    >
                        <Tree.ItemAction>
                            <Button aspect="square" emphasis="default" size="small" onPress={action('Item delete')}>
                                <IconTrashBin size={16} />
                            </Button>
                        </Tree.ItemAction>
                    </Tree.Item>
                ),
            );
        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {renderActionNodes(nodes)}
            </Tree.Root>
        );
    },
};

export const StateInspector: Story = {
    args: {
        multiSelect: true,
        reorderable: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>(multiSelectReorderableNodes);
        return (
            <div style={{ display: 'flex', gap: 24 }}>
                <Tree.Root
                    {...args}
                    onChange={(state) => {
                        args.onChange?.(state);
                        setNodes(state);
                    }}
                >
                    {renderNodes(nodes)}
                </Tree.Root>
                <pre style={{ fontSize: 12 }}>{JSON.stringify(nodes, null, 2)}</pre>
            </div>
        );
    },
};
