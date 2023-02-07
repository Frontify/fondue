/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { Meta } from '@storybook/react';

import { Tree, Tree as TreeComponent, TreeItem } from '@components/Tree';
import { TreeNodeItem, treeNodesMock } from '@components/Tree/utils';
import type { TreeItemProps, TreeProps } from '@components/Tree/types';
import { IconDocument } from '@foundation/Icon';
import { DraggableItem } from '@utilities/dnd';

export default {
    title: 'Components/Tree',
    component: TreeComponent,
    tags: ['autodocs'],
    args: {
        id: 'treeId',
    },
    argTypes: {
        draggable: {
            control: { type: 'boolean' },
        },
        selectedIds: {
            control: { type: 'object' },
        },
        expandedIds: {
            control: { type: 'object' },
        },
    },
} as Meta<TreeProps>;

type TreeItemComponentProps = {
    children?: ReactElement<TreeItemProps> | Array<ReactElement<TreeItemProps>>;
} & DraggableItem<TreeNodeItem>;

const TreeItemBasic = ({ children, ...node }: TreeItemComponentProps) => {
    return (
        <TreeItem
            {...node}
            label={undefined}
            key={node.id}
            contentComponent={() => <TreeItemBasicContentComponent title={node.label} />}
        >
            {children}
        </TreeItem>
    );
};

interface TreeWithBasicItemContentComponentProps {
    title: string;
}

const TreeItemBasicContentComponent = ({ title }: TreeWithBasicItemContentComponentProps) => {
    return (
        <div className="tw-flex tw-space-x-1.5 tw-w-full">
            <span className="tw-flex tw-justify-center tw-items-center tw-w-5">{<IconDocument />}</span>
            <span>{title}</span>
        </div>
    );
};

export const TreeWithLabel = ({ ...args }: TreeProps) => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <Tree {...args}>
                {treeNodesMock.map((node) => {
                    console.log(node);
                    return (
                        <TreeItem {...node} key={node.id}>
                            {node.nodes?.map((node) => (
                                <TreeItem {...node} key={node.id}>
                                    {node.nodes?.map((node) => (
                                        <TreeItem {...node} key={node.id}>
                                            {node.nodes?.map((node) => (
                                                <TreeItem {...node} key={node.id} />
                                            ))}
                                        </TreeItem>
                                    ))}
                                </TreeItem>
                            ))}
                        </TreeItem>
                    );
                })}
            </Tree>
        </div>
    );
};

export const TreeWithBasicItem = ({ ...args }: TreeProps) => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <Tree {...args}>
                {treeNodesMock.map((args) => (
                    <TreeItemBasic key={args.id} {...args}>
                        {args.nodes?.map((args) => (
                            <TreeItemBasic key={args.id} {...args}>
                                {args.nodes?.map((args) => (
                                    <TreeItemBasic key={args.id} {...args}>
                                        {args.nodes?.map((args) => (
                                            <TreeItemBasic key={args.id} {...args} />
                                        ))}
                                    </TreeItemBasic>
                                ))}
                            </TreeItemBasic>
                        ))}
                    </TreeItemBasic>
                ))}
            </Tree>
        </div>
    );
};
