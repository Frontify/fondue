/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { RadioPill as RadioPillComponent, RadioPillProps } from './RadioPill';
import { IconIcon } from '@foundation/Icon';

export default {
    title: 'Components/Radio Pill',
    component: RadioPillComponent,
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
} as Meta<RadioPillProps>;

export const RadioPill: StoryFn<RadioPillProps> = (args) => <RadioPillComponent {...args} />;
