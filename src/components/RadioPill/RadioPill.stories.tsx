/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconIcons from "@components/Icon/Generated/IconIcons";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import React from "react";
import { RadioPill as RadioPillComponent, RadioPillProps } from "./RadioPill";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Radio Pill",
    component: RadioPillComponent,
    args: {
        label: "Label",
        active: true,
        onClick: action("click"),
    },
    argTypes: {
        icon: {
            options: ["None", "Icon"],
            mapping: {
                None: null,
                Icon: <IconIcons />,
            },
            control: { type: "select" },
        },
    },
} as Meta<RadioPillProps>;

export const RadioPill: Story<RadioPillProps> = (args) => <RadioPillComponent {...args} />;
