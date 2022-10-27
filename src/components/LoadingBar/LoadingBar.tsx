/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import React from 'react';

export enum LoadingBarSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
    XLarge = 'XLarge',
}

export enum LoadingBarState {
    'Progress' = 'Progress',
    'Success' = 'Success',
    'Error' = 'Error',
}

export type LoadingBarProps = {
    percentage: number;
    size?: LoadingBarSize;
    state?: LoadingBarState;
    rounded?: boolean;
};

const sizeClass: Record<LoadingBarSize, string> = {
    [LoadingBarSize.Small]: 'tw-h-1',
    [LoadingBarSize.Medium]: 'tw-h-2',
    [LoadingBarSize.Large]: 'tw-h-3',
    [LoadingBarSize.XLarge]: 'tw-h-4',
};

const stateClasses: Record<LoadingBarState, { outer: string; inner: string }> = {
    [LoadingBarState.Error]: { outer: 'tw-bg-box-negative', inner: 'tw-bg-text-negative' },
    [LoadingBarState.Success]: { outer: 'tw-bg-box-positive', inner: 'tw-bg-text-positive' },
    [LoadingBarState.Progress]: { outer: 'tw-bg-box-selected', inner: 'tw-bg-text-interactive' },
};

export const LoadingBar = ({
    percentage,
    size = LoadingBarSize.Medium,
    state = LoadingBarState.Progress,
    rounded = false,
}: LoadingBarProps) => (
    <div
        className={merge([
            'tw-overflow-hidden tw-w-full tw-relative',
            sizeClass[size],
            rounded && 'tw-rounded',
            stateClasses[state].outer,
        ])}
    >
        <div
            className={merge([
                'tw-left-0 tw-top-0 tw-h-full tw-absolute tw-transition-width',
                stateClasses[state].inner,
            ])}
            style={{ width: `${percentage}%` }}
        />
    </div>
);
