import { Story, Meta } from "@storybook/react";
import Breadcrumb, { BreadcrumbProps } from "./Breadcrumb";

export default {
    title: "Breadcrumb",
    component: Breadcrumb,
} as Meta;

const BreadcrumbTemplate: Story<BreadcrumbProps> = (args) => <Breadcrumb {...args} />;

export const Default = BreadcrumbTemplate.bind({});

Default.args = {
    items: [
        { label: "Item 1", link: "/" },
        { label: "Item 2", link: "/" },
        { label: "Item 3", link: "/" },
    ],
};
