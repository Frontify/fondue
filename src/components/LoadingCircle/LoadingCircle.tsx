/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import React, { ReactElement } from 'react';

export enum LoadingCircleStyle {
    Progress = 'Progress',
    Positive = 'Positive',
    Danger = 'Danger',
}

export enum LoadingCircleSize {
    ExtraSmall = 'ExtraSmall',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export type LoadingCircleProps = {
    style?: LoadingCircleStyle;
    size?: LoadingCircleSize;
    'data-test-id'?: string;
};

export const statusClasses: Record<LoadingCircleStyle, string> = {
    [LoadingCircleStyle.Progress]: 'tw-border-violet-60',
    [LoadingCircleStyle.Positive]: 'tw-border-green-60',
    [LoadingCircleStyle.Danger]: 'tw-border-red-60',
};

export const sizeClasses: Record<LoadingCircleSize, string> = {
    [LoadingCircleSize.ExtraSmall]: 'tw-w-4 tw-h-4',
    [LoadingCircleSize.Small]: 'tw-w-5 tw-h-5',
    [LoadingCircleSize.Medium]: 'tw-w-8 tw-h-8',
    [LoadingCircleSize.Large]: 'tw-w-16 tw-h-16',
};

export const LoadingCircle = ({
    style = LoadingCircleStyle.Progress,
    size = LoadingCircleSize.Medium,
    'data-test-id': dataTestId = 'loading-circle',
}: LoadingCircleProps): ReactElement => {
    return (
        <div
            data-test-id={dataTestId}
            className={merge([
                'tw-border-2 tw-border-solid tw-rounded-full tw-border-t-transparent tw-animate-spin',
                statusClasses[style],
                sizeClasses[size],
            ])}
        ></div>
    );
};
LoadingCircle.displayName = 'FondueLoadingCircle';
