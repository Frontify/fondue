/* (c) Copyright Frontify Ltd., all rights reserved. */

import Button, { Size, Style } from "@elements/Button/Button";
import IconReject from "@elements/Icon/Generated/IconReject";
import { Meta, Story } from "@storybook/react";
import ButtonGroupComponent, { ButtonGroupProps } from "./ButtonGroup";

export default {
    title: "Compositions/ButtonGroup",
    component: ButtonGroupComponent,
    argTypes: {
        size: {
            options: [Size.Small, Size.Medium, Size.Large],
            control: { type: "radio" },
        },
    },
    args: {
        size: Size.Medium,
    },
} as Meta<ButtonGroupProps>;

export const ButtonGroup: Story<ButtonGroupProps> = (args: ButtonGroupProps) => (
    <ButtonGroupComponent size={args.size}>
        <Button>The First</Button>
        <Button style={Style.Secondary}>The Second</Button>
        <Button icon={<IconReject />} style={Style.Danger}>
            The Third
        </Button>
    </ButtonGroupComponent>
);
