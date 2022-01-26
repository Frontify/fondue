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

const ActionsFlyoutComponent = () => {
    const [open, setOpen] = useState(false);

    return (
        <Flyout
            isOpen={open}
            onOpenChange={(isOpen) => setOpen(isOpen)}
            legacyFooter={false}
            hug={false}
            trigger={
                <Button
                    onClick={() => {
                        setOpen(true);
                    }}
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

const nodes: TreeNodeProps[] = [
    {
        id: "1",
        name: "Design System Testing",
        label: "Document",
        value: "https://weare.frontify.com/document/1",
        icon: <IconGuidelines size={IconSize.Size16} />,
        nodes: [
            {
                id: "1-1",
                name: "Uncategorizes Pages",
                nodes: [
                    {
                        id: "1-1-1",
                        name: "Home",
                        label: "Page",
                        value: "https://weare.frontify.com/page/1",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-1-2",
                        name: "Members",
                        label: "Page",
                        value: "https://weare.frontify.com/page/2",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-1-3",
                        name: "About us",
                        label: "Page",
                        value: "https://weare.frontify.com/page/3",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                ],
            },
            {
                id: "1-2",
                name: "Test Category",
                label: "Document",
                value: "https://weare.frontify.com/document/923#/test",
                nodes: [
                    {
                        id: "1-2-1",
                        name: "Home",
                        label: "Page",
                        value: "https://weare.frontify.com/page/1",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-2-2",
                        name: "Members",
                        label: "Page",
                        value: "https://weare.frontify.com/page/2",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                    {
                        id: "1-2-3",
                        name: "About us",
                        label: "Page",
                        value: "https://weare.frontify.com/page/3",
                        icon: <IconDocument size={IconSize.Size16} />,
                    },
                ],
            },
        ],
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
                        actions: [() => <ActionsFlyoutComponent key="actions" />],
                    },
                    {
                        id: "1-2-3",
                        name: "About us",
                        value: "https://weare.frontify.com/page/3",
                        icon: <IconDocument size={IconSize.Size16} />,
                        actions: [
                            <Button
                                size={ButtonSize.Small}
                                style={ButtonStyle.Secondary}
                                icon={<IconPlus size={IconSize.Size12} />}
                                key="plusIcon"
                            />,
                            <ActionsFlyoutComponent key={"actions"} />,
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

export const Tree: Story<TreeProps> = (args: TreeProps) => (
    <div style={{ maxWidth: "800px" }}>
        <TreeComponent {...args} nodes={nodes} />
    </div>
);

export const TreeWithActions: Story<TreeProps> = (args: TreeProps) => (
    <div style={{ maxWidth: "800px" }}>
        <TreeComponent {...args} nodes={nodesWithActions} />
    </div>
);
