/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DialogFooter, DialogFooterProps } from './DialogFooter';

export default {
    title: 'Components/DialogFooter',
    component: DialogFooter,
} as Meta<DialogFooterProps>;

const Template: StoryFn<DialogFooterProps> = () => {
    return (
        <DialogFooter
            buttons={[
                { label: 'Cancel', action: () => console.log('Cancel') },
                {
                    label: 'Confirm',
                    action: () => console.log('Confirm'),
                },
            ]}
        />
    );
};

export const Default = Template.bind({});
