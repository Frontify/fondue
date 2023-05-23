/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Divider as DividerComponent, DividerHeight, DividerProps, DividerStyle } from './Divider';
import { Flex } from '@components/Flex';

export default {
    title: 'Components/Divider',
    component: DividerComponent,
    tags: ['autodocs'],
    args: {
        color: 'red',
        vertical: false,
        'data-test-id': 'custom-test-id',
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
            <Flex direction="row">
                <div>Just like life, cheeseburgers are meant to be relished.</div>
                <DividerComponent {...args} />
                <div>
                    Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet
                    brie and truffle burger paired with parmesan frites, but don’t let that make you forget about the
                    ol’ faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in
                    all forms - bun intended.
                </div>
                <DividerComponent {...args} />
                <div>Cheeseburgers are like a metaphor for life.</div>
                <DividerComponent {...args} />
                <div>All the good stuff is in the middle but the rest of it is necessary too.</div>
            </Flex>
        );
    }

    return (
        <div className="tw-flex tw-flex-col">
            <div>Just like life, cheeseburgers are meant to be relished.</div>
            <DividerComponent {...args} />
            <div>
                Sometimes we lose sight of what really matters in life. There’s something to be said for a gourmet brie
                and truffle burger paired with parmesan frites, but don’t let that make you forget about the ol’
                faithful with American cheddar and a squishy bun. Lettuce remind you that cheeseburgers come in all
                forms - bun intended.
            </div>
            <DividerComponent {...args} />
            <div>Cheeseburgers are like a metaphor for life.</div>
            <DividerComponent {...args} />
            <div>All the good stuff is in the middle but the rest of it is necessary too.</div>
        </div>
    );
};
