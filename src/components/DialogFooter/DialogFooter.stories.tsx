/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DialogFooter } from './DialogFooter';
import { ButtonEmphasis, ButtonStyle } from '@components/Button';
import { IconCheckMark } from '@foundation/Icon/Generated';
import { action } from '@storybook/addon-actions';
import { DialogFooterProps } from '../../types/dialog';

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
                    onClick: action('click'),
                    style: ButtonStyle.Default,
                    emphasis: ButtonEmphasis.Default,
                },
                {
                    children: 'Confirm',
                    onClick: action('click'),
                    style: ButtonStyle.Default,
                    emphasis: ButtonEmphasis.Strong,
                    icon: <IconCheckMark />,
                },
            ]}
        />
    );
};
