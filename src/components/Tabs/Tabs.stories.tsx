/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { Tabs, TabSize, TabsPaddingX, TabsProps } from "./Tabs";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { IconIcons, IconSize } from "@foundation/Icon";
import { BadgeStyle } from "@components/Badge";

export const data = [
    {
        label: "A tab",
        content: "This is content for label 1",
    },
    {
        label: "Disabled",
        content: "This is content for label 2",
        disabled: true,
    },
    {
        label: "A long tab name",
        content: "This is content for label 3",
        decorator: <IconIcons size={IconSize.Size12} />,
    },
    {
        label: "An even longer tab name",
        content: (
            <div>
                <h2>Hello</h2>
                <Card hoverable={false}>
                    <p>This is content for tab 4</p>
                </Card>
            </div>
        ),
        badge: { style: BadgeStyle.Positive, children: "Badge 1" },
    },
    {
        label: "All disabled",
        content: <Button>This is content for label 5</Button>,
        decorator: <IconIcons size={IconSize.Size12} />,
        badge: { style: BadgeStyle.Danger, children: "Badge 2" },
        disabled: true,
    },
    {
        label: "Last tab",
        content: <Button>This is content for label 5</Button>,
        decorator: <IconIcons size={IconSize.Size12} />,
        badge: { style: BadgeStyle.Danger, children: "Badge 2" },
    },
];

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Tabs",
    component: Tabs,
    argTypes: {
        paddingX: {
            options: Object.values(TabsPaddingX),
            control: { type: "select" },
        },
        size: {
            options: Object.values(TabSize),
            control: { type: "select" },
        },
    },
} as Meta<TabsProps>;

const Template: Story<TabsProps> = (args) => <Tabs {...args} content={data} />;

export const Default = Template.bind({});

Default.args = {
    paddingX: TabsPaddingX.Small,
    size: TabSize.Small,
};
