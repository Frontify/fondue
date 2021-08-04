/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from "react";
import { Story, Meta } from "@storybook/react";
import { FieldsetHeader as FieldsetHeaderComponent, FieldsetHeaderProps, Size, Type } from "./FieldsetHeader";
import IconIcons from "@elements/Icon/Generated/IconIcons";

export default {
    title: "Compositions/Fieldset Header",
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
        children: "Heading",
        decorator: true,
    },
} as Meta<FieldsetHeaderProps>;

export const FieldsetHeader: Story<FieldsetHeaderProps> = (args: FieldsetHeaderProps) => {
    const [active, setActive] = useState(args.active);

    useEffect(() => {
        setActive(args.active);
    }, [args.active]);

    return (
        <FieldsetHeaderComponent
            {...args}
            decorator={args.decorator && <IconIcons />}
            active={active}
            onClick={() => setActive(!active)}
        />
    );
};
