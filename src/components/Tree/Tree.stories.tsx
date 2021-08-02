/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconSize from "@elements/Icon/IconSize";
import IconDocument from "@elements/Icon/Generated/IconDocument";
import IconGuidelines from "@elements/Icon/Generated/IconGuidelines";
import { Meta, Story } from "@storybook/react";
import { TreeNodeProps } from "./Node";
import TreeComponent, { TreeProps } from "./Tree";

export default {
    title: "Components/Tree",
    component: TreeComponent,
    args: {
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
        ] as TreeNodeProps[],
        activeNodeId: "1-1-3",
    },
    argTypes: {
        onSelect: { action: "onSelect" },
    },
} as Meta<TreeProps>;

export const Tree: Story<TreeProps> = (args: TreeProps) => (
    <div style={{ maxWidth: "800px" }}>
        <TreeComponent {...args} />
    </div>
);
