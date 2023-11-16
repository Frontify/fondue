/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDebounce } from '@hooks/useDebounce';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { GetStatusIcon, InputStylesDarkTheme, InputStylesLightTheme } from '@utilities/input';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap, validationTextClassMap } from '@utilities/validation';
import { KeyboardEvent, ReactElement, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { InputSharedBaseProps } from 'src/types/input';
import { ON_SAVE_DELAY_IN_MS } from '..';

export type TextareaProps = {
    autosize?: boolean;
    focusOnMount?: boolean;
    height?: number;
    resizable?: boolean;
    selectable?: boolean;
    defaultValue?: string;
    value?: string;
    onChange?: (value?: string) => void;
    onInput?: (value?: string) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
    onEnterPressed?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} & Omit<InputSharedBaseProps, 'hugWidth'> &
    TextareaHTMLAttributes<HTMLTextAreaElement> &
    TextareaAutosizeProps;

export const Textarea = ({
    autocomplete,
    autosize = false,
    decorator,
    disabled = false,
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
    defaultValue,
    value,
    onBlur,
    onChange,
    onEnterPressed,
    onKeyDown,
    onFocus,
    onInput,
    'data-test-id': dataTestId = 'fondue-textarea',
    ...props
}: TextareaProps): ReactElement => {
    const Component = autosize ? TextareaAutosize : 'textarea';

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true, within: true });

    const handleOnChange = useDebounce(() => {
        if (textareaRef.current) {
            onChange?.(textareaRef.current.value);
            onInput?.(textareaRef.current.value);
        }
    }, ON_SAVE_DELAY_IN_MS);

    const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (onEnterPressed && event.key === 'Enter') {
            onEnterPressed(event);
        } else {
            onKeyDown?.(event);
        }
    };

    useEffect(() => {
        focusOnMount && textareaRef.current?.focus();
    }, [focusOnMount]);

    const autosizeProps = { minRows, maxRows };

    return (
        <div className={'tw-relative'} {...focusProps}>
            {decorator ? (
                <div
                    className={merge([
                        'tw-absolute tw-top-[0.7rem] tw-left-[0.7rem] tw-z-10',
                        InputStylesLightTheme.disabled,
                        InputStylesLightTheme.readOnly,
                        InputStylesDarkTheme.disabled,
                        InputStylesDarkTheme.readOnly,
                    ])}
                    data-test-id={`${dataTestId}-decorator`}
                >
                    {decorator}
                </div>
            ) : null}
            <Component
                {...(autosize ? autosizeProps : { rows: minRows })}
                autoComplete={autocomplete ? 'on' : 'off'}
                ref={textareaRef}
                id={useMemoizedId(propId)}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                onBlur={onBlur}
                onChange={handleOnChange}
                onClick={() => textareaRef.current?.focus()}
                onFocus={(e) => {
                    if (selectable) {
                        e.target.select();
                    }
                    if (onFocus) {
                        textareaRef.current?.focus();
                        onFocus(e);
                    }
                }}
                onKeyDown={handleOnKeyDown}
                onInput={handleOnChange}
                aria-label={dataTestId}
                data-test-id={dataTestId}
                className={merge([
                    InputStylesLightTheme.base,
                    InputStylesLightTheme.width,
                    InputStylesLightTheme.disabled,
                    InputStylesLightTheme.readOnly,
                    InputStylesLightTheme.element,
                    InputStylesLightTheme.focus,
                    InputStylesLightTheme.hover,
                    InputStylesDarkTheme.base,
                    InputStylesDarkTheme.width,
                    InputStylesDarkTheme.element,
                    InputStylesDarkTheme.disabled,
                    InputStylesDarkTheme.readOnly,
                    InputStylesDarkTheme.focus,
                    InputStylesDarkTheme.hover,
                    isFocusVisible && FOCUS_STYLE,
                    validationClassMap[status],
                    resizable ? 'tw-resize' : 'tw-resize-none',
                    decorator ? 'tw-pl-[2rem]' : 'tw-pl-[1rem]',
                    status !== Validation.Default ? 'tw-pr-[2.5rem]' : 'tw-pr-[1rem]',
                ])}
                {...props}
            />
            {status && (
                <span
                    className={merge([
                        'tw-absolute tw-top-[0.5rem] tw-pr-4',
                        autosize ? 'tw-right-[0rem]' : 'tw-right-[0.7rem]',
                        disabled || readOnly ? validationClassMap[Validation.Default] : validationTextClassMap[status],
                    ])}
                >
                    {GetStatusIcon(status, dataTestId)}
                </span>
            )}
        </div>
    );
};

Textarea.displayName = 'FondueTextarea';
