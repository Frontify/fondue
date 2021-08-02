/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconTextAlignCenter from "@elements/Icon/Generated/IconTextAlignCenter";
import IconTextAlignLeft from "@elements/Icon/Generated/IconTextAlignLeft";
import IconTextAlignRight from "@elements/Icon/Generated/IconTextAlignRight";
import IconSize from "@elements/Icon/IconSize";
import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import Slider, { SliderProps } from "./Slider";

export default {
    title: "Components/Slider",
    component: Slider,
} as Meta<SliderProps>;

const SliderTemplate: Story<SliderProps> = (args: SliderProps) => {
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
        { id: "a", icon: <IconTextAlignLeft size={IconSize.Size16} />, ariaLabel: "Text Align Left" },
        { id: "b", icon: <IconTextAlignCenter size={IconSize.Size16} />, ariaLabel: "Text Align Center" },
        { id: "c", icon: <IconTextAlignRight size={IconSize.Size16} />, ariaLabel: "Text Align Right" },
    ],
};
