/* (c) Copyright Frontify Ltd., all rights reserved. */

import { LegacyTooltip, type LegacyTooltipProps } from '@components/LegacyTooltip/LegacyTooltip';
import { type FondueIconProps as IconProps, IconQuestionMarkCircle } from '@frontify/fondue-icons';
import { merge } from '@utilities/merge';
import { type ReactElement, cloneElement } from 'react';

/**
 * @deprecated Please use updated tooltip component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tooltip the migration guide}.
 */
export type TooltipIconProps = {
    tooltip?: LegacyTooltipProps;
    iconSize?: IconProps['size'];
    triggerIcon?: ReactElement<IconProps>;
    triggerStyle?: TooltipIconTriggerStyle | 'danger' | 'warning' | 'primary';
    'data-test-id'?: string;
};

enum TooltipIconTriggerStyle {
    Danger = 'Danger',
    Warning = 'Warning',
    Primary = 'Primary',
}

const tooltipTriggerStyleClass: Record<TooltipIconTriggerStyle | 'danger' | 'warning' | 'primary', string> = {
    [TooltipIconTriggerStyle.Danger]: 'tw-text-box-negative-inverse',
    [TooltipIconTriggerStyle.Warning]: 'tw-text-box-warning-inverse',
    [TooltipIconTriggerStyle.Primary]: 'tw-text-text-weak',
    danger: 'tw-text-box-negative-inverse',
    warning: 'tw-text-box-warning-inverse',
    primary: 'tw-text-text-weak',
};

const tooltipHoverClasses = {
    [TooltipIconTriggerStyle.Danger]: 'hover:tw-text-box-negative-inverse-hover hover:tw-bg-box-neutral',
    [TooltipIconTriggerStyle.Warning]: 'hover:tw-text-box-warning-inverse-hover hover:tw-bg-box-neutral',
    [TooltipIconTriggerStyle.Primary]: 'hover:tw-text-text hover:tw-bg-box-neutral',
    danger: 'hover:tw-text-box-negative-inverse-hover hover:tw-bg-box-neutral',
    warning: 'hover:tw-text-box-warning-inverse-hover hover:tw-bg-box-neutral',
    primary: 'hover:tw-text-text hover:tw-bg-box-neutral',
};

/**
 * @deprecated Please use updated tooltip component from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#tooltip the migration guide}.
 */
export const TooltipIcon = ({
    tooltip,
    iconSize = 16,
    triggerIcon = <IconQuestionMarkCircle />,
    triggerStyle = TooltipIconTriggerStyle.Primary,
    'data-test-id': dataTestId = 'tooltip-icon',
}: TooltipIconProps): ReactElement => {
    return (
        <div data-test-id={dataTestId}>
            {tooltip && (
                <div>
                    <LegacyTooltip
                        triggerElement={
                            <button
                                type="button"
                                aria-label="More info"
                                data-test-id={`${dataTestId}-trigger`}
                                className={merge([
                                    'tw-inline-flex tw-justify-center tw-items-center tw-cursor-default tw-outline-none tw-rounded-full focus-visible:tw-ring-focus',
                                    tooltipTriggerStyleClass[triggerStyle],
                                    tooltipHoverClasses[triggerStyle],
                                ])}
                            >
                                {cloneElement(triggerIcon, { size: iconSize })}
                            </button>
                        }
                        withArrow
                        {...tooltip}
                    />
                </div>
            )}
        </div>
    );
};
TooltipIcon.displayName = 'FondueTooltipIcon';
