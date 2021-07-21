import { Meta, Story } from "@storybook/react";
import BreadcrumbComponent, { BreadcrumbProps } from "./Breadcrumb";

export default {
    title: "Components/Breadcrumb",
    component: BreadcrumbComponent,
    args: {
        items: [
            { label: "Item 1", link: "/" },
            { label: "Item 2", link: "/" },
            { label: "Item 3", link: "/" },
        ],
    },
} as Meta;

export const Breadcrumb: Story<BreadcrumbProps> = (args) => <BreadcrumbComponent {...args} />;
