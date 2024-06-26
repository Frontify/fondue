/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import { type FormEvent, useState } from 'react';

import { Label } from '../Label/Label';

import { Checkbox, CheckboxComponent } from './Checkbox';

type Story = StoryObj<typeof CheckboxComponent>;
const meta: Meta<typeof CheckboxComponent> = {
    title: 'Components/Checkbox',
    component: CheckboxComponent,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        onChange: action('onChange'),
        onBlur: action('onBlur'),
        onFocus: action('onFocus'),
    },
    render: (args) => {
        const [value, setValue] = useState(args.value);

        const handleToggle = (event: FormEvent) => {
            action('onChange')(event);
            setValue((prevIsChecked) => (prevIsChecked === 'indeterminate' ? true : !prevIsChecked));
        };

        return (
            <div className="tw-flex tw-gap-1.5 tw-items-center">
                <Checkbox {...args} id="checkbox" aria-labelledby="label" value={value} onChange={handleToggle} />
                <Label id="label" htmlFor="checkbox">
                    Checkbox
                </Label>
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
