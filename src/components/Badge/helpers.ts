/* (c) Copyright Frontify Ltd., all rights reserved. */

import { BadgeStatus, BadgeStyle } from './types';
import { merge } from '@utilities/merge';
import { Color } from '../../types';
import { ReactNode } from 'react';

export const getStyleClasses = (style: BadgeStyle, hasHover: boolean, strong: boolean): string =>
    (strong
        ? {
              [BadgeStyle.Primary]: merge([
                  'tw-bg-box-neutral-strong tw-text-box-neutral-strong-inverse',
                  hasHover && 'hover:tw-bg-box-neutral-strong-hover hover:tw-text-box-neutral-strong-inverse-hover',
              ]),
              [BadgeStyle.Positive]: merge([
                  'tw-bg-box-positive-strong tw-text-box-positive-strong-inverse',
                  hasHover && 'hover:tw-bg-box-positive-strong-hover hover:tw-text-box-positive-strong-inverse-hover',
              ]),
              [BadgeStyle.Danger]: merge([
                  'tw-bg-box-negative-strong tw-text-box-negative-strong-inverse',
                  hasHover && 'hover:tw-bg-box-negative-strong-hover hover:tw-text-box-negative-strong-inverse-hover',
              ]),
              [BadgeStyle.Progress]: merge([
                  'tw-bg-box-selected-strong tw-text-box-selected-strong-inverse',
                  hasHover && 'hover:tw-bg-box-selected-strong-hover hover:tw-text-box-selected-strong-inverse-hover',
              ]),
              [BadgeStyle.Warning]: merge([
                  'tw-bg-box-warning-strong tw-text-box-warning-strong-inverse',
                  hasHover && 'hover:tw-bg-box-warning-strong-hover hover:tw-text-box-warning-strong-inverse-hover',
              ]),
          }
        : {
              [BadgeStyle.Primary]: merge([
                  'tw-bg-box-neutral tw-text-text-weak',
                  hasHover && 'hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
              ]),
              [BadgeStyle.Positive]: merge([
                  'tw-bg-box-positive tw-text-box-positive-inverse',
                  hasHover && 'hover:tw-bg-box-positive-hover hover:tw-text-box-positive-inverse-hover',
              ]),
              [BadgeStyle.Progress]: merge([
                  'tw-bg-box-selected tw-text-bg-box-selected-inverse',
                  hasHover && 'hover:tw-bg-box-selected-hover hover:tw-text-box-selected-inverse-hover',
              ]),
              [BadgeStyle.Warning]: merge([
                  'tw-bg-box-warning tw-text-box-warning-inverse',
                  hasHover && 'hover:tw-bg-box-warning-hover hover:tw-text-box-warning-inverse-hover',
              ]),
              [BadgeStyle.Danger]: merge([
                  'tw-bg-box-negative tw-text-box-negative-inverse',
                  hasHover && 'hover:tw-bg-box-negative-hover hover:tw-text-box-negative-inverse-hover',
              ]),
          })[style] ?? '';

export const isBadgeStatus = (style: BadgeStatus | Color | string): style is BadgeStatus =>
    Object.values(BadgeStatus).includes(style as BadgeStatus);

export const getSizeClasses = (children: ReactNode, hasExtra: boolean, isSmall: boolean) => {
    const isCircular = !children && hasExtra;
    const sizeClasses = [isSmall ? 'tw-h-5' : 'tw-h-6'];

    if (isCircular) {
        sizeClasses.push(isSmall ? 'tw-w-5' : 'tw-w-6');
    } else {
        sizeClasses.push(...[isSmall ? 'tw-px-1.5' : 'tw-px-2.5', isSmall ? 'tw-gap-x-0.5' : 'tw-gap-x-1']);
    }
    return sizeClasses.join(' ');
};

export const badgeStatusClasses: Record<BadgeStatus, string> = {
    [BadgeStatus.Positive]: 'tw-bg-green-60',
    [BadgeStatus.Progress]: 'tw-bg-violet-60',
    [BadgeStatus.Warning]: 'tw-bg-yellow-60',
    [BadgeStatus.Danger]: 'tw-bg-red-60',
};
