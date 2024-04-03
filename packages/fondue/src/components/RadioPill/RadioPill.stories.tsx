/* (c) Copyright Frontify Ltd., all rights reserved. */

import { action } from '@storybook/addon-actions';
import { type Meta, type StoryFn } from '@storybook/react';

import IconIcon from '@foundation/Icon/Generated/IconIcon';

import { RadioPill as RadioPillComponent, type RadioPillProps } from './RadioPill';

export default {
    title: 'Components/Radio Pill',
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
} as Meta<RadioPillProps>;

export const RadioPill: StoryFn<RadioPillProps> = (args) => <RadioPillComponent {...args} />;
