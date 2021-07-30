import { Status, Style } from "@elements/Badge/Badge";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { Meta, Story } from "@storybook/react";
import BreadcrumbComponent, { BreadcrumbsProps } from "./Breadcrumbs";

const ITEMS = [
    { label: "Item 1", link: "/" },
    { label: "Item 2", link: "/" },
    { label: "Item 3", link: "/" },
];

export default {
    title: "Components/Breadcrumbs",
    component: BreadcrumbComponent,
} as Meta<BreadcrumbsProps>;

export const Default: Story<BreadcrumbsProps> = (args) => <BreadcrumbComponent {...args} />;

Default.args = {
    items: [
        ...ITEMS,
        {
            bold: true,
            link: "/",
            label: "Active",
        },
    ],
};

export const WithDecorator: Story<BreadcrumbsProps> = (args) => <BreadcrumbComponent {...args} />;

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

export const WithBadges: Story<BreadcrumbsProps> = (args) => <BreadcrumbComponent {...args} />;

WithBadges.args = {
    items: [
        ...ITEMS,
        {
            bold: true,
            link: "/",
            label: "Active",
            badges: [
                {
                    style: Style.Positive,
                    children: "Badge 1",
                },
                {
                    status: Status.Danger,
                    children: "Badge 2",
                },
                {
                    style: Style.Danger,
                    icon: <IconIcons />,
                    children: "Badge 3",
                },
            ],
        },
    ],
};

export const WithDecoratorAndBadge: Story<BreadcrumbsProps> = (args) => <BreadcrumbComponent {...args} />;

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
                    status: Status.Positive,
                    children: "Badge",
                },
            ],
        },
    ],
};
