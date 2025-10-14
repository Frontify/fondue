/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { AddBlockButton as AddBlockButtonComponent, type AddBlockButtonProps, ButtonDirection } from './AddBlockButton';

export default {
    title: 'Components/Add Block Button',
    component: AddBlockButtonComponent,
    tags: ['autodocs'],
    args: {
        title: 'Add Block Button',
        direction: ButtonDirection.Right,
    },

    argTypes: {
        onClick: {
            action: 'Click',
        },
        direction: {
            options: Object.values(ButtonDirection),
            control: 'select',
        },
    },
} as Meta<AddBlockButtonProps>;

export const AddBlockButton: StoryFn<AddBlockButtonProps> = (args: AddBlockButtonProps) => (
    <AddBlockButtonComponent {...args} />
);
