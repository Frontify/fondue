/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import React, { useEffect, useState } from "react";
import { Switch, SwitchProps, SwitchSize } from "./Switch";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Switch",
    component: Switch,
    argTypes: {
        size: {
            options: Object.values(SwitchSize),
            control: { type: "radio" },
        },
        label: {
            placeholder: "Switch label",
            type: { name: "string", required: false },
            control: {
                type: "text",
            },
        },
    },
    args: {
        on: true,
        disabled: false,
        hug: false,
        name: "switch-name",
        size: SwitchSize.Small,
    },
} as Meta<SwitchProps>;

type Props = SwitchProps & { hug?: boolean };

const Default: Story<Props> = (args: Props) => {
    const [on, setOn] = useState(args.on);
    const toggle = () => setOn(!on);

    useEffect(() => {
        setOn(args.on);
    }, [args.on]);

    return <Switch {...args} onChange={toggle} on={on} />;
};

export const Small: Story<Props> = Default.bind({});
Small.args = { size: SwitchSize.Small };

export const Medium: Story<Props> = Default.bind({});
Medium.args = { size: SwitchSize.Medium };

export const Large: Story<Props> = Default.bind({});
Large.args = { size: SwitchSize.Large };

export const WithLabel: Story<Props> = Default.bind({});
WithLabel.args = { label: "Switch label" };

export const WithLabelAndTooltip: Story<Props> = Default.bind({});
WithLabelAndTooltip.args = { label: "Switch label", tooltip: { content: "Switch tooltip" } };

export const HugLabel: Story<Props> = Default.bind({});
HugLabel.args = { hug: true, label: "Switch label" };
