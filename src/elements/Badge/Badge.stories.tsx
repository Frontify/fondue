import { Meta, Story } from "@storybook/react";
import { Theme } from "@utilities/enum";
import BadgeComponent, { BadgeProps, BadgeStatus } from "./Badge";

export default {
    title: "Elements/Badge",
    component: BadgeComponent,
    argTypes: {
        theme: {
            options: Object.keys(Theme),
            control: { type: "radio" },
        },
        status: {
            options: Object.keys(BadgeStatus),
            control: { type: "radio" },
        },
        customColor: {
            control: { type: "color" },
        },
    },
    args: {
        children: "Badge",
        theme: Theme.Light,
        status: BadgeStatus.Success,
        customColor: "",
    },
} as Meta;

export const Badge: Story<BadgeProps> = (args) => <BadgeComponent {...args} />;
