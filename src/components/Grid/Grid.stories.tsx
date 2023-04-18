/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Grid, GridProps } from './Grid';
import { SPACING_VALUES } from '@utilities/dimensions';
import { Meta, StoryFn } from '@storybook/react';
import { Box } from '@components/Box';
import { merge } from '@utilities/merge';

export default {
    title: 'Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
    argTypes: {
        spacingX: {
            options: SPACING_VALUES,
            control: { type: 'radio' },
        },
        spacingY: {
            options: SPACING_VALUES,
            control: { type: 'radio' },
        },
        padding: {
            options: SPACING_VALUES,
            control: { type: 'radio' },
        },
        margin: {
            options: SPACING_VALUES,
            control: { type: 'radio' },
        },
    },
    args: {
        spacingX: 4,
        spacingY: 4,
        column: 4,
        'data-test-id': 'custom-test-id',
        padding: 4,
        margin: 4,
        width: '100%',
        rowHeight: '100px',
        maxHeight: undefined,
        boxColorToken: 'box-neutral',
    },
} as Meta<GridProps>;

export const Default: StoryFn<GridProps> = (args: GridProps) => {
    const contentClasses = [
        'tw-bg-box-selected-strong',
        'tw-bg-box-positive-strong',
        'tw-bg-box-negative-strong',
        'tw-bg-box-warning-strong',
        'tw-bg-box-neutral-strong',
        'tw-bg-box-selected-strong',
        'tw-bg-box-positive-strong',
        'tw-bg-box-negative-strong',
        'tw-bg-box-warning-strong',
        'tw-bg-box-neutral-strong',
        'tw-bg-box-selected-strong',
        'tw-bg-box-positive-strong',
        'tw-bg-box-negative-strong',
        'tw-bg-box-warning-strong',
        'tw-bg-box-neutral-strong',
    ];
    return (
        <Grid {...args}>
            {contentClasses.map((contentClass, i) => {
                const key = `content-key-${contentClass}-${i}`;
                return <Box key={key} className={merge(['tw-w-full tw-h-full', contentClass])}></Box>;
            })}
        </Grid>
    );
};
