/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta } from '@storybook/react';

import { Tree, Tree as TreeComponent, TreeContentLegacyComponent, TreeItem } from '@components/Tree';
import type { TreeProps } from '@components/Tree/types';
import { treeNodesMock } from '@components/Tree/utils';
import { IconDocument } from '@foundation/Icon';

export default {
    title: 'Components/Tree',
    component: TreeComponent,
    args: {
        id: 'treeId',
    },
} as Meta<TreeProps>;

type TreeWithBasicItemContentComponentProps = {
    title: string;
};

const TreeWithBasicItemContentComponent = ({ title }: TreeWithBasicItemContentComponentProps) => {
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
                {treeNodesMock.map((node) => (
                    <TreeItem key={node.id} id={node.id} sort={node.sort} label={node.name}>
                        {node.nodes &&
                            node.nodes.map((node) => (
                                <TreeItem key={node.id} id={node.id} sort={node.sort} label={node.name}>
                                    {node.nodes &&
                                        node.nodes.map((node) => (
                                            <TreeItem key={node.id} id={node.id} sort={node.sort} label={node.name} />
                                        ))}
                                </TreeItem>
                            ))}
                    </TreeItem>
                ))}
            </Tree>
        </div>
    );
};

export const TreeWithBasicItem = ({ ...args }: TreeProps) => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <Tree {...args}>
                {treeNodesMock.map((node) => (
                    <TreeItem
                        key={node.id}
                        id={node.id}
                        sort={node.sort}
                        contentComponent={() => <TreeWithBasicItemContentComponent title={node.name} />}
                    >
                        {node.nodes &&
                            node.nodes.map((node) => (
                                <TreeItem
                                    key={node.id}
                                    id={node.id}
                                    sort={node.sort}
                                    contentComponent={() => <TreeWithBasicItemContentComponent title={node.name} />}
                                >
                                    {node.nodes &&
                                        node.nodes.map((node) => (
                                            <TreeItem
                                                key={node.id}
                                                id={node.id}
                                                sort={node.sort}
                                                contentComponent={() => (
                                                    <TreeWithBasicItemContentComponent title={node.name} />
                                                )}
                                            />
                                        ))}
                                </TreeItem>
                            ))}
                    </TreeItem>
                ))}
            </Tree>
        </div>
    );
};

export const TreeWithLegacyItem = ({ ...args }: TreeProps) => {
    return (
        <div style={{ maxWidth: '800px' }}>
            <Tree {...args}>
                {treeNodesMock.map((node) => (
                    <TreeItem
                        key={node.id}
                        id={node.id}
                        sort={node.sort}
                        contentComponent={({ selected, hovered }) => (
                            <TreeContentLegacyComponent
                                title={node.name}
                                icon={node.icon || <></>}
                                badge={node.badge}
                                tooltipContent={node.tooltipContent}
                                label={node.label}
                                actions={node.actions}
                                selected={selected}
                                hovered={hovered}
                            />
                        )}
                    >
                        {node.nodes &&
                            node.nodes.map((node) => (
                                <TreeItem
                                    key={node.id}
                                    id={node.id}
                                    sort={node.sort}
                                    contentComponent={({ selected, hovered }) => (
                                        <TreeContentLegacyComponent
                                            title={node.name}
                                            icon={node.icon || <></>}
                                            badge={node.badge}
                                            tooltipContent={node.tooltipContent}
                                            label={node.label}
                                            actions={node.actions}
                                            selected={selected}
                                            hovered={hovered}
                                        />
                                    )}
                                >
                                    {node.nodes &&
                                        node.nodes.map((node) => (
                                            <TreeItem
                                                key={node.id}
                                                id={node.id}
                                                sort={node.sort}
                                                contentComponent={({ selected, hovered }) => (
                                                    <TreeContentLegacyComponent
                                                        title={node.name}
                                                        icon={node.icon || <></>}
                                                        badge={node.badge}
                                                        tooltipContent={node.tooltipContent}
                                                        label={node.label}
                                                        actions={node.actions}
                                                        selected={selected}
                                                        hovered={hovered}
                                                    />
                                                )}
                                            />
                                        ))}
                                </TreeItem>
                            ))}
                    </TreeItem>
                ))}
            </Tree>
        </div>
    );
};
