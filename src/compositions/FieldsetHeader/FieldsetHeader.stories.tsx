/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";
import { ReactComponent as Icons } from "@elements/Icon/Svg/Icons.svg";

import FieldsetHeaderComponent, { FieldsetHeaderProps, Size, Type } from "./FieldsetHeader";
import { useEffect, useState } from "react";

export default {
    title: "Compositions/FieldsetHeader",
    component: FieldsetHeaderComponent,
    argTypes: {
        size: {
            options: [Size.Small, Size.Large],
            control: { type: "radio" },
        },
        type: {
            options: [Type.Default, Type.Switch, Type.Accordion, Type.AddRemove],
            control: { type: "radio" },
        },
    },
    args: {
        size: Size.Large,
        active: true,
        type: Type.Default,
        disabled: false,
        bold: true,
        heading: "Heading",
    },
} as Meta<FieldsetHeaderProps>;

export const FieldsetHeader: Story<FieldsetHeaderProps> = (args) => {
    const [active, setActive] = useState(args.active);

    useEffect(() => {
        setActive(args.active);
    }, [args.active]);

    return <FieldsetHeaderComponent {...args} active={active} onClick={() => setActive(!active)} />;
};

export const withIcon = FieldsetHeader.bind({});

withIcon.args = {
    size: Size.Large,
    active: true,
    type: Type.Default,
    disabled: false,
    bold: true,
    heading: "Heading",
    decorator: <Icons />,
};

withIcon.storyName = "Heading with Decorator";
