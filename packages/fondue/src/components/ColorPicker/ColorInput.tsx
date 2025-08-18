/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useFocusRing } from '@react-aria/focus';
import { type KeyboardEvent, type ReactElement, useRef } from 'react';

import { type TextInputBaseProps, TextInputType } from '@components/TextInput/TextInput';
import { useMemoizedId } from '@hooks/useMemoizedId';
import { FOCUS_STYLE } from '@utilities/focusStyle';
import { merge } from '@utilities/merge';

export type ColorInputProps = {
    min?: number;
    max?: number;
    decoratorPosition?: DecoratorPosition;
    'aria-label'?: string;
} & Pick<TextInputBaseProps, 'decorator' | 'value' | 'onChange' | 'type' | 'size' | 'onBlur' | 'onEnterPressed'>;

export enum DecoratorPosition {
    Left = 'Left',
    Right = 'Right',
}

export const ColorInput = ({
    min,
    max,
    decorator,
    onChange,
    onEnterPressed,
    size,
    onBlur,
    value = '',
    decoratorPosition = DecoratorPosition.Left,
    type = TextInputType.Text,
    'aria-label': ariaLabel = 'Color Input',
}: ColorInputProps): ReactElement => {
    const { isFocusVisible, focusProps } = useFocusRing({ within: true, isTextInput: true });
    const inputElement = useRef<HTMLInputElement | null>(null);
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const { key, shiftKey } = event;
        if (key === 'Enter' && !shiftKey) {
            if (onEnterPressed) {
                onEnterPressed(event);
            }
        }
    };

    return (
        <div
            {...focusProps}
            className={merge([
                'tw-flex tw-items-center tw-h-9 tw-px-2 tw-border tw-rounded tw-text-s tw-font-sans tw-relative tw-bg-white dark:tw-bg-transparent focus-within:tw-border-black-90 tw-border-black-20',
                isFocusVisible && FOCUS_STYLE,
            ])}
            data-test-id="color-input"
        >
            <div
                className={merge([
                    'tw-flex tw-gap-1',
                    decoratorPosition === DecoratorPosition.Right && 'tw-flex-row-reverse',
                ])}
            >
                {decorator ? (
                    <div className="tw-flex tw-items-center tw-justify-center tw-text-black-80">{decorator}</div>
                ) : null}
                <input
                    id={useMemoizedId()}
                    ref={inputElement}
                    className={merge([
                        'tw-grow tw-border-none tw-outline-none tw-bg-transparent tw-hide-input-arrows tw-text-black tw-placeholder-black-60 dark:tw-text-white',
                        decoratorPosition === DecoratorPosition.Right && 'tw-text-right',
                    ])}
                    onClick={() => inputElement.current?.focus()}
                    onKeyDown={handleKeyDown}
                    onChange={(event) => {
                        if (onChange) {
                            onChange(event.currentTarget.value);
                        }
                    }}
                    onBlur={onBlur}
                    value={value}
                    type={type}
                    min={min}
                    max={max}
                    size={size}
                    aria-label={ariaLabel}
                />
            </div>
        </div>
    );
};
ColorInput.displayName = 'FondueColorInput';
