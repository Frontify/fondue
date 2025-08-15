/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryObj } from '@storybook/react';
import { type FormEvent, useState } from 'react';

import { Flex } from '../Flex/Flex';
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
        disabled: false,
        required: false,
        readOnly: false,
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

export const Checklist: Story = {
    render: (args) => {
        return (
            <Flex gap="1rem" direction="column">
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox" aria-labelledby="label" value={true} onChange={() => {}} />
                    <Label id="label" htmlFor="checkbox">
                        Checkbox 1
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox {...args} id="checkbox" aria-labelledby="label" value={false} onChange={() => {}} />
                    <Label id="label" htmlFor="checkbox">
                        Checkbox 2
                    </Label>
                </Flex>
                <Flex gap="4px" direction="row">
                    <Checkbox
                        {...args}
                        id="checkbox"
                        aria-labelledby="label"
                        value="indeterminate"
                        onChange={() => {}}
                    />
                    <Label id="label" htmlFor="checkbox">
                        Checkbox 3
                    </Label>
                </Flex>
            </Flex>
        );
    },
};
