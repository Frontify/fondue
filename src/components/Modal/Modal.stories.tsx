/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from "react";
import { ModalProps } from "./types";
import { Button } from "@components/Button";
import { Story, Meta } from "@storybook/react";
import { Modal as ModalComponent } from "./Modal";
import { PatternDesign, PatternTheme } from "@foundation/Pattern";

// eslint-disable-next-line import/no-default-export
export default {
    title: "Components/Modal",
    component: ModalComponent,
} as Meta<ModalProps>;

const ModalTemplate: Story<ModalProps> = (args: ModalProps) => (
    <ModalComponent {...args}>
        <Button>Button</Button>
    </ModalComponent>
);

export const Default = ModalTemplate.bind({});

export const WithVisualDigitalAssets = ModalTemplate.bind({});
WithVisualDigitalAssets.args = {
    visual: PatternDesign.DigitalAssets,
};

export const WithVisualImagery = ModalTemplate.bind({});
WithVisualImagery.args = {
    visual: PatternDesign.Imagery,
};

export const WithVisualSound = ModalTemplate.bind({});
WithVisualSound.args = {
    visual: PatternDesign.Sound,
};

export const WithVisualTypography = ModalTemplate.bind({});
WithVisualTypography.args = {
    visual: PatternDesign.Typography,
};
