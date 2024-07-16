/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Slider } from './Slider';

type Story = StoryObj<typeof Slider>;
const meta: Meta<typeof Slider> = {
    component: Slider,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        'aria-label': 'Slide me',
    },
};
export default meta;

export const SimpleSlider: Story = {
    args: {
        min: 0,
        max: 100,
        step: 10,
    },
};

export const ShowMinMax: Story = {
    args: {
        min: 0,
        max: 100,
        showMinMax: true,
        step: 1,
    },
};

export const MultipleThumbsControlled: Story = {
    render: (args) => {
        const [sliderRange, setSliderRange] = useState([33, 67]);
        return (
            <Slider
                onChange={(value) => {
                    if (!value[0] || !value[1]) {
                        return;
                    }
                    if (value[1] - value[0] > 80) {
                        alert('The range is too big');
                        return;
                    }
                    setSliderRange(value);
                }}
                value={sliderRange}
                {...args}
            />
        );
    },
};

export const MultipleThumbsUncontrolled: Story = {
    args: {
        min: 0,
        max: 100,
        defaultValue: [33, 67],
        step: 1,
    },
};

export const Disabled: Story = {
    args: {
        min: 0,
        max: 100,
        defaultValue: [50],
        disabled: true,
    },
};
