/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconSize } from "@elements/Icon/Icon";
import { ReactComponent as TextAlignCenter } from "@elements/Icon/Svg/TextAlignCenter.svg";
import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import Slider, { SliderProps } from "./Slider";

export default {
    title: "Components/Slider",
    component: Slider,
} as Meta<SliderProps>;

const SliderTemplate: Story<SliderProps> = (args) => {
    const [activeItemId, setActiveItemId] = useState(args.items[0].id);
    return <Slider {...args} activeItemId={activeItemId} onChange={setActiveItemId} />;
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
        { id: "a", icon: <TextAlignCenter size={IconSize.Size16} /> },
        { id: "b", icon: <TextAlignCenter size={IconSize.Size16} /> },
        { id: "c", icon: <TextAlignCenter size={IconSize.Size16} /> },
    ],
};
