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
        vertical: 'false',
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
        vertical: {
            control: {
                type: 'boolean',
            },
        },
    },
} as Meta;

export const Divider: StoryFn<DividerProps> = (args: DividerProps) => {
    if (args.vertical) {
        return (
            <div className="tw-flex tw-flex-row">
                <div>Test content</div>
                <DividerComponent {...args} />
                <div>Test content</div>
            </div>
        );
    }

    return (
        <div className="tw-flex tw-flex-col">
            <div>Test content</div>
            <DividerComponent {...args} />
            <div>Test content</div>
        </div>
    );
};
