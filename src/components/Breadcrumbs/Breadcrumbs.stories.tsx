import { BadgeStatus, BadgeStyle } from "@elements/Badge/Badge";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { Meta, Story } from "@storybook/react";
import { Breadcrumbs, BreadcrumbsProps } from "./Breadcrumbs";

const ITEMS = [
    { label: "Item 1", link: "/" },
    { label: "Item 2", link: "/" },
    { label: "Item 3", link: "/" },
];

export default {
    title: "Components/Breadcrumbs",
    component: Breadcrumbs,
} as Meta<BreadcrumbsProps>;

export const Template: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

Template.args = {
    items: [
        ...ITEMS,
        {
            bold: true,
            link: "/",
            label: "Active",
        },
    ],
};

export const WithDecorator: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

WithDecorator.args = {
    items: [
        ...ITEMS,
        {
            bold: true,
            link: "/",
            decorator: <IconIcons />,
            label: "Active",
        },
    ],
};

export const WithBadges: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

WithBadges.args = {
    items: [
        ...ITEMS,
        {
            bold: true,
            link: "/",
            label: "Active",
            badges: [
                {
                    style: BadgeStyle.Positive,
                    children: "Badge 1",
                },
                {
                    status: BadgeStatus.Danger,
                    children: "Badge 2",
                },
                {
                    style: BadgeStyle.Danger,
                    icon: <IconIcons />,
                    children: "Badge 3",
                },
            ],
        },
    ],
};

export const WithDecoratorAndBadge: Story<BreadcrumbsProps> = (args: BreadcrumbsProps) => <Breadcrumbs {...args} />;

WithDecoratorAndBadge.args = {
    items: [
        ...ITEMS,
        {
            bold: true,
            link: "/",
            decorator: <IconIcons />,
            label: "Active",
            badges: [
                {
                    status: BadgeStatus.Positive,
                    children: "Badge",
                },
            ],
        },
    ],
};
