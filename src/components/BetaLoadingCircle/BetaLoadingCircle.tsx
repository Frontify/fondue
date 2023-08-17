/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement } from 'react';
import { merge } from '@utilities/merge';
import './BetaLoadingCircle.css';

export enum BetaLoadingCircleStyle {
    Progress = 'Progress',
    Positive = 'Positive',
    Danger = 'Danger',
}

export enum BetaLoadingCircleSize {
    ExtraSmall = 'ExtraSmall',
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large',
}

export type BetaLoadingCircleProps = {
    style?: BetaLoadingCircleStyle;
    size?: BetaLoadingCircleSize;
    'data-test-id'?: string;
};

const statusClasses: Record<BetaLoadingCircleStyle, string> = {
    [BetaLoadingCircleStyle.Progress]: 'tw-stroke-box-selected-strong',
    [BetaLoadingCircleStyle.Positive]: 'tw-stroke-box-positive-strong',
    [BetaLoadingCircleStyle.Danger]: 'tw-stroke-box-negative-strong',
};

const trackClasses: Record<BetaLoadingCircleStyle, string> = {
    [BetaLoadingCircleStyle.Progress]: 'tw-stroke-box-selected',
    [BetaLoadingCircleStyle.Positive]: 'tw-stroke-box-positive',
    [BetaLoadingCircleStyle.Danger]: 'tw-stroke-box-negative',
};

const sizeClasses: Record<BetaLoadingCircleSize, string> = {
    [BetaLoadingCircleSize.ExtraSmall]: 'tw-w-4 tw-h-4',
    [BetaLoadingCircleSize.Small]: 'tw-w-5 tw-h-5',
    [BetaLoadingCircleSize.Medium]: 'tw-w-8 tw-h-8',
    [BetaLoadingCircleSize.Large]: 'tw-w-16 tw-h-16',
};

export const BetaLoadingCircle = ({
    size = BetaLoadingCircleSize.Medium,
    style = BetaLoadingCircleStyle.Progress,
    'data-test-id': dataTestId = 'beta-loading-circle',
}: BetaLoadingCircleProps): ReactElement => (
    <svg className={merge(['fondue-spinner', sizeClasses[size]])} viewBox="0 0 50 50" data-test-id={dataTestId}>
        <circle className={trackClasses[style]} cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
        <circle
            className={merge(['fondue-spinner__path', statusClasses[style]])}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
        />
    </svg>
);

BetaLoadingCircle.displayName = 'FondueBetaLoadingCircle';
