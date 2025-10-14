/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Meta, type StoryFn } from '@storybook/react-vite';

import { LoadingBar as LoadingBarComponent, LoadingBarSize, LoadingBarState, type LoadingBarProps } from './LoadingBar';

/**
 ### This component is deprecated, please use the [new LoadingBar component](/docs/current_components-loading-bar--documentation) instead.
 */
export default {
    title: 'Components/LoadingBar',
    component: LoadingBarComponent,
    tags: ['autodocs'],
    parameters: {
        status: {
            type: 'deprecated',
        },
    },
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
