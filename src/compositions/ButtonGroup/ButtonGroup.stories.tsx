/* (c) Copyright Frontify Ltd., all rights reserved. */

import Button, { Size, Style } from "@elements/Button/Button";
import { ReactComponent as Reject } from "@elements/Icon/Svg/Reject.svg";
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

export const ButtonGroup: Story<ButtonGroupProps & { size: Size }> = (args) => (
    <ButtonGroupComponent size={args.size}>
        <Button>The First</Button>
        <Button style={Style.Secondary}>The Second</Button>
        <Button icon={<Reject />} style={Style.Danger}>
            The Third
        </Button>
    </ButtonGroupComponent>
);
