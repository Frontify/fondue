/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Grid, GridProps } from './Grid';
import { SPACING_VALUES } from '@utilities/dimensions';
import { Meta, StoryFn } from '@storybook/react';
import { Box } from '@components/Box';
import { merge } from '@utilities/merge';

const EXAMPLE_CONTENT = 'Lorem ipsum dolor sit amet';

export default {
    title: 'Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
    argTypes: {
        padding: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        paddingX: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        paddingY: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        margin: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        marginX: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        marginY: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        spacing: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        spacingX: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        spacingY: {
            options: Object.values(SPACING_VALUES),
            control: 'select',
            defaultValue: '',
        },
        as: {
            options: ['div', 'span'],
            control: {
                type: 'select',
            },
        },
        maxHeight: {
            type: 'string',
        },
    },
    args: {
        spacing: 4,
        column: 4,
        'data-test-id': 'custom-test-id',
        padding: 4,
        margin: 4,
        width: '100%',
        rowHeight: '100px',
        maxHeight: undefined,
        bg: 'tw-bg-box-positive-strong',
        color: 'tw-text-box-positive-strong-inverse',
        as: 'div',
    },
} as Meta<GridProps>;

const contentClasses = [
    'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse',
    'tw-bg-box-positive-strong tw-text-box-positive-strong-inverse',
    'tw-bg-box-negative-strong tw-text-box-negative-strong-inverse',
    'tw-bg-box-warning-strong tw-text-box-warning-strong-inverse',
    'tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse',
    'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse',
    'tw-bg-box-positive-strong tw-text-box-positive-strong-inverse',
    'tw-bg-box-negative-strong tw-text-box-negative-strong-inverse',
    'tw-bg-box-warning-strong tw-text-box-warning-strong-inverse',
    'tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse',
    'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse',
    'tw-bg-box-positive-strong tw-text-box-positive-strong-inverse',
    'tw-bg-box-negative-strong tw-text-box-negative-strong-inverse',
    'tw-bg-box-warning-strong tw-text-box-warning-strong-inverse',
    'tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse',
];

export const Default: StoryFn<GridProps> = (args: GridProps) => {
    return (
        <Grid {...args}>
            {contentClasses.map((contentClass, i) => {
                const key = `content-key-${contentClass}-${i}`;
                return (
                    <Box key={key} className={merge(['tw-w-full tw-h-full', contentClass])}>
                        {EXAMPLE_CONTENT}
                    </Box>
                );
            })}
        </Grid>
    );
};
