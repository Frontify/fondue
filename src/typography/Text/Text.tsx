/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import { ReactElement, ReactNode } from 'react';
import { decorationMap, displayMap, overflowMap, whitespaceMap, wordBreakMap } from '../shared/records';
import { SharedTypographyProps } from '../shared/types';

type TextWeight = 'default' | 'strong' | 'x-strong';
type TextSize = 'x-small' | 'small' | 'medium' | 'large';
type TextColor = 'default' | 'weak' | 'x-weak' | 'disabled' | 'negative' | 'positive' | 'warning' | 'interactive';

export type TextProps = SharedTypographyProps & {
    size?: TextSize;
    weight?: TextWeight;
    as?: 'a' | 'abbr' | 'address' | 'em' | 'label' | 'li' | 'span' | 'strong' | 'time' | 'p';
    color?: TextColor;
    children?: ReactNode;
};

const weightMap: Record<TextWeight, string> = {
    default: 'tw-font-regular',
    strong: 'tw-font-medium',
    'x-strong': 'tw-font-bold',
};

const sizeMap: Record<TextSize, string> = {
    'x-small': 'tw-text-body-x-small',
    small: 'tw-text-body-small',
    medium: 'tw-text-body-medium',
    large: 'tw-text-body-large',
};

const colorMap: Record<TextColor, string> = {
    default: 'tw-text-text',
    weak: 'tw-text-text-weak',
    'x-weak': 'tw-text-text-x-weak',
    disabled: 'tw-text-text-disabled',
    negative: 'tw-text-text-negative',
    positive: 'tw-text-text-positive',
    warning: 'tw-text-text-warning',
    interactive: 'tw-text-text-interactive',
};

export const Text = ({
    children,
    as: Tag = 'span',
    weight = 'default',
    size = 'medium',
    color = 'default',
    decoration = 'none',
    wordBreak = 'normal',
    whitespace = 'normal',
    overflow = 'visible',
    display,
}: TextProps): ReactElement => (
    <Tag
        data-test-id="text"
        className={merge([
            'tw-font-body tw-max-w-full',
            weightMap[weight],
            sizeMap[size],
            colorMap[color],
            decorationMap[decoration],
            wordBreakMap[wordBreak],
            overflow !== 'truncate' && whitespaceMap[whitespace],
            overflowMap[overflow],
            display && displayMap[display],
        ])}
    >
        {children}
    </Tag>
);
Text.displayName = 'FondueText';
