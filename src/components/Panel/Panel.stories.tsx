/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AddBlockButton } from "@components/AddBlockButton/AddBlockButton";
import { Theme } from "@components/Theme/Theme";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { Panel } from "./Panel";

export default {
    title: "Components/Panel",
    component: Panel,
} as Meta;

const Template: Story = ({ one, two, three }) => (
    <Theme theme={one}>
        <Panel>
            <AddBlockButton
                onClick={() => {
                    console.info("lol");
                }}
            />
        </Panel>

        <Panel>
            <Theme theme={two}>
                <AddBlockButton
                    onClick={() => {
                        console.info("lol");
                    }}
                />
            </Theme>
        </Panel>

        <Theme theme={three}>
            <Panel>
                <AddBlockButton
                    onClick={() => {
                        console.info("lol");
                    }}
                />
            </Panel>
        </Theme>
    </Theme>
);

export const Default = Template.bind({});

Default.args = {
    one: "dark",
    two: "light-ish",
    three: "dark",
};

Default.argTypes = {
    one: {
        options: ["dark", "dark-ish", "light", "light-ish"],
        control: "radio",
    },

    two: {
        options: ["dark", "dark-ish", "light", "light-ish"],
        control: "radio",
    },

    three: {
        options: ["dark", "dark-ish", "light", "light-ish"],
        control: "radio",
    },
};
