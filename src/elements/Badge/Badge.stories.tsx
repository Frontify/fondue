import { Meta, Story } from "@storybook/react";
import BadgeComponent, { BadgeProps, BadgeStatus } from "./Badge";

export default {
    title: "Elements/Badge",
    component: BadgeComponent,
    argTypes: {
        status: {
            options: Object.keys(BadgeStatus),
            control: { type: "select" },
        },
        customColor: {
            control: { type: "color" },
        },
    },
    args: {
        children: "Badge",
        status: undefined,
        customColor: "",
    },
} as Meta<BadgeProps>;

export const Badge: Story<BadgeProps> = (args) => <BadgeComponent {...args} />;
