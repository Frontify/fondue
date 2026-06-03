/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';

import { Tree, type TreeRoot, type TreeChangeState } from './Tree';

type Story = StoryObj<typeof TreeRoot>;
const meta: Meta<typeof TreeRoot> = {
    component: Tree.Root,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {},
};
export default meta;

const initialNodes: TreeChangeState = [
    { id: '1', name: 'Item 1', isFolder: false, isSelected: false, isActive: false },
    {
        id: 'a',
        name: 'Folder a',
        isFolder: true,
        isExpanded: true,
        isSelected: false,
        isActive: false,
        children: [
            { id: 'a1', name: 'Item a1', isFolder: false, isSelected: true, isActive: false },
            { id: 'a2', name: 'Item a2', isFolder: false, isSelected: false, isActive: false },
        ],
    },
    {
        id: 'b',
        name: 'Folder b',
        isFolder: true,
        isExpanded: false,
        isSelected: false,
        isActive: false,
        children: [
            { id: 'b1', name: 'Item b1', isFolder: false, isSelected: true, isActive: false },
            { id: 'b2', name: 'Item b2', isFolder: false, isSelected: false, isActive: false },
            {
                id: 'b3',
                name: 'Folder b3',
                isFolder: true,
                isExpanded: false,
                children: [
                    { id: 'b31', name: 'Item b31', isFolder: false, isSelected: false, isActive: false },
                    { id: 'b32', name: 'Item b32', isFolder: false, isSelected: true, isActive: false },
                    { id: 'b33', name: 'Item b33', isFolder: false, isSelected: false, isActive: false },
                ],
            },
        ],
    },
];

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

export const Default: Story = {
    render: () => {
        const [nodes, setNodes] = useState<TreeChangeState>(initialNodes);

        return (
            <div style={{ display: 'flex', gap: 24 }}>
                <Tree.Root
                    multiSelect
                    reorderable
                    onChange={(state) => {
                        console.log('state', state);

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

const basicNodes: TreeChangeState = [
    { id: '1', name: 'Item 1', isFolder: false },
    { id: '2', name: 'Item 2', isFolder: false },
    { id: '3', name: 'Item 3', isFolder: false },
    { id: '4', name: 'Item 4', isFolder: false },
];

export const Basic: Story = {
    render: () => {
        const [nodes, setNodes] = useState<TreeChangeState>(basicNodes);
        return <Tree.Root onChange={setNodes}>{renderNodes(nodes)}</Tree.Root>;
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

export const WithNestedFolders: Story = {
    render: () => {
        const [nodes, setNodes] = useState<TreeChangeState>(nestedFolderNodes);
        return <Tree.Root onChange={setNodes}>{renderNodes(nodes)}</Tree.Root>;
    },
};

const activeItemNodes: TreeChangeState = [
    { id: 'home', name: 'Home', isFolder: false },
    {
        id: 'projects',
        name: 'Projects',
        isFolder: true,
        isExpanded: true,
        children: [
            { id: 'projects/alpha', name: 'Alpha', isFolder: false, isActive: true },
            { id: 'projects/beta', name: 'Beta', isFolder: false },
            { id: 'projects/gamma', name: 'Gamma', isFolder: false },
        ],
    },
    { id: 'settings', name: 'Settings', isFolder: false },
];

export const WithActiveItem: Story = {
    render: () => {
        const [nodes, setNodes] = useState<TreeChangeState>(activeItemNodes);
        return <Tree.Root onChange={setNodes}>{renderNodes(nodes)}</Tree.Root>;
    },
};

const checkboxNodes: TreeChangeState = [
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

export const WithCheckboxes: Story = {
    render: () => {
        const [nodes, setNodes] = useState<TreeChangeState>(checkboxNodes);
        return (
            <div style={{ display: 'flex', gap: 24 }}>
                <Tree.Root multiSelect onChange={setNodes}>
                    {renderNodes(nodes)}
                </Tree.Root>
                <pre style={{ fontSize: 12 }}>{JSON.stringify(nodes, null, 2)}</pre>
            </div>
        );
    },
};
