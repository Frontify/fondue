/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    IconCheckMark,
    IconDocument,
    IconExclamationMarkCircle,
    IconExclamationMarkTriangle,
    IconSize,
} from '@frontify/fondue-icons';
import { type ReactElement, cloneElement } from 'react';

import { merge } from '@utilities/merge';

/**
 * @deprecated Please use updated `Tooltip` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tooltip the migration guide}.
 */
export enum BrightHeaderStyle {
    Information = 'Information',
    Warning = 'Warning',
    Tip = 'Tip',
    Note = 'Note',
}

/**
 * @deprecated Please use updated `Tooltip` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tooltip the migration guide}.
 */
export const brightHeaderBackgroundColors: Record<BrightHeaderStyle, string> = {
    [BrightHeaderStyle.Information]: 'tw-bg-box-selected-strong',
    [BrightHeaderStyle.Warning]: 'tw-bg-box-negative-strong-pressed',
    [BrightHeaderStyle.Tip]: 'tw-bg-box-positive-strong-pressed',
    [BrightHeaderStyle.Note]: 'tw-bg-box-warning-strong',
};

/**
 * @deprecated Please use updated `Tooltip` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tooltip the migration guide}.
 */
export const brightHeaderArrowBackgroundColors: Record<BrightHeaderStyle, string> = {
    [BrightHeaderStyle.Information]: 'before:tw-bg-box-selected-strong',
    [BrightHeaderStyle.Warning]: 'before:tw-bg-box-negative-strong-pressed',
    [BrightHeaderStyle.Tip]: 'before:tw-bg-box-positive-strong-pressed',
    [BrightHeaderStyle.Note]: 'before:tw-bg-box-warning-strong',
};

const brightHeaderIcon: Record<BrightHeaderStyle, ReactElement> = {
    [BrightHeaderStyle.Information]: <IconExclamationMarkCircle />,
    [BrightHeaderStyle.Warning]: <IconExclamationMarkTriangle />,
    [BrightHeaderStyle.Tip]: <IconCheckMark />,
    [BrightHeaderStyle.Note]: <IconDocument />,
};

type BrightHeaderProps = {
    headerStyle: BrightHeaderStyle;
};

/**
 * @deprecated Please use updated `Tooltip` component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tooltip the migration guide}.
 */
export const BrightHeader = ({ headerStyle }: BrightHeaderProps): ReactElement => {
    return (
        <div
            data-test-id="bright-header"
            className={merge([
                'tw-h-9 tw-relative tw-z-[120000] tw-flex tw-justify-center tw-items-center tw-rounded-t-md tw-dark tw-text-text',
                brightHeaderBackgroundColors[headerStyle],
            ])}
        >
            {cloneElement(brightHeaderIcon[headerStyle], { size: IconSize.Size20 })}
        </div>
    );
};
BrightHeader.displayName = 'FondueBrightHeader';
