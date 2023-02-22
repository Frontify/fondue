/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { PatternDesign, PatternScale, PatternTheme } from '@foundation/Pattern';
import { FrontifyPattern, FrontifyPatternProps } from './FrontifyPattern';

export default {
    title: 'Components/FrontifyPattern',
    component: FrontifyPattern,
    argTypes: {
        pattern: {
            options: Object.keys(PatternDesign),
            defaultValue: PatternDesign.DigitalAssets,
            control: { type: 'select' },
        },
        scale: {
            options: Object.keys(PatternScale),
            defaultValue: PatternScale.SM,
            control: { type: 'select' },
        },
        foregroundColor: {
            options: Object.keys(PatternTheme),
            defaultValue: PatternTheme.Black,
            control: { type: 'select' },
        },
    },
    decorators: [
        (Story) => (
            <div className="tw-flex tw-justify-center tw-items-center tw-p-10">
                <div className="tw-w-80 tw-h-80 tw-rounded-xl tw-shadow-xl tw-overflow-hidden">
                    <Story />
                </div>
            </div>
        ),
    ],
} as Meta<FrontifyPatternProps>;

export const Default: StoryFn<FrontifyPatternProps> = (args, argTypes) => <FrontifyPattern {...args} {...argTypes} />;
