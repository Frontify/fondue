/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";
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

type Props = SwitchProps & { hug?: boolean };

export const Default: Story<Props> = (args: Props) => {
    const [on, setOn] = useState(args.on);
    const toggle = () => setOn(!on);

    useEffect(() => {
        setOn(args.on);
    }, [args.on]);

    return args.hug ? (
        <span className="tw-inline-block">
            <Switch {...args} onChange={toggle} on={on} />
        </span>
    ) : (
        <Switch {...args} onChange={toggle} on={on} />
    );
};

export const HugLabel: Story<Props> = (args) => <Default {...args} hug={true} />;
