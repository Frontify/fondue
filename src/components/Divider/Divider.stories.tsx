/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Divider as DividerComponent, DividerHeight, DividerProps, DividerStyle } from './Divider';

export default {
    title: 'Components/Divider',
    component: DividerComponent,
    tags: ['autodocs'],
    args: {
        color: 'red',
    },
    argTypes: {
        color: {
            control: { type: 'color' },
        },
        style: {
            options: Object.values(DividerStyle),
            control: {
                type: 'select',
                labels: Object.entries(DividerStyle).reduce(
                    (labels, [key, value]) => ({ ...labels, [value]: key }),
                    {},
                ),
            },
        },
        height: {
            options: Object.values(DividerHeight),
            control: {
                type: 'select',
                labels: Object.entries(DividerHeight).reduce(
                    (labels, [key, value]) => ({ ...labels, [value]: key }),
                    {},
                ),
            },
        },
    },
} as Meta;

export const Divider: StoryFn<DividerProps> = (args: DividerProps) => <DividerComponent {...args} />;
