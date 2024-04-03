/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getColorDisplayValue } from '@utilities/colors';
import { merge } from '@utilities/merge';

import { ColorFormat } from '../../types';

import { badgeStatusClasses, isBadgeStatus } from './helpers';
import { type BadgeStatusIconProps } from './types';

export const BadgeStatusIcon = ({ status, disabled, 'data-test-id': dataTestId = 'badge' }: BadgeStatusIconProps) => (
    <div className="tw-px-0.5 tw-flex-none tw-inline-flex tw-justify-center tw-items-center tw-pr-1">
        <span
            data-test-id={`${dataTestId}-status`}
            className={merge([
                'tw-w-2 tw-h-2 tw-rounded-full tw-flex-none',
                disabled && 'tw-opacity-30',
                isBadgeStatus(status) && badgeStatusClasses[status],
            ])}
            style={
                isBadgeStatus(status)
                    ? {}
                    : {
                          backgroundColor:
                              typeof status === 'string'
                                  ? status
                                  : getColorDisplayValue(status, ColorFormat.Rgba, true),
                      }
            }
        />
    </div>
);
BadgeStatusIcon.displayName = 'FondueBadgeStatusIcon';
