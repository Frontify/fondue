/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconProps } from '@foundation/Icon/IconProps';
import { PropsWithChildren, ReactElement } from 'react';
import { Color } from '../../types';

export type BadgeSize = 's' | 'm';

export type BadgeProps = PropsWithChildren<{
    style?: BadgeStyle;
    icon?: ReactElement<IconProps>;
    status?: BadgeStatusIconProps['status'];
    onClick?: () => void;
    onDismiss?: () => void;
    disabled?: boolean;
    emphasis?: BadgeEmphasis;
    size?: BadgeSize;
}>;

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
