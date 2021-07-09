/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactComponent as TextAlignCenter } from "@components/Icon/Svg/TextAlignCenter.svg";
import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import Slider, { SliderProps } from "./Slider";

export default {
    title: "Slider",
    component: Slider,
} as Meta;

const SliderTemplate: Story<SliderProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState(args.items[0].id);
    return <Slider activeItemId={activeItemId} onChange={setActiveItemId} {...args} />;
};

export const Text = SliderTemplate.bind({});
Text.args = {
    items: [
        { id: "a", name: "abc" },
        { id: "b", name: "def" },
        { id: "c", name: "ghi" },
    ],
};

export const Icon = SliderTemplate.bind({});
Icon.args = {
    items: [
        { id: "a", icon: <TextAlignCenter /> },
        { id: "b", icon: <TextAlignCenter /> },
        { id: "c", icon: <TextAlignCenter /> },
    ],
};
