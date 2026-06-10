/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconDotsHorizontal, IconTrashBin } from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { action } from 'storybook/actions';

import { Button } from '#/index';

import {
    Tree,
    TreeFolder,
    TreeItem,
    TreeItemAction,
    TreeLoading,
    type TreeRoot,
    type TreeChangeState,
    type TreeNodeState,
} from './Tree';

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
            type: 'beta',
        },
    },
    args: {
        onChange: action('onChange'),
    },
};
export default meta;

export const Default: Story = {
    parameters: {
        manifest: {
            canonical: true,
        },
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
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
        ]);

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} label={n.name} isExpanded={n.isExpanded}>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name} />
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
    },
};

export const FlatList: Story = {
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
            { id: '1', name: 'Item 1', isFolder: false },
            { id: '2', name: 'Item 2', isFolder: false },
            { id: '3', name: 'Item 3', isFolder: false },
            { id: '4', name: 'Item 4', isFolder: false },
        ]);

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map((n) => (
                    <Tree.Item key={n.id} id={n.id} label={n.name} />
                ))}
            </Tree.Root>
        );
    },
};

export const NestedFolders: Story = {
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
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
        ]);

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} label={n.name} isExpanded={n.isExpanded}>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name} />
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
    },
};

export const SingleSelect: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Without `multiSelect`, clicking a row selects it: the Tree tracks single-select state ' +
                    'internally, highlights the selected row, and emits the new `isSelected` flag via ' +
                    '`onChange`. Consumers re-render straight from that state — no parallel `selectedId` ' +
                    'needed — and `aria-selected="true"` follows the highlight for screen readers.',
            },
        },
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
            { id: '1', name: 'Item 1', isFolder: false },
            { id: '2', name: 'Item 2', isFolder: false, isSelected: true },
            { id: '3', name: 'Item 3', isFolder: false },
        ]);

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map((n) => (
                    <Tree.Item key={n.id} id={n.id} label={n.name} isSelected={n.isSelected} />
                ))}
            </Tree.Root>
        );
    },
};

export const MultiSelect: Story = {
    args: {
        multiSelect: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
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
        ]);

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} label={n.name} isExpanded={n.isExpanded} isSelected={n.isSelected}>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name} isSelected={n.isSelected} />
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
    },
};

export const Reorderable: Story = {
    args: {
        reorderable: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
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
        ]);

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} label={n.name} isExpanded={n.isExpanded}>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name} />
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
    },
};

export const MultiSelectAndReorderable: Story = {
    args: {
        multiSelect: true,
        reorderable: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
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
        ]);

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} label={n.name} isExpanded={n.isExpanded} isSelected={n.isSelected}>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name} isSelected={n.isSelected} />
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
    },
};

export const RestrictedDrops: Story = {
    args: {
        reorderable: true,
    },
    parameters: {
        docs: {
            description: {
                story:
                    'Each row carries `tags`, and `<Tree.Folder>` / `<Tree.Root>` can provide an `accepts` ' +
                    'predicate to gate drops. When `accepts` returns `false`, the drag indicator is hidden, ' +
                    'the cursor shows "no-drop", and the drop is blocked before `onMove` / `onChange` fire. ' +
                    'Here `Images` only accepts rows tagged `image`, `Documents` only accepts `document`, ' +
                    'and the root rejects bare archive files (try dragging `archive.zip` to the top level).',
            },
        },
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
            {
                id: 'images',
                name: 'Images',
                isFolder: true,
                isExpanded: true,
                children: [
                    { id: 'beach.jpg', name: 'beach.jpg', isFolder: false, tags: ['image'] },
                    { id: 'avatar.png', name: 'avatar.png', isFolder: false, tags: ['image'] },
                ],
            },
            {
                id: 'documents',
                name: 'Documents',
                isFolder: true,
                isExpanded: true,
                children: [
                    { id: 'invoice.pdf', name: 'invoice.pdf', isFolder: false, tags: ['document'] },
                    { id: 'notes.txt', name: 'notes.txt', isFolder: false, tags: ['document'] },
                ],
            },
            {
                id: 'mixed',
                name: 'Mixed bin (accepts anything)',
                isFolder: true,
                isExpanded: true,
                children: [{ id: 'archive.zip', name: 'archive.zip', isFolder: false, tags: ['archive'] }],
            },
            { id: 'sunset.jpg', name: 'sunset.jpg', isFolder: false, tags: ['image'] },
            { id: 'readme.md', name: 'readme.md', isFolder: false, tags: ['document'] },
        ]);

        const acceptsByFolder: Record<string, (items: { tags: string[] }[]) => boolean> = {
            images: (items) => items.every((i) => i.tags.includes('image')),
            documents: (items) => items.every((i) => i.tags.includes('document')),
        };

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder
                    key={n.id}
                    id={n.id}
                    label={n.name}
                    isExpanded={n.isExpanded}
                    tags={n.tags}
                    accepts={acceptsByFolder[n.id]}
                >
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name} tags={n.tags} />
            );

        return (
            <Tree.Root
                {...args}
                accepts={(items) => items.every((i) => !i.tags.includes('archive'))}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
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
        const [nodes, setNodes] = useState<TreeChangeState>([
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
        ]);

        const folderAction = (
            <Tree.ItemAction>
                <Button aspect="square" emphasis="default" size="small" onPress={action('Folder action')}>
                    <IconDotsHorizontal size={16} />
                </Button>
            </Tree.ItemAction>
        );
        const itemAction = (
            <Tree.ItemAction>
                <Button aspect="square" emphasis="default" size="small" onPress={action('Item delete')}>
                    <IconTrashBin size={16} />
                </Button>
            </Tree.ItemAction>
        );

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} label={n.name} isExpanded={n.isExpanded}>
                    {folderAction}
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name}>
                    {itemAction}
                </Tree.Item>
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
    },
};

export const AsNavigation: Story = {
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
            { id: 'home', name: 'Home', isFolder: false },
            {
                id: 'projects',
                name: 'Projects',
                isFolder: true,
                isExpanded: true,
                children: [
                    { id: 'projects/alpha', name: 'Alpha', isFolder: false, isSelected: true },
                    { id: 'projects/beta', name: 'Beta', isFolder: false },
                    { id: 'projects/gamma', name: 'Gamma', isFolder: false },
                ],
            },
            { id: 'settings', name: 'Settings', isFolder: false },
        ]);

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} label={n.name} isExpanded={n.isExpanded} isSelected={n.isSelected}>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name} isSelected={n.isSelected} />
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
    },
};

export const Empty: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    '`<Tree.Root>` renders an empty container when given no children. The container keeps its ' +
                    'minimum height so the layout does not collapse, but no rows are produced.',
            },
        },
    },
    render: (args) => <Tree.Root {...args} />,
};

export const InitialLoading: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'When the entire top-level tree is being fetched, render `<Tree.Loading />` as a direct ' +
                    'child of `<Tree.Root>`. It appears at the bottom of the (empty) list while data is in ' +
                    'flight, then is replaced by real rows once the fetch resolves.',
            },
        },
    },
    render: (args) => {
        const initialNodes: TreeChangeState = [
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
        ];
        const [nodes, setNodes] = useState<TreeChangeState | null>(null);

        const startLoad = () => {
            setNodes(null);
            setTimeout(() => setNodes(initialNodes), 800);
        };

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} label={n.name} isExpanded={n.isExpanded}>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} label={n.name} />
            );

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                    <Button emphasis="default" onPress={startLoad}>
                        Reload top-level
                    </Button>
                </div>
                <Tree.Root
                    {...args}
                    onChange={(state) => {
                        args.onChange?.(state);
                        setNodes(state);
                    }}
                >
                    {nodes === null ? <Tree.Loading /> : nodes.map(renderNode)}
                </Tree.Root>
            </div>
        );
    },
};

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
        type LazyNode = { id: string; name: string; isFolder: boolean };
        type ChildrenState = { status: 'loading' } | { status: 'loaded'; children: LazyNode[] };

        const rootNodes: LazyNode[] = [
            { id: 'documents', name: 'Documents', isFolder: true },
            { id: 'pictures', name: 'Pictures', isFolder: true },
            { id: 'downloads', name: 'Downloads', isFolder: true },
            { id: 'README.md', name: 'README.md', isFolder: false },
        ];
        const childrenByParent: Record<string, LazyNode[]> = {
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
        const fetchChildren = (parentId: string): Promise<LazyNode[]> =>
            new Promise((resolve) => {
                setTimeout(() => resolve(childrenByParent[parentId] ?? []), 600);
            });

        const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
        const [childrenState, setChildrenState] = useState<Record<string, ChildrenState>>({});

        const handleExpand = (id: string, isExpanded: boolean) => {
            setExpandedIds((prev) => {
                const next = new Set(prev);
                if (isExpanded) {
                    next.add(id);
                } else {
                    next.delete(id);
                }
                return next;
            });
            if (isExpanded && !childrenState[id]) {
                setChildrenState((prev) => ({ ...prev, [id]: { status: 'loading' } }));
                fetchChildren(id)
                    .then((children) => setChildrenState((prev) => ({ ...prev, [id]: { status: 'loaded', children } })))
                    .catch(() => {});
            }
        };

        const renderNode = (n: LazyNode): ReactNode => {
            if (!n.isFolder) {
                return <Tree.Item key={n.id} id={n.id} label={n.name} />;
            }
            const entry = childrenState[n.id];
            return (
                <Tree.Folder
                    key={n.id}
                    id={n.id}
                    label={n.name}
                    isExpanded={expandedIds.has(n.id)}
                    onExpandChange={(isExpanded) => handleExpand(n.id, isExpanded)}
                >
                    {entry?.status === 'loading' && <Tree.Loading />}
                    {entry?.status === 'loaded' && entry.children.map(renderNode)}
                </Tree.Folder>
            );
        };

        return <Tree.Root {...args}>{rootNodes.map(renderNode)}</Tree.Root>;
    },
};

export const LoadMore: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'When a folder has more children than have been loaded so far, render the loaded rows ' +
                    'followed by `<Tree.Loading />` as the last child. The loading row is placed after the last ' +
                    'visible descendant, which models incremental fetch (infinite scroll, paginated "load more") ' +
                    'without disturbing the loaded rows above it.',
            },
        },
    },
    render: (args) => {
        const initialChildren = [
            { id: 'reports/q1.pdf', name: 'q1.pdf' },
            { id: 'reports/q2.pdf', name: 'q2.pdf' },
            { id: 'reports/q3.pdf', name: 'q3.pdf' },
        ];
        const nextPage = [
            { id: 'reports/q4.pdf', name: 'q4.pdf' },
            { id: 'reports/2023-summary.pdf', name: '2023-summary.pdf' },
        ];

        const [children, setChildren] = useState(initialChildren);
        const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

        const loadNextPage = () => {
            if (status !== 'idle') {
                return;
            }
            setStatus('loading');
            setTimeout(() => {
                setChildren((prev) => [...prev, ...nextPage]);
                setStatus('done');
            }, 800);
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                    <Button emphasis="default" onPress={loadNextPage}>
                        Load more
                    </Button>
                </div>
                <Tree.Root {...args}>
                    <Tree.Folder id="reports" label="Reports" isExpanded>
                        {children.map((child) => (
                            <Tree.Item key={child.id} id={child.id} label={child.name} />
                        ))}
                        {status === 'loading' && <Tree.Loading />}
                    </Tree.Folder>
                </Tree.Root>
            </div>
        );
    },
};

export const WithPerItemHandlers: Story = {
    args: {
        multiSelect: true,
        reorderable: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
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
                ],
            },
        ]);

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder
                    key={n.id}
                    id={n.id}
                    label={n.name}
                    isExpanded={n.isExpanded}
                    isSelected={n.isSelected}
                    onClick={action(`${n.name} onClick`)}
                    onExpandChange={action(`${n.name} onExpandChange`)}
                    onSelectChange={action(`${n.name} onSelectChange`)}
                    onMove={action(`${n.name} onMove`)}
                >
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item
                    key={n.id}
                    id={n.id}
                    label={n.name}
                    isSelected={n.isSelected}
                    onClick={action(`${n.name} onClick`)}
                    onSelectChange={action(`${n.name} onSelectChange`)}
                    onMove={action(`${n.name} onMove`)}
                />
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
        );
    },
};
