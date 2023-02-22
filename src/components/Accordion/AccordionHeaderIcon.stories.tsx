/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { AccordionHeaderIcon as AccordionHeaderIconComponent } from './AccordionHeaderIcon';
import { AccordionHeaderIconProps, AccordionHeaderIconSize } from './types';

export default {
    title: 'Components/Accordion/Accordion Header Icon',
    component: AccordionHeaderIconComponent,
    argTypes: {
        size: { control: 'select', options: Object.values(AccordionHeaderIconSize) },
    },
    args: {
        isOpen: false,
        disabled: false,
        size: AccordionHeaderIconSize.Medium,
    },
} as Meta<AccordionHeaderIconProps>;

export const AccordionHeaderIcon: StoryFn<AccordionHeaderIconProps> = (args) => (
    <div className="tw-flex tw-items-center">
        <AccordionHeaderIconComponent {...args} />
    </div>
);
