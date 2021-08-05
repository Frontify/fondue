/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { useEffect, useState } from "react";
import { Switch, SwitchProps, SwitchSize } from "./Switch";

export default {
    title: "Elements/Switch",
    component: Switch,
    argTypes: {
        size: {
            options: Object.values(SwitchSize),
            control: { type: "radio" },
        },
    },
    args: {
        on: true,
        disabled: false,
        name: "switch-name",
        label: "Switch",
        size: SwitchSize.Small,
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
