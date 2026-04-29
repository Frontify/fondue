/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useState, type ReactNode } from 'react';

import { Tree, type TreeChangeState } from './Tree';

type Story = StoryObj<typeof Tree>;
const meta: Meta<typeof Tree> = {
    component: Tree,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {},
};
export default meta;

type TreeNode =
    | { type: 'item'; id: string; name: string }
    | { type: 'folder'; id: string; name: string; isExpanded: boolean; children: TreeNode[] };

const initialNodes: TreeNode[] = [
    { type: 'item', id: '1', name: 'Item 1' },
    {
        type: 'folder',
        id: 'a',
        name: 'Folder a',
        isExpanded: true,
        children: [
            { type: 'item', id: 'a1', name: 'Item a1' },
            { type: 'item', id: 'a2', name: 'Item a2' },
        ],
    },
    {
        type: 'folder',
        id: 'b',
        name: 'Folder b',
        isExpanded: false,
        children: [
            { type: 'item', id: 'b1', name: 'Item b1' },
            { type: 'item', id: 'b2', name: 'Item b2' },
            {
                type: 'folder',
                id: 'b3',
                name: 'Folder b3',
                isExpanded: false,
                children: [
                    { type: 'item', id: 'b31', name: 'Item b31' },
                    { type: 'item', id: 'b32', name: 'Item b32' },
                    { type: 'item', id: 'b33', name: 'Item b33' },
                ],
            },
        ],
    },
];

const applyExpansion = (nodes: TreeNode[], expandedIds: Set<string>): TreeNode[] =>
    nodes.map((node) =>
        node.type === 'folder'
            ? {
                  ...node,
                  isExpanded: expandedIds.has(node.id),
                  children: applyExpansion(node.children, expandedIds),
              }
            : node,
    );

const renderNodes = (nodes: TreeNode[]): ReactNode =>
    nodes.map((node) =>
        node.type === 'item' ? (
            <Tree.Item key={node.id} id={node.id}>
                {node.name}
            </Tree.Item>
        ) : (
            <Tree.Folder key={node.id} id={node.id} name={node.name} isExpanded={node.isExpanded}>
                {renderNodes(node.children)}
            </Tree.Folder>
        ),
    );

export const Default: Story = {
    args: {
        children: 'Hello World',
    },
    render: () => {
        const [nodes, setNodes] = useState<TreeNode[]>(initialNodes);

        const handleChange = (state: TreeChangeState) => {
            setNodes((prev) => applyExpansion(prev, new Set(state.expandedItems)));
        };

        return (
            <div style={{ display: 'flex', gap: 24 }}>
                <Tree.Root onChange={handleChange}>{renderNodes(nodes)}</Tree.Root>
                <pre style={{ fontSize: 12 }}>{JSON.stringify(nodes, null, 2)}</pre>
            </div>
        );
    },
};
