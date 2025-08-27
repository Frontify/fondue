/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react';
import { useId } from 'react';

import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';

import { RadioList } from './RadioList';

type Story = StoryObj<typeof RadioList.Root>;
const meta: Meta<typeof RadioList.Root> = {
    title: 'Components/RadioList',
    component: RadioList.Root,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {
        disabled: false,
        required: false,
        value: undefined,
        orientation: undefined,
    },
    argTypes: {
        value: {
            type: 'string',
        },
        orientation: {
            type: 'string',
            options: [undefined, 'horizontal', 'vertical'],
            control: { type: 'select' },
        },
    },
    render: (args) => {
        const id = useId();

        const idOption1 = `${id}-option-1`;
        const idOption2 = `${id}-option-2`;
        const idOption3 = `${id}-option-3`;

        return (
            <RadioList.Root
                disabled={args.disabled}
                orientation={args.orientation}
                required={args.required}
                value={args.value}
            >
                <RadioList.RadioButton id={idOption1} value="1" />
                <Label htmlFor={idOption1} required={args.required}>
                    Option 1
                </Label>

                <RadioList.RadioButton id={idOption2} value="2" />
                <Label htmlFor={idOption2} required={args.required}>
                    Option 2
                </Label>

                <RadioList.RadioButton id={idOption3} value="3" />
                <Label htmlFor={idOption3} required={args.required}>
                    Option 3
                </Label>
            </RadioList.Root>
        );
    },
};
export default meta;

export const Default: Story = {};

export const WithCustomLayout: Story = {
    render: (args) => {
        const id = useId();

        const idOption1 = `${id}-option-1`;
        const idOption2 = `${id}-option-2`;
        const idOption3 = `${id}-option-3`;

        return (
            <RadioList.Root disabled={args.disabled} required={args.required} value={args.value} asChild>
                <Flex gap={4}>
                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption1} value="1" />
                        <Label htmlFor={idOption1} required={args.required}>
                            Option 1
                        </Label>
                    </Flex>

                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption2} value="2" />
                        <Label htmlFor={idOption2} required={args.required}>
                            Option 2
                        </Label>
                    </Flex>

                    <Flex gap={2} align="center">
                        <RadioList.RadioButton id={idOption3} value="3" />
                        <Label htmlFor={idOption3} required={args.required}>
                            Option 3
                        </Label>
                    </Flex>
                </Flex>
            </RadioList.Root>
        );
    },
};
