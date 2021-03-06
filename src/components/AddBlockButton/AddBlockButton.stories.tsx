/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, Story } from '@storybook/react';
import {
    AddBlockButton as AddBlockButtonComponent,
    AddBlockButtonDirection,
    AddBlockButtonProps,
} from './AddBlockButton';

export default {
    title: 'Components/Add Block Button',
    component: AddBlockButtonComponent,
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

export const AddBlockButton: Story<AddBlockButtonProps> = (args: AddBlockButtonProps) => (
    <AddBlockButtonComponent {...args} />
);
