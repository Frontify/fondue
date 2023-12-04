/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { GetStatusIcon, InputActions, InputExtraActions, InputStyles } from '@utilities/input';
import { merge } from '@utilities/merge';
import { useForwardedRef } from '@utilities/useForwardedRef';
import { Validation, validationClassMap } from '@utilities/validation';
import { KeyboardEvent, ReactElement, TextareaHTMLAttributes, useEffect } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { InputSharedBaseProps } from 'src/types/input';

export type TextareaProps = {
    autosize?: boolean;
    focusOnMount?: boolean;
    resizable?: boolean;
    selectable?: boolean;
    defaultValue?: string;
    value?: string;
    onChange?: (value?: string) => void;
    onEnterPressed?: (value?: string) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} & Omit<InputSharedBaseProps, 'hugWidth' | 'value'> &
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> &
    Omit<TextareaAutosizeProps, 'onChange' | 'defaultValue' | 'value'>;

export const Textarea = ({
    autocomplete,
    autosize = false,
    clearable = false,
    decorator,
    defaultValue,
    disabled = false,
    extraActions = undefined,
    focusOnMount = false,
    id: propId,
    minRows,
    maxRows,
    placeholder,
    readOnly,
    resizable = false,
    required,
    selectable = false,
    status = Validation.Default,
    value,
    onBlur,
    onChange,
    onEnterPressed,
    onKeyDown,
    onFocus,
    'data-test-id': dataTestId = 'fondue-textarea',
    ...props
}: TextareaProps): ReactElement => {
    const Component = autosize ? TextareaAutosize : 'textarea';

    const textareaRef = useForwardedRef<HTMLTextAreaElement | null>(null);
    const isDisabled = disabled || readOnly;

    const { isFocusVisible, focusProps } = useFocusRing({
        isTextInput: true,
        within: true,
    });

    const handleOnChange = () => {
        if (textareaRef.current) {
            const { value } = textareaRef.current;
            onChange?.(value);
        }
    };

    const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (onEnterPressed && event.key === 'Enter') {
            onEnterPressed(textareaRef.current?.value);
        } else {
            onKeyDown?.(event);
        }
    };

    const handleClear = () => {
        if (textareaRef.current) {
            textareaRef.current.value = '';
            handleOnChange();
        }
    };

    useEffect(() => {
        focusOnMount && textareaRef.current?.focus();
    }, [focusOnMount, textareaRef]);

    const autosizeProps = { minRows, maxRows };

    const getPaddingRight = () => {
        let numOfRem = 1;
        const actionCount = extraActions ? extraActions.length : 0;

        switch (true) {
            case actionCount > 0 && clearable && status !== Validation.Default:
                numOfRem = actionCount + 4.5;
                return `${numOfRem}rem`;
            case actionCount > 0 && (clearable || status !== Validation.Default):
                numOfRem = actionCount + 3;
                return `${numOfRem}rem`;
            case actionCount > 0:
                numOfRem += actionCount * 1.5;
                return `${numOfRem}rem`;
            case clearable && status !== Validation.Default:
                return '3.5rem';
            case status !== Validation.Default || clearable:
                return '2.5rem';
            default:
                return numOfRem;
        }
    };

    const getResizableClass = () => {
        if (!isDisabled && resizable) {
            return 'tw-resize-y';
        } else {
            return 'tw-resize-none';
        }
    };

    return (
        <div className="tw-relative">
            {decorator ? (
                <div
                    className={merge([
                        'tw-absolute tw-top-[0.7rem] tw-left-[0.7rem] tw-z-10',
                        disabled ? InputStyles.disabled : '',
                        readOnly ? InputStyles.readOnly : '',
                    ])}
                    data-test-id={`${dataTestId}-decorator`}
                >
                    {decorator}
                </div>
            ) : null}
            <span {...focusProps}>
                <Component
                    {...(autosize ? autosizeProps : { rows: minRows })}
                    autoComplete={autocomplete ? 'on' : 'off'}
                    disabled={disabled}
                    id={useMemoizedId(propId)}
                    readOnly={readOnly}
                    ref={textareaRef}
                    required={required}
                    value={defaultValue ?? value}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    onChange={handleOnChange}
                    onClick={() => textareaRef.current?.focus()}
                    onFocus={(e) => {
                        if (selectable) {
                            e.target.select();
                        }
                        if (onFocus) {
                            onFocus(e);
                        }
                    }}
                    onKeyDown={handleOnKeyDown}
                    aria-label={dataTestId}
                    data-test-id={dataTestId}
                    className={merge([
                        InputStyles.base,
                        InputStyles.width,
                        minRows ? '' : InputStyles.height,
                        InputStyles.disabled,
                        InputStyles.readOnly,
                        InputStyles.element,
                        InputStyles.focus,
                        InputStyles.hover,
                        isFocusVisible && FOCUS_STYLE,
                        validationClassMap[status],
                        decorator ? 'tw-pl-[2rem]' : '',
                        getResizableClass(),
                    ])}
                    style={{ paddingRight: getPaddingRight() }}
                    {...props}
                />
            </span>

            <span
                className={merge([
                    'tw-absolute tw-top-[0.5rem] tw-right-[0rem] tw-flex tw-items-center tw-justify-between tw-w-auto',
                    autosize ? 'tw-pr-2' : 'tw-pr-5',
                ])}
            >
                <InputActions
                    clearable={clearable}
                    disabled={isDisabled}
                    callbacks={{ clearable: handleClear }}
                    dataTestId={dataTestId}
                />

                {extraActions ? (
                    <InputExtraActions actions={extraActions} disabled={isDisabled} dataTestId={dataTestId} />
                ) : null}

                {status ? GetStatusIcon(status, dataTestId) : null}
            </span>
        </div>
    );
};

Textarea.displayName = 'FondueTextarea';
