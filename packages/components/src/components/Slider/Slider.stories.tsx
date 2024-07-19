/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { Slider } from './Slider';
import { Label } from '../Label/Label';

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
        'aria-labelledby': 'some-label-id',
        'aria-label': 'Slider',
    },
};

export default meta;

export const SimpleSlider: Story = {
    args: {
        name: 'Simple slider',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};

export const MinimumAndMaximum: Story = {
    args: {
        min: 50,
        max: 1000,
    },
};

export const MinimumGap: Story = {
    args: {
        minStepsBetweenThumbs: 25,
    },
};

export const StepSize: Story = {
    args: {
        step: 25,
    },
};

export const MultipleThumbsUncontrolled: Story = {
    args: {
        defaultValue: [33, 67],
    },
};

export const ExternallyControlled: Story = {
    render: (args) => {
        const [sliderRange, setSliderRange] = useState([50]);
        const userIsWarned = useRef(false);
        return (
            <Slider
                onChange={(value) => {
                    if (!value[0]) {
                        return;
                    }
                    if (value[0] > 80 && !userIsWarned.current) {
                        userIsWarned.current = true;
                        alert("You're going a bit high there");
                    }
                    setSliderRange(value);
                }}
                value={sliderRange}
                {...args}
            />
        );
    },
};

export const MultipleThumbsExternallyControlled: Story = {
    render: (args) => {
        const [sliderRange, setSliderRange] = useState([33, 67]);
        return (
            <Slider
                onChange={(value) => {
                    if (!value[0] || !value[1]) {
                        return;
                    }
                    if (value[1] - value[0] > 80) {
                        alert('The range is too large');
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
