/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
    type AriaAttributes,
    type FocusEvent,
    type ForwardRefRenderFunction,
    type KeyboardEvent,
    type ReactElement,
    type ReactNode,
} from 'react';

import { LoadingCircle, LoadingCircleSize } from '@components/LoadingCircle';
import IconCheckMark from '@foundation/Icon/Generated/IconCheckMark';
import IconClipboard from '@foundation/Icon/Generated/IconClipboard';
import IconCross from '@foundation/Icon/Generated/IconCross';
import IconCrossCircle from '@foundation/Icon/Generated/IconCrossCircle';
import IconExclamationMarkTriangle from '@foundation/Icon/Generated/IconExclamationMarkTriangle';
import IconEye from '@foundation/Icon/Generated/IconEye';
import IconEyeOff from '@foundation/Icon/Generated/IconEyeOff';
import { useCopy } from '@hooks/useCopy';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { Validation, validationClassMap } from '@utilities/validation';

import { LegacyTooltip, type LegacyTooltipProps } from '../LegacyTooltip';

export enum TextInputType {
    Text = 'text',
    Password = 'password',
    Number = 'number',
    Search = 'search',
}

export type TextInputExtraAction = {
    onClick: () => void;
    icon: ReactElement;
    title: string;
    tooltip?: Omit<LegacyTooltipProps, 'triggerElement'>;
    disabled?: boolean;
};

export type TextInputBaseProps = {
    id?: string;
    type?: TextInputType;
    decorator?: ReactNode;
    dotted?: boolean;
    clearable?: boolean;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    autocomplete?: boolean;
    readonly?: boolean;
    validation?: Validation;
    copyable?: boolean;
    value?: string;
    onChange?: (value: string) => void;
    onEnterPressed?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    maxLength?: number;
    size?: number;
    spellcheck?: boolean;
    /** @deprecated a `ref` can be forwarded to expose the underlying `<input />` DOM node.
        @example
        ```tsx
            import { TextInput } from '@frontify/fondue';

            const Component = () => {
            const inputRef = useRef();

            useEffect(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, [)
            return <TextInput ref={inputRef} />
         }
         ```
    */
    focusOnMount?: boolean;
    selectable?: boolean;
    extraActions?: TextInputExtraAction[];
    ariaLabel?: string;
} & AriaAttributes;

type TextInputTextProps = TextInputBaseProps & {
    type?: TextInputType.Text;
    obfuscated?: false;
};
type TextInputSearchProps = TextInputBaseProps & {
    type: TextInputType.Search;
    obfuscated?: false;
};
type TextInputNumberProps = TextInputBaseProps & {
    type: TextInputType.Number;
    min?: number;
    max?: number;
    obfuscated?: false;
};
type TextInputPasswordProps = TextInputBaseProps & {
    type: TextInputType.Password;
    obfuscated?: boolean;
};
export type TextInputProps = TextInputTextProps | TextInputNumberProps | TextInputPasswordProps | TextInputSearchProps;

type ExtraActionButtonProps = {
    extraAction: TextInputExtraAction;
    disabled: boolean;
};

const ExtraActionButton: ForwardRefRenderFunction<HTMLButtonElement | null, ExtraActionButtonProps> = (
    { extraAction, disabled },
    ref,
): ReactElement | null => {
    const { isFocusVisible: extraActionButtonIsFocusVisible, focusProps: extraActionButtonFocusProps } = useFocusRing();

    if (!extraAction) {
        return null;
    }

    const isDisabled = disabled || extraAction.disabled;
    return (
        <button
            className={merge([
                'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded tw-p-1',
                isDisabled
                    ? 'tw-cursor-default tw-text-text-disabled'
                    : 'tw-text-text-weak hover:tw-bg-box-neutral-hover hover:tw-text-box-neutral-inverse-hover',
                extraActionButtonIsFocusVisible && FOCUS_STYLE,
            ])}
            onClick={extraAction.onClick}
            data-test-id="fondue-extra-action-icon"
            aria-label={extraAction.title.toLowerCase()}
            disabled={isDisabled}
            aria-disabled={isDisabled}
            type="button"
            ref={ref}
            {...extraActionButtonFocusProps}
        >
            {extraAction.icon}
        </button>
    );
};
const ExtraActionButtonWithRef = forwardRef(ExtraActionButton);

/**
 * @deprecated Use `TextInput` from `@frontify/fondue/components` instead. Also check {@link https://github.com/Frontify/fondue/blob/main/packages/components/MIGRATING.md#text-input the migration guide}.
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            id: propId,
            type = TextInputType.Text,
            decorator,
            validation = Validation.Default,
            clearable = false,
            placeholder,
            required,
            obfuscated,
            disabled = false,
            autocomplete = false,
            dotted = false,
            value = '',
            copyable = false,
            onChange,
            onEnterPressed,
            onBlur,
            onClear,
            onFocus,
            size,
            spellcheck,
            readonly,
            focusOnMount,
            selectable = false,
            extraActions,
            maxLength,
            ...props
        },
        ref,
    ): ReactElement => {
        const inputElement = useRef<HTMLInputElement | null>(null);
        useImperativeHandle(ref, () => inputElement.current!, []);

        const { isFocusVisible: inputIsFocusVisible, focusProps: inputFocusProps } = useFocusRing({
            isTextInput: true,
        });
        const { isFocusVisible: clearButtonIsFocusVisible, focusProps: clearButtonFocusProps } = useFocusRing();
        const { isFocusVisible: passwordButtonIsFocusVisible, focusProps: passwordButtonFocusProps } = useFocusRing();
        const { isFocusVisible: copyButtonIsFocusVisible, focusProps: copyButtonFocusProps } = useFocusRing();

        const { copy, status } = useCopy();

        const [isObfuscated, setIsObfuscated] = useState(
            typeof obfuscated === 'boolean' ? obfuscated : type === TextInputType.Password,
        );

        useEffect(() => {
            const timeoutId = window.setTimeout(() => {
                if (focusOnMount && inputElement.current) {
                    inputElement.current.focus();
                }
            }, 0);
            return () => {
                window.clearTimeout(timeoutId);
            };
        }, [focusOnMount]);

        useEffect(() => {
            if (typeof obfuscated === 'boolean') {
                setIsObfuscated(obfuscated);
            }
        }, [obfuscated]);

        const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && onEnterPressed) {
                onEnterPressed(event);
            }
        };

        const getInputType = () => {
            if (type === TextInputType.Password) {
                return isObfuscated ? TextInputType.Password : TextInputType.Text;
            }
            return type;
        };

        const spellcheckProp = typeof spellcheck === 'boolean' ? { spellCheck: spellcheck } : null;

        return (
            <div
                {...props}
                className={merge([
                    'tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-3 tw-border tw-transition tw-rounded tw-text-body-small tw-font-sans tw-relative tw-bg-base dark:tw-bg-transparent',
                    dotted ? 'tw-border-dashed' : 'tw-border-solid',
                    disabled || readonly
                        ? 'tw-bg-box-disabled dark:tw-bg-box-disabled hover:tw-cursor-not-allowed tw-border-line-weak dark:tw-border-line-weak'
                        : merge([
                              'focus-within:tw-border-line-xx-strong focus-within:hover:tw-border-line-xx-strong hover:tw-border-line-x-strong',
                              validationClassMap[validation],
                              inputIsFocusVisible &&
                                  !clearButtonIsFocusVisible &&
                                  !passwordButtonIsFocusVisible &&
                                  !copyButtonIsFocusVisible &&
                                  FOCUS_STYLE,
                          ]),
                ])}
                data-test-id="fondue-text-input-component"
            >
                {decorator && (
                    <div
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-pl-1',
                            disabled ? 'tw-text-black-60' : 'tw-text-black-80',
                        ])}
                        data-test-id="decorator"
                    >
                        {decorator}
                    </div>
                )}
                <input
                    {...inputFocusProps}
                    id={useMemoizedId(propId)}
                    ref={inputElement}
                    className={merge([
                        'tw-w-full tw-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows',
                        disabled || readonly
                            ? 'tw-text-text-disabled tw-placeholder-text-disabled dark:tw-text-black-30 dark:tw-placeholder-black-40 hover:tw-cursor-not-allowed'
                            : 'tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                    ])}
                    onClick={() => inputElement.current?.focus()}
                    onChange={(event) => onChange?.(event.currentTarget.value)}
                    onBlur={(e) => {
                        inputFocusProps.onBlur?.(e);
                        onBlur?.(e);
                    }}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    value={value}
                    type={getInputType()}
                    required={required}
                    readOnly={readonly}
                    disabled={disabled}
                    onFocus={(e) => {
                        inputFocusProps.onFocus?.(e);
                        if (selectable) {
                            e.target.select();
                        }
                        if (onFocus) {
                            onFocus(e);
                        }
                    }}
                    autoComplete={autocomplete ? 'on' : 'off'}
                    maxLength={maxLength}
                    size={size}
                    data-test-id="text-input"
                    {...spellcheckProp}
                />
                {extraActions &&
                    extraActions.length > 0 &&
                    extraActions.map((extraAction: TextInputExtraAction, index: number) => {
                        const key = `text-input-extra-action-${index}`;
                        if (extraAction.tooltip) {
                            return (
                                <LegacyTooltip
                                    key={key}
                                    {...extraAction.tooltip}
                                    triggerElement={
                                        <ExtraActionButtonWithRef extraAction={extraAction} disabled={disabled} />
                                    }
                                />
                            );
                        }
                        return <ExtraActionButtonWithRef key={key} extraAction={extraAction} disabled={disabled} />;
                    })}
                {`${value}`.length > 0 && clearable && (
                    <button
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded',
                            disabled
                                ? 'tw-cursor-default tw-text-black-40'
                                : 'tw-text-black-60  hover:tw-text-black-100',
                            clearButtonIsFocusVisible && FOCUS_STYLE,
                        ])}
                        onClick={() => {
                            inputElement.current?.focus();
                            inputElement.current?.setAttribute('value', '');

                            onChange?.('');
                            onClear?.();
                        }}
                        data-test-id="clear-icon"
                        title="Clear text input"
                        aria-label="clear text input"
                        disabled={disabled}
                        type="button"
                        {...clearButtonFocusProps}
                    >
                        <IconCross />
                    </button>
                )}
                {type === TextInputType.Password && (
                    <button
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded',
                            disabled
                                ? 'tw-cursor-default tw-text-black-40'
                                : 'tw-text-black-60 hover:tw-text-black-100',
                            passwordButtonIsFocusVisible && FOCUS_STYLE,
                        ])}
                        onClick={() => setIsObfuscated(!isObfuscated)}
                        data-test-id="visibility-icon"
                        title="Toggle text visibility"
                        type="button"
                        aria-label={`${isObfuscated ? 'unveil' : 'obfuscate'} text input`}
                        disabled={disabled}
                        {...passwordButtonFocusProps}
                    >
                        {isObfuscated ? <IconEye /> : <IconEyeOff />}
                    </button>
                )}
                {validation === Validation.Loading && (
                    <span className="tw-absolute tw-top-[-0.55rem] tw-right-[-0.55rem] tw-bg-white tw-rounded-full tw-p-[2px] tw-border tw-border-black-10">
                        <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                    </span>
                )}
                {(validation === Validation.Error || validation === Validation.Warning) && (
                    <span
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center',
                            validation === Validation.Error && 'tw-text-text-negative',
                            validation === Validation.Warning && 'tw-text-text-warning',
                        ])}
                        data-test-id="error-state-exclamation-mark-icon"
                    >
                        <IconExclamationMarkTriangle />
                    </span>
                )}
                {copyable && (
                    <button
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded',
                            disabled
                                ? 'tw-cursor-default tw-text-black-40'
                                : 'tw-text-black-60 hover:tw-text-black-100',
                            copyButtonIsFocusVisible && FOCUS_STYLE,
                        ])}
                        onClick={() => copy(value)}
                        data-test-id="copy-icon"
                        title="Copy input text"
                        disabled={disabled}
                        type="button"
                        {...copyButtonFocusProps}
                    >
                        {status === 'error' && (
                            <span className="tw-text-box-negative-strong">
                                <IconCrossCircle />
                            </span>
                        )}
                        {status === 'idle' && <IconClipboard />}
                        {status === 'success' && (
                            <span className="tw-text-box-positive-strong">
                                <IconCheckMark />
                            </span>
                        )}
                    </button>
                )}
            </div>
        );
    },
);
TextInput.displayName = 'FondueTextInput';
