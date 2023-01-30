/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
    AddBlockButton as AddBlockButtonComponent,
    AddBlockButtonDirection,
    AddBlockButtonProps,
} from './AddBlockButton';

export default {
    title: 'Components/Add Block Button',
    component: AddBlockButtonComponent,
    tags: ['autodocs'],
    args: {
        title: 'Add Block Button',
        orientation: AddBlockButtonDirection.Horizontal,
    },
    argTypes: {
        onClick: {
            action: 'Click',
        },
        orientation: {
            options: Object.values(AddBlockButtonDirection),
            control: 'radio',
        },
    },
} as Meta<AddBlockButtonProps>;

export const AddBlockButton: StoryFn<AddBlockButtonProps> = (args: AddBlockButtonProps) => (
    <AddBlockButtonComponent {...args} />
);
