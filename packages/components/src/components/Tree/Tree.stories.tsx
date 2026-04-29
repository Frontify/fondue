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
            {
                id: 'b3',
                name: 'Folder b3',
                isFolder: true,
                isExpanded: false,
                children: [
                    { id: 'b31', name: 'Item b31', isFolder: false },
                    { id: 'b32', name: 'Item b32', isFolder: false },
                    { id: 'b33', name: 'Item b33', isFolder: false },
                ],
            },
        ],
    },
];

const renderNodes = (nodes: TreeChangeState): ReactNode =>
    nodes.map((node) =>
        node.isFolder ? (
            <Tree.Folder key={node.id} id={node.id} name={node.name} isExpanded={node.isExpanded}>
                {renderNodes(node.children ?? [])}
            </Tree.Folder>
        ) : (
            <Tree.Item key={node.id} id={node.id}>
                {node.name}
            </Tree.Item>
        ),
    );

export const Default: Story = {
    args: {
        children: 'Hello World',
    },
    render: () => {
        const [nodes, setNodes] = useState<TreeChangeState>(initialNodes);

        return (
            <div style={{ display: 'flex', gap: 24 }}>
                <Tree.Root onChange={setNodes}>{renderNodes(nodes)}</Tree.Root>
                <pre style={{ fontSize: 12 }}>{JSON.stringify(nodes, null, 2)}</pre>
            </div>
        );
    },
};
