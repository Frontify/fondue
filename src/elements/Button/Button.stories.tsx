/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as IconCaretLeft } from "@elements/Icon/Svg/CaretLeft.svg";
import { Meta, Story } from "@storybook/react";
import { Size, Style } from "@utilities/enum";
import Button, { ButtonProps } from "./Button";

export default {
    title: "Elements/Button",
    component: Button,
    args: {
        disabled: false,
        size: Size.Small,
        style: Style.Primary,
    },
    argTypes: {
        size: {
            options: [Size.Small, Size.Large],
            control: { type: "radio" },
        },
        variant: {
            options: [Style.Primary, Style.Secondary, Style.Danger],
            control: { type: "select" },
        },
        onClick: { action: "onClick" },
    },
} as Meta<ButtonProps>;

const ButtonTemplate: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = ButtonTemplate.bind({});
Default.args = {
    children: "Button",
};

export const withIcon = ButtonTemplate.bind({});
withIcon.args = {
    children: (
        <>
            <IconCaretLeft />
            Ok
        </>
    ),
};
