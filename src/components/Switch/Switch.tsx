/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { MouseEvent, ReactElement, useMemo } from 'react';
import { merge } from '@utilities/merge';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { InputLabel, InputLabelTooltipProps } from '@components/InputLabel/InputLabel';

export const SWITCH_ID = 'switch-container';

export type SwitchSize = 'small' | 'medium';

export type SwitchMode = 'on' | 'off' | 'indeterminate';

export type SwitchLabelStyle = 'default' | 'heading';

const trackSizeClasses: Record<SwitchSize, string> = {
    small: 'tw-w-[22px] tw-h-3',
    medium: 'tw-w-[30px] tw-h-4',
};

const dotSizeClasses: Record<SwitchSize, Record<'dimensions' | 'activeWidth' | 'activeTranslation', string>> = {
    small: {
        dimensions: 'tw-w-3 tw-h-3',
        activeWidth: 'group-active:tw-w-[14px]',
        activeTranslation: 'tw-translate-x-[9px]',
    },
    medium: {
        dimensions: 'tw-w-4 tw-h-4',
        activeWidth: 'group-active:tw-w-[18px]',
        activeTranslation: 'tw-translate-x-[13px]',
    },
};

const indeterminateLineClasses = 'tw-w-2 tw-h-[1px]';

export type SwitchProps = {
    id?: string;
    mode?: SwitchMode;
    disabled?: boolean;
    label?: string;
    labelStyle?: string;
    name?: string;
    size?: SwitchSize;
    hug?: boolean;
    tooltip?: InputLabelTooltipProps;
    onChange?: (e: MouseEvent) => void;
    'data-test-id'?: string;
};

export const Switch = ({
    id: propId,
    name,
    label,
    disabled,
    onChange,
    size = 'medium',
    mode = 'off',
    labelStyle = 'default',
    hug = false,
    tooltip,
    'data-test-id': dataTestId = 'switch',
}: SwitchProps): ReactElement => {
    const id = useMemoizedId(propId);
    const { isFocusVisible, focusProps } = useFocusRing();

    // The track on which the dot moves
    const trackClasses = useMemo(() => {
        const baseClasses = 'tw-group tw-border tw-inline-flex tw-rounded-full tw-shrink-0 tw-p-0 tw-transition-colors';

        const trueOrFalseValueClasses =
            mode === 'on'
                ? 'tw-bg-text-weak tw-border-line-xx-strong hover:tw-bg-text'
                : 'tw-bg-box-neutral tw-border-line-x-strong hover:tw-bg-box-neutral-hover';

        const valueClasses =
            mode === 'indeterminate'
                ? 'tw-bg-text-weak tw-flex tw-items-center tw-justify-center hover:tw-bg-text'
                : trueOrFalseValueClasses;

        const trueOrFalseDisabledClasses = disabled
            ? 'tw-bg-box-disabled tw-border-line tw-pointer-events-none'
            : valueClasses;

        const disabledClasses =
            disabled && mode === 'indeterminate'
                ? 'tw-flex tw-items-center tw-justify-center tw-bg-box-disabled tw-border-line tw-pointer-events-none'
                : trueOrFalseDisabledClasses;

        return merge([baseClasses, disabledClasses, trackSizeClasses[size], isFocusVisible && FOCUS_STYLE]);
    }, [mode, disabled, size, isFocusVisible]);

    // Responsible for the left-right translation
    const dotWrapperClasses = useMemo(() => {
        const baseClasses = 'tw-relative tw-self-center tw-transition-transform';

        const trueOrFalseValueClasses = mode === 'on' ? dotSizeClasses[size].activeTranslation : '';

        const valueClasses = mode === 'indeterminate' ? 'tw-bg-base' : trueOrFalseValueClasses;

        const disabledClasses = disabled && mode === 'indeterminate' ? 'tw-bg-text-disabled' : valueClasses;

        return merge([
            baseClasses,
            mode === 'indeterminate' ? indeterminateLineClasses : dotSizeClasses[size].dimensions,
            disabledClasses,
        ]);
    }, [disabled, mode, size]);

    // Responsible for dot styling and width animation on hover
    const dotClasses = useMemo(() => {
        const baseClasses =
            'tw-border tw-bg-base tw-rounded-full tw-absolute tw-block tw-self-center tw-transition-width tw-duration-75';

        const trueOrFalseValueClasses = mode === 'on' ? 'tw-right-0  tw-translate-x-px' : 'tw-left-0';

        const valueClasses = mode === 'indeterminate' ? 'tw-hidden' : trueOrFalseValueClasses;

        const disabledStateClasses = disabled
            ? 'tw-border-line-strong'
            : merge(['tw-bg-base tw-border-line-xx-strong', dotSizeClasses[size].activeWidth]);

        return merge([
            baseClasses,
            mode === 'indeterminate' ? indeterminateLineClasses : dotSizeClasses[size].dimensions,
            valueClasses,
            disabledStateClasses,
        ]);
    }, [mode, disabled, size]);

    // Wraps the InputLabel instance and switch element
    const containerClasses = useMemo(() => {
        return merge(['tw-gap-2 tw-items-center tw-justify-between', hug ? 'tw-inline-flex' : 'tw-flex']);
    }, [hug]);

    return (
        <div className={containerClasses} data-test-id={`${dataTestId}-container`}>
            {label && (
                <InputLabel clickable htmlFor={id} disabled={disabled} tooltip={tooltip}>
                    <span
                        data-test-id={`${dataTestId}-label-wrapper`}
                        className={
                            labelStyle === 'default' ? 'tw-font-medium tw-text-text-weak' : 'tw-font-bold tw-text-text'
                        }
                    >
                        {label}
                    </span>
                </InputLabel>
            )}
            <button
                {...focusProps}
                id={id}
                disabled={disabled}
                name={name}
                data-test-id={dataTestId}
                className={trackClasses}
                value={mode}
                onClick={onChange}
                type="button"
            >
                <div className={dotWrapperClasses}>
                    <div className={dotClasses} />
                </div>
            </button>
        </div>
    );
};
Switch.displayName = 'FondueSwitch';
