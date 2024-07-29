/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { type ChangeEvent, useRef, useState } from 'react';

import { Label } from '../Label/Label';
import { TextInput } from '../TextInput/TextInput';

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
        min: 0,
        max: 100,
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
        defaultValue: [50],
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

export const WithInputs: Story = {
    decorators: (Story) => {
        return (
            <div style={{ display: 'flex', gap: 16 }}>
                <Story />
            </div>
        );
    },
    render: () => {
        const [range, setRange] = useState([250, 450]);

        const onRangeChange = (value: number[]) => {
            setRange(value);
        };

        const onInputChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = parseInt(event.target.value, 10);
            if (newValue >= 200 && newValue <= 500) {
                setRange((prev) => {
                    const newRange = [...prev];
                    newRange[index] = newValue;
                    return newRange;
                });
            }
        };

        return (
            <>
                <Label id="new-slider-label" htmlFor="new-slider">
                    Price range
                </Label>

                <Slider
                    id="new-slider"
                    aria-labelledby="new-slider-label"
                    value={range}
                    min={200}
                    max={500}
                    onChange={onRangeChange}
                />

                {range.map((value, index) => (
                    <TextInput
                        key={index}
                        id={`new-slider-input-${index}`}
                        value={value}
                        type="number"
                        aria-label={`Price range ${index === 0 ? 'from' : 'to'}`}
                        onChange={onInputChange(index)}
                    />
                ))}
            </>
        );
    },
};
