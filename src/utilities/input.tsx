/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { Validation, validationTextClassMap } from './validation';
import { merge } from './merge';
import { IconCheckMark16, IconCross16, IconExclamationMarkTriangle16, IconEye16, IconEyeOff16 } from '@foundation/Icon';
import { Button, ButtonEmphasis, ButtonSize, ButtonStyle, LoadingCircle, LoadingCircleSize } from '@components/index';
import { InputActionsProps } from 'src/types/input';

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

export const InputStylesLightTheme: Record<InputStyleGroup, string> = {
    base: 'tw-flex tw-items-center tw-justify-between tw-gap-2 tw-px-3 tw-transition tw-text-sm tw-font-sans tw-relative tw-bg-base tw-border tw-rounded tw-line-strong',
    width: 'tw-w-full',
    height: 'tw-h-9',
    element: 'tw-border-line-strong tw-text-text tw-placeholder-text-x-weak tw-outline-none tw-p-2',
    focus: 'focus:tw-border-line-xx-strong',
    focusWithin: 'focus-within:tw-border-line-xx-strong focus-within:hover:tw-border-line-xx-strong',
    hover: 'hover:tw-border-line-x-strong',
    disabled:
        'disabled:tw-bg-box-disabled disabled:tw-border-line-weak disabled:hover:tw-cursor-not-allowed disabled:hover:tw-border-line-weak',
    readOnly:
        'read-only:tw-bg-box-disabled read-only:tw-border-line-weak read-only:hover:tw-cursor-not-allowed read-only:hover:tw-border-line-weak',
};

export const InputStylesDarkTheme: Record<InputStyleGroup, string> = {
    base: 'dark:tw-w-full dark:tw-flex dark:tw-items-center dark:tw-justify-between dark:tw-gap-2 dark:tw-px-3 dark:tw-transition dark:tw-text-sm dark:tw-font-sans dark:tw-relative dark:tw-bg-base dark:tw-border dark:tw-rounded dark:tw-line-strong',
    width: 'dark:tw-w-full',
    height: 'dark:tw-h-9',
    element:
        'dark:tw-border-line-strong dark:tw-text-weak dark:tw-placeholder-text-x-weak dark:tw-outline-none dark:tw-p-2',
    focus: 'dark:focus:tw-border-line-xx-strong',
    focusWithin: 'dark:focus-within:tw-border-line-xx-strong dark:focus-within:hover:tw-border-line-xx-strong',
    hover: 'dark:hover:tw-border-line-x-strong',
    disabled:
        'dark:disabled:tw-bg-box-disabled dark:disabled:tw-border-line-weak dark:disabled:hover:tw-cursor-not-allowed dark:disabled:hover:tw-border-line-weak',
    readOnly:
        'dark:read-only:tw-bg-box-disabled dark:read-only:tw-border-line-weak dark:read-only:hover:tw-cursor-not-allowed dark:read-only:hover:tw-border-line-weak',
};

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

export const InputActions = ({
    clearable,
    disabled,
    obfuscated,
    isObfuscated,
    status,
    callbacks,
    dataTestId = 'fondue-input-actions',
}: InputActionsProps): ReactElement => {
    return (
        <span className="tw-flex tw-items-center tw-justify-between tw-w-auto">
            {obfuscated && (
                <Button
                    disabled={disabled}
                    size={ButtonSize.Small}
                    style={ButtonStyle.Default}
                    emphasis={ButtonEmphasis.Weak}
                    onClick={callbacks.password}
                    aria-label={`${isObfuscated ? 'show' : 'hide'} text input`}
                    icon={isObfuscated ? <IconEye16 /> : <IconEyeOff16 />}
                    data-test-id={`${dataTestId}-visibility-icon`}
                />
            )}
            {clearable && (
                <Button
                    style={ButtonStyle.Default}
                    onClick={callbacks.clearable}
                    emphasis={ButtonEmphasis.Weak}
                    icon={<IconCross16 />}
                    size={ButtonSize.Small}
                    aria-describedby="Clear Input Value"
                    aria-label="Clear value"
                    data-test-id={`${dataTestId}-clear`}
                />
            )}
            {status && GetStatusIcon(status, dataTestId)}
        </span>
    );
};

InputActions.displayName = 'FondueInputActionButtons';
