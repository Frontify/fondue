/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconDocument,
    IconDotsHorizontal,
    IconEyeOff,
    IconFolder,
    IconPen,
    IconTrashBin,
} from '@frontify/fondue-icons';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { action } from 'storybook/actions';

import { Badge, Button, Dropdown } from '#/index';

import {
    Tree,
    TreeAction,
    TreeDecorator,
    TreeFolder,
    TreeFolderHeader,
    TreeIcon,
    TreeItem,
    TreeLabel,
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
        'Tree.FolderHeader': TreeFolderHeader,
        'Tree.Label': TreeLabel,
        'Tree.Icon': TreeIcon,
        'Tree.Decorator': TreeDecorator,
        'Tree.Action': TreeAction,
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
                <Tree.Folder key={n.id} id={n.id} isExpanded={n.isExpanded}>
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
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
                <Tree.Folder key={n.id} id={n.id} isExpanded={n.isExpanded}>
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
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
                    <Tree.Item key={n.id} id={n.id} isSelected={n.isSelected}>
                        <Tree.Icon>
                            <IconDocument size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.Item>
                ))}
            </Tree.Root>
        );
    },
};

export const MultiSelect: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'With `multiSelect`, every row gets a checkbox. Folder checkboxes are derived from their ' +
                    'leaf descendants — a folder cannot be checked on its own — and `onChange` reports that ' +
                    "derived state as `isSelected`: `true` (all leaves checked), `'indeterminate'` (some), or " +
                    "`false` (none). A folder's `isSelected` prop is ignored in this mode; the type accepts " +
                    "`'indeterminate'` only so the `onChange` state can be passed straight back into props.",
            },
        },
    },
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
                <Tree.Folder key={n.id} id={n.id} isExpanded={n.isExpanded} isSelected={n.isSelected}>
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} isSelected={n.isSelected}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
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
                <Tree.Folder key={n.id} id={n.id} isExpanded={n.isExpanded}>
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
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
                <Tree.Folder key={n.id} id={n.id} isExpanded={n.isExpanded} isSelected={n.isSelected}>
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} isSelected={n.isSelected}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
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
                    isExpanded={n.isExpanded}
                    tags={n.tags}
                    accepts={acceptsByFolder[n.id]}
                >
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} tags={n.tags}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
                </Tree.Item>
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
                    'Render trailing controls on any row by nesting `<Tree.Action>` inside a ' +
                    "`<Tree.Item>` or a folder's `<Tree.FolderHeader>`. Clicks inside the action slot " +
                    "do not bubble to the row, so the action button can fire without also triggering the row's " +
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
            <Tree.Action>
                <Button aspect="square" emphasis="default" size="small" onPress={action('Folder action')}>
                    <IconDotsHorizontal size={16} />
                </Button>
            </Tree.Action>
        );
        const itemAction = (
            <Tree.Action>
                <Button aspect="square" emphasis="default" size="small" onPress={action('Item delete')}>
                    <IconTrashBin size={16} />
                </Button>
            </Tree.Action>
        );

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} isExpanded={n.isExpanded}>
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                        {folderAction}
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
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

export const WithDecorators: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Render passive badges or status icons right after the label by nesting `<Tree.Decorator>` ' +
                    "inside a `<Tree.Item>` or a folder's `<Tree.FolderHeader>`. Unlike `<Tree.Action>` (right-aligned, " +
                    'click-isolated), the decorator hugs the label text and clicks inside it activate the row, so it is ' +
                    'meant for non-interactive content such as a "hidden" badge.',
            },
        },
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
            { id: '1', name: 'Home', isFolder: false },
            {
                id: 'a',
                name: 'Document group',
                isFolder: true,
                isExpanded: true,
                children: [
                    { id: 'a1', name: 'Page', isFolder: false },
                    { id: 'a2', name: 'Hidden page', isFolder: false },
                ],
            },
        ]);

        const hiddenBadge = (
            <Tree.Decorator>
                <Badge emphasis="weak" size="small" aria-label="Hidden">
                    <IconEyeOff size={12} />
                </Badge>
            </Tree.Decorator>
        );
        const hiddenIds = new Set(['1', 'a2', 'a']);

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} isExpanded={n.isExpanded}>
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                        {hiddenIds.has(n.id) && hiddenBadge}
                        <Tree.Action>
                            <Button aspect="square" emphasis="default" size="small" onPress={action('Folder action')}>
                                <IconDotsHorizontal size={16} />
                            </Button>
                        </Tree.Action>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
                    {hiddenIds.has(n.id) && hiddenBadge}
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

export const Renaming: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    'Renaming is controlled through the `isRenaming` prop — here flipped by the "Rename" ' +
                    "option in each row's `<Tree.Action>` overflow `Dropdown`. While `isRenaming` is `true` (and the row has " +
                    'an `onRename` handler), the label becomes an inline text input. Enter or clicking ' +
                    'away commits: the row fires `onRename` with the new name and the root fires `onChange` ' +
                    'with the updated `name`, so re-rendering from either source applies the rename. Escape ' +
                    'cancels. Either way `onRenamingChange(false)` fires so the consumer can clear its flag. ' +
                    'A `<Tree.Decorator>` (here on Logo.svg) is hidden while its row renames, so the input ' +
                    'spans the full width up to the actions slot.',
            },
        },
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
            {
                id: 'assets',
                name: 'Assets',
                isFolder: true,
                isExpanded: true,
                children: [
                    { id: 'logo', name: 'Logo.svg', isFolder: false },
                    { id: 'hero', name: 'Hero.png', isFolder: false },
                ],
            },
            { id: 'readme', name: 'README.md', isFolder: false },
        ]);
        const [renamingId, setRenamingId] = useState<string | null>(null);

        const renameProps = (n: TreeNodeState) => ({
            isRenaming: renamingId === n.id,
            onRenamingChange: (isRenaming: boolean) => setRenamingId(isRenaming ? n.id : null),
            onRename: (newName: string) => {
                action('onRename')(n.id, newName);
            },
        });
        const renameAction = (n: TreeNodeState) => (
            <Tree.Action>
                <Dropdown.Root>
                    <Dropdown.Trigger>
                        <Button aspect="square" emphasis="default" size="small">
                            <IconDotsHorizontal size={16} />
                        </Button>
                    </Dropdown.Trigger>
                    {/* `preventTriggerFocusOnClose` keeps the closing menu from re-focusing the
                        trigger button, which would steal focus from the rename input. */}
                    <Dropdown.Content preventTriggerFocusOnClose>
                        <Dropdown.Item onSelect={() => setRenamingId(n.id)}>
                            Rename
                            <Dropdown.Slot name="left">
                                <IconPen size={16} />
                            </Dropdown.Slot>
                        </Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </Tree.Action>
        );

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder key={n.id} id={n.id} isExpanded={n.isExpanded} {...renameProps(n)}>
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                        {renameAction(n)}
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} {...renameProps(n)}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
                    {n.id === 'logo' && (
                        <Tree.Decorator>
                            <Badge emphasis="weak" size="small" aria-label="Hidden">
                                <IconEyeOff size={12} />
                            </Badge>
                        </Tree.Decorator>
                    )}
                    {renameAction(n)}
                </Tree.Item>
            );

        return (
            <Tree.Root
                {...args}
                onChange={(state) => {
                    // A committed rename arrives here with the new `name` already set, so
                    // re-rendering from `onChange` is all it takes to apply it.
                    args.onChange?.(state);
                    setNodes(state);
                }}
            >
                {nodes.map(renderNode)}
            </Tree.Root>
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
                return (
                    <Tree.Item key={n.id} id={n.id}>
                        <Tree.Icon>
                            <IconDocument size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.Item>
                );
            }
            const entry = childrenState[n.id];
            return (
                <Tree.Folder
                    key={n.id}
                    id={n.id}
                    isExpanded={expandedIds.has(n.id)}
                    onExpandChange={(isExpanded) => handleExpand(n.id, isExpanded)}
                >
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
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
                    <Tree.Folder id="reports" isExpanded>
                        <Tree.FolderHeader>
                            <Tree.Icon>
                                <IconFolder size={16} />
                            </Tree.Icon>
                            <Tree.Label>Reports</Tree.Label>
                        </Tree.FolderHeader>
                        {children.map((child) => (
                            <Tree.Item key={child.id} id={child.id}>
                                <Tree.Icon>
                                    <IconDocument size={16} />
                                </Tree.Icon>
                                <Tree.Label>{child.name}</Tree.Label>
                            </Tree.Item>
                        ))}
                        {status === 'loading' && <Tree.Loading />}
                    </Tree.Folder>
                </Tree.Root>
            </div>
        );
    },
};

export const DisabledRows: Story = {
    parameters: {
        docs: {
            description: {
                story:
                    '`isDisabled` freezes a row at its prop-driven state: its checkbox cannot be toggled — ' +
                    'not even by checking an ancestor folder — it cannot be dragged or take the selection, ' +
                    'and drops into a disabled folder are rejected. The frozen state still counts toward ' +
                    "folder checkboxes, so a folder holding a disabled-unchecked leaf caps at 'indeterminate'. " +
                    'Disabled folders stay expandable, and only their own row is frozen — their children ' +
                    'remain interactive unless disabled themselves.',
            },
        },
    },
    args: {
        multiSelect: true,
        reorderable: true,
    },
    render: (args) => {
        const [nodes, setNodes] = useState<TreeChangeState>([
            {
                id: 'a',
                name: 'Folder a',
                isFolder: true,
                isExpanded: true,
                children: [
                    { id: 'a1', name: 'Item a1 (disabled)', isFolder: false, tags: ['disabled'] },
                    {
                        id: 'a2',
                        name: 'Item a2 (disabled, checked)',
                        isFolder: false,
                        isSelected: true,
                        tags: ['disabled'],
                    },
                    { id: 'a3', name: 'Item a3', isFolder: false },
                ],
            },
            {
                id: 'b',
                name: 'Folder b (disabled)',
                isFolder: true,
                isExpanded: true,
                tags: ['disabled'],
                children: [
                    { id: 'b1', name: 'Item b1', isFolder: false },
                    { id: 'b2', name: 'Item b2', isFolder: false },
                ],
            },
            { id: 'c', name: 'Item c', isFolder: false },
        ]);

        // The disabled flag is consumer state; this story round-trips it through `tags`
        // purely so the controlled re-render keeps it.
        const isDisabled = (n: TreeNodeState) => n.tags?.includes('disabled');

        const renderNode = (n: TreeNodeState): ReactNode =>
            n.isFolder ? (
                <Tree.Folder
                    key={n.id}
                    id={n.id}
                    isExpanded={n.isExpanded}
                    isSelected={n.isSelected}
                    isDisabled={isDisabled(n)}
                    tags={n.tags}
                >
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item key={n.id} id={n.id} isSelected={n.isSelected} isDisabled={isDisabled(n)} tags={n.tags}>
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
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
                    isExpanded={n.isExpanded}
                    isSelected={n.isSelected}
                    onClick={action(`${n.name} onClick`)}
                    onExpandChange={action(`${n.name} onExpandChange`)}
                    onSelectChange={action(`${n.name} onSelectChange`)}
                    onMove={action(`${n.name} onMove`)}
                >
                    <Tree.FolderHeader>
                        <Tree.Icon>
                            <IconFolder size={16} />
                        </Tree.Icon>
                        <Tree.Label>{n.name}</Tree.Label>
                    </Tree.FolderHeader>
                    {n.children?.map(renderNode)}
                </Tree.Folder>
            ) : (
                <Tree.Item
                    key={n.id}
                    id={n.id}
                    isSelected={n.isSelected}
                    onClick={action(`${n.name} onClick`)}
                    onSelectChange={action(`${n.name} onSelectChange`)}
                    onMove={action(`${n.name} onMove`)}
                >
                    <Tree.Icon>
                        <IconDocument size={16} />
                    </Tree.Icon>
                    <Tree.Label>{n.name}</Tree.Label>
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
