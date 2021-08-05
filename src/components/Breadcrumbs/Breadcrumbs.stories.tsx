/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { BadgeStatus, BadgeStyle } from "@elements/Badge/Badge";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { Meta, Story } from "@storybook/react";
import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

const link = document.referrer;
const ITEMS = [
    { label: "Item 1", link },
    { label: "Item 2", link },
    { label: "Item 3", link },
];

export default {
    title: "Components/Breadcrumbs",
    component: Breadcrumbs,
} as Meta<BreadcrumbsProps>;

export const Template: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

Template.args = {
    items: [...ITEMS, { link, bold: true, label: "Active" }],
};

export const WithDecorator = Template.bind({});

WithDecorator.args = {
    items: [...ITEMS, { link, bold: true, decorator: <IconIcons />, label: "Active" }],
};

export const WithBadges = Template.bind({});

WithBadges.args = {
    items: [
        ...ITEMS,
        {
            link,
            bold: true,
            label: "Active",
            badges: [
                { style: BadgeStyle.Positive, children: "Badge 1" },
                { status: BadgeStatus.Danger, children: "Badge 2" },
                { style: BadgeStyle.Danger, icon: <IconIcons />, children: "Badge 3" },
            ],
        },
    ],
};

export const WithDecoratorAndBadge: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

WithDecoratorAndBadge.args = {
    items: [
        ...ITEMS,
        {
            link,
            bold: true,
            decorator: <IconIcons />,
            label: "Active",
            badges: [{ status: BadgeStatus.Positive, children: "Badge" }],
        },
    ],
};
