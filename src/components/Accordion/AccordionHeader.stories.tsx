/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { Meta, Story } from "@storybook/react";
import { AccordionHeader as AccordionHeaderComponent } from "./AccordionHeader";
import { AccordionHeaderProps } from "./types";
import { IconBrand, IconCallout, IconIcons } from "@foundation/Icon";

const decorators = {
    IconNone: null,
    IconDefault: <IconBrand />,
    IconCallout: <IconCallout />,
    IconIcons: <IconIcons />,
};

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Accordion/Accordion Header",
    component: AccordionHeaderComponent,
    argTypes: {
        decorator: {
            options: Object.keys(decorators),
            mapping: decorators,
            control: {
                type: "select",
                labels: {
                    IconNone: "None",
                    IconIcons: "Icon",
                    IconDefault: "Brand",
                    IconCallout: "Callout",
                },
            },
        },
    },
    args: {
        isOpen: false,
        disabled: false,
        children: "I am the Default Accordion Header",
    },
} as Meta<AccordionHeaderProps>;

export const AccordionHeader: Story<AccordionHeaderProps> = (args) => <AccordionHeaderComponent {...args} />;
