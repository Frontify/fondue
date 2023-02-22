/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { LoadingBar as LoadingBarComponent, LoadingBarProps, LoadingBarSize, LoadingBarState } from './LoadingBar';

export default {
    title: 'Components/LoadingBar',
    component: LoadingBarComponent,
    argTypes: {
        state: {
            options: Object.values(LoadingBarState),
            control: { type: 'select' },
        },
        size: {
            options: Object.values(LoadingBarSize),
            control: { type: 'select' },
        },
    },
    args: {
        state: LoadingBarState.Progress,
        size: LoadingBarSize.Medium,
        rounded: false,
        percentage: 40,
    },
} as Meta<LoadingBarProps>;

export const LoadingBar: StoryFn<LoadingBarProps> = (args: LoadingBarProps) => <LoadingBarComponent {...args} />;
