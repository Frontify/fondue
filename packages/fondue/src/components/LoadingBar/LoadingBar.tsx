/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';

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
    percentage?: number;
    size?: LoadingBarSize;
    state?: LoadingBarState;
    rounded?: boolean;
};

export const loadingBarSizeClasses: Record<LoadingBarSize, string> = {
    [LoadingBarSize.Small]: 'tw-h-1',
    [LoadingBarSize.Medium]: 'tw-h-2',
    [LoadingBarSize.Large]: 'tw-h-3',
    [LoadingBarSize.XLarge]: 'tw-h-4',
};

export const loadingBarStateClasses: Record<LoadingBarState, { outer: string; inner: string }> = {
    [LoadingBarState.Error]: {
        outer: 'tw-bg-box-negative',
        inner: 'tw-bg-text-negative',
    },
    [LoadingBarState.Success]: {
        outer: 'tw-bg-box-positive',
        inner: 'tw-bg-text-positive',
    },
    [LoadingBarState.Progress]: {
        outer: 'tw-bg-box-selected',
        inner: 'tw-bg-text-interactive',
    },
};

export const LoadingBar = ({
    percentage = 0,
    size = LoadingBarSize.Medium,
    state = LoadingBarState.Progress,
    rounded = false,
}: LoadingBarProps) => (
    <div
        className={merge([
            'tw-overflow-hidden tw-w-full tw-relative',
            loadingBarSizeClasses[size],
            rounded && 'tw-rounded',
            loadingBarStateClasses[state].outer,
        ])}
        data-test-id="loading-bar-outer"
    >
        <div
            className={merge([
                'tw-left-0 tw-top-0 tw-h-full tw-absolute tw-transition-width',
                loadingBarStateClasses[state].inner,
            ])}
            style={{ width: `${percentage}%` }}
            data-test-id="loading-bar-inner"
        />
    </div>
);
LoadingBar.displayName = 'FondueLoadingBar';
