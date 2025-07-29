/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { Button } from '@components/Button/Button';
import { ButtonEmphasis, ButtonSize, ButtonStyle } from '@components/Button/ButtonTypes';
import { LoadingCircle, LoadingCircleSize } from '@components/LoadingCircle/LoadingCircle';
import IconCheckMark16 from '@foundation/Icon/Generated/IconCheckMark16';
import IconCross16 from '@foundation/Icon/Generated/IconCross16';
import IconExclamationMarkTriangle16 from '@foundation/Icon/Generated/IconExclamationMarkTriangle16';
import IconEye16 from '@foundation/Icon/Generated/IconEye16';
import IconEyeOff16 from '@foundation/Icon/Generated/IconEyeOff16';

import { type InputActionsProps, type InputExtraActionsProps } from '../types/input';

import { generateRandomId } from './generateRandomId';
import { merge } from './merge';
import { Validation, validationTextClassMap } from './validation';

type HelperTextProps = {
    text: string;
    disabled?: boolean;
    'data-test-id'?: string;
    validationStyle?: Validation;
};

type InputStyleGroup =
    | 'base'
    | 'width'
    | 'height'
    | 'element'
    | 'focus'
    | 'focusWithin'
    | 'hover'
    | 'disabled'
    | 'readOnly';

/* @deprecated Please use a fondue component instead. */
export const InputStyles: Record<InputStyleGroup, string> = {
    base: 'tw-flex tw-items-center tw-justify-between tw-gap-2 tw-px-3 tw-transition tw-text-sm tw-font-sans tw-relative tw-bg-base tw-border tw-rounded tw-line-strong',
    width: 'tw-w-full',
    height: 'tw-h-9 tw-min-h-[2.35rem]',
    element: 'tw-bg-transparent tw-border-line-strong tw-text-text tw-placeholder-text-x-weak tw-outline-none tw-p-2',
    focus: 'focus:tw-border-line-xx-strong',
    focusWithin: 'focus-within:tw-border-line-xx-strong focus-within:hover:tw-border-line-xx-strong',
    hover: 'hover:tw-border-line-x-strong',
    disabled:
        'disabled:tw-bg-box-disabled disabled:tw-border-line-weak disabled:tw-text-text-disabled disabled:hover:tw-cursor-not-allowed disabled:hover:tw-border-line-weak',
    readOnly:
        'read-only:tw-bg-box-disabled read-only:tw-border-none read-only:tw-text-text-weak read-only:hover:tw-cursor-not-allowed read-only:hover:tw-border-line-weak',
};

/* @deprecated Please use a fondue component or a custom function instead. */
export const HelperText = ({
    text,
    disabled = false,
    validationStyle = Validation.Default,
    'data-test-id': dataTestId = 'fondue-helper-text',
}: HelperTextProps): ReactElement => {
    return (
        <span
            data-test-id={dataTestId}
            className={merge([
                'tw-text-s tw-font-sans',
                disabled ? 'tw-text-black-40' : validationTextClassMap[validationStyle],
            ])}
        >
            {text}
        </span>
    );
};
HelperText.displayName = 'FondueHelperText';

/* @deprecated Please use a fondue component or a custom function instead. */
export const GetStatusIcon = (status: Validation, dataTestId: string): ReactElement | null => {
    let statusIcon: ReactElement | null;
    switch (status) {
        case Validation.Success:
            statusIcon = <IconCheckMark16 />;
            break;
        case Validation.Error:
        case Validation.Warning:
            statusIcon = <IconExclamationMarkTriangle16 />;
            break;
        case Validation.Loading:
            statusIcon = <LoadingCircle size={LoadingCircleSize.Small} />;
            break;
        default:
            statusIcon = null;
    }
    if (statusIcon) {
        return (
            <span className={validationTextClassMap[status]} data-test-id={`${dataTestId}-status-icon`}>
                {statusIcon}
            </span>
        );
    }
    return null;
};

GetStatusIcon.displayName = 'FondueGetStatusIcon';

/* @deprecated Please use a fondue component or a custom function instead. */
export const InputActions = ({
    clearable,
    disabled,
    obfuscated,
    isObfuscated,
    callbacks,
    dataTestId = 'fondue-input-actions',
}: InputActionsProps): ReactElement => {
    return (
        <span className="tw-flex tw-items-center tw-justify-between tw-w-auto">
            {obfuscated && (
                <Button
                    size={ButtonSize.Small}
                    style={ButtonStyle.Default}
                    disabled={disabled}
                    emphasis={ButtonEmphasis.Weak}
                    onClick={callbacks.password}
                    title={`${isObfuscated ? 'show' : 'hide'} text input`}
                    aria-label={`${isObfuscated ? 'show' : 'hide'} text input`}
                    icon={isObfuscated ? <IconEye16 /> : <IconEyeOff16 />}
                    data-test-id={`${dataTestId}-visibility-icon`}
                />
            )}
            {clearable && (
                <Button
                    style={ButtonStyle.Default}
                    onClick={callbacks.clearable}
                    disabled={disabled}
                    emphasis={ButtonEmphasis.Weak}
                    icon={<IconCross16 />}
                    title="Clear Input"
                    size={ButtonSize.Small}
                    aria-label="Clear value"
                    data-test-id={`${dataTestId}-clear`}
                />
            )}
        </span>
    );
};

InputActions.displayName = 'FondueInputActionButtons';

/* @deprecated Please use a fondue component or a custom function instead. */
export const InputExtraActions = ({ actions, disabled, dataTestId }: InputExtraActionsProps) => {
    return actions.map((action) => {
        const id = generateRandomId();
        return (
            <Button
                key={`extra-action-${id}`}
                style={ButtonStyle.Default}
                onClick={action.callback}
                disabled={disabled}
                emphasis={ButtonEmphasis.Weak}
                icon={action.icon}
                size={ButtonSize.Small}
                aria-describedby="Clear Input Value"
                aria-label="Clear value"
                title={action.title}
                data-test-id={`${dataTestId}-extra-action`}
            />
        );
    });
};

InputExtraActions.displayName = 'FondueInputExtraActions';
