/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, cloneElement } from 'react';
import { Validation, validationTextClassMap } from './validation';
import { merge } from './merge';
import {
    Button,
    ButtonEmphasis,
    ButtonSize,
    ButtonStyle,
    LoadingCircle,
    LoadingCircleSize,
    Tooltip,
} from '@components/index';
import { InputActionsProps, InputExtraActionsProps } from 'src/types/input';
import { generateRandomId } from './generateRandomId';
import {
    IconCheckMark16,
    IconCross16,
    IconExclamationMarkTriangle16,
    IconEye16,
    IconEyeOff16,
} from '@foundation/Icon/Generated';

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
                    aria-describedby="Clear Input Value"
                    aria-label="Clear value"
                    data-test-id={`${dataTestId}-clear`}
                />
            )}
        </span>
    );
};

InputActions.displayName = 'FondueInputActionButtons';

export const InputExtraActions = ({
    actions,
    disabled,
    dataTestId,
}: InputExtraActionsProps): (ReactElement | null)[] => {
    return actions.map((action) => {
        const { element, tooltip } = action;
        const id = generateRandomId();
        if (tooltip) {
            return (
                <Tooltip
                    content={tooltip.content}
                    key={`extra-action-tooltip-${id}`}
                    disabled={tooltip.disabled ?? disabled}
                    data-test-id={`${dataTestId}-extra-action`}
                >
                    {cloneElement(tooltip.children, { disabled: tooltip.disabled ?? disabled })}
                </Tooltip>
            );
        }

        return element ? cloneElement(element, { id, disabled, key: `extra-action-${id}` }) : null;
    });
};

InputExtraActions.displayName = 'FondueInputExtraActions';
