/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Story, Meta } from "@storybook/react";
import { RadioPill as RadioPillComponent, RadioPillProps } from "./RadioPill";
import IconIcons from "@elements/Icon/Generated/IconIcons";

export default {
    title: "Elements/Radio Pill",
    component: RadioPillComponent,
    args: {
        label: "Label",
        active: true,
    },
    argTypes: {
        icon: {
            options: ["None", "Icon"],
            mapping: {
                None: null,
                Icon: <IconIcons />,
            },
            defaultValue: "None",
            control: { type: "select" },
        },
    },
} as Meta<RadioPillProps>;

export const RadioPill: Story<RadioPillProps> = (args) => <RadioPillComponent {...args} />;
