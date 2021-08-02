/* (c) Copyright Frontify Ltd., all rights reserved. */

import Button, { ButtonSize, ButtonStyle } from "@elements/Button/Button";
import IconReject from "@elements/Icon/Generated/IconReject";
import { Meta, Story } from "@storybook/react";
import ButtonGroupComponent, { ButtonGroupProps } from "./ButtonGroup";

export default {
    title: "Compositions/ButtonGroup",
    component: ButtonGroupComponent,
    argTypes: {
        size: {
            options: [ButtonSize.Small, ButtonSize.Medium, ButtonSize.Large],
            control: { type: "radio" },
        },
    },
    args: {
        size: ButtonSize.Medium,
    },
} as Meta<ButtonGroupProps>;

export const ButtonGroup: Story<ButtonGroupProps> = (args: ButtonGroupProps) => (
    <ButtonGroupComponent size={args.size}>
        <Button>The First</Button>
        <Button style={ButtonStyle.Secondary}>The Second</Button>
        <Button icon={<IconReject />} style={ButtonStyle.Danger}>
            The Third
        </Button>
    </ButtonGroupComponent>
);
