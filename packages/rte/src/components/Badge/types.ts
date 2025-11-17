/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FondueIconProps as IconProps } from '@frontify/fondue-icons';
import { type ReactElement, type ReactNode } from 'react';

import { type Color } from '../../types';

/**
 * @deprecated Please use updated badge component from `@frontify/fondue/components` instead.
 */
export type BadgeSize = 'small' | 'medium';

/**
 * @deprecated Please use updated badge component from `@frontify/fondue/components` instead.
 */
export type BadgeProps = {
    style?: BadgeStyle;
    icon?: ReactElement<IconProps>;
    status?: BadgeStatusIconProps['status'];
    onClick?: () => void;
    onDismiss?: () => void;
    disabled?: boolean;
    emphasis?: BadgeEmphasis;
    size?: BadgeSize;
    children?: ReactNode;
    'data-test-id'?: string;
    /** @description withTitle could be disabled only in the case another overlay is present, ex Tooltip */
    withTitleAttribute?: boolean;
};

/**
 * @deprecated Please use updated badge component from `@frontify/fondue/components` instead.
 */
export type BadgeStatusIconProps = { status: BadgeStatus | Color | string; disabled: boolean; 'data-test-id'?: string };

/**
 * @deprecated Please use updated badge component from `@frontify/fondue/components` instead.
 */
export enum BadgeStatus {
    Positive = 'Positive',
    Progress = 'Progress',
    Warning = 'Warning',
    Danger = 'Danger',
}

/**
 * @deprecated Please use updated badge component from `@frontify/fondue/components` instead.
 */
export enum BadgeStyle {
    Primary = 'Primary',
    Positive = 'Positive',
    Progress = 'Progress',
    Warning = 'Warning',
    Danger = 'Danger',
}

/**
 * @deprecated Please use updated badge component from `@frontify/fondue/components` instead.
 */
export enum BadgeEmphasis {
    Strong = 'Strong',
    None = 'None',
}
