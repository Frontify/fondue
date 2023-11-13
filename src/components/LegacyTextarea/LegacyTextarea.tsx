/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useMemoizedId } from '@hooks/useMemoizedId';
import { useFocusRing } from '@react-aria/focus';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';
import { LoadingCircle, LoadingCircleSize } from '@components/LoadingCircle';
import {
    AriaAttributes,
    FocusEvent,
    FormEvent,
    KeyboardEvent,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IconExclamationMarkTriangle } from '@foundation/Icon/Generated';

export type TextareaProps = {
    id?: string;
    value?: string;
    required?: boolean;
    decorator?: ReactNode;
    placeholder?: string;
    disabled?: boolean;
    onInput?: (value: string) => void;
    onBlur?: (value: string) => void;
    onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
    validation?: Validation;
    /** When autosize if false, this is used as 'rows' property for standard textarea */
    minRows?: number;
    /** When autosize if false, this property is ignored */
    maxRows?: number;
    autosize?: boolean;
    resizeable?: boolean;
    selectable?: boolean;
    focusOnMount?: boolean;
    onEnterPressed?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
} & AriaAttributes;

export const LegacyTextarea = ({
    id: propId,
    value,
    required = false,
    decorator,
    placeholder,
    disabled = false,
    onInput,
    onBlur,
    validation = Validation.Default,
    minRows,
    maxRows,
    autosize = false,
    resizeable = true,
    onFocus,
    selectable = false,
    focusOnMount,
    onEnterPressed,
    ...props
}: TextareaProps): ReactElement => {
    const Component = autosize ? TextareaAutosize : 'textarea';

    const textareaElement = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        focusOnMount && textareaElement.current?.focus();
    }, [focusOnMount]);

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            onEnterPressed?.(event);
        }
    };

    const onBlurHandler = (event: FocusEvent<HTMLTextAreaElement>) => {
        if (onBlur) {
            onBlur(event.target.value);
        }
    };

    const onInputHandler = (event: FormEvent<HTMLTextAreaElement>) => {
        if (onInput) {
            onInput((event.target as HTMLTextAreaElement).value);
        }
    };

    const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true, within: true });
    const autosizeProps = { maxRows, minRows };

    return (
        <div className="tw-relative" {...focusProps}>
            {decorator && (
                <div
                    className="tw-absolute tw-top-2 tw-left-2 tw-inline-flex tw-items-end tw-text-black-80"
                    data-test-id="decorator"
                >
                    {decorator}
                </div>
            )}
            <Component
                {...(autosize ? autosizeProps : { rows: minRows })}
                onClick={() => textareaElement.current?.focus()}
                id={useMemoizedId(propId)}
                ref={textareaElement}
                value={value}
                placeholder={placeholder}
                required={required}
                className={merge([
                    'tw-w-full tw-p-2 tw-border tw-rounded tw-text-s tw-outline-none tw-transition tw-placeholder-black-60',
                    !!decorator && 'tw-pl-7 ',
                    disabled
                        ? 'tw-border-black-5 tw-bg-black-5 tw-text-black-40'
                        : 'tw-text-black tw-border-black-20 hover:tw-border-line-x-strong focus-within:tw-border-line-xx-strong focus-within:hover:tw-border-line-xx-strong',
                    isFocusVisible && FOCUS_STYLE,
                    validationClassMap[validation],
                    !resizeable && 'tw-resize-none',
                    validation === Validation.Error && 'tw-pr-8',
                ])}
                disabled={disabled}
                onBlur={onBlurHandler}
                onFocus={(e) => {
                    if (selectable) {
                        e.target.select();
                    }
                    if (onFocus) {
                        onFocus(e);
                    }
                }}
                onInput={onInputHandler}
                onKeyDown={onKeyDown}
                data-test-id="textarea"
                {...props}
            />
            {validation === Validation.Loading && (
                <span className="tw-absolute tw-top-[-0.55rem] tw-right-[-0.55rem] tw-bg-white tw-rounded-full tw-p-[2px] tw-border tw-border-black-10">
                    <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                </span>
            )}
            {(validation === Validation.Error || validation === Validation.Warning) && (
                <span
                    className={merge([
                        'tw-absolute tw-top-[0.6rem] tw-right-[0.6rem]',
                        validation === Validation.Error && 'tw-text-text-negative',
                        validation === Validation.Warning && 'tw-text-text-warning',
                    ])}
                    data-test-id="error-state-exclamation-mark-icon"
                >
                    <IconExclamationMarkTriangle />
                </span>
            )}
        </div>
    );
};
LegacyTextarea.displayName = 'FondueLegacyTextarea';
