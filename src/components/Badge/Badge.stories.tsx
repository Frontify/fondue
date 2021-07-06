import { Story, Meta } from "@storybook/react";
import Badge, { BadgeProps } from "./Badge";

export default {
    title: "Badge",
    component: Badge,
} as Meta;

const BadgeTemplate: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Default = BadgeTemplate.bind({});

Default.args = {
    children: "Badge",
};

Default.argTypes = {
    customColor: {
        control: { type: "color" },
    },
};
