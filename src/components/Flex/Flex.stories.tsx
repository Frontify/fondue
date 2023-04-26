/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Flex, FlexProps } from './Flex';
import { Box } from '@components/Box';
import { BOX_BG_ALIAS_TOKENS_CLASSES, BOX_TEXT_ALIAS_TOKENS_CLASSES } from '@utilities/tokens';
import { SPACING_VALUES } from '@utilities/dimensions';

const DirectionTypes = ['row', 'col', 'row-reverse', 'col-reverse'];

const WrapTypes = ['nowrap', 'wrap', 'wrap-reverse'];

const JustifyTypes = ['start', 'end', 'center', 'between', 'around', 'evenly'];

const AlignItemsTypes = ['start', 'end', 'center', 'baseline', 'stretch'];

const AlignContentTypes = ['start', 'end', 'center', 'normal', 'between', 'around', 'evenly', 'baseline', 'stretch'];

const FlexItem = () => {
    return <Box className="tw-bg-box-positive-strong">Lorem ipsum dolor sit amet, consectetur adipiscing elit</Box>;
};

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
        as: {
            options: ['div', 'span'],
            control: {
                type: 'select',
            },
        },
        bg: {
            options: BOX_BG_ALIAS_TOKENS_CLASSES,
            control: {
                type: 'select',
            },
        },
        color: {
            options: BOX_TEXT_ALIAS_TOKENS_CLASSES,
            control: {
                type: 'select',
            },
        },
        margin: {
            options: Object.values(SPACING_VALUES),
            control: { type: 'select' },
        },
        padding: {
            options: Object.values(SPACING_VALUES),
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
        color: 'tw-text-box-positive-strong-inverse',
        as: 'div',
        margin: 4,
        padding: 4,
    },
} as Meta<FlexProps>;

export const Default: StoryFn<FlexProps> = (args: FlexProps) => {
    return (
        <Flex {...args}>
            <FlexItem />
            <FlexItem />
            <FlexItem />
            <FlexItem />
        </Flex>
    );
};
