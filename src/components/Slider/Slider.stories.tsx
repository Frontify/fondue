/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, Story } from "@storybook/react";
import Slider, { SliderProps } from "./Slider";

export default {
    title: "Slider",
    component: Slider,
} as Meta;

const SliderTemplate: Story<SliderProps> = (args) => <Slider {...args} />;

export const Default = SliderTemplate.bind({});

Default.args = {
    items: ["abc", "def", "ghi"],
    activeItem: "abc",
};
