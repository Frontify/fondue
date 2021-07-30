/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import { Size } from "@utilities/enum";
import { useEffect, useState } from "react";
import SwitchComponent, { SwitchProps } from "./Switch";

export default {
    title: "Elements/Switch",
    component: SwitchComponent,
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

export const Switch: Story<SwitchProps> = (args: SwitchProps) => {
    const [on, setOn] = useState(args.on);
    const toggle = () => setOn(!on);

    useEffect(() => {
        setOn(args.on);
    }, [args.on]);

    return <SwitchComponent {...args} onChange={toggle} on={on} />;
};
