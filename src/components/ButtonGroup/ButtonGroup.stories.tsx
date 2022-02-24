/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, ButtonSize, ButtonStyle, ButtonEmphasis } from "@components/Button/Button";
import IconReject from "@foundation/Icon/Generated/IconReject";
import { action } from "@storybook/addon-actions";
import { Meta } from "@storybook/react";
import React from "react";
import { ButtonGroup as ButtonGroupComponent, ButtonGroupProps } from "./ButtonGroup";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Button Group",
    component: ButtonGroupComponent,
    argTypes: {
        size: {
            options: [ButtonSize.Small, ButtonSize.Medium, ButtonSize.Large],
            control: { type: "radio" },
        },
        style: {
            options: [
                ButtonStyle.Default,
                ButtonStyle.Positive,
                ButtonStyle.Negative,
                ButtonStyle.Danger,
                ButtonStyle.Primary,
                ButtonStyle.Secondary,
            ],
            control: { type: "radio" },
        },
        emphasis: {
            options: [ButtonEmphasis.Default, ButtonEmphasis.Weak, ButtonEmphasis.Strong],
            control: { type: "radio" },
        },
    },
    args: {
        size: ButtonSize.Medium,
        style: ButtonStyle.Default,
        emphasis: ButtonEmphasis.Default,
        inverted: false,
    },
} as Meta<ButtonGroupProps>;

export const ButtonGroup = ({ ...args }) => (
    <div className={args.inverted ? "tw-p-6 tw-bg-box-neutral-strong" : "tw-p-6"}>
        <ButtonGroupComponent size={args.size}>
            <Button
                style={args.style}
                emphasis={args.emphasis}
                inverted={args.inverted}
                icon={<IconReject />}
                onClick={action("onClick")}
            >
                The First
            </Button>
            <Button
                style={args.style}
                emphasis={args.emphasis}
                inverted={args.inverted}
                icon={<IconReject />}
                onClick={action("onClick")}
            >
                The Second
            </Button>
            <Button
                style={args.style}
                emphasis={args.emphasis}
                inverted={args.inverted}
                icon={<IconReject />}
                onClick={action("onClick")}
            >
                The Third
            </Button>
        </ButtonGroupComponent>
    </div>
);
