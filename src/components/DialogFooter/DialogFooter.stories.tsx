/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DialogFooter as DialogFooterComponent, DialogFooterProps } from './DialogFooter';
import { ButtonEmphasis, ButtonStyle } from '@components/Button';
import { IconCheckMark } from '@foundation/Icon';

export default {
    title: 'Components/DialogFooter',
    component: DialogFooterComponent,
} as Meta<DialogFooterProps>;

export const DialogFooter: StoryFn<DialogFooterProps> = () => {
    return (
        <DialogFooterComponent
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
