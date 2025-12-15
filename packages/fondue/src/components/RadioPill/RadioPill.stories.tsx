/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import IconIcon from '@foundation/Icon/Generated/IconIcon';

import { RadioPill as RadioPillComponent, type RadioPillProps } from './RadioPill';

/**
 ### *Legacy component warning*
 #### This is a deprecated component. It will be removed in the next major version.
 #### _**Use the [new Radio List component](/docs/current_components-radiolist--documentation) instead.**_
 */
export default {
    title: 'Legacy Components/Deprecated/Radio Pill',
    component: RadioPillComponent,
    tags: ['autodocs'],
    args: {
        label: 'Label',
        active: true,
        onClick: action('click'),
    },
    argTypes: {
        icon: {
            options: ['None', 'Icon'],
            mapping: {
                None: null,
                Icon: <IconIcon />,
            },
            control: { type: 'select' },
        },
    },
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
} as Meta<RadioPillProps>;

export const RadioPill: StoryFn<RadioPillProps> = (args) => <RadioPillComponent {...args} />;
