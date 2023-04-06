/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Flex, FlexProps } from './Flex';

const DirectionTypes = ['tw-flex-row', 'tw-flex-col', 'tw-flex-row-reverse', 'tw-flex-col-reverse'];

const WrapTypes = ['tw-flex-nowrap', 'tw-flex-wrap', 'tw-flex-wrap-reverse'];

const JustifyTypes = [
    'tw-justify-start',
    'tw-justify-end',
    'tw-justify-center',
    'tw-justify-between',
    'tw-justify-around',
    'tw-justify-evenly',
];

const AlignItemsTypes = ['tw-items-start', 'tw-items-end', 'tw-items-center', 'tw-items-baseline', 'tw-items-stretch'];

const AlignContentTypes = [
    'tw-content-start',
    'tw-content-end',
    'tw-content-center',
    'tw-content-normal',
    'tw-content-between',
    'tw-content-around',
    'tw-content-evenly',
    'tw-content-baseline',
    'tw-content-stretch',
];

export default {
    title: 'Layout/Flex',
    component: Flex,
    tags: ['autodocs'],
    argTypes: {
        direction: {
            options: DirectionTypes,
            control: { type: 'select' },
        },
        wrap: {
            options: WrapTypes,
            control: { type: 'select' },
        },
        justify: {
            options: JustifyTypes,
            control: { type: 'select' },
        },
        alignItems: {
            options: AlignItemsTypes,
            control: { type: 'select' },
        },
        alignContent: {
            options: AlignContentTypes,
            control: { type: 'select' },
        },
    },
    args: {
        direction: 'row',
        wrap: 'wrap',
        justify: 'center',
        alignItems: 'center',
        alignContent: 'center',
        'data-test-id': 'custom-test-id',
        bg: 'tw-bg-box-neutral',
        color: 'tw-bg-box-positive-inverse',
    },
} as Meta<FlexProps>;

export const Default: StoryFn<FlexProps> = (args: FlexProps) => {
    return (
        <Flex {...args}>
            <div className="tw-w-12 tw-h-12 tw-bg-box-positive-strong"></div>
            <div className="tw-w-12 tw-h-12 tw-bg-box-positive-strong"></div>
            <div className="tw-w-12 tw-h-12 tw-bg-box-positive-strong"></div>
            <div className="tw-w-12 tw-h-12 tw-bg-box-positive-strong"></div>
        </Flex>
    );
};
