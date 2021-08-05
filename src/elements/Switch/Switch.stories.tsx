/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Size } from "@utilities/enum";
import { Switch, SwitchProps } from "./Switch";

export default {
    title: "Elements/Switch",
    component: Switch,
    argTypes: {
        size: {
            options: [Size.Small, Size.Large],
            control: { type: "radio" },
        },
    },
    args: {
        on: true,
        disabled: false,
        name: "switch-name",
        label: "Switch",
        size: Size.Small,
    },
} as Meta<SwitchProps>;

export const Template: Story<SwitchProps> = (args: SwitchProps) => {
    const [on, setOn] = useState(args.on);
    const toggle = () => setOn(!on);

    useEffect(() => {
        setOn(args.on);
    }, [args.on]);

    return <Switch {...args} onChange={toggle} on={on} />;
};
