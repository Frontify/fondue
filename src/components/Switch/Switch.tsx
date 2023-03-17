/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { FC, MouseEvent, useMemo } from 'react';
import { merge } from '@utilities/merge';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { InputLabel, InputLabelTooltipProps } from '@components/InputLabel/InputLabel';

export const SWITCH_ID = 'switch-container';

export enum SwitchSize {
    Small = 'Small',
    Medium = 'Medium',
}

export enum SwitchState {
    On = 'On',
    Off = 'Off',
    Mixed = 'Mixed',
}

const trackSizeClasses: Record<SwitchSize, string> = {
    [SwitchSize.Small]: 'tw-w-[22px] tw-h-3',
    [SwitchSize.Medium]: 'tw-w-[30px] tw-h-4',
};

const dotSizeClasses: Record<SwitchSize, Record<'dimensions' | 'activeWidth' | 'activeTranslation', string>> = {
    [SwitchSize.Small]: {
        dimensions: 'tw-w-3 tw-h-3',
        activeWidth: 'group-active:tw-w-[14px]',
        activeTranslation: 'tw-translate-x-[9px]',
    },
    [SwitchSize.Medium]: {
        dimensions: 'tw-w-4 tw-h-4',
        activeWidth: 'group-active:tw-w-[18px]',
        activeTranslation: 'tw-translate-x-[13px]',
    },
};

const indeterminateLineClasses = 'tw-w-2 tw-h-[1px]';

export type SwitchProps = {
    id?: string;
    on?: SwitchState;
    disabled?: boolean;
    label?: string;
    name?: string;
    size?: SwitchSize;
    hug?: boolean;
    tooltip?: InputLabelTooltipProps;
    onChange?: (e: MouseEvent) => void;
};

export const Switch: FC<SwitchProps> = ({
    id: propId,
    name,
    label,
    disabled,
    onChange,
    size = SwitchSize.Medium,
    on = SwitchState.Off,
    hug = false,
    tooltip,
}) => {
    const id = useMemoizedId(propId);
    const { isFocusVisible, focusProps } = useFocusRing();

    // The track on which the dot moves
    const trackClasses = useMemo(() => {
        const baseClasses = 'tw-group tw-border tw-inline-flex tw-rounded-full tw-shrink-0 tw-p-0 tw-transition-colors';

        const trueOrFalseValueClasses =
            on === SwitchState.On
                ? 'tw-bg-text-weak tw-border-line-xx-strong hover:tw-bg-text'
                : 'tw-bg-box-neutral tw-border-line-x-strong hover:tw-bg-box-neutral-hover';

        const valueClasses =
            on === SwitchState.Mixed
                ? 'tw-bg-text-weak tw-flex tw-items-center tw-justify-center hover:tw-bg-text'
                : trueOrFalseValueClasses;

        const trueOrFalseDisabledClasses = disabled
            ? 'tw-bg-box-disabled tw-border-line tw-pointer-events-none'
            : valueClasses;

        const disabledClasses =
            disabled && on === SwitchState.Mixed
                ? 'tw-flex tw-items-center tw-justify-center tw-bg-box-disabled tw-border-line tw-pointer-events-none'
                : trueOrFalseDisabledClasses;

        return merge([baseClasses, disabledClasses, trackSizeClasses[size], isFocusVisible && FOCUS_STYLE]);
    }, [on, disabled, size, isFocusVisible]);

    // Responsible for the left-right translation
    const dotWrapperClasses = useMemo(() => {
        const baseClasses = 'tw-relative tw-self-center tw-transition-transform';

        const trueOrFalseValueClasses = on === SwitchState.On ? dotSizeClasses[size].activeTranslation : '';

        const valueClasses = on === SwitchState.Mixed ? 'tw-bg-base' : trueOrFalseValueClasses;

        const disabledClasses = disabled && on === SwitchState.Mixed ? 'tw-bg-text-disabled' : valueClasses;

        return merge([
            baseClasses,
            on === SwitchState.Mixed ? indeterminateLineClasses : dotSizeClasses[size].dimensions,
            disabledClasses,
        ]);
    }, [on, size]);

    // Responsible for dot styling and width animation on hover
    const dotClasses = useMemo(() => {
        const baseClasses =
            'tw-border tw-bg-base tw-rounded-full tw-absolute tw-block tw-self-center tw-transition-width tw-duration-75';

        const trueOrFalseValueClasses =
            // eslint-disable-next-line unicorn/no-nested-ternary
            on === SwitchState.On ? 'tw-right-0  tw-translate-x-px' : 'tw-left-0';

        const valueClasses = on === SwitchState.Mixed ? 'tw-hidden' : trueOrFalseValueClasses;

        const disabledStateClasses = disabled
            ? 'tw-border-line-strong'
            : merge(['tw-bg-base tw-border-line-xx-strong', dotSizeClasses[size].activeWidth]);

        return merge([
            baseClasses,
            on === SwitchState.Mixed ? indeterminateLineClasses : dotSizeClasses[size].dimensions,
            valueClasses,
            disabledStateClasses,
        ]);
    }, [on, disabled, size]);

    // Wraps the InputLabel instance and switch element
    const containerClasses = useMemo(() => {
        return merge(['tw-gap-2 tw-items-center tw-justify-between', hug ? 'tw-inline-flex' : 'tw-flex']);
    }, [hug]);

    return (
        <div className={containerClasses} data-test-id={SWITCH_ID}>
            {label && (
                <InputLabel clickable={true} htmlFor={id} disabled={disabled} tooltip={tooltip}>
                    {label}
                </InputLabel>
            )}
            <button
                {...focusProps}
                id={id}
                disabled={disabled}
                name={name}
                data-test-id="switch"
                className={trackClasses}
                value={on.toString()}
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
