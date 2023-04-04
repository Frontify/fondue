/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Grid, GridProps } from './Grid';
import { SPACING_VALUES } from '@utilities/dimensions';
import { Meta, StoryFn } from '@storybook/react';

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
    return (
        <Grid {...args}>
            <div className="tw-w-full tw-h-full tw-bg-box-selected-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-positive-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-negative-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-warning-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-neutral-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-selected-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-positive-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-negative-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-warning-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-neutral-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-selected-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-positive-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-negative-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-warning-strong"></div>
            <div className="tw-w-full tw-h-full tw-bg-box-neutral-strong"></div>
        </Grid>
    );
};
