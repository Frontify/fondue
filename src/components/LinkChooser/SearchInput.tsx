/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import { LoadingCircle, LoadingCircleSize } from '@components/LoadingCircle';
import { Validation, validationClassMap } from '@utilities/validation';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';
import { useActor } from '@xstate/react';
import React, { MouseEvent, ReactElement, forwardRef } from 'react';
import { IconButtonProps, SearchInputProps } from './types';
import { IconArrowOutExternal, IconClipboard, IconCross } from '@foundation/Icon/Generated';

export const SearchInput = forwardRef<HTMLInputElement | null, SearchInputProps>(
    (
        {
            disabled = false,
            clearable = true,
            ariaProps,
            selectedResult,
            decorator,
            machineService,
            onClear,
            validation = Validation.Default,
            onClick,
            onMouseDown,
        },
        inputElement,
    ) => {
        const { value } = ariaProps;
        const { isFocusVisible, focusProps, isFocused } = useFocusRing({ isTextInput: true });

        const [, send] = useActor(machineService);

        const isLoading = validation === Validation.Loading;

        return (
            <div
                data-test-id="link-chooser-search-wrapper"
                className={merge([
                    'tw-flex tw-items-center tw-h-9 tw-gap-2 tw-px-2.5 tw-border tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent',
                    disabled
                        ? 'tw-border-black-5 tw-bg-black-5 dark:tw-bg-black-90 dark:tw-border-black-90'
                        : merge([
                              'focus-within:tw-border-black-100',
                              isFocusVisible && FOCUS_STYLE,
                              validationClassMap[validation],
                          ]),
                ])}
                onClick={onClick}
                onMouseDown={onMouseDown}
            >
                {decorator && (
                    <div
                        className={merge([
                            'tw-flex tw-items-center tw-justify-center tw-flex-none',
                            disabled || !selectedResult ? 'tw-text-black-40' : 'tw-text-violet-60',
                        ])}
                        data-test-id="link-chooser-decorator-icon"
                    >
                        {decorator}
                    </div>
                )}

                <input
                    {...mergeProps(focusProps, ariaProps)}
                    readOnly={!isFocused}
                    ref={inputElement}
                    className={merge([
                        'tw-flex-auto tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows tw-min-w-0 tw-whitespace-nowrap tw-truncate',
                        disabled
                            ? 'tw-text-black-40 tw-placeholder-black-30 dark:tw-text-black-30 dark:tw-placeholder-black-40'
                            : 'tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                    ])}
                    value={value}
                    disabled={disabled}
                    data-test-id="link-chooser-search-input"
                />
                {selectedResult && !isLoading && (
                    <IconButton
                        disabled={disabled}
                        testId="link-chooser-preview-icon"
                        title="Preview link"
                        ariaLabel="preview link"
                        icon={<IconArrowOutExternal />}
                        onClick={() => send('OPEN_PREVIEW')}
                    />
                )}
                {selectedResult && !isLoading && (
                    <IconButton
                        disabled={disabled}
                        testId="link-chooser-copy-icon"
                        title="Copy text to clipboard"
                        ariaLabel="copy text to clipboard"
                        icon={<IconClipboard />}
                        onClick={() => send('COPY_TO_CLIPBOARD')}
                    />
                )}
                {`${value}`.length > 0 && clearable && !isLoading && (
                    <IconButton
                        disabled={disabled}
                        testId="link-chooser-clear-icon"
                        title="Clear text input"
                        ariaLabel="clear text input"
                        icon={<IconCross />}
                        isComboBoxControl
                        onClick={onClear}
                    />
                )}
                {isLoading && (
                    <span className="tw-flex tw-flex-none tw-justify-center tw-align-center">
                        <LoadingCircle size={LoadingCircleSize.ExtraSmall} />
                    </span>
                )}
            </div>
        );
    },
);
SearchInput.displayName = 'SearchInput';

const IconButton = ({
    disabled,
    title,
    ariaLabel,
    testId,
    icon,
    onClick,
    isComboBoxControl,
}: IconButtonProps): ReactElement => {
    const { isFocusVisible, focusProps } = useFocusRing();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onClick && onClick();
    };

    return (
        <button
            className={merge([
                'tw-flex tw-items-center tw-justify-center tw-transition-colors tw-rounded tw-flex-none',
                disabled ? 'tw-cursor-default tw-text-black-40' : 'tw-text-black-80  hover:tw-text-black-100',
                isFocusVisible && FOCUS_STYLE,
            ])}
            data-test-id={testId}
            title={title}
            aria-label={ariaLabel}
            data-combo-box-control={isComboBoxControl}
            disabled={disabled}
            onClick={handleClick}
            type="button"
            {...focusProps}
        >
            {icon}
        </button>
    );
};
