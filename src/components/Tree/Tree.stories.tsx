/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Tree as TreeComponent, TreeFlatListItem, TreeProps } from "./Tree";
import { mockNodesFlat } from "@components/Tree/utils/mocks";
import { DraggableItem } from "@utilities/dnd";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Tree",
    component: TreeComponent,
    args: {
        activeNodeIds: ["1-1-3"],
    },
    argTypes: {
        onSelect: { action: "onSelect" },
        onEditableSave: {
            action: "onEditableSave",
        },
    },
} as Meta<TreeProps & { onEditableSave: typeof onEditableSaveDefault }>;

const onEditableSaveDefault = (value: string) => value;

export const Tree: Story<TreeProps & { onEditableSave: typeof onEditableSaveDefault }> = ({
    onEditableSave = onEditableSaveDefault,
    ...args
}: TreeProps & { onEditableSave: typeof onEditableSaveDefault }) => {
    const [nodesState, setNodesState] = useState(mockNodesFlat(onEditableSave));

    const handleMove = (modifiedItems: DraggableItem<TreeFlatListItem>[]): void => {
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
        <div style={{ maxWidth: "800px" }}>
            <TreeComponent {...args} nodes={nodesState} onUpdate={handleMove} />
        </div>
    );
};
