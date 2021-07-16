/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as IconGuidelines } from "@components/Icon/Svg/Guidelines.svg";
import { ReactComponent as IconDocument } from "@components/Icon/Svg/Document.svg";
import { Meta, Story } from "@storybook/react";
import { TreeNode } from "./Node";
import Tree, { TreeProps } from "./Tree";
import { IconSize } from "@components/Icon/Icon";

export default {
    title: "Tree",
    component: Tree,
} as Meta;

const TreeTemplate: Story<TreeProps> = (args) => <Tree {...args} />;

export const Default = TreeTemplate.bind({});

Default.args = {
    nodes: [
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
    ] as TreeNode[],
    activeNodeId: "1-1-3",
};

Default.argTypes = { onSelect: { action: "onSelect" } };
