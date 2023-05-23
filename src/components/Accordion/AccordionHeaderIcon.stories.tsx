/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AccordionHeaderIcon as AccordionHeaderIconComponent } from './AccordionHeaderIcon';
import { AccordionHeaderIconProps } from './types';

export default {
    title: 'Components/Accordion/Accordion Header Icon',
    component: AccordionHeaderIconComponent,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'select', options: ['small', 'medium', 'large'] },
    },
    args: {
        isOpen: false,
        disabled: false,
        size: 'medium',
    },
} as Meta<AccordionHeaderIconProps>;

export const AccordionHeaderIcon: StoryFn<AccordionHeaderIconProps> = (args) => (
    <div className="tw-flex tw-items-center">
        <AccordionHeaderIconComponent {...args} />
    </div>
);
