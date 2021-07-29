/* (c) Copyright Frontify Ltd., all rights reserved. */

import Button, { Size, Style } from "@elements/Button/Button";
import { Story, Meta } from "@storybook/react";
import { ReactComponent as Reject } from "@elements/Icon/Svg/Reject.svg";

import ButtonGroupComponent, { ButtonGroupProps } from "./ButtonGroup";
import { FC } from "react";

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
    <ButtonGroupComponent>
        <Button size={args.size}>The First</Button>
        <Button size={args.size} style={Style.Secondary}>
            The Second
        </Button>
        <Button size={args.size} icon={<Reject />} style={Style.Danger}>
            The Third
        </Button>
    </ButtonGroupComponent>
);

const Foo: FC = () => (
    <div>
        <ButtonGroup>
            <Button size={Size.Medium}>A Button</Button>
            <Button size={Size.Medium}>Another Button</Button>
            <Button size={Size.Medium}>And Another</Button>
        </ButtonGroup>
    </div>
);
