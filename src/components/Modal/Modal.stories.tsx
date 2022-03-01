/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { ModalProps } from "./types";
import { Button } from "@components/Button";
import { Story, Meta } from "@storybook/react";
import { Modal as ModalComponent } from "./Modal";
import { PatternDesign } from "@foundation/Pattern";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Modal",
    component: ModalComponent,
    argTypes: {
        visual: {
            options: ["None", ...Object.values(PatternDesign)],
            mapping: {
                None: undefined,
                ...Object.values(PatternDesign),
            },
            defaultValue: PatternDesign.DigitalAssets,
            control: { type: "select" },
        },
    },
} as Meta<ModalProps>;

const ModalTemplate: Story<ModalProps> = (args, argTypes) => (
    <ModalComponent {...args} {...argTypes}>
        <Button>Button</Button>
    </ModalComponent>
);

export const Default = ModalTemplate.bind({});

export const WithVisual = ModalTemplate.bind({});
WithVisual.args = {
    visual: PatternDesign.DigitalAssets,
};
