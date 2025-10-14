/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { AccordionHeaderIcon as AccordionHeaderIconComponent } from './AccordionHeaderIcon';
import { type AccordionHeaderIconProps } from './types';

/**
 ### This component is deprecated, please use the [new Accordion component](/docs/current_components-accordion--documentation) instead.
 */
export default {
    title: 'Components/Accordion/Accordion Header Icon',
    component: AccordionHeaderIconComponent,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
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
