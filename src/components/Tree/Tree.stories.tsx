/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Tree as TreeComponent, TreeProps } from './Tree';
import { mockNodesFlat } from '@components/Tree/utils/mocks';
import { getReorderedNodes } from '@components/Tree/utils';

export default {
    title: 'Components/Tree',
    component: TreeComponent,
    args: {
        onEditableSave: (targetItemId: string, value: string) => console.log(targetItemId, value),
    },
    argTypes: {
        onSelect: { action: 'onSelect' },
    },
} as Meta<TreeProps>;

export const Tree: StoryFn<TreeProps> = ({ ...args }: TreeProps) => {
    const [nodesState, setNodesState] = useState(mockNodesFlat);

    const handleMove = (sourceItemId: string, parentId: NullableString, positionBeforeId: NullableString): void => {
        const modifiedItems = getReorderedNodes(sourceItemId, parentId, positionBeforeId, nodesState);

        const modifiedArray = nodesState.map((item) => {
            const matchingModifiedItem = modifiedItems.find((modifiedItem) => modifiedItem.id === item.id);
            if (matchingModifiedItem) {
                return { ...matchingModifiedItem };
            }

            return { ...item };
        });

        setNodesState(modifiedArray);
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <TreeComponent {...args} nodes={nodesState} onDragAndDrop={handleMove} />
        </div>
    );
};

export const TreeWithActiveNode = Tree.bind({});
TreeWithActiveNode.args = {
    activeNodeIds: ['1-1-3'],
};
