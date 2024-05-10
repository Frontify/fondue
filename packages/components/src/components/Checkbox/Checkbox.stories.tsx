/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState, type FormEvent } from 'react';

import { Label } from '../Label/Label';

import { Checkbox } from './Checkbox';

type Story = StoryObj<typeof Checkbox>;
const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'in_progress',
        },
    },
    args: {
        onChange: action('onChange'),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
    },
    render: (args) => {
        const [value, setValue] = useState(args.defaultValue);

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <div className="tw-flex tw-gap-2 tw-items-center">
                <Checkbox {...args} id="checkbox" value={args.value || value} onChange={handleToggle} />
                <Label htmlFor="checkbox">Checkbox</Label>
            </div>
        );
    },
};
export default meta;

export const Default: Story = {};

export const Indeterminate: Story = {
    args: {
        value: 'indeterminate',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
