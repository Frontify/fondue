/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { FieldsetHeader, FieldsetHeaderProps, FieldsetHeaderSize, FieldsetHeaderType } from "./FieldsetHeader";
import IconIcons from "@elements/Icon/Generated/IconIcons";

export default {
    title: "Compositions/FieldsetHeader",
    component: FieldsetHeader,
    argTypes: {
        size: {
            options: [FieldsetHeaderSize.Small, FieldsetHeaderSize.Large],
            control: { type: "radio" },
        },
        type: {
            options: [
                FieldsetHeaderType.Default,
                FieldsetHeaderType.Switch,
                FieldsetHeaderType.Accordion,
                FieldsetHeaderType.AddRemove,
            ],
            control: { type: "radio" },
        },
    },
    args: {
        size: FieldsetHeaderSize.Large,
        active: true,
        type: FieldsetHeaderType.Default,
        disabled: false,
        bold: true,
        children: "Heading",
    },
} as Meta<FieldsetHeaderProps>;

export const Template: Story<FieldsetHeaderProps> = (args: FieldsetHeaderProps) => {
    const [active, setActive] = useState(args.active);

    useEffect(() => {
        setActive(args.active);
    }, [args.active]);

    return <FieldsetHeader {...args} active={active} onClick={() => setActive(!active)} />;
};

export const withIcon = Template.bind({});

withIcon.args = {
    size: FieldsetHeaderSize.Large,
    active: true,
    type: FieldsetHeaderType.Default,
    disabled: false,
    bold: true,
    children: "Heading",
    decorator: <IconIcons />,
};

withIcon.storyName = "Heading with Decorator";
