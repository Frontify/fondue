/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryObj } from '@storybook/react-vite';

import { ColorPicker } from './ColorPicker';
import { ColorPickerInput } from './ColorPickerInput';

type Story = StoryObj<typeof ColorPickerInput>;
const meta: Meta<typeof ColorPickerInput> = {
    title: 'Components/ColorPicker/Input',
    component: ColorPickerInput,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'released',
        },
    },
    args: {},
};
export default meta;

export const Default: Story = {
    args: {
        currentColor: { red: 230, green: 100, blue: 50, alpha: 0.8, name: 'custom-color' },
    },
    render: (args) => {
        return <ColorPicker.Input {...args} onClear={() => {}} />;
    },
};

export const Empty: Story = {
    args: {},
    render: (args) => {
        return <ColorPicker.Input {...args} onClear={() => {}} />;
    },
};

export const Disabled: Story = {
    args: {},
    render: (args) => {
        return <ColorPicker.Input {...args} disabled onClear={() => {}} />;
    },
};
