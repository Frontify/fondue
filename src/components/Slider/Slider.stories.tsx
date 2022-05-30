/* (c) Copyright Frontify Ltd., all rights reserved. */

import IconTextAlignCenter from '@foundation/Icon/Generated/IconTextAlignCenter';
import IconTextAlignLeft from '@foundation/Icon/Generated/IconTextAlignLeft';
import IconTextAlignRight from '@foundation/Icon/Generated/IconTextAlignRight';
import { IconSize } from '@foundation/Icon/IconSize';
import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { Slider, SliderProps } from './Slider';

export default {
    title: 'Components/Slider',
    component: Slider,
    argTypes: {
        id: { type: 'string' },
    },
    args: {
        disabled: false,
    },
} as Meta<SliderProps>;

const SliderTemplate: Story<SliderProps> = (args: SliderProps) => {
    const [activeItemId, setActiveItemId] = useState(args.items[0].id);
    return <Slider {...args} activeItemId={activeItemId} onChange={setActiveItemId} />;
};

export const Text = SliderTemplate.bind({});
Text.args = {
    items: [
        { id: 'a', value: 'abc' },
        { id: 'b', value: 'def' },
        { id: 'c', value: 'ghi' },
    ],
};

export const Number = SliderTemplate.bind({});
Number.args = {
    items: [
        { id: 'a', value: 10 },
        { id: 'b', value: 20 },
        { id: 'c', value: 30 },
    ],
};

export const Icon = SliderTemplate.bind({});
Icon.args = {
    items: [
        { id: 'a', icon: <IconTextAlignLeft size={IconSize.Size16} />, ariaLabel: 'Text Align Left' },
        { id: 'b', icon: <IconTextAlignCenter size={IconSize.Size16} />, ariaLabel: 'Text Align Center' },
        { id: 'c', icon: <IconTextAlignRight size={IconSize.Size16} />, ariaLabel: 'Text Align Right' },
    ],
};
