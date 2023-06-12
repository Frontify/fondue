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
        direction: AddBlockButtonDirection.Right,
    },
    argTypes: {
        onClick: {
            action: 'Click',
        },
        direction: {
            options: Object.values(AddBlockButtonDirection),
            control: 'select',
        },
    },
} as Meta<AddBlockButtonProps>;

export const AddBlockButton: StoryFn<AddBlockButtonProps> = (args: AddBlockButtonProps) => (
    <AddBlockButtonComponent {...args} />
);
