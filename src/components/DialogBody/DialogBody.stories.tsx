/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DialogBody, DialogBodyProps } from './DialogBody';

export default {
    title: 'Experimental/DialogBody',
    component: DialogBody,
    tags: ['autodocs'],
} as Meta<DialogBodyProps>;

const Template: StoryFn<DialogBodyProps> = () => (
    <DialogBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus assumenda autem debitis dignissimos
        distinctio et excepturi exercitationem hic minima nihil perspiciatis provident quas, qui ratione rem ut
        veritatis vero.
    </DialogBody>
);

export const Default = Template.bind({});
