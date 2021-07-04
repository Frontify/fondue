/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";
import Button, { ButtonProps } from "./Button";
import { ReactComponent as IconCaretLeft } from "@components/Icon/Svg/CaretLeft.svg";

export default {
    title: "Button",
    component: Button,
} as Meta;

const ButtonTemplate: Story<ButtonProps> = (args) => <Button {...args} />;

export const Default = ButtonTemplate.bind({});

Default.args = {
    children: "Button",
};

Default.argTypes = {
    onClick: { action: "onClick" },
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
