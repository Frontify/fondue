/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Type } from "@compositions/FieldsetHeader/FieldsetHeader";
import { FormControl } from "@compositions/FormControl/FormControl";
import IconIcons from "@elements/Icon/Generated/IconIcons";
import { TextInput } from "@elements/TextInput/TextInput";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { Accordion as AccordionComponent, AccordionItem, AccordionProps } from "./Accordion";

export default {
    title: "Compositions/Accordion",
    component: AccordionComponent,
} as Meta<AccordionProps>;

export const Accordion: Story<AccordionProps> = () => (
    <AccordionComponent>
        <AccordionItem
            header={{
                children: "Item with decorator, type Accoridon and a FormControl child",
                decorator: <IconIcons />,
                type: Type.Accordion,
            }}
        >
            <FormControl
                label={{ children: "Width", htmlFor: "width", tooltip: "Width of the future" }}
                extra="Some extra text."
                helper={{ text: "This input should always equal to 42." }}
            >
                <TextInput id="width" />
            </FormControl>
        </AccordionItem>
        <AccordionItem header={{ children: "Item with plain text child" }}>bar</AccordionItem>
        <AccordionItem
            header={{ children: "Empty item with an onClick callback", type: Type.AddRemove, onClick: action("click") }}
        />
    </AccordionComponent>
);
