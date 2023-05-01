/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DialogFooter, DialogFooterProps } from './DialogFooter';
import { ButtonEmphasis, ButtonStyle } from '@components/Button';
import { IconCheckMark } from '@foundation/Icon';

export default {
    title: 'Experimental/DialogFooter',
    component: DialogFooter,
    tags: ['autodocs'],
    argTypes: {
        'data-test-id': {
            type: 'string',
        },
    },
} as Meta<DialogFooterProps>;

export const Default: StoryFn<DialogFooterProps> = () => {
    return (
        <DialogFooter
            buttons={[
                {
                    children: 'Cancel',
                    onClick: () => console.log('Cancel'),
                    style: ButtonStyle.Default,
                    emphasis: ButtonEmphasis.Default,
                },
                {
                    children: 'Confirm',
                    onClick: () => console.log('Confirm'),
                    style: ButtonStyle.Default,
                    emphasis: ButtonEmphasis.Strong,
                    icon: <IconCheckMark />,
                },
            ]}
        />
    );
};
