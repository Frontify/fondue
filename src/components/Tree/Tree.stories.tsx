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
                            icon: <IconDocument size={IconSize.Size16} />,
                        },
                        {
                            name: "Members",
                            label: "Page",
                            link: "https://weare.frontify.com/page/2",
                            icon: <IconDocument size={IconSize.Size16} />,
                        },
                        {
                            name: "About us",
                            label: "Page",
                            link: "https://weare.frontify.com/page/3",
                            icon: <IconDocument size={IconSize.Size16} />,
                        },
                    ],
                },
                {
                    name: "Test Category",
                    label: "Document",
                    link: "https://weare.frontify.com/document/923#/test",
                    nodes: [
                        {
                            name: "Home",
                            label: "Page",
                            link: "https://weare.frontify.com/page/1",
                            icon: <IconDocument size={IconSize.Size16} />,
                        },
                        {
                            name: "Members",
                            label: "Page",
                            link: "https://weare.frontify.com/page/2",
                            icon: <IconDocument size={IconSize.Size16} />,
                        },
                        {
                            name: "About us",
                            label: "Page",
                            link: "https://weare.frontify.com/page/3",
                            icon: <IconDocument size={IconSize.Size16} />,
                        },
                    ],
                },
            ],
        },
    ] as TreeNode[],
};
