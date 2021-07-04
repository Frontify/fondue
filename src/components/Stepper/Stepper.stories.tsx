/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Story, Meta } from "@storybook/react";
import Stepper, { StepperProps } from "./Stepper";

export default {
    title: "Stepper",
    component: Stepper,
} as Meta;

const StepperTemplate: Story<StepperProps> = (args) => <Stepper {...args} />;

export const Default = StepperTemplate.bind({});

Default.args = {
    initialStep: 0,
    totalSteps: 10,
    useInternalCounter: true,
};
