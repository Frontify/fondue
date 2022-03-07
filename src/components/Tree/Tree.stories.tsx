/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Tree as TreeComponent, TreeListItem, TreeProps } from "./Tree";
import { mockNodesFlat } from "@components/Tree/utils/mocks";
import { DraggableItem } from "@utilities/dnd";

const apiNodes: DraggableItem<TreeListItem>[] = mockNodesFlat;

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Tree",
    component: TreeComponent,
    args: {
        activeNodeId: "1-1-3",
    },
    argTypes: {
        onSelect: { action: "onSelect" },
    },
} as Meta<TreeProps>;

export const Tree: Story<TreeProps> = (args: TreeProps) => {
    const [nodesState, setNodes] = useState(apiNodes);

    const handleMove = (modifiedItems: DraggableItem<TreeListItem>[]) => {
        const modifiedArray = nodesState.map((item) => {
            const matchingModifiedItem = modifiedItems.find((modifiedItem) => modifiedItem.id === item.id);
            if (matchingModifiedItem) {
                return { ...matchingModifiedItem };
            }

            return { ...item };
        });

        setNodes(modifiedArray);
    };

    return (
        <div style={{ maxWidth: "800px" }}>
            <TreeComponent {...args} nodes={nodesState} handleUpdate={handleMove} />
        </div>
    );
};

// export const TreeWithActions: Story<TreeProps> = (args: TreeProps) => (
//     <div style={{ maxWidth: "800px" }}>
//         <TreeComponent {...args} nodes={mockNodesWithActionsTree} />
//     </div>
// );
