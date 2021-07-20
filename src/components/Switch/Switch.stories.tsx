/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Size } from "@utilities/enum";
import { useEffect, useState } from "react";
import Switch, { SwitchProps } from "./Switch";

export default {
    title: "Switch",
    component: Switch,
    argTypes: {
        size: {
            options: [Size.Small, Size.Large],
            control: { type: "radio" },
        },
    },
} as Meta;

const SwitchTemplate: Story<SwitchProps> = (args) => {
    const [on, setOn] = useState(args.on);
    const toggle = () => setOn(!on);

    useEffect(() => {
        setOn(args.on);
    }, [args.on]);

    return (
        <Switch
            {...args}
            onChange={toggle}
            on={on}
        />
    );
};

export const Default = SwitchTemplate.bind({});

Default.args = {
    on: true,
    disabled: false,
    name: "switch-name",
    label: "Switch",
    size: Size.Small,
};
