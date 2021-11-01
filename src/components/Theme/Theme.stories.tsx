/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { Theme, ThemeProps } from "./Theme";
import { AddBlockButton } from "@components/AddBlockButton/AddBlockButton";

export default {
    title: "Components/Theme",
    component: Theme,
} as Meta<ThemeProps>;

const Template: Story<ThemeProps> = (args) => (
    <Theme {...args}>
        <AddBlockButton
            onClick={() => {
                console.info("wat");
            }}
        />
    </Theme>
);

export const Default = Template.bind({});

Default.args = {
    theme: "light",
};

Default.argTypes = {
    theme: {
        options: ["dark", "dark-ish", "light", "light-ish"],
        control: "radio",
    },
};
