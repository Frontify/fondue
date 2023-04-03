/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Grid } from './Grid';

export default {
    title: 'Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
    argTypes: {
        spacingX: {
            options: Object.values(SwitchSize),
            control: { type: 'radio' },
        },
        spacingY: {
            options: Object.values(SwitchLabelStyle),
            control: { type: 'radio' },
        },
        label: {
            placeholder: 'Switch label',
            type: { name: 'string', required: false },
            control: {
                type: 'text',
            },
        },
    },
    args: {
        on: true,
        disabled: false,
        labelStyle: SwitchLabelStyle.Default,
        hug: false,
        name: 'switch-name',
        size: SwitchSize.Small,
    },
} as Meta<SwitchProps>;

export const Default: StoryFn<Props> = (args: Props) => {
    return (
        <Grid column={4} spacingX={8} spacingY={8}>
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
