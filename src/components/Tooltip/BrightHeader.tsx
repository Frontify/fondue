/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, ReactElement, cloneElement } from 'react';
import { merge } from '@utilities/merge';
import {
    IconCheckMark,
    IconDocument,
    IconExclamationMarkCircle,
    IconExclamationMarkTriangle,
    IconSize,
} from '@foundation/Icon';

export enum BrightHeaderStyle {
    Information = 'Information',
    Warning = 'Warning',
    Tip = 'Tip',
    Note = 'Note',
}

export const brightHeaderBackgroundColors: Record<BrightHeaderStyle, string> = {
    [BrightHeaderStyle.Information]: 'tw-bg-violet-60',
    [BrightHeaderStyle.Warning]: 'tw-bg-red-60',
    [BrightHeaderStyle.Tip]: 'tw-bg-green-60',
    [BrightHeaderStyle.Note]: 'tw-bg-yellow-60',
};

export const brightHeaderArrowBackgroundColors: Record<BrightHeaderStyle, string> = {
    [BrightHeaderStyle.Information]: 'before:tw-bg-violet-60',
    [BrightHeaderStyle.Warning]: 'before:tw-bg-red-60',
    [BrightHeaderStyle.Tip]: 'before:tw-bg-green-60',
    [BrightHeaderStyle.Note]: 'before:tw-bg-yellow-60',
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

export const BrightHeader: FC<BrightHeaderProps> = ({ headerStyle }) => {
    return (
        <div
            data-test-id="bright-header"
            className={merge([
                'tw-h-9 tw-relative tw-z-[120000] tw-flex tw-justify-center tw-items-center tw-rounded-t-md tw-text-white',
                brightHeaderBackgroundColors[headerStyle],
            ])}
        >
            {cloneElement(brightHeaderIcon[headerStyle], { size: IconSize.Size20 })}
        </div>
    );
};
BrightHeader.displayName = 'FondueBrightHeader';
