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
    items: [
        { id: "a", name: "abc" },
        { id: "b", name: "def" },
        { id: "c", name: "ghi" },
    ],
    activeItemId: "a",
};
