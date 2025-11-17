/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, type ReactNode } from 'react';

import { type LegacyTooltipProps } from '@components/LegacyTooltip/LegacyTooltip';
import { TooltipIcon, type TooltipIconProps } from '@components/TooltipIcon/TooltipIcon';
import { IconSize } from '@frontify/fondue-icons';
import { merge } from '@utilities/merge';

/**
 * @deprecated Use `Label` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#label-old-inputlabel the migration guide}.
 */
export type InputLabelTooltipProps =
    | (LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)
    | (LegacyTooltipProps & Pick<TooltipIconProps, 'triggerStyle' | 'triggerIcon'>)[];

/**
 * @legacy Use `Label` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#label-old-inputlabel the migration guide}.
 */
export type InputLabelProps = {
    id?: string;
    htmlFor: string;
    required?: boolean;
    disabled?: boolean;
    clickable?: boolean;
    tooltip?: InputLabelTooltipProps;
    bold?: boolean;
    children?: ReactNode;
    'data-test-id'?: string;
};

/**
 * @deprecated Use `Label` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#label-old-inputlabel the migration guide}.
 */
export const InputLabel = ({
    id,
    children,
    htmlFor,
    required = false,
    disabled = false,
    clickable = false,
    tooltip = [],
    bold,
    'data-test-id': dataTestId = 'input-label',
}: InputLabelProps): ReactElement => {
    const tooltips = Array.isArray(tooltip) ? tooltip : [tooltip];

    const tooltipsWithKeys = tooltips.map((tooltip, index) => ({
        key: index,
        ...tooltip,
    }));

    return (
        <div
            className={merge([
                'tw-inline-flex tw-leading-4 tw-items-center tw-gap-1 tw-font-sans tw-text-s tw-max-w-full tw-min-w-0 tw-flex-initial',
                disabled ? 'tw-text-text-disabled' : 'tw-text-text-weak',
            ])}
            data-test-id={`${dataTestId}-container`}
        >
            <div className="tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap">
                <label
                    id={id}
                    htmlFor={htmlFor}
                    className={merge([
                        'tw-select-none tw-max-w-full',
                        bold && 'tw-font-medium',
                        disabled || !clickable
                            ? 'hover:tw-cursor-not-allowed tw-pointer-events-none'
                            : 'hover:tw-cursor-pointer hover:tw-text-text group-hover:tw-text-text',
                    ])}
                    data-test-id={dataTestId}
                    title={typeof children === 'string' ? children : ''}
                >
                    {children}
                </label>
            </div>

            {required && (
                <span data-test-id={`${dataTestId}-required`} className="tw-h-4 tw-text-m tw-text-text-negative">
                    *
                </span>
            )}
            {tooltipsWithKeys.map(({ key, triggerIcon, triggerStyle, hoverDelay = 100, ...tooltipProps }) => (
                <div key={key} className="tw-leading-3">
                    <TooltipIcon
                        tooltip={{ ...tooltipProps, hoverDelay }}
                        iconSize={IconSize.Size16}
                        triggerIcon={triggerIcon}
                        triggerStyle={triggerStyle}
                    />
                </div>
            ))}
        </div>
    );
};
InputLabel.displayName = 'FondueInputLabel';
