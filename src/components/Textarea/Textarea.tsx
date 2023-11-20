/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useDebounce } from '@hooks/useDebounce';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { GetStatusIcon, InputActions, InputExtraActions, InputStyles } from '@utilities/input';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';
import { KeyboardEvent, ReactElement, TextareaHTMLAttributes, useEffect, useRef } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import { InputSharedBaseProps } from 'src/types/input';

export type TextareaProps = {
    autosize?: boolean;
    focusOnMount?: boolean;
    resizable?: boolean;
    selectable?: boolean;
    debounceTime?: number;
    defaultValue?: string;
    onChange?: (value?: string) => void;
    onEnterPressed?: (value?: string) => void;
    onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} & Omit<InputSharedBaseProps, 'hugWidth'> &
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> &
    Omit<TextareaAutosizeProps, 'onChange'>;

export const Textarea = ({
    autocomplete,
    autosize = false,
    clearable = false,
    decorator,
    debounceTime = 500,
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

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const { isFocusVisible, focusProps } = useFocusRing({
        isTextInput: true,
        within: true,
    });

    const handleOnChange = useDebounce(() => {
        if (textareaRef.current) {
            const { value } = textareaRef.current;
            onChange?.(value);
        }
    }, debounceTime);

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
        }
    };

    useEffect(() => {
        focusOnMount && textareaRef.current?.focus();
    }, [focusOnMount]);

    const autosizeProps = { minRows, maxRows };

    const getPaddingRight = () => {
        let paddingClass;
        switch (true) {
            case clearable && status !== Validation.Default:
                paddingClass = 'tw-pr-[3.5rem]';
                break;
            case status !== Validation.Default || clearable:
                paddingClass = 'tw-pr-[2.5rem]';
                break;
            default:
                paddingClass = 'tw-pr-[1rem]';
        }
        return paddingClass;
    };

    return (
        <div className={'tw-relative'}>
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
                    defaultValue={defaultValue}
                    disabled={disabled}
                    id={useMemoizedId(propId)}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    ref={textareaRef}
                    required={required}
                    value={value}
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
                        InputStyles.disabled,
                        InputStyles.readOnly,
                        InputStyles.element,
                        InputStyles.focus,
                        InputStyles.hover,
                        isFocusVisible && FOCUS_STYLE,
                        validationClassMap[status],
                        resizable ? 'tw-resize' : 'tw-resize-none',
                        decorator ? 'tw-pl-[2rem]' : 'tw-pl-[1rem]',
                        getPaddingRight(),
                    ])}
                    {...props}
                />
            </span>

            <span className="tw-absolute tw-top-[0.5rem] tw-pr-3 tw-right-[0rem] tw-flex tw-items-center tw-justify-between tw-w-auto">
                <InputActions clearable={clearable} callbacks={{ clearable: handleClear }} dataTestId={dataTestId} />

                {extraActions ? <InputExtraActions actions={extraActions} dataTestId={dataTestId} /> : null}

                {status ? GetStatusIcon(status, dataTestId) : null}
            </span>
        </div>
    );
};

Textarea.displayName = 'FondueTextarea';
