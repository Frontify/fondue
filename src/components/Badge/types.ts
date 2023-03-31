/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from '@foundation/Icon/IconProps';
import { ReactElement, ReactNode } from 'react';
import { Color } from '../../types';

export type BadgeSize = 'small' | 'medium';

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
};

export type BadgeStatusIconProps = { status: BadgeStatus | Color | string; disabled: boolean };

export enum BadgeStatus {
    Positive = 'Positive',
    Progress = 'Progress',
    Warning = 'Warning',
    Danger = 'Danger',
}

export enum BadgeStyle {
    Primary = 'Primary',
    Positive = 'Positive',
    Progress = 'Progress',
    Warning = 'Warning',
    Danger = 'Danger',
}

export enum BadgeEmphasis {
    Strong = 'Strong',
    None = 'None',
}
