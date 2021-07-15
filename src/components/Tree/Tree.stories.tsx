/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as IconGuidelines } from "@components/Icon/Svg/Guidelines.svg";
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
            name: "Design System Testing",
            label: "Document",
            link: "https://weare.frontify.com/document/1",
            icon: <IconGuidelines size={IconSize.Size16} />,
            nodes: [
                {
                    name: "Uncategorizes Pages",
                    nodes: [
                        {
                            name: "Home",
                            label: "Page",
                            link: "https://weare.frontify.com/page/1",
                        },
                        {
                            name: "Members",
                            label: "Page",
                            link: "https://weare.frontify.com/page/2",
                        },
                        {
                            name: "About us",
                            label: "Page",
                            link: "https://weare.frontify.com/page/3",
                        },
                    ],
                },
            ],
        },
        {
            name: "Smartive Design System",
            label: "Document",
            link: "https://weare.frontify.com/document/923#/test",
            icon: <IconGuidelines size={IconSize.Size16} />,
            nodes: [
                {
                    name: "Uncategorizes Pages",
                    nodes: [
                        {
                            name: "Home",
                            label: "Page",
                            link: "https://weare.frontify.com/page/1",
                        },
                        {
                            name: "Members",
                            label: "Page",
                            link: "https://weare.frontify.com/page/2",
                        },
                        {
                            name: "About us",
                            label: "Page",
                            link: "https://weare.frontify.com/page/3",
                        },
                    ],
                },
            ],
        },
    ] as TreeNode[],
};
