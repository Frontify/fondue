/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react';

import IconExclamationMarkTriangle from '@foundation/Icon/Generated/IconExclamationMarkTriangle';
import IconHome from '@foundation/Icon/Generated/IconHome';
import IconIcon from '@foundation/Icon/Generated/IconIcon';

import { AccordionHeader as AccordionHeaderComponent } from './AccordionHeader';
import { type AccordionHeaderProps } from './types';

const decorators = {
    IconNone: null,
    IconDefault: <IconHome />,
    IconCallout: <IconExclamationMarkTriangle />,
    IconIcons: <IconIcon />,
};

/**
 ### This component is deprecated, please use the [new Accordion component](/docs/current_components-accordion--documentation) instead.
 */
export default {
    title: 'Components/Accordion/Accordion Header',
    component: AccordionHeaderComponent,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
    argTypes: {
        decorator: {
            options: Object.keys(decorators),
            mapping: decorators,
            control: {
                type: 'select',
                labels: {
                    IconNone: 'None',
                    IconIcons: 'Icon',
                    IconDefault: 'Brand',
                    IconCallout: 'Callout',
                },
            },
        },
        disabled: { type: 'boolean' },
    },
    args: {
        isOpen: false,
        disabled: false,
        children: 'I am the Default Accordion Header',
    },
} as Meta<AccordionHeaderProps>;

export const AccordionHeader: StoryFn<AccordionHeaderProps> = (args) => <AccordionHeaderComponent {...args} />;
