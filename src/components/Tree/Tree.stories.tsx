/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Tree as TreeComponent, TreeProps } from "./Tree";
import { TreeNodeProps } from "./Node";
import { IconSize } from "@foundation/Icon/IconSize";
import IconDocument from "@foundation/Icon/Generated/IconDocument";
import IconGuidelines from "@foundation/Icon/Generated/IconGuidelines";
import { Button, ButtonSize, ButtonStyle } from "@components/Button";
import { IconActions, IconPlus } from "@foundation/Icon";
import { Flyout } from "@components/Flyout";
import { ActionMenu } from "@components/ActionMenu/ActionMenu";
import { MenuItemContentSize } from "@components/MenuItem";
import { DropZonePosition } from "@components/Tree/DropZone";

type TreeListItem = TreeNodeProps & {
    name: string;
    parentId: TreeNodeProps["id"] | null;
    sort: number | null;
};

const listToTree = (items: TreeListItem[], id: string | null = null): TreeNodeProps[] =>
    items
        .filter((item) => item.parentId === id)
        .sort((itemA, itemB) => {
            if (itemA.sort === null && itemB.sort === null) {
                return 1;
            }
            if (itemA.sort === null) {
                return 1;
            }
            if (itemB.sort === null) {
                return -1;
            }

            return itemA.sort - itemB.sort;
        })
        .map((item) => {
            const nodes = listToTree(items, item.id);
            return {
                ...item,
                nodes: nodes.length === 0 ? undefined : nodes,
                icon: nodes.length === 0 ? <IconDocument size={IconSize.Size12} /> : undefined,
            };
        });

const ActionsFlyoutComponent = () => {
    const [open, setOpen] = useState(false);
    const onClick = () => {
        setOpen(true);
    };

    return (
        <Flyout
            isOpen={open}
            onOpenChange={(isOpen) => setOpen(isOpen)}
            legacyFooter={false}
            hug={false}
            trigger={
                <Button
                    onClick={onClick}
                    style={ButtonStyle.Secondary}
                    icon={<IconActions size={IconSize.Size12} />}
                    size={ButtonSize.Small}
                />
            }
        >
            <ActionMenu
                menuBlocks={[
                    {
                        id: "dropdownBlock",
                        ariaLabel: "Dropdown block",
                        menuItems: [
                            {
                                id: "dropdown",
                                size: MenuItemContentSize.Small,
                                title: "Dropdown",
                                onClick: () => console.log("dropdown"),
                            },
                        ],
                    },
                    {
                        id: "actionsBlock",
                        ariaLabel: "Item Actions",
                        menuItems: [
                            {
                                id: "rename",
                                size: MenuItemContentSize.Small,
                                title: "Rename",
                                onClick: () => console.log("rename"),
                            },
                            {
                                id: "duplicate",
                                size: MenuItemContentSize.Small,
                                title: "Duplicate",
                                onClick: () => console.log("duplicate"),
                            },
                            {
                                id: "unpublish",
                                size: MenuItemContentSize.Small,
                                title: "Unpublish",
                                onClick: () => console.log("unpublish"),
                            },
                        ],
                    },
                    {
                        id: "deleteBlock",
                        ariaLabel: "Delete Block",
                        menuItems: [
                            {
                                id: "delete",
                                size: MenuItemContentSize.Small,
                                title: "Delete",
                                onClick: () => console.log("delete"),
                            },
                        ],
                    },
                ]}
            />
        </Flyout>
    );
};

let apiNodes: TreeListItem[] = [
    {
        id: "1",
        name: "Design System Testing",
        label: "Document",
        value: "https://weare.frontify.com/document/1",
        icon: <IconGuidelines size={IconSize.Size16} />,
        parentId: null,
        sort: 1,
    },
    {
        id: "1-1",
        name: "Uncategorizes Pages",
        parentId: "1",
        sort: 1,
    },
    {
        id: "1-1-1",
        parentId: "1-1",
        sort: 1,
        name: "Home",
        label: "Page",
        value: "https://weare.frontify.com/page/1",
        icon: <IconDocument size={IconSize.Size16} />,
    },
    {
        id: "1-1-2",
        parentId: "1-1",
        name: "Members",
        label: "Page",
        value: "https://weare.frontify.com/page/2",
        icon: <IconDocument size={IconSize.Size16} />,
        sort: null,
    },
    {
        id: "1-1-3",
        parentId: "1-1",
        name: "About us",
        label: "Page",
        value: "https://weare.frontify.com/page/3",
        icon: <IconDocument size={IconSize.Size16} />,
        sort: null,
    },
    {
        id: "1-2",
        parentId: "1",
        name: "Test Category",
        label: "Document",
        value: "https://weare.frontify.com/document/923#/test",
        sort: null,
    },
    {
        id: "1-2-1",
        parentId: "1-2",
        name: "Home",
        label: "Page",
        value: "https://weare.frontify.com/page/1",
        icon: <IconDocument size={IconSize.Size16} />,
        sort: null,
    },
    {
        id: "1-2-2",
        parentId: "1-2",
        name: "Members",
        label: "Page",
        value: "https://weare.frontify.com/page/2",
        icon: <IconDocument size={IconSize.Size16} />,
        sort: null,
    },
    {
        id: "1-2-3",
        parentId: "1-2",
        name: "About us",
        label: "Page",
        value: "https://weare.frontify.com/page/3",
        icon: <IconDocument size={IconSize.Size16} />,
        sort: null,
    },
];

const nodesWithActions: TreeNodeProps[] = [
    {
        id: "1",
        name: "Design System Testing",
        value: "https://weare.frontify.com/document/1",
        icon: <IconGuidelines size={IconSize.Size16} />,
        nodes: [
            {
                id: "1-1",
                name: "Uncategorizes Pages",
            },
            {
                id: "1-2",
                name: "Test Category",
                value: "https://weare.frontify.com/document/923#/test",
                nodes: [
                    {
                        id: "1-2-1",
                        name: "Home",
                        value: "https://weare.frontify.com/page/1",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-2-2",
                        name: "Members",
                        value: "https://weare.frontify.com/page/2",
                        icon: <IconDocument size={IconSize.Size16} />,
                        actions: [<ActionsFlyoutComponent key="actions" />],
                    },
                    {
                        id: "1-2-3",
                        name: "About us",
                        value: "https://weare.frontify.com/page/3",
                        icon: <IconDocument size={IconSize.Size16} />,
                        label: "Label",
                        actions: [
                            <Button
                                size={ButtonSize.Small}
                                style={ButtonStyle.Secondary}
                                icon={<IconPlus size={IconSize.Size12} />}
                                key="plusIcon"
                            />,
                            <ActionsFlyoutComponent key="actions" />,
                        ],
                    },
                ],
            },
        ],
    },
];

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
    const [nodesState, setNodes] = useState(listToTree(apiNodes));

    const reorderItem = (targetId: string, sourceId: string, position: DropZonePosition) => {
        const nodesClone = [...apiNodes];
        const sourceIndex = nodesClone.findIndex((node) => node.id === sourceId);
        let targetIndex = nodesClone.findIndex((node) => node.id === targetId);
        const sourceItem = nodesClone[sourceIndex];
        const targetItem = nodesClone[targetIndex];

        targetIndex =
            position === DropZonePosition.AFTER || position === DropZonePosition.WITHIN ? targetIndex + 1 : targetIndex;
        const parentId = position === DropZonePosition.WITHIN ? targetItem.id : targetItem.parentId;

        nodesClone.splice(sourceIndex, 1);
        nodesClone.splice(targetIndex, 0, { ...sourceItem, parentId });

        setNodes(listToTree(nodesClone));
        apiNodes = nodesClone;
    };

    return (
        <div style={{ maxWidth: "800px" }}>
            <TreeComponent {...args} nodes={nodesState} onDrop={reorderItem} />
        </div>
    );
};

export const TreeWithActions: Story<TreeProps> = (args: TreeProps) => (
    <div style={{ maxWidth: "800px" }}>
        <TreeComponent {...args} nodes={nodesWithActions} />
    </div>
);
