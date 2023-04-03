/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Grid, GridProps } from './Grid';
import { SPACING_VALUES } from '@utilities/dimensions';
import { StoryFn } from '@storybook/react';

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
    },
    args: {
        spacingX: 2,
        spacingY: 2,
        column: 4,
        'data-test-id': 'custom-test-id',
    },
} as Meta<GridProps>;

export const Default: StoryFn<GridProps> = (args: GridProps) => {
    return (
        <Grid
            data-test-id={args['data-test-id']}
            column={args.column}
            spacingX={args.spacingX}
            spacingY={args.spacingY}
        >
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
            <div className="tw-bg-box-positive"></div>
        </Grid>
    );
};
